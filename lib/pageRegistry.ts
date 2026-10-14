import { DEFAULT_HOME, HOME_SECTIONS, type HomeContent } from "@/lib/homeContent";
import { DEFAULT_ECOSYSTEM, ECOSYSTEM_SECTIONS, type EcosystemPageContent } from "@/lib/ecosystemContent";
import { DEFAULT_BRANDS, BRANDS_SECTIONS, type BrandsPageContent } from "@/lib/brandsContent";
import { DEFAULT_EDITION, EDITION_SECTIONS, type EditionPageContent } from "@/lib/editionContent";
import { DEFAULT_MAGAZINE, MAGAZINE_SECTIONS, type MagazinePageContent } from "@/lib/magazineContent";
import { DEFAULT_CONTACT, CONTACT_SECTIONS, type ContactPageContent } from "@/lib/contactContent";
import { DEFAULT_FAQ, FAQ_SECTIONS, type FaqPageContent } from "@/lib/faqContent";
import { DEFAULT_ELEVATE, ELEVATE_SECTIONS, type ElevatePageContent } from "@/lib/elevateContent";
import { DEFAULT_LEGAL, LEGAL_SECTIONS, type LegalPagesContent } from "@/lib/legalContent";
import { DEFAULT_ABOUT, ABOUT_SECTIONS, type AboutPageContent } from "@/lib/aboutContent";
import { DEFAULT_COLLABORATE, COLLABORATE_SECTIONS, type CollaboratePageContent } from "@/lib/collaborateContent";
import { DEFAULT_OBJECTS_PAGE, OBJECTS_SECTIONS, type ObjectsPageContent } from "@/lib/objectsPageContent";
import type { SectionMeta } from "@/lib/pageContent";

// Every CMS-editable fixed-layout page. Adding a page = a content file with
// sections + defaults, an entry here, section editors (registered in
// components/cms/page-editor/PageEditorClient.tsx), a CMS route, and a
// sidebar link.
// Client-safe.

export type PageContentMap = {
  home: HomeContent;
  ecosystem: EcosystemPageContent;
  brands: BrandsPageContent;
  edition: EditionPageContent;
  magazine: MagazinePageContent;
  contact: ContactPageContent;
  faq: FaqPageContent;
  elevate: ElevatePageContent;
  legal: LegalPagesContent;
  about: AboutPageContent;
  collaborate: CollaboratePageContent;
  objects: ObjectsPageContent;
};

export type PageKey = keyof PageContentMap;

export type PageConfig<P extends PageKey> = {
  label: string;
  /** Public route(s), revalidated when a section is saved. */
  path: string | string[];
  sections: SectionMeta<Extract<keyof PageContentMap[P], string>>[];
  defaults: PageContentMap[P];
};

export const PAGES: { [P in PageKey]: PageConfig<P> } = {
  home:        { label: "Home",        path: "/",                 sections: HOME_SECTIONS,        defaults: DEFAULT_HOME },
  ecosystem:   { label: "Ecosystem",   path: "/ecosystem",        sections: ECOSYSTEM_SECTIONS,   defaults: DEFAULT_ECOSYSTEM },
  brands:      { label: "Brands",      path: "/edition/brands",   sections: BRANDS_SECTIONS,      defaults: DEFAULT_BRANDS },
  edition:     { label: "Edition",     path: ["/edition", "/edition/core"], sections: EDITION_SECTIONS, defaults: DEFAULT_EDITION },
  magazine:    { label: "Magazine",    path: "/magazine",         sections: MAGAZINE_SECTIONS,    defaults: DEFAULT_MAGAZINE },
  contact:     { label: "Contact",     path: "/contact",          sections: CONTACT_SECTIONS,     defaults: DEFAULT_CONTACT },
  faq:         { label: "FAQ",         path: "/faq",              sections: FAQ_SECTIONS,         defaults: DEFAULT_FAQ },
  elevate:     { label: "Elevate",     path: "/ecosystem/elevate", sections: ELEVATE_SECTIONS,    defaults: DEFAULT_ELEVATE },
  legal:       { label: "Legal",       path: ["/legal/privacy-policy", "/legal/terms-of-use"], sections: LEGAL_SECTIONS, defaults: DEFAULT_LEGAL },
  about:       { label: "About",       path: "/about",            sections: ABOUT_SECTIONS,       defaults: DEFAULT_ABOUT },
  collaborate: { label: "Collaborate", path: "/collaborate",      sections: COLLABORATE_SECTIONS, defaults: DEFAULT_COLLABORATE },
  objects:     { label: "Objects",     path: "/ecosystem/objects", sections: OBJECTS_SECTIONS,    defaults: DEFAULT_OBJECTS_PAGE },
};

export function isPageKey(value: string): value is PageKey {
  return value in PAGES;
}
