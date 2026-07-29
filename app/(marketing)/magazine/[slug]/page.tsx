import MagazineBase from "@/components/common/MagazineBase";
import { createServerClient } from "@/lib/supabase/server";
import { NormalizedBlog, normalizeDbBlog } from "@/lib/blog";
// import { normalizeStaticBlog } from "@/lib/blog";
// import { blogs as staticBlogs } from "@/data/magazineData";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";

export const dynamic = "force-dynamic";

async function getBlogBySlug(slug: string): Promise<{ blog: NormalizedBlog; allBlogs: NormalizedBlog[] } | null> {
  try {
    const supabase = createServerClient();

    const [{ data: blogData }, { data: allData }] = await Promise.all([
      supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single(),
      supabase
        .from("blogs")
        .select("id, title, slug, category, category_display, author, date, is_featured, image, thumbnail, subtitle, description, featured_paragraphs, detailed_content")
        .eq("status", "published")
        .order("created_at", { ascending: false }),
    ]);

    if (!blogData) return null;

    return {
      blog:     normalizeDbBlog(blogData),
      allBlogs: (allData ?? []).map(normalizeDbBlog),
    };
  } catch {
    return null;
  }
}

export default async function InnerMagazinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try DB first
  const dbResult = await getBlogBySlug(slug);

  if (dbResult) {
    return (
      <Container className="w-full bg-white px-6 md:px-14 py-20 lg:py-12 ">
        <MagazineBase activeBlog={dbResult.blog} isInnerPage allBlogs={dbResult.allBlogs} />
      </Container>
    );
  }

  // Fallback to static data (commented out for DB testing)
  // const staticPost = staticBlogs.find((b) => b.slug === slug);
  // if (!staticPost) return notFound();
  // const staticAll = [...staticBlogs].sort((a, b) => b.id - a.id).map(normalizeStaticBlog);
  // return (
  //   <main className="w-full bg-white px-6 md:px-14 py-12">
  //     <MagazineBase activeBlog={normalizeStaticBlog(staticPost)} isInnerPage allBlogs={staticAll} />
  //   </main>
  // );

  return notFound();
}
