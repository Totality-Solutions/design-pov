import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { resolveS3KeyFromCdnValue, deleteObjectsFromS3 } from "@/lib/s3";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await createServerClient()
    .from("objects")
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
    .from("objects")
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

  const { data: object } = await supabase
    .from("objects")
    .select("src, additional_images")
    .eq("id", id)
    .single();

  if (object) {
    // Note: "logo" is intentionally excluded — it's usually a shared default asset
    // (e.g. /logo/Totality.svg), not a per-object upload, so it must never be deleted here.
    const values = [object.src, ...(object.additional_images ?? [])];
    const keys = values.map(resolveS3KeyFromCdnValue).filter((k): k is string => !!k);

    if (keys.length > 0) {
      try {
        await deleteObjectsFromS3(keys);
      } catch (s3Error: any) {
        console.error("[objects] Failed to delete S3 images for object", id, s3Error);
        return NextResponse.json(
          { error: s3Error.message || "Failed to delete images. Object was not deleted." },
          { status: 500 }
        );
      }
    }
  }

  const { error } = await supabase
    .from("objects")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
