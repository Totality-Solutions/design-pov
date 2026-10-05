import { cdn } from "@/lib/cdn";
import type { SectionMeta } from "@/lib/pageContent";
import type { MediaType } from "@/lib/homeContent";

// Content model for the /ecosystem page, edited in CMS → Ecosystem.
// Defaults are the content that used to be hardcoded in components/ecosystem.
// Client-safe — shared by the CMS editor and the page.

export type EcosystemPillar = {
  title: string;
  description: string;
  image: string;
  logo: string;
  href: string;
};

export type ParticipationOption = { label: string; image: string };

export type EcosystemPageContent = {
  hero:          { enabled: boolean; headline: string; media: { src: string; type: MediaType }; alt: string };
  statement:     { enabled: boolean; text: string };
  pillars:       { enabled: boolean; items: EcosystemPillar[] };
  participation: { enabled: boolean; headingMain: string; headingBold: string; options: ParticipationOption[] };
};

export type EcosystemSectionKey = keyof EcosystemPageContent;

export const ECOSYSTEM_SECTIONS: SectionMeta<EcosystemSectionKey>[] = [
  { key: "hero",          label: "Hero",               hint: "Headline and the large video/image" },
  { key: "statement",     label: "Statement",          hint: "The paragraph under the hero" },
  { key: "pillars",       label: "Pillars Carousel",   hint: "Core, Circle, Objects, Elevate, Afterhours cards" },
  { key: "participation", label: "Participation Form", hint: "Form heading and the options to choose from" },
];

const home = (file: string) => cdn(`/temp/home/ecosystem/${file}`);
const icon = (file: string) => cdn(`/temp/ecosystem/icons/${file}`);

export const DEFAULT_ECOSYSTEM: EcosystemPageContent = {
  hero: {
    enabled: true,
    headline: "Design POV extends beyond a singular format.",
    media: { src: cdn("/temp/ecosystem/POV.mp4"), type: "video" },
    alt: "Ecosystem Highlight",
  },
  statement: {
    enabled: true,
    text: "It is built as an evolving ecosystem of ideas, formats, and collaborations; each designed to explore how design is created, experienced, and shared.",
  },
  pillars: {
    enabled: true,
    items: [
      { title: "The Core",   description: "Sixteen design studios create immersive environments where ideas take spatial form.",                image: home("N1.jpg"),      logo: icon("core.png"),       href: "/edition/core" },
      { title: "Circle",     description: "A live forum for dialogue—bringing together voices shaping how we think, build, and live.",          image: home("N-3.jpg"),     logo: icon("circle.png"),     href: "/edition/schedule" },
      { title: "Objects",    description: "A collection of original, one-of-one pieces—each a distilled expression of perspective.",           image: home("OBJECT.jpeg"), logo: icon("objects.png"),    href: "/ecosystem/objects" },
      { title: "Elevate",    description: "Curated extensions that create meaningful brand moments beyond the show floor.",                    image: home("N-2.jpg"),     logo: icon("elevate.png"),    href: "/ecosystem/elevate" },
      { title: "Afterhours", description: "Where the industry unwinds—a late-night program of music, culture, and networking.",                image: home("N-4.png"),     logo: icon("afterhours.png"), href: "/ecosystem" },
    ],
  },
  participation: {
    enabled: true,
    headingMain: "Participation ",
    headingBold: "Form",
    options: [
      { label: "Core",        image: home("N1.jpg") },
      { label: "Circle",      image: home("N-3.jpg") },
      { label: "Objects",     image: home("OBJECT.jpeg") },
      { label: "Elevate",     image: home("N-2.jpg") },
      { label: "Brands",      image: cdn("/temp/ecosystem/brand-hero.png") },
      { label: "Partnership", image: cdn("/temp/about/3.png") },
    ],
  },
};
