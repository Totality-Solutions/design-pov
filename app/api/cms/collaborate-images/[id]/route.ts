import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { resolveS3KeyFromCdnValue, deleteObjectsFromS3 } from "@/lib/s3";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await createServerClient()
    .from("collaborate_images")
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
    .from("collaborate_images")
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

  const { data: row } = await supabase
    .from("collaborate_images")
    .select("image")
    .eq("id", id)
    .single();

  if (row) {
    const keys = [resolveS3KeyFromCdnValue(row.image)].filter((k): k is string => !!k);

    if (keys.length > 0) {
      try {
        await deleteObjectsFromS3(keys);
      } catch (s3Error: any) {
        console.error("[collaborate-images] Failed to delete S3 image", id, s3Error);
        return NextResponse.json(
          { error: s3Error.message || "Failed to delete image. It was not removed." },
          { status: 500 }
        );
      }
    }
  }

  const { error } = await supabase
    .from("collaborate_images")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
