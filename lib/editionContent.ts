import { cdn } from "@/lib/cdn";
import type { SectionMeta } from "@/lib/pageContent";

// Content model for the /edition overview page (plus the Apply strip on
// /edition/core), edited in CMS → Edition Page. Brands, Schedule and Partners
// get their data from their own CMS sections; here they only have a switch.
// Client-safe — shared by the CMS editor and the page.

export type EditionPageContent = {
  theme:      { enabled: boolean; title: string; subtitle: string; href: string; images: string[] };
  whoItIsFor: { enabled: boolean; heading: string; lines: string[]; ctaLabel: string; ctaHref: string };
  core:       { enabled: boolean; headingMain: string; headingBold: string; video: string; href: string };
  ctaStrip:   { enabled: boolean; title: string; ctaLabel: string; ctaHref: string };
  brands:     { enabled: boolean };
  schedule:   { enabled: boolean };
  partners:   { enabled: boolean };
  coreCta:    { enabled: boolean; title: string; ctaLabel: string; ctaHref: string };
};

export type EditionSectionKey = keyof EditionPageContent;

export const EDITION_SECTIONS: SectionMeta<EditionSectionKey>[] = [
  { key: "theme",      label: "Theme",                 hint: "“Sense & Sensibility” title with the floating images" },
  { key: "whoItIsFor", label: "Who It Is For",         hint: "Rolling list of audiences and the FAQ button" },
  { key: "core",       label: "Core Collective",       hint: "Heading and the Core video" },
  { key: "ctaStrip",   label: "Apply CTA Strip",       hint: "“Become a part of...” strip" },
  { key: "brands",     label: "Brands Marquee",        hint: "Logos come from CMS → Brand Partners (brands)" },
  { key: "schedule",   label: "Schedule",              hint: "Events come from CMS → Schedule" },
  { key: "partners",   label: "Partners",              hint: "Logos come from CMS → Brand Partners" },
  { key: "coreCta",    label: "Core Page Apply Strip", hint: "The strip at the bottom of Edition → Core" },
];

/** The floating theme cards have fixed positions and sizes, so the image slots are fixed too. */
export const EDITION_THEME_SLOTS = [
  "Wide card (top left)",
  "Square card (right)",
  "Wide card (centre)",
  "Tall card (bottom left)",
  "Tall card (bottom right)",
];

export const DEFAULT_EDITION: EditionPageContent = {
  theme: {
    enabled: true,
    title: "Sense & Sensibility",
    subtitle: "Most platforms present design as a product.\nWe present it as a perspective.",
    href: "/edition/theme",
    images: [
      cdn("/temp/home/theme/sens-sensibility.jpg"),
      cdn("/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg"),
      cdn("/temp/home/theme/WEBSITE_THEME BANNER_3.jpg.jpeg"),
      cdn("/temp/home/theme/WEBSITE_THEME BANNER_4.jpg.jpeg"),
      cdn("/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg"),
    ],
  },
  whoItIsFor: {
    enabled: true,
    heading: "For those who consume & create design:",
    lines: [
      "Architects & Interior Designers",
      "Homeowners & Collectors",
      "Developers & Decision-Makers",
      "Artists & Cultural Thinkers",
      "Dreamers & Design Aspirants",
    ],
    ctaLabel: "FAQ",
    ctaHref: "/faq",
  },
  core: {
    enabled: true,
    headingMain: "Core ",
    headingBold: "Collective",
    video: cdn("/video/The Core 26.mp4"),
    href: "/edition/core",
  },
  ctaStrip: {
    enabled: true,
    title: "Become a part of a design led platform like no other.",
    ctaLabel: "Apply Now",
    ctaHref: "/collaborate",
  },
  brands: { enabled: true },
  schedule: { enabled: true },
  partners: { enabled: true },
  coreCta: {
    enabled: true,
    title: "Become a part of The Core Collective 2027",
    ctaLabel: "Apply Now",
    ctaHref: "#",
  },
};
