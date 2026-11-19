import MagazineBase from "@/components/common/MagazineBase";
import { createServerClient } from "@/lib/supabase/server";
import { NormalizedBlog, normalizeDbBlog } from "@/lib/blog";
// import { normalizeStaticBlog } from "@/lib/blog";
// import { blogs as staticBlogs } from "@/data/magazineData";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { cache } from "react";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, LOGO_URL, pageMetadata, SITE_NAME, SITE_URL, toDescription } from "@/lib/seo";

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

// generateMetadata and the page both need the post — cache() makes it one database read per request.
const getPost = cache(getBlogBySlug);

/** Summary for search results and link previews: description → subtitle → first paragraph. */
function postSummary(blog: NormalizedBlog): string {
  const firstText = blog.detailedContent.find((b) => b.type === "text")?.value ?? "";
  return toDescription(blog.description || blog.subtitle || blog.featuredParagraphs[0] || firstText || blog.title);
}

/** The stored date is free text ("17 May 2021"); ISO when it parses, otherwise left out. */
function isoDate(text: string): string | undefined {
  const d = new Date(text);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPost(slug);
  if (!result) return { title: "Article not found", robots: { index: false } };
  const { blog } = result;
  return pageMetadata({
    title: blog.title,
    description: postSummary(blog),
    path: `/magazine/${blog.slug}`,
    image: typeof blog.image === "string" ? blog.image : undefined,
    type: "article",
    publishedTime: isoDate(blog.date),
  });
}

export default async function InnerMagazinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try DB first
  const dbResult = await getPost(slug);

  if (dbResult) {
    const { blog } = dbResult;
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: blog.title,
      description: postSummary(blog),
      image: typeof blog.image === "string" ? [absoluteUrl(blog.image)] : undefined,
      datePublished: isoDate(blog.date),
      author: blog.author ? { "@type": "Person", name: blog.author } : { "@type": "Organization", name: SITE_NAME },
      publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, logo: { "@type": "ImageObject", url: LOGO_URL } },
      mainEntityOfPage: absoluteUrl(`/magazine/${blog.slug}`),
      articleSection: blog.category,
    };
    return (
      <Container className="w-full bg-white px-6 md:px-14 py-20 lg:py-12 ">
        <JsonLd data={articleSchema} />
        <MagazineBase activeBlog={blog} isInnerPage allBlogs={dbResult.allBlogs} />
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
