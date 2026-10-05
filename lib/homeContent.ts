import { cdn } from "@/lib/cdn";
import type { SectionMeta } from "@/lib/pageContent";

// Content model for the home page sections, edited in CMS → Home.
// The defaults below are the content that used to be hardcoded in the
// components; a section's saved CMS data is merged over its default, so an
// unsaved section (or a missing table) renders exactly as before.
//
// Shared by the CMS editor (client) and the home page (server) — keep it free
// of server-only imports. Storage/merging is generic: see lib/pageContent.ts
// and lib/pageContentServer.ts.

export type MediaType = "image" | "video";

export type HeroSlide = { src: string; type: MediaType; poster?: string; alt: string; href?: string };
export type MarqueeItem = { src: string; type: MediaType; poster?: string; title: string; href?: string };
export type ThemeMedia = { src: string; type: MediaType; alt: string };
export type EcosystemItem = {
  label: string;
  title: string;
  description: string[];
  image: string;
  ctaLabel: string;
  href: string;
};
export type CoreMedia = { src: string; type: MediaType; poster?: string; name: string; link: string };
export type CoreTile = { media: CoreMedia[] };

export type HomeContent = {
  hero:           { enabled: boolean; slides: HeroSlide[] };
  intro:          { enabled: boolean; text: string; highlight: string; ctaLabel: string; ctaHref: string };
  whatPov:        { enabled: boolean; paragraphs: string[]; items: MarqueeItem[] };
  theme:          { enabled: boolean; heading: string; description: string; ctaLabel: string; ctaHref: string; media: ThemeMedia[] };
  ecosystem:      { enabled: boolean; heading: string; items: EcosystemItem[] };
  ctaStrip:       { enabled: boolean; title: string; ctaLabel: string; ctaHref: string };
  coreCollective: { enabled: boolean; heading: string; tiles: CoreTile[] };
  partners:       { enabled: boolean; heading: string };
  magazine:       { enabled: boolean; heading: string };
  brands:         { enabled: boolean; headingMain: string; headingBold: string };
};

export type HomeSectionKey = keyof HomeContent;

/** CMS accordion order and labels — matches the order on the home page. */
export const HOME_SECTIONS: SectionMeta<HomeSectionKey>[] = [
  { key: "hero",           label: "Hero Banner",          hint: "Full-width slider at the top" },
  { key: "intro",          label: "Intro Strip",          hint: "Black strip with the \"Explore the Show\" button" },
  { key: "whatPov",        label: "What is POV",          hint: "Scroll-reveal text and media marquee" },
  { key: "theme",          label: "Theme",                hint: "Theme heading and the image/video grid" },
  { key: "ecosystem",      label: "POV Ecosystem",        hint: "Expanding panels: Core, Circle, Objects..." },
  { key: "ctaStrip",       label: "Apply CTA Strip",      hint: "\"Become a part of...\" strip" },
  { key: "coreCollective", label: "Core Collective",      hint: "9-tile grid of studios" },
  { key: "partners",       label: "POV Partners",         hint: "Logos come from CMS → Brand Partners (sponsors)" },
  { key: "magazine",       label: "Magazine",             hint: "Posts come from CMS → Blogs (published)" },
  { key: "brands",         label: "Brands Marquee",       hint: "Logos come from CMS → Brand Partners (brands)" },
];

/** Theme grid layout slots — the grid is a fixed design, so slots are fixed too. */
export const THEME_SLOTS = ["Tall image (left)", "Image (right, desktop only)", "Tall image (desktop only)", "Video", "Wide image (bottom)"];

/** Core Collective grid has 9 fixed positions; slot 3 is the large centre tile. */
export const CORE_TILE_COUNT = 9;

const core = (file: string) => cdn(`/temp/home/core/${file}`);

