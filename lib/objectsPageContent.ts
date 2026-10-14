import type { SectionMeta } from "@/lib/pageContent";

// Content model for the /ecosystem/objects page text, edited in CMS → Objects
// (above the objects list, which keeps its own table). Client-safe.

export type ObjectsPageContent = {
  hero:     { enabled: boolean; headline: string };
  carousel: { enabled: boolean };
  form:     { enabled: boolean };
};

export type ObjectsSectionKey = keyof ObjectsPageContent;

export const OBJECTS_SECTIONS: SectionMeta<ObjectsSectionKey>[] = [
  { key: "hero",     label: "Hero",             hint: "Headline at the top" },
  { key: "carousel", label: "Objects Carousel", hint: "Objects come from the list below" },
  { key: "form",     label: "Enquiry Form",     hint: "Enquiries arrive in CMS → Submissions" },
];

export const DEFAULT_OBJECTS_PAGE: ObjectsPageContent = {
  hero: {
    enabled: true,
    headline: "A collection of original, one-of-one pieces-each a distilled expression of perspective.",
  },
  carousel: { enabled: true },
  form: { enabled: true },
};
