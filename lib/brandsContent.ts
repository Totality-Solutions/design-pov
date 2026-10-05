import { cdn } from "@/lib/cdn";
import type { SectionMeta } from "@/lib/pageContent";

// Content model for the /edition/brands page, edited in CMS → Brands Page.
// The logo grids (Partners, Brands, Build Partners) get their logos and titles
// from CMS → Brand Partners / Partner Types; here they only have a show/hide
// switch. Client-safe — shared by the CMS editor and the page.

export type ApplyCardContent = { title: string; description: string; buttonLabel: string };

export type BrandsPageContent = {
  hero:          { enabled: boolean; image: string; alt: string; headline: string };
  sponsors:      { enabled: boolean };
  brands:        { enabled: boolean };
  buildPartners: { enabled: boolean };
  apply:         { enabled: boolean; partner: ApplyCardContent; participant: ApplyCardContent };
};

export type BrandsSectionKey = keyof BrandsPageContent;

export const BRANDS_SECTIONS: SectionMeta<BrandsSectionKey>[] = [
  { key: "hero",          label: "Hero",             hint: "Banner image and headline" },
  { key: "sponsors",      label: "Partners Grid",    hint: "Sponsor logos — managed in Brand Partners" },
  { key: "brands",        label: "Brands Grid",      hint: "Brand logos — managed in Brand Partners" },
  { key: "buildPartners", label: "Build Partners",   hint: "Every other partner type — managed in Brand Partners" },
  { key: "apply",         label: "Apply Cards",      hint: "“Become a Partner” and “Join as a Participant”" },
];

export const DEFAULT_BRANDS: BrandsPageContent = {
  hero: {
    enabled: true,
    image: cdn("/temp/ecosystem/brand-hero.png"),
    alt: "Brand Hero",
    headline: "A collective of brands shaping how design is experienced—through material, innovation, and collaboration.",
  },
  sponsors: { enabled: true },
  brands: { enabled: true },
  buildPartners: { enabled: true },
  apply: {
    enabled: true,
    partner: {
      title: "Become a Partner",
      description: "Align with a platform shaping design culture and create meaningful visibility through considered partnerships.",
      buttonLabel: "Apply as a Partner",
    },
    participant: {
      title: "Join as a Participant",
      description: "Collaborate within the ecosystem to present your work in context - where it’s experienced, not just seen.",
      buttonLabel: "Apply as a Participant",
    },
  },
};
