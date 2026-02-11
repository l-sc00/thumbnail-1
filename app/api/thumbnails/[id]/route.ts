import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

    // Await params for Next.js 15+
    const params = await context.params;
    const thumbnailId = params.id;
    console.log("Deleting thumbnail:", thumbnailId);

    // Get thumbnail to verify ownership and get image path
    const { data: thumbnail, error: fetchError } = await supabase
      .from("thumbnails")
      .select("*")
      .eq("id", thumbnailId)
      .single();

    if (fetchError || !thumbnail) {
      return NextResponse.json(
        { error: "Thumbnail not found" },
        { status: 404 }
      );
    }

    // Verify ownership
    if (thumbnail.user_id !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized to delete this thumbnail" },
        { status: 403 }
      );
    }

    // Delete from storage
    const fileName = `${user.id}/${thumbnailId}.png`;
    const { error: storageError } = await supabase.storage
      .from("images")
      .remove([fileName]);

    if (storageError) {
      console.error("Storage deletion error:", storageError);
      // Continue even if storage deletion fails
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from("thumbnails")
      .delete()
      .eq("id", thumbnailId);

    if (dbError) {
      console.error("Database deletion error:", dbError);
      return NextResponse.json(
        { error: "Failed to delete thumbnail" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
