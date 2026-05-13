import { cdn } from "@/lib/cdn";
import { DesignObject, DesignObjectItem } from "@/types";

export function normalizeObject(row: DesignObject): DesignObjectItem {
  return {
    id: row.id,
    label: row.label,
    sublabel: row.sublabel,
    description: row.description,
    src: cdn(row.src),
    additionalImages: (row.additional_images ?? []).map((img) => cdn(img)),
    website: row.website ?? "#",
    instagram: row.instagram ?? "#",
    logo: cdn(row.logo),
    sort_order: row.sort_order ?? 0,
  };
}

export async function getObjects(): Promise<DesignObjectItem[]> {
  const res = await fetch("/api/cms/objects", { cache: "no-store" });
  if (!res.ok) return [];
  const { data } = await res.json();
  return (data as DesignObject[]).map(normalizeObject);
}