export const DEFAULT_HOME: HomeContent = {
  hero: {
    enabled: true,
    slides: [
      { src: "/temp/home-hero-banner.jpeg", type: "image", alt: "Design POV showcase", href: "http://povindex.designpovindia.com/" },
      { src: cdn("/video/POV ad 1.mp4"), type: "video", poster: cdn("/temp/home/section2/1.jpg"), alt: "Design POV film" },
    ],
  },
  intro: {
    enabled: true,
    text: "A platform where architects, brands, artists, and thinkers come together to shape environments that go beyond the",
    highlight: "visual.",
    ctaLabel: "Explore the Show",
    ctaHref: "/edition",
  },
  whatPov: {
    enabled: true,
    paragraphs: [
      "Design POV is a curated platform that brings together multiple disciplines to explore how design is lived, not just displayed.",
      "Across immersive installations, collaborative spaces, and evolving narratives, it creates a setting where design moves beyond product and into experience.",
    ],
    items: [
      ["1.jpg"], ["1.mp4"], ["2.jpg"], ["2.mp4"], ["3.jpg"], ["3.mp4"], ["4.jpg"], ["4.mp4"],
      ["5.jpg"], ["6.jpg"], ["7.jpg"], ["8.jpg"], ["9.jpg"],
    ].map(([file]) => {
      const isVideo = file.endsWith(".mp4");
      return {
        src: cdn(`/temp/home/section2/${file}`),
        type: isVideo ? "video" : "image",
        // Mobile shows a still in place of each video.
        ...(isVideo ? { poster: cdn(`/temp/home/section2/${file.replace(".mp4", ".jpg")}`) } : {}),
        title: "Design POV",
      } satisfies MarqueeItem;
    }),
  },
  theme: {
    enabled: true,
    heading: "2026 THEME",
    description: "A sharper focus on how spaces are experienced - through texture, sound, atmosphere, and memory.",
    ctaLabel: "2026 THEME",
    ctaHref: "/edition/theme",
    media: [
      { src: cdn("/temp/home/theme/WEBSITE_THEME BANNER_4.jpg.jpeg"), type: "image", alt: "Theme 1" },
      { src: cdn("/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg"), type: "image", alt: "Theme 2" },
      { src: cdn("/temp/home/theme/WEBSITE_THEME BANNER_3.jpg.jpeg"), type: "image", alt: "Theme 3" },
      { src: cdn("/temp/home/theme/WEBSITE1.mp4"), type: "video", alt: "Theme film" },
      { src: cdn("/temp/home/theme/sens-sensibility.jpg"), type: "image", alt: "Sense and Sensibility" },
    ],
  },
  ecosystem: {
    enabled: true,
    heading: "POV ECOSYSTEM",
    items: [
      {
        label: "THE CORE",
        title: "THE CORE",
        image: cdn("/temp/home/ecosystem/N1.jpg"),
        description: [
          "At the heart of Design POV are 16 design studios—each invited to interpret the theme through a fully realised spatial narrative.",
          "These are not booths, they are environments.",
          "Each space is built in collaboration with leading brands and fabricators, resulting in distinct, immersive experiences that challenge how design is typically presented.",
        ],
        ctaLabel: "Explore",
        href: "/edition/core",
      },
      {
        label: "CIRCLE",
        title: "CIRCLE",
        image: cdn("/temp/home/ecosystem/N-3.jpg"),
        description: ["A live space for open dialogue and powerful discourse. Curated with the same intent as the show: to question, reflect, and reconsider, these discussions brought together the voices shaping India’s cultural landscape. Unfiltered and unscripted, the platform dove deep into the ideas shaping how we live, build, and collaborate."],
        ctaLabel: "Explore",
        href: "/edition/schedule",
      },
      {
        label: "OBJECTS",
        title: "OBJECTS",
        image: cdn("/temp/home/ecosystem/OBJECT.jpeg"),
        description: ["A curated initiative where select architects, designers, product designers, and artists are invited to conceive and fabricate one original object in response to the edition's theme. Stripping away the noise to create something pure - a perspective in the form of a physical object."],
        ctaLabel: "Explore",
        href: "/ecosystem/objects",
      },
      {
        label: "ELEVATE",
        title: "ELEVATE",
        image: cdn("/temp/home/ecosystem/N-2.jpg"),
        description: ["An initiative for brand moments worth remembering. Exclusively available for the POV ecosystem, it's designed to help you create strategic visibility that goes beyond the show floor."],
        ctaLabel: "Explore",
        href: "/ecosystem/elevate",
      },
      {
        label: "MAGAZINE",
        title: "MAGAZINE",
        image: cdn("/temp/home/blogs/blog-2.jpg"),
        description: ["A curation of stories from those who consume and create design - from the Indian sub-continent and beyond."],
        ctaLabel: "Explore",
        href: "/magazine",
      },
    ],
  },
  ctaStrip: {
    enabled: true,
    title: "Become a part of a design led platform like no other.",
    ctaLabel: "Apply Now",
    ctaHref: "/collaborate",
  },
  coreCollective: {
    enabled: true,
    heading: "Core Collective",
    tiles: [
      { media: [{ src: core("ADND.jpg"), type: "image", name: "ADND", link: "/edition/core?designer=01" }, { src: core("ALARA STUDIO.jpg"), type: "image", name: "Alara Studio", link: "/edition/core?designer=02" }] },
      { media: [{ src: core("Abin.jpg"), type: "image", name: "Abin Design Studio", link: "/edition/core?designer=03" }, { src: core("BALDIWALA EDGE.jpg"), type: "image", name: "Baldiwala Edge", link: "/edition/core?designer=04" }] },
      { media: [{ src: cdn("/temp/home/core-collective/4.mp4"), type: "video", poster: core("ADND.jpg"), name: "Core Collective", link: "/edition/core" }] },
      { media: [{ src: core("CITYSPACE.png"), type: "image", name: "Cityspace’82 Architects", link: "/edition/core?designer=05" }, { src: core("DESIGN HEX.jpg"), type: "image", name: "Design Hex", link: "/edition/core?designer=06" }] },
      { media: [{ src: core("DSP DESIGN.jpg"), type: "image", name: "DSP Design", link: "/edition/core?designer=07" }, { src: core("JANNAT VASI.jpg"), type: "image", name: "Jannat Vasi Design", link: "/edition/core?designer=08" }] },
      { media: [{ src: core("NA ARCHITECT.jpg"), type: "image", name: "NA Architects", link: "/edition/core?designer=09" }, { src: core("POONAM AKASH.jpg"), type: "image", name: "Poonam Akash", link: "/edition/core?designer=10" }] },
      { media: [{ src: core("SANJAY PURI.jpg"), type: "image", name: "Sanjay Puri Architects", link: "/edition/core?designer=11" }, { src: core("SAV.jpg"), type: "image", name: "SAV", link: "/edition/core?designer=12" }] },
      { media: [{ src: core("SHROFFLEON.jpg"), type: "image", name: "Shroffleón", link: "/edition/core?designer=13" }, { src: core("SPARC DESIGN.jpg"), type: "image", name: "Sparc Design", link: "/edition/core?designer=14" }] },
      { media: [{ src: core("STUDIO ARCHOHM.jpg"), type: "image", name: "Studio Archohm", link: "/edition/core?designer=15" }, { src: core("TALATI & PARTNER.jpg"), type: "image", name: "Talati & Partners", link: "/edition/core?designer=16" }] },
    ],
  },
  partners: { enabled: true, heading: "POV PARTNERS" },
  magazine: { enabled: true, heading: "Magazine" },
  brands:   { enabled: true, headingMain: "Brands", headingBold: "2026" },
};

