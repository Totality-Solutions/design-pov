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

// ─── FORM ─────────────────────────────────────────────────
export type ApplyType = "exhibit" | "sponsor" | "speak" | "curate" | "elevate" | "media";

export interface HubSpotPayload {
  type: ApplyType | "waitlist" | "newsletter";
  email: string;
  [key: string]: string;
}
