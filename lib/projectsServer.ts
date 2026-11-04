import fs from "fs";
import path from "path";
import { createServerClient } from "@/lib/supabase/server";
import { normalizeProject, PROJECT_CARD_COLUMNS, type Project } from "@/lib/projects";

// Server-only loaders for published Magazine projects. Errors (e.g. the table
// not created yet) are logged and treated as "no projects".

// ── Local preview (development only) ──────────────────────────────────────
// public/_preview/projects.json holds project rows (same keys as the table)
// whose images live in public/_preview/. The folder is git-ignored and this
// never runs in production, so a design can be tried with real content
// without uploading to S3 or writing to the database.
function previewProjects(): Project[] {
  if (process.env.NODE_ENV !== "development") return [];
  try {
    const file = path.join(process.cwd(), "public", "_preview", "projects.json");
    if (!fs.existsSync(file)) return [];
    const rows = JSON.parse(fs.readFileSync(file, "utf8"));
    return Array.isArray(rows) ? rows.map(normalizeProject) : [];
  } catch (err) {
    console.error("[projects] Couldn't read public/_preview/projects.json:", err);
    return [];
  }
}

const newestFirst = (a: Project, b: Project) => (b.publishedOn || "").localeCompare(a.publishedOn || "");

/** Newest first — the order used everywhere (tab, listing, prev/next). */
export async function getPublishedProjectCards(): Promise<Project[]> {
  let projects: Project[] = [];
  try {
    const { data, error } = await createServerClient()
      .from("projects")
      .select(PROJECT_CARD_COLUMNS)
      .eq("status", "published")
      .order("published_on", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    projects = (data ?? []).map(normalizeProject);
  } catch (err) {
    console.error("[projects] Failed to load projects:", err);
  }
  const preview = previewProjects();
  if (preview.length === 0) return projects;
  const slugs = new Set(preview.map((p) => p.slug));
  return [...preview, ...projects.filter((p) => !slugs.has(p.slug))].sort(newestFirst);
}

export async function getPublishedProject(slug: string): Promise<Project | null> {
  const preview = previewProjects().find((p) => p.slug === slug);
  if (preview) return preview;
  try {
    const { data, error } = await createServerClient()
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    return data ? normalizeProject(data) : null;
  } catch (err) {
    console.error(`[projects] Failed to load project "${slug}":`, err);
    return null;
  }
}
