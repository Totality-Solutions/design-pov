import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { resolveS3KeyFromCdnValue, deleteObjectsFromS3 } from "@/lib/s3";
import { collectBlogImageValues } from "@/lib/blog";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await createServerClient().from("blogs").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { data, error } = await createServerClient()
    .from("blogs")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: blog } = await supabase
    .from("blogs")
    .select("image, thumbnail, detailed_content")
    .eq("id", id)
    .single();

  // Delete the images first — only remove the post once its S3 files are confirmed gone,
  // so a failed image delete never leaves orphaned files with no post left to retry from.
  if (blog) {
    const keys = collectBlogImageValues(blog)
      .map(resolveS3KeyFromCdnValue)
      .filter((k): k is string => !!k);

    if (keys.length > 0) {
      try {
        await deleteObjectsFromS3(keys);
      } catch (s3Error: any) {
        console.error("[blogs] Failed to delete S3 images for post", id, s3Error);
        return NextResponse.json(
          { error: s3Error.message || "Failed to delete post images. Post was not deleted." },
          { status: 500 }
        );
      }
    }
  }

  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
