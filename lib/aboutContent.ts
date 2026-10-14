import { cdn } from "@/lib/cdn";
import type { SectionMeta } from "@/lib/pageContent";

// Content model for the /about page text, edited in CMS → About (above the
// Press Mentions list, which keeps its own table). Client-safe.

export type AboutSlide = { bgText: string; label: string; statement: string };
export type AboutPillar = { title: string; description: string; image: string; buttonLabel: string; buttonHref: string };
export type AboutFounder = { name: string; quote: string };

export type AboutPageContent = {
  hero:     { enabled: boolean; slides: AboutSlide[]; image: string };
  pillars:  {
    enabled: boolean;
    headingMain: string;
    headingBold: string;
    items: AboutPillar[];
    ctaTitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  thisIsUs: { enabled: boolean; heading: string; intro: string[]; question: string; image: string; founders: AboutFounder[] };
  press:    { enabled: boolean; headingMain: string; headingBold: string };
};

export type AboutSectionKey = keyof AboutPageContent;

export const ABOUT_SECTIONS: SectionMeta<AboutSectionKey>[] = [
  { key: "hero",     label: "Hero",            hint: "Rotating statements and the banner image" },
  { key: "pillars",  label: "Our Pillars",     hint: "Pillar cards and the Apply strip below them" },
  { key: "thisIsUs", label: "This Is Us",      hint: "Founders’ story and quotes" },
  { key: "press",    label: "Press Mentions",  hint: "Heading only — logos are managed in the list below" },
];

/** The founders block is a fixed left / image / right layout. */
export const ABOUT_FOUNDER_SLOTS = ["Left quote", "Right quote"];

export const DEFAULT_ABOUT: AboutPageContent = {
  hero: {
    enabled: true,
    slides: [
      { bgText: "THE PHILOSOPHY", label: "The Philosophy", statement: "Design POV is built on a simple belief: design is not neutral." },
      { bgText: "WHY WE EXIST", label: "Why We Exist", statement: "To move beyond transactional formats that prioritise display over dialogue." },
      { bgText: "WHAT MAKES US DIFFERENT", label: "What Makes Us Different", statement: "We don't exist in isolation. We’re built through collaboration and experienced in context." },
    ],
    image: cdn("/temp/about/about-hero.jpeg"),
  },
  pillars: {
    enabled: true,
    headingMain: "Our ",
    headingBold: "Pillars",
    items: [
      { title: "Architect Firms (The Core):", description: "Shape the vision: translating ideas into immersive, narrative-led environments.", image: cdn("/temp/about/1600-x-1200.png"), buttonLabel: "Explore", buttonHref: "/edition/core" },
      { title: "Home & Lifestyle Brands:", description: "Enable the narrative: bringing material, product, and innovation into context.", image: cdn("/temp/about/1600-x-1200.-1.png"), buttonLabel: "Explore", buttonHref: "/edition/brands" },
      { title: "Build Partners:", description: "Realise the vision: transforming concepts into precise, tangible spaces.", image: cdn("/temp/about/build-partner.png"), buttonLabel: "Explore", buttonHref: "/edition/theme" },
    ],
    ctaTitle: "Become a part of a design led platform like no other.",
    ctaLabel: "Apply Now",
    ctaHref: "/collaborate",
  },
  thisIsUs: {
    enabled: true,
    heading: "This Is Us",
    intro: [
      "There is a moment at every industry event that no one programmes, yet everyone attends.",
      "It happens in the margins—between panels, outside exhibition halls, over hurried coffees. Conversations loosen. Opinions sharpen. Real exchanges unfold. Ideas, unfiltered by format, find their voice.",
      "For Asif Sataar and Gagan Bhatia, that moment wasn’t incidental. It was the point.",
    ],
    question: "What was the real trigger behind Design POV?",
    image: cdn("/temp/about/Founder.png"),
    founders: [
      {
        name: "Gagan Bhatia",
        quote: "It was actually quite simple. We were listening. Not inside exhibition halls, but outside them. The most meaningful conversations about design, about business, about ideas - were happening on the periphery. That’s where people were most honest, most open.",
      },
      {
        name: "Asif Sataar",
        quote: "And it made us question the format itself. If the real value is happening outside, then what is the platform doing wrong? We’d been part of this world long enough to see networking become mechanical, almost performative. Commerce was front and centre, and design was getting lost somewhere along the way.",
      },
    ],
  },
  press: { enabled: true, headingMain: "Press", headingBold: "Mentions" },
};
