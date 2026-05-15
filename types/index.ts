// ─── STUDIO ───────────────────────────────────────────────
export interface Studio {
  _id: string;
  name: string;
  slug: { current: string };
  location: string;
  shortBio: string;
  fullPhilosophy?: string;
  mainImage?: SanityImage;
  galleryImages?: SanityImage[];
  installationConcept: string;
  installationImages?: SanityImage[];
  brandPartner?: Brand;
  buildPartner?: BuildPartner;
  edition: "2025" | "2026";
  mediaLinks?: string[];
}

// ─── JOURNAL ──────────────────────────────────────────────
export type JournalCategory =
  | "Installations"
  | "Conversations"
  | "Materials"
  | "Opinion"
  | "Field Notes";

export interface JournalPost {
  _id: string;
  title: string;
  slug: { current: string };
  category: JournalCategory;
  excerpt: string;
  mainImage?: SanityImage;
  publishedAt: string;
  readTime?: string;
  author?: Author;
  body?: PortableTextBlock[];
  relatedPosts?: JournalPost[];
}

// ─── SPEAKER ──────────────────────────────────────────────
export interface Speaker {
  _id: string;
  name: string;
  title: string;
  organisation: string;
  image?: SanityImage;
  panelTheme: string;
  edition: "2025" | "2026";
}

// ─── SPONSOR ──────────────────────────────────────────────
export type SponsorTier = "title" | "presenting" | "associate" | "supporting";

export interface Sponsor {
  _id: string;
  name: string;
  logo?: SanityImage;
  tier: SponsorTier;
  website?: string;
  edition: "2025" | "2026";
}

// ─── ECOSYSTEM ────────────────────────────────────────────
export type EcosystemCategory = "originals" | "objects" | "edits" | "elevate";

export interface EcosystemItem {
  _id: string;
  title: string;
  slug: { current: string };
  category: EcosystemCategory;
  mainImage?: SanityImage;
  artist?: { name: string };
  architect?: { name: string };
  curator?: string;
  brands?: string[];
  concept?: string;
  materialStory?: string;
  edition?: string;
}

// ─── SHARED ───────────────────────────────────────────────
export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}

export interface Author {
  name: string;
  image?: SanityImage;
  bio?: string;
}

export interface Brand {
  name: string;
  logo?: SanityImage;
  website?: string;
}

export interface BuildPartner {
  name: string;
  logo?: SanityImage;
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

// ─── DESIGN OBJECT ────────────────────────────────────────
export interface DesignObject {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  src: string;
  additional_images: string[];
  website: string;
  instagram: string;
  logo: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Normalized (CDN-prefixed) version used in components
export interface DesignObjectItem {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  src: string;
  additionalImages: string[];
  website: string;
  instagram: string;
  logo: string;
  sort_order: number;
}

// ─── BRAND PARTNER ────────────────────────────────────────
export interface BrandPartnerTypeRow {
  id: string;
  type: string;
  title: string;
  sort_order: number;
  active: boolean;
}

export interface BrandPartnerRow {
  id: string;
  name: string;
  logo: string;
  website: string | null;
  type: string;
  tier: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BrandPartnerItem {
  id: string;
  name: string;
  logo: string;
  website: string | null;
  type: string;
  tier: string | null;
  sort_order: number;
}

// ─── STUDIO (Supabase) ────────────────────────────────────
export interface StudioRow {
  id: string;
  label: string;
  architects: string[];
  logo: string;
  website: string;
  instagram: string;
  core_image: string;
  bio: string;
  core_additional_images: string[];
  booth_image: string;
  concept: string;
  booth_additional_images: string[];
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// CDN-normalised version used in components
export interface StudioItem {
  id: string;
  label: string;
  architects: string[];
  logo: string;
  website: string;
  instagram: string;
  core_image: string;
  bio: string;
  core_additional_images: string[];
  booth_image: string;
  concept: string;
  booth_additional_images: string[];
  sort_order: number;
}

// Shape passed into ShowcaseModal — context determines which image/text
export interface ModalData {
  id: string;
  label: string;
  architects?: string[];
  src: string;
  description: string;
  additionalImages?: string[];
  logo: string;
  website: string;
  instagram: string;
}

// ─── FORM ─────────────────────────────────────────────────
export type ApplyType = "exhibit" | "ecosystem" | "partner" | "speak" | "curate" | "elevate" | "media" | "core" | "circle";

export interface HubSpotPayload {
  type: ApplyType | "waitlist" | "newsletter";
  email: string;
  [key: string]: string;
}
