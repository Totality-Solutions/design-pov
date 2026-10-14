import { cdn } from "@/lib/cdn";
import type { SectionMeta } from "@/lib/pageContent";

// Content model for the /ecosystem/elevate page, edited in CMS → Elevate.
// Client-safe.

export type ElevatePageContent = {
  intro:   { enabled: boolean; paragraphs: string[] };
  gallery: { enabled: boolean; heading: string; body: string; images: string[] };
  form:    { enabled: boolean; heading: string };
};

export type ElevateSectionKey = keyof ElevatePageContent;

export const ELEVATE_SECTIONS: SectionMeta<ElevateSectionKey>[] = [
  { key: "intro",   label: "Intro",           hint: "Scroll-reveal paragraphs at the top" },
  { key: "gallery", label: "Event Gallery",   hint: "Image slider with its story text" },
  { key: "form",    label: "Enquiry Form",    hint: "Enquiries arrive in CMS → Submissions" },
];

export const DEFAULT_ELEVATE: ElevatePageContent = {
  intro: {
    enabled: true,
    paragraphs: [
      "Design POV has always believed that meaningful visibility comes from intent, context, and reaching the right audience. POV Elevate extends this philosophy beyond the show floor as an exclusive initiative for home and lifestyle brands, helping create lasting impressions and meaningful relationships.",
      "Through curated offline events, tailored programming, access to discerning audiences, media and F&B partnerships, and strategic online amplification, brands are positioned in front of the people who matter. POV Elevate enables collaboration with Design POV beyond the traditional playbook.",
    ],
  },
  gallery: {
    enabled: true,
    heading: "Light, reimagined",
    body:
      "In Bengaluru, Sunrooof (@sunrooof_) unveiled their new Experience Centre - a space where natural sunlight meets intelligent technology. Guests experienced guided walkthroughs of their wellness lighting systems, live demonstrations of Al-integrated innovation, and an evening of meaningful conversations with architects, designers, and industry peers. This evening also marked the beginning of POV Elevate: a new initiative by Design POV that extends our platform beyond the show floor, creating curated, design-led moments for home and lifestyle brands. Because visibility is strongest when it's intentional, and shared with the right room.\nIn association with: @theidealhomeandgarden",
    images: Array.from({ length: 12 }, (_, i) => cdn(`/temp/edition/elevate/${i + 1}.JPG`)),
  },
  form: { enabled: true, heading: "Elevate" },
};
