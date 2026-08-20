import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { galleryItems } from "@/components/gallery/galleryData";

// One-time migration of the legacy hardcoded galleryData.ts into Supabase.
// image_src is kept as the existing local /gallery/... path — those files
// still live in public/gallery, not S3, until they're migrated separately.
export async function POST() {
  const now = new Date().toISOString();

  const rows = galleryItems.map((item, index) => ({
    title: item.title,
    image_src: item.imageSrc,
    image_width: item.imageWidth ?? null,
    image_height: item.imageHeight ?? null,
    category: item.category,
    year: item.year ?? new Date().getFullYear(),
    sort_order: index,
    active: true,
    created_at: now,
    updated_at: now,
  }));

  const supabase = createServerClient();
  const BATCH_SIZE = 50;
  let inserted = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { data, error } = await supabase.from("gallery_items").insert(batch).select("id");
    if (error) {
      return NextResponse.json({ error: error.message, inserted }, { status: 500 });
    }
    inserted += data?.length ?? 0;
  }

  return NextResponse.json({ inserted });
}
