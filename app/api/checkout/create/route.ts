import { NextRequest, NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { planType } = body; // "pro" or "ultra"

    if (!planType || !["pro", "ultra"].includes(planType)) {
      return NextResponse.json(
        { error: "Invalid plan type" },
        { status: 400 }
      );
    }

    // Initialize Polar SDK
    const polar = new Polar({
      accessToken: process.env.POLAR_ACCESS_TOKEN ?? "",
    });

    // Get the appropriate product ID
    const productId =
      planType === "pro"
        ? process.env.POLAR_PRO_PRODUCT_ID
        : process.env.POLAR_ULTRA_PRODUCT_ID;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID not configured" },
        { status: 500 }
      );
    }

    // Create checkout session
    console.log("Creating Polar checkout with product ID:", productId);
    const checkout = await polar.checkouts.create({
      products: [productId],
      externalCustomerId: user.id, // Link to your Supabase user ID
    });

    console.log("Checkout created successfully:", checkout.id);
    return NextResponse.json({
      url: checkout.url,
    });
  } catch (error) {
    console.error("Checkout creation error:", error);

    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create checkout session",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}
