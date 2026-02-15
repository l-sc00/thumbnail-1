import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { enhanceThumbnailPrompt } from "@/lib/thumbnail-system-prompt";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  // Initialize these at top level for error handling
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  let userData: { credits: number } | null = null;

  try {
    // Check authentication

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check user credits
    const { data: userDataTemp, error: userError } = await supabase
      .from("users")
      .select("credits")
      .eq("id", user.id)
      .single();

    userData = userDataTemp;

    if (userError || !userData) {
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: 500 }
      );
    }

    if (userData.credits <= 0) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 403 }
      );
    }

    // Deduct 1 credit immediately
    const { error: deductError } = await supabase
      .from("users")
      .update({ credits: userData.credits - 1 })
      .eq("id", user.id);

    if (deductError) {
      return NextResponse.json(
        { error: "Failed to deduct credits" },
        { status: 500 }
      );
    }

    // Parse request body
    const { prompt, images } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Validate images array if provided
    if (images && (!Array.isArray(images) || images.some((img: any) => typeof img !== "string"))) {
      return NextResponse.json(
        { error: "Invalid images format" },
        { status: 400 }
      );
    }

    // Initialize Gemini client
    const apiKey = process.env.GEMENI_API_KEY;
    if (!apiKey) {
      console.error("GEMENI_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Create thumbnail record in database with pending status
    const { data: thumbnail, error: dbError } = await supabase
      .from("thumbnails")
      .insert({
        user_id: user.id,
        prompt,
        status: "generating",
      })
      .select()
      .single();

    if (dbError || !thumbnail) {
      console.error("Database insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to create thumbnail record" },
        { status: 500 }
      );
    }

    try {
      // Enhance user prompt for YouTube thumbnail generation
      let enhancedPrompt = enhanceThumbnailPrompt(prompt);

      // If multiple images are provided, add composition instructions
      if (images && images.length > 1) {
        enhancedPrompt = `Create a YouTube thumbnail by composing and combining the ${images.length} provided images together. ${enhancedPrompt}. Blend and merge these images creatively to create a unified, cohesive thumbnail design. Maintain visual harmony and ensure all important elements from the source images are visible and well-integrated.`;
      } else if (images && images.length === 1) {
        enhancedPrompt = `Using the provided reference image as inspiration, ${enhancedPrompt}`;
      }

      console.log("User prompt:", prompt);
      console.log("Enhanced prompt:", enhancedPrompt);
      console.log("Images provided:", images ? images.length : 0);

      // Build contents array for Gemini API
      const contentParts: any[] = [{ text: enhancedPrompt }];

      // Add images if provided (for reference/style transfer)
      if (images && images.length > 0) {
        for (const imageDataUrl of images) {
          // Parse data URL to extract MIME type and base64 data
          const matches = imageDataUrl.match(/^data:([^;]+);base64,(.+)$/);
          if (matches) {
            const mimeType = matches[1];
            const base64Data = matches[2];
            contentParts.push({
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            });
            console.log(`Added image with MIME type: ${mimeType}`);
          } else {
            console.warn("Invalid image data URL format, skipping");
          }
        }
      }

      // Generate image using Gemini
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [{
          role: "user",
          parts: contentParts,
        }],
      });

      console.log("Gemini API response:", JSON.stringify(response, null, 2));

      // Extract image data from response
      let imageData: Buffer | null = null;

      // Check if response has candidates
      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData && part.inlineData.data) {
              // Convert base64 to Buffer
              imageData = Buffer.from(part.inlineData.data, "base64");
              console.log("Image data extracted, size:", imageData.length);
              break;
            }
          }
        }
      }

      if (!imageData) {
        console.error("No image data found in response");
        // Update status to failed
        await supabase
          .from("thumbnails")
          .update({ status: "failed" })
          .eq("id", thumbnail.id);

        return NextResponse.json(
          { error: "No image generated", details: response },
          { status: 500 }
        );
      }

      // Resize to fit within YouTube thumbnail dimensions: 1280x720 (16:9)
      // Using "inside" to preserve entire image including all text without cropping
      console.log("Resizing to fit YouTube specs: 1280x720...");
      const resizedImage = await sharp(imageData)
        .resize(1280, 720, {
          fit: "inside",
          background: { r: 0, g: 0, b: 0, alpha: 1 }
        })
        .png({ quality: 95, compressionLevel: 9 })
        .toBuffer();

      console.log("Image resized. Original size:", imageData.length, "New size:", resizedImage.length);

      // Upload to Supabase Storage
      const fileName = `${user.id}/${thumbnail.id}.png`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, resizedImage, {
          contentType: "image/png",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        await supabase
          .from("thumbnails")
          .update({ status: "failed" })
          .eq("id", thumbnail.id);

        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(fileName);

      // Update thumbnail record with image URL and completed status
      const { error: updateError } = await supabase
        .from("thumbnails")
        .update({
          image_url: publicUrl,
          status: "completed",
        })
        .eq("id", thumbnail.id);

      if (updateError) {
        console.error("Database update error:", updateError);
      }

      return NextResponse.json({
        success: true,
        thumbnail: {
          id: thumbnail.id,
          prompt,
          imageUrl: publicUrl,
          status: "completed",
        },
      });
    } catch (genError) {
      console.error("Gemini generation error:", genError);
      console.error("Error details:", JSON.stringify(genError, null, 2));

      // Update status to failed
      await supabase
        .from("thumbnails")
        .update({ status: "failed" })
        .eq("id", thumbnail.id);

      // Refund credit on error
      await supabase
        .from("users")
        .update({ credits: userData.credits })
        .eq("id", user.id);

      return NextResponse.json(
        {
          error: "Failed to generate image",
          details: genError instanceof Error ? genError.message : String(genError)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API error:", error);

    // Refund credit on any error if user and userData exist
    if (user && userData) {
      await supabase
        .from("users")
        .update({ credits: userData.credits })
        .eq("id", user.id);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
