// Magazine → Projects (table `projects`, see supabase-projects-table.sql).
// Client-safe: shared by the CMS form, the project pages and the Magazine tab.

import { cdn } from "@/lib/cdn";

export type ProjectSpec = { label: string; value: string };
export type ProjectGalleryImage = { src: string; caption?: string };
export type ProjectBlock =
  | { type: "text"; value: string; title?: string }
  | { type: "image"; value: string; caption?: string }
  | { type: "heading"; value: string }
  | { type: "quote"; value: string };

export interface Project {
  id: string;
  slug: string;
  title: string;
  architects: string;
  category: string;
  area: string;
  year: string;
  photographer: string;
  city: string;
  country: string;
  designTeam: string[];
  extraSpecs: ProjectSpec[];
  coverImage: string;
  gallery: ProjectGalleryImage[];
  content: ProjectBlock[];
  textCredit: string;
  officeName: string;
  officeLogo: string;
  officeUrl: string;
  tags: string[];
  publishedOn: string;
}

/** Fields the Magazine tab and listing cards need — keeps list queries small. */
export const PROJECT_CARD_COLUMNS = "id, slug, title, architects, category, city, country, year, cover_image, gallery, published_on";

const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

// Images are full CDN URLs (uploads) or bare /temp/... paths (sample data):
// cdn() resolves the latter and leaves the former alone. /_preview/... is the
// dev-only local preview (see lib/projectsServer.ts), served from public/.
const img = (src: string) => (src.startsWith("/_preview/") ? src : cdn(src));

export function normalizeProject(row: Record<string, any>): Project {
  const gallery = arr<ProjectGalleryImage>(row.gallery)
    .filter((g) => g?.src)
    .map((g) => ({ ...g, src: img(g.src) }));
  return {
    id: String(row.id),
    slug: row.slug ?? "",
    title: row.title ?? "",
    architects: row.architects ?? "",
    category: row.category ?? "",
    area: row.area ?? "",
    year: row.year ?? "",
    photographer: row.photographer ?? "",
    city: row.city ?? "",
    country: row.country ?? "",
    designTeam: String(row.design_team ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    extraSpecs: arr<ProjectSpec>(row.extra_specs).filter((s) => s?.label && s?.value),
    // No cover chosen → the first gallery photo.
    coverImage: row.cover_image ? img(row.cover_image) : gallery[0]?.src || "",
    gallery,
    content: arr<ProjectBlock>(row.content)
      .filter((b) => b?.value)
      .map((b) => (b.type === "image" ? { ...b, value: img(b.value) } : b)),
    textCredit: row.text_credit ?? "",
    officeName: row.office_name || row.architects || "",
    officeLogo: row.office_logo ? img(row.office_logo) : "",
    officeUrl: row.office_url ?? "",
    tags: arr<string>(row.tags).filter(Boolean),
    publishedOn: row.published_on ?? "",
  };
}

/** "Modern Mokotów / BBGK Architekci" */
export function projectHeading(p: Pick<Project, "title" | "architects">): string {
  return p.architects ? `${p.title} / ${p.architects}` : p.title;
}

export function projectLocation(p: Pick<Project, "city" | "country">): string {
  return [p.city, p.country].filter(Boolean).join(", ");
}

/** Every image a project row references — for S3 cleanup on delete. */
export function collectProjectImageValues(row: Record<string, any>): string[] {
  const values: string[] = [];
  if (row.cover_image) values.push(row.cover_image);
  if (row.office_logo) values.push(row.office_logo);
  arr<ProjectGalleryImage>(row.gallery).forEach((g) => g?.src && values.push(g.src));
  arr<ProjectBlock>(row.content).forEach((b) => b?.type === "image" && b.value && values.push(b.value));
  return values;
}

export function formatProjectDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
