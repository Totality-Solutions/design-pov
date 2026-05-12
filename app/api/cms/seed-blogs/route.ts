import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { blogs } from "@/data/magazineData";

// Middleware already guards /api/cms/* — no extra cookie check needed here.

const coverImageMap: Record<number, string> = {
  1:  "/temp/home/blogs/blog-16.jpg",
  2:  "/temp/home/blogs/blog-15.jpg",
  3:  "/temp/home/blogs/blog-14.jpg",
  4:  "/temp/home/blogs/blog-13.jpg",
  5:  "/temp/home/blogs/blog-12.webp",
  6:  "/temp/home/blogs/blog-11.jpg",
  7:  "/temp/home/blogs/blog-10.jpg",
  8:  "/temp/home/blogs/blog-9.jpg",
  9:  "/temp/home/blogs/blog-8.webp",
  10: "/temp/home/blogs/blog-7.webp",
  11: "/temp/home/blogs/blog-6.jpg",
  12: "/temp/home/blogs/blog-5.jpg",
  13: "/temp/home/blogs/blog-4.jpg",
  14: "/temp/home/blogs/blog-3.jpg",
  15: "/temp/home/blogs/blog-2.jpg",
  16: "/temp/home/blogs/blog-1.jpg",
  17: "/temp/magazine/17/blog-17-1.jpeg",
  18: "/temp/magazine/18/blog-18-1.jpg",
  19: "/temp/magazine/19/blog-19-1.png",
  20: "/temp/magazine/20/blog-20-1.jpg",
  21: "/temp/magazine/21/blog-21-1.jpeg",
  22: "/temp/magazine/22/blog-22-1.jpeg",
  23: "/temp/magazine/23/blog-23-1.png",
  24: "/temp/magazine/24/blog-24-1.png",
  25: "/temp/magazine/25/blog-25-1.jpeg",
  26: "/temp/magazine/26/blog-26-1.jpeg",
  27: "/temp/magazine/27/blog-27-1.jpeg",
  28: "/temp/magazine/28/blog-28-1.jpeg",
  29: "/temp/magazine/29/blog-29-1.jpg",
  30: "/temp/magazine/30/blog-30-1.png",
  31: "/temp/magazine/31/blog-31-1.png",
  32: "/temp/magazine/32/blog-32-1.jpeg",
};

function buildRow(blog: (typeof blogs)[number]) {
  const coverImage = coverImageMap[blog.id] ?? null;
  const detailedContent = (blog.detailedContent ?? []).map((block) => ({
    type:  block.type,
    value: typeof block.value === "string" ? block.value : (block.value as any)?.src ?? null,
    ...("title"   in block && block.title   ? { title:   block.title   } : {}),
    ...("caption" in block && block.caption ? { caption: block.caption } : {}),
  }));

  return {
    title:               blog.title,
    slug:                blog.slug,
    subtitle:            blog.subtitle ?? null,
    description:         blog.description ?? null,
    category:            blog.category,
    category_display:    (blog as any).categoryDisplay ?? null,
    author:              blog.author,
    date:                blog.date,
    is_featured:         blog.isFeatured ?? false,
    status:              "published",
    image:               coverImage,
    thumbnail:           coverImage,
    featured_paragraphs: blog.featuredParagraphs ?? [],
    detailed_content:    detailedContent,
    updated_at:          new Date().toISOString(),
    created_at:          new Date(blog.date).toString() !== "Invalid Date"
                           ? new Date(blog.date).toISOString()
                           : new Date().toISOString(),
  };
}

export async function POST() {
  const supabase = createServerClient();

  const { error: tableErr } = await supabase.from("blogs").select("id").limit(1);
  if (tableErr) {
    return NextResponse.json(
      { error: `blogs table not found: ${tableErr.message}. Run scripts/create-blogs-table.sql in Supabase first.` },
      { status: 500 }
    );
  }

  const results = { upserted: 0, errors: [] as string[] };

  for (const blog of blogs) {
    const row = buildRow(blog);

    const { error } = await supabase
      .from("blogs")
      .upsert(row, { onConflict: "slug" });

    if (error) results.errors.push(`Blog ${blog.id} (${blog.slug}): ${error.message}`);
    else results.upserted++;
  }

  return NextResponse.json(results);
}
