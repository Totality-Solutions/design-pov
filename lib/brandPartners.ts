import { cdn } from "@/lib/cdn";
import type { BrandPartnerRow, BrandPartnerItem } from "@/types";

export function normalizeBrandPartner(row: BrandPartnerRow): BrandPartnerItem {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo ? cdn(row.logo) : "",
    website: row.website,
    type: row.type,
    tier: row.tier,
    sort_order: row.sort_order,
  };
}
