import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const SEED_DATA = [
  // ── SPONSORS (Partners) ──────────────────────────────────────────────────
  { name: "PRESENTING PARTNER", logo: "/temp/edition/sponsors/1.png", type: "sponsor", tier: "presenting", website: "https://www.kajariaceramics.com/", sort_order: 1, active: true },
  { name: "POWERED BY",         logo: "/temp/edition/sponsors/2.png", type: "sponsor", tier: "powered_by", website: "https://www.pacific-surfaces.com/",   sort_order: 2, active: true },
  { name: "NETWORK PARTNER",    logo: "/temp/edition/sponsors/3.png", type: "sponsor", tier: "network",    website: "https://www.allhome.in/",             sort_order: 3, active: true },
  { name: "LOUNGE PARTNER",     logo: "/temp/edition/sponsors/4.png", type: "sponsor", tier: "lounge",     website: "https://www.essentiahome.com/",       sort_order: 4, active: true },
  { name: "COLOUR PARTNER",     logo: "/temp/edition/sponsors/5.png", type: "sponsor", tier: "colour",     website: "https://www.pantone.com/hk/en/",      sort_order: 5, active: true },

  // ── BRAND COLLABORATORS ──────────────────────────────────────────────────
  { name: "Brand Collaborator 1", logo: "/temp/edition/brand-collaborate/1.png",  type: "brand_collaborator", sort_order: 1, active: true },
  { name: "Brand Collaborator 2", logo: "/temp/edition/brand-collaborate/2.png",  type: "brand_collaborator", sort_order: 2, active: true },
  { name: "Brand Collaborator 3", logo: "/temp/edition/brand-collaborate/3.png",  type: "brand_collaborator", sort_order: 3, active: true },
  { name: "Brand Collaborator 4", logo: "/temp/edition/brand-collaborate/4.png",  type: "brand_collaborator", sort_order: 4, active: true },
  { name: "Brand Collaborator 5", logo: "/temp/edition/brand-collaborate/5.jpeg", type: "brand_collaborator", sort_order: 5, active: true },
  { name: "Brand Collaborator 6", logo: "/temp/edition/brand-collaborate/6.jpeg", type: "brand_collaborator", sort_order: 6, active: true },
  { name: "Brand Collaborator 7", logo: "/temp/edition/brand-collaborate/7.png",  type: "brand_collaborator", sort_order: 7, active: true },

  // ── BUILD PARTNERS ───────────────────────────────────────────────────────
  { name: "Build Partner 1", logo: "/temp/edition/build-partners/1.png", type: "build_partner", sort_order: 1, active: true },
  { name: "Build Partner 2", logo: "/temp/edition/build-partners/3.png", type: "build_partner", sort_order: 2, active: true },
  { name: "Build Partner 3", logo: "/temp/edition/build-partners/4.png", type: "build_partner", sort_order: 3, active: true },
  { name: "Build Partner 4", logo: "/temp/edition/build-partners/5.png", type: "build_partner", sort_order: 4, active: true },
  { name: "Build Partner 5", logo: "/temp/edition/build-partners/6.png", type: "build_partner", sort_order: 5, active: true },
  { name: "Build Partner 6", logo: "/temp/edition/build-partners/7.png", type: "build_partner", sort_order: 6, active: true },
  { name: "Build Partner 7", logo: "/temp/edition/build-partners/8.png", type: "build_partner", sort_order: 7, active: true },
  { name: "Build Partner 8", logo: "/temp/edition/build-partners/9.png", type: "build_partner", sort_order: 8, active: true },

  // ── GIFTING PARTNERS ─────────────────────────────────────────────────────
  { name: "Gifting Partner 1", logo: "/temp/edition/gifting-partners/1.png", type: "gifting_partner", sort_order: 1, active: true },
  { name: "Gifting Partner 2", logo: "/temp/edition/gifting-partners/2.png", type: "gifting_partner", sort_order: 2, active: true },
  { name: "Gifting Partner 3", logo: "/temp/edition/gifting-partners/3.png", type: "gifting_partner", sort_order: 3, active: true },
  { name: "Gifting Partner 4", logo: "/temp/edition/gifting-partners/4.png", type: "gifting_partner", sort_order: 4, active: true },
  { name: "Gifting Partner 5", logo: "/temp/edition/gifting-partners/5.png", type: "gifting_partner", sort_order: 5, active: true },
  { name: "Gifting Partner 6", logo: "/temp/edition/sensory/12.png",         type: "gifting_partner", sort_order: 6, active: true },

  // ── MEDIA PARTNERS ───────────────────────────────────────────────────────
  { name: "Media Partner 1", logo: "/temp/edition/media-partners/1.png", type: "media_partner", sort_order: 1, active: true },
  { name: "Media Partner 2", logo: "/temp/edition/media-partners/2.png", type: "media_partner", sort_order: 2, active: true },
  { name: "Media Partner 3", logo: "/temp/edition/media-partners/3.png", type: "media_partner", sort_order: 3, active: true },
  { name: "Media Partner 4", logo: "/temp/edition/media-partners/5.png", type: "media_partner", sort_order: 4, active: true },

  // ── DIGITAL MEDIA PARTNERS ───────────────────────────────────────────────
  { name: "Digital Media Partner 1", logo: "/temp/edition/media-partners/4.png", type: "digital_media_partner", sort_order: 1, active: true },

  // ── TICKETING PARTNERS ───────────────────────────────────────────────────
  { name: "Ticketing Partner 1", logo: "/temp/edition/ticketing-partners/1.png", type: "ticketing_partner", sort_order: 1, active: true },
  { name: "Ticketing Partner 2", logo: "/temp/edition/ticketing-partners/2.png", type: "ticketing_partner", sort_order: 2, active: true },

  // ── RED ROOM PARTNER ─────────────────────────────────────────────────────
  { name: "Red Room Partner", logo: "/temp/edition/red-room-partner/1.png", type: "red_room_partner", sort_order: 1, active: true },

  // ── SENSORY COLLABORATOR ─────────────────────────────────────────────────
  { name: "Sensory Collaborator", logo: "/temp/edition/sensory/12.png", type: "sensory_collaborator", sort_order: 1, active: true },

  // ── KEY EXECUTION PARTNER ────────────────────────────────────────────────
  { name: "Key Execution Partner", logo: "/temp/edition/key-execution/1.jpg", type: "key_execution_partner", sort_order: 1, active: true },

  // ── OPERATION PARTNER ────────────────────────────────────────────────────
  { name: "Operation Partner", logo: "/temp/edition/operation-partner/1.png", type: "operation_partner", sort_order: 1, active: true },

  // ── CURATORIAL PARTNER ───────────────────────────────────────────────────
  { name: "Curatorial Partner", logo: "/temp/edition/curatorial-partner/1.png", type: "curatorial_partner", sort_order: 1, active: true },

  // ── EXPERIENCE PARTNER ───────────────────────────────────────────────────
  { name: "Experience Partner", logo: "/temp/edition/experience-partner/1.png", type: "experience_partner", sort_order: 1, active: true },

  // ── LEARNING PARTNER ─────────────────────────────────────────────────────
  { name: "Learning Partner", logo: "/temp/edition/learning-partner/1.png", type: "learning_partner", sort_order: 1, active: true },

  // ── KNOWLEDGE PARTNER ────────────────────────────────────────────────────
  { name: "Knowledge Partner", logo: "/temp/edition/knowledge-partner/1.png", type: "knowledge_partner", sort_order: 1, active: true },

  // ── VISUAL EXPERIENCE PARTNER ────────────────────────────────────────────
  { name: "Visual Experience Partner", logo: "/temp/edition/visual-experience-partner/1.png", type: "visual_experience_partner", sort_order: 1, active: true },

  // ── WORKSHOP PARTNER ─────────────────────────────────────────────────────
  { name: "Workshop Partner", logo: "/temp/edition/workshop-partner/1.png", type: "workshop_partner", sort_order: 1, active: true },

  // ── COMMUNITY PARTNER ────────────────────────────────────────────────────
  { name: "Community Partner 1", logo: "/temp/edition/community-partner/1.png", type: "community_partner", sort_order: 1, active: true },
  { name: "Community Partner 2", logo: "/temp/edition/community-partner/2.png", type: "community_partner", sort_order: 2, active: true },

  // ── BRANDS (64 placeholder entries) ─────────────────────────────────────
  ...Array.from({ length: 64 }, (_, i) => ({
    name: `Brand ${i + 1}`,
    logo: `/temp/edition/brands/${i + 1}.png`,
    type: "brand",
    sort_order: i + 1,
    active: true,
  })),
];

export async function POST() {
  const supabase = createServerClient();

  const { count } = await supabase
    .from("brand_partners")
    .select("*", { count: "exact", head: true });

  if (count && count > 0) {
    return NextResponse.json({ message: `Skipped — table already has ${count} rows.` });
  }

  const now = new Date().toISOString();
  const rows = SEED_DATA.map((r) => ({ ...r, created_at: now, updated_at: now }));

  const { error } = await supabase.from("brand_partners").insert(rows);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: `Seeded ${rows.length} brand partner entries.` });
}
