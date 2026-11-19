import type { Metadata } from "next";
import { cdn } from "@/lib/cdn";

// Site-wide facts for search engines and AI answer engines (SEO + GEO), and a
// helper that gives every page the same complete set of tags. Server-safe and
// client-safe (no server-only imports).

/** The live site. Set NEXT_PUBLIC_SITE_URL to override (e.g. on a staging deploy). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.designpovindia.com").replace(/\/+$/, "");
export const SITE_NAME = "Design POV";

export const SITE_DESCRIPTION =
  "Design POV is a curated design platform from Mumbai that brings together architects, interior designers, brands, artists and makers through immersive spatial experiences, The Core showcase, conversations and an editorial magazine.";

/** Used when a page has no image of its own. A real photo on the CDN (1200×630 is ideal; this is a landscape shot). */
export const DEFAULT_SHARE_IMAGE = cdn("/temp/home/section2/1.jpg");
export const LOGO_URL = cdn("/logo/Logo.svg");

/** Official profiles — the same links as the site footer. */
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/designpov.india/",
  "https://www.facebook.com/share/1GiQ7sWhVw/",
  "https://www.linkedin.com/company/design-pov/",
  "https://www.youtube.com/@designpov",
  "https://in.pinterest.com/DesignPOVIndia/",
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
}: {
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
