import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/seo";
import { isSampleProject } from "@/lib/projects";

// /sitemap.xml — every public page, plus each published magazine article and
// project, so search and AI crawlers find them all. Regenerated hourly.
export const revalidate = 3600;

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/edition-2027/core", priority: 0.9, changeFrequency: "weekly" },
  { path: "/edition", priority: 0.8, changeFrequency: "monthly" },
  { path: "/edition/theme", priority: 0.7, changeFrequency: "monthly" },
  { path: "/edition/core", priority: 0.7, changeFrequency: "monthly" },
  { path: "/edition/brands", priority: 0.7, changeFrequency: "monthly" },
  { path: "/edition/schedule", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ecosystem", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ecosystem/objects", priority: 0.6, changeFrequency: "monthly" },
  { path: "/ecosystem/elevate", priority: 0.6, changeFrequency: "monthly" },
  { path: "/magazine", priority: 0.8, changeFrequency: "weekly" },
  { path: "/magazine/projects", priority: 0.8, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/collaborate", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/legal/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/legal/terms-of-use", priority: 0.2, changeFrequency: "yearly" },
];

async function published(table: "blogs" | "projects", dateColumn: string, prefix: string): Promise<MetadataRoute.Sitemap> {
  try {
    const { data, error } = await createServerClient()
      .from(table)
      .select(`slug, updated_at, ${dateColumn}${table === "projects" ? ", tags" : ""}`)
      .eq("status", "published");
    if (error) throw error;
    return (data ?? [])
      // Sample/test projects are noindexed, so they stay out of the sitemap too.
      .filter((r: any) => r.slug && !(table === "projects" && isSampleProject(r)))
      .map((r: any) => ({
        url: `${SITE_URL}${prefix}/${r.slug}`,
        lastModified: r.updated_at ? new Date(r.updated_at) : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch (err) {
    console.error(`[sitemap] Couldn't list ${table}:`, err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects] = await Promise.all([
    published("blogs", "created_at", "/magazine"),
    published("projects", "published_on", "/magazine/projects"),
  ]);
  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({ url: `${SITE_URL}${path === "/" ? "" : path}`, changeFrequency, priority })),
    ...projects,
    ...articles,
  ];
}
