import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { resolveS3KeyFromCdnValue, deleteObjectsFromS3 } from "@/lib/s3";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await createServerClient()
    .from("studios")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const { data, error } = await createServerClient()
    .from("studios")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: studio } = await supabase
    .from("studios")
    .select("core_image, booth_image, core_additional_images, booth_additional_images")
    .eq("id", id)
    .single();

  if (studio) {
    // Note: "logo" is intentionally excluded — often a shared/default asset, not a per-studio upload.
    const values = [
      studio.core_image,
      studio.booth_image,
      ...(studio.core_additional_images ?? []),
      ...(studio.booth_additional_images ?? []),
    ];
    const keys = values.map(resolveS3KeyFromCdnValue).filter((k): k is string => !!k);

    if (keys.length > 0) {
      try {
        await deleteObjectsFromS3(keys);
      } catch (s3Error: any) {
        console.error("[studios] Failed to delete S3 images for studio", id, s3Error);
        return NextResponse.json(
          { error: s3Error.message || "Failed to delete images. Studio was not deleted." },
          { status: 500 }
        );
      }
    }
  }

  const { error } = await supabase
    .from("studios")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
