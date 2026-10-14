import type { SectionMeta } from "@/lib/pageContent";

// Content model for the /collaborate page text, edited in CMS → Collaborate
// (above the gallery images list, which keeps its own table). Client-safe.

export type CollaborateMedium = { name: string; href: string; description: string };

export type CollaboratePageContent = {
  intro:   { enabled: boolean; heading: string; text: string };
  mediums: { enabled: boolean; heading: string; items: CollaborateMedium[] };
};

export type CollaborateSectionKey = keyof CollaboratePageContent;

export const COLLABORATE_SECTIONS: SectionMeta<CollaborateSectionKey>[] = [
  { key: "intro",   label: "Intro & Gallery",       hint: "Heading and text — gallery images are managed in the list below" },
  { key: "mediums", label: "Collaboration Mediums", hint: "Each row links to a page and opens an Apply form" },
];

export const DEFAULT_COLLABORATE: CollaboratePageContent = {
  intro: {
    enabled: true,
    heading: "Contribute to the Dialogue",
    text: "From immersive spaces to conversations, objects, and extensions beyond the show - Design POV is an ecosystem shaped by many voices. If you’d like to be part of it, we’d like to hear from you.",
  },
  mediums: {
    enabled: true,
    heading: "Collaboration Mediums",
    items: [
      { name: "Circle", href: "/edition/schedule", description: "A collaborative space for unfiltered dialogue, bringing together diverse voices to shape the cultural and creative landscape." },
      { name: "Core", href: "/edition/core", description: "The architectural foundation of our vision, where structural integrity meets the fluid needs of modern society through innovative design." },
      { name: "Object", href: "/ecosystem/objects", description: "Exploring the boundary between art and utility through a curated collection of physical artifacts that redefine spaces." },
      { name: "Elevate", href: "/ecosystem/elevate", description: "A dedicated platform designed to amplify emerging talent and high-concept projects within the global design community." },
      { name: "Brand Participations", href: "/edition/brands", description: "Bridging the gap between corporate identity and immersive physical experience design through spatial storytelling." },
      { name: "Partnership", href: "/edition/brands", description: "Empowering the creative economy by providing brands with high-impact platforms to integrate with global design movements." },
      { name: "Media Enquiry", href: "/contact", description: "For press kits, interview requests, and media collaborations, reach out to our communications team for official insights." },
    ],
  },
};
