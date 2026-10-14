import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { parseRotation, rotateGalleryImage, deleteReplacedGalleryImage } from "@/lib/galleryRotate";

export async function GET() {
  const { data, error } = await createServerClient()
    .from("gallery_items")
    .select("*")
    .eq("active", true)
    .order("year", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { rotation, ...body } = await req.json();
  const degrees = parseRotation(rotation);
  const originalSrc: string = body.image_src;

  if (degrees && originalSrc) {
    try {
      Object.assign(
        body,
        await rotateGalleryImage(originalSrc, degrees, `gallery/${body.year}/${body.category || "misc"}`, req.url)
      );
    } catch (err: any) {
      console.error("[gallery] Rotate failed for new item", err);
      return NextResponse.json({ error: err.message || "Failed to rotate image." }, { status: 500 });
    }
  }

  const { data, error } = await createServerClient()
    .from("gallery_items")
    .insert([{ ...body, updated_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (degrees && originalSrc) await deleteReplacedGalleryImage(originalSrc);
  return NextResponse.json({ data }, { status: 201 });
}
