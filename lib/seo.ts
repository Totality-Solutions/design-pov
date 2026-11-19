import type { Metadata } from "next";
import { cdn } from "@/lib/cdn";

// Site-wide facts for search engines and AI answer engines (SEO + GEO), and a
// helper that gives every page the same complete set of tags. Server-safe and
// client-safe (no server-only imports).

/** The live site. Set NEXT_PUBLIC_SITE_URL to override (e.g. on a staging deploy). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.designpovindia.com").replace(/\/+$/, "");
export const SITE_NAME = "Design POV";

export const SITE_DESCRIPTION =
  "Design POV is India's curated luxury design, architecture and art show at Jio World Convention Centre, Mumbai — bringing together architects, interior designers, luxury home and lifestyle brands, artists and makers through The Core showcase, immersive installations, The Circle talks and a design magazine.";

/** The home page's search-result title (search engines only — not shown on the page). */
export const HOME_TITLE = "Design POV — Design Show & Exhibition in Mumbai, India";

/**
 * Other names people search for. "Design POV" on its own is also a design-thinking
 * term (a "point of view" statement), so these help search engines and AI models
 * recognise the company and event.
 */
export const ALTERNATE_NAMES = ["Design POV India", "Design POV Mumbai", "DesignPOV", "Design POV Show", "Design POV Exhibition"];

export const FOUNDERS = ["Asif Sataar", "Gagan Bhatia"];

/**
 * The company behind Design POV (as in the Terms of Use). Design POV has no
 * Google Business Profile of its own — it sits under this company — so the
 * structured data links the two for search engines and AI models.
 */
export const PARENT_ORGANIZATION = {
  name: "Intotality Media and Events Pvt. Ltd.",
  alternateName: ["Intotality", "InTotality"],
  addressLocality: "Mumbai",
};

/**
 * What people search for when looking for an event like Design POV — used in
 * the keywords tag and to steer descriptions / structured data. Search engines
 * only; nothing here appears on the pages.
 */
export const SEARCH_KEYWORDS = [
  // the event
  "design event Mumbai", "design show India", "design exhibition Mumbai", "design fair India", "design week India",
  // luxury
  "luxury design event", "luxury design show Mumbai", "luxury interiors exhibition", "luxury lifestyle event Mumbai", "luxury home and lifestyle brands",
  // architecture
  "architecture show India", "architectural exhibition Mumbai", "architecture event Mumbai", "architects exhibition India",
  // art
  "art show Mumbai", "art and design exhibition India", "collectible design India", "art installations Mumbai",
  // interiors
  "interior design event Mumbai", "interior design exhibition India",
  // brands planning where to exhibit
  "exhibition for luxury brands India", "where to exhibit luxury brand Mumbai", "exhibition for furniture brands India",
  "exhibition for home decor brands Mumbai", "exhibition for lighting brands India", "exhibition for tiles and surfaces brands India",
  "best design exhibitions to exhibit in India", "upcoming design exhibitions India 2027", "stall booking exhibition Mumbai",
];

/**
 * Every edition, for the EventSeries structured data and llms.txt. Newest last.
 * All dates confirmed by the Design POV team (Nov 2026). Add each new edition here.
 */
export const EDITIONS = [
  { name: "Design POV 2025", startDate: "2025-06-27", endDate: "2025-06-29", status: "past" as const },
  { name: "Design POV 2026 — Sense & Sensibility", startDate: "2026-05-15", endDate: "2026-05-17", status: "past" as const },
  { name: "Design POV 2027", startDate: "2027-05-02T11:00:00+05:30", endDate: "2027-05-04T20:00:00+05:30", status: "upcoming" as const },
];

/** Used when a page has no image of its own: the white logo on black, 1200×630 (public/og/design-pov.jpg). */
export const DEFAULT_SHARE_IMAGE = `${SITE_URL}/og/design-pov.jpg`;
/** Black logo on white, 1000×240 PNG (public/og/logo.png) — Google prefers a raster logo for the Organization. */
export const LOGO_URL = `${SITE_URL}/og/logo.png`;

/** WhatsApp for enquiries (structured data contactPoint + profile link). */
export const WHATSAPP = { display: "+91 90763 89336", e164: "+919076389336", url: "https://wa.me/919076389336" };

/** Official profiles — the same links as the site footer. */
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/designpov.india/",
  "https://www.facebook.com/share/1GiQ7sWhVw/",
  "https://www.linkedin.com/company/design-pov/",
  "https://www.youtube.com/@designpov",
  "https://in.pinterest.com/DesignPOVIndia/",
  // Wikidata item — ties this site to the "Design POV" entity search engines and AI models use.
  "https://www.wikidata.org/wiki/Q142212610",
];

/**
 * The next edition, for the Event structured data. Keep in step with the FAQ
 * ("When and where is Design POV '27 taking place?").
 */
export const NEXT_EDITION = {
  name: "Design POV 2027",
  startDate: "2027-05-02T11:00:00+05:30",
  endDate: "2027-05-04T20:00:00+05:30",
  venueName: "Jio World Convention Centre",
  city: "Mumbai",
  region: "Maharashtra",
  country: "IN",
  url: "/edition-2027/core",
};

export const absoluteUrl = (path: string) => (/^https?:\/\//i.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`);

/**
 * Complete metadata for one page: title, description, canonical URL, and the
 * Open Graph / Twitter cards used by link previews and AI crawlers.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
  publishedTime,
  keywords,
}: {
  /** Search terms for this page (keywords tag; Bing reads it lightly, Google ignores it). */
  keywords?: string[];
  /** Page name only — the layout adds " | Design POV". */
  title: string;
  description: string;
  /** e.g. "/edition/core" */
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const images = [{ url: image ? absoluteUrl(image) : DEFAULT_SHARE_IMAGE, alt: title }];
  return {
    title,
    description,
    ...(keywords?.length ? { keywords: ["Design POV", ...keywords] } : {}),
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: "en_IN",
      images,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: images.map((i) => i.url) },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Plain text for descriptions: no line breaks, cut at a word near `max` characters. */
export function toDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length)}…`;
}
