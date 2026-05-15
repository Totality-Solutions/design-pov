import { cdn } from "@/lib/cdn";
import type { StudioRow, StudioItem } from "@/types";

export function normalizeStudio(row: StudioRow): StudioItem {
  return {
    id: row.id,
    label: row.label,
    architects: row.architects ?? [],
    logo: cdn(row.logo),
    website: row.website,
    instagram: row.instagram,
    core_image: cdn(row.core_image),
    bio: row.bio,
    core_additional_images: (row.core_additional_images ?? []).map(cdn),
    booth_image: cdn(row.booth_image),
    concept: row.concept,
    booth_additional_images: (row.booth_additional_images ?? []).map(cdn),
    sort_order: row.sort_order,
  };
}
