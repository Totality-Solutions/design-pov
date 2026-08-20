import type { GalleryItem, GalleryCategory, GalleryYear } from "@/components/gallery/types";

export interface GalleryItemRow {
  id: string;
  title: string;
  image_src: string;
  image_width: number | null;
  image_height: number | null;
  category: string;
  year: number;
  sort_order: number;
  active: boolean;
}

// image_src is already a ready-to-use value (a full CDN URL for new uploads,
// or a local /gallery/... path for the legacy seeded items) — no cdn()
// prefixing needed here, unlike Objects/Blogs which store bare paths.
export function normalizeGalleryItem(row: GalleryItemRow): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    imageSrc: row.image_src,
    imageWidth: row.image_width ?? undefined,
    imageHeight: row.image_height ?? undefined,
    category: row.category,
    year: row.year,
  };
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const res = await fetch("/api/cms/gallery", { cache: "no-store" });
  if (!res.ok) return [];
  const { data } = await res.json();
  return (data as GalleryItemRow[]).map(normalizeGalleryItem);
}

function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function deriveCategories(items: GalleryItem[]): GalleryCategory[] {
  const unique = Array.from(new Set(items.map((i) => i.category))).sort();
  return [{ id: "all", label: "All" }, ...unique.map((c) => ({ id: c, label: labelFromSlug(c) }))];
}

export function deriveYears(items: GalleryItem[]): GalleryYear[] {
  const unique = Array.from(new Set(items.map((i) => i.year).filter((y): y is number => !!y))).sort(
    (a, b) => b - a
  );
  return [{ id: "all", label: "All" }, ...unique.map((y) => ({ id: String(y), label: String(y) }))];
}
