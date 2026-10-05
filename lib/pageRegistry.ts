import { DEFAULT_HOME, HOME_SECTIONS, type HomeContent } from "@/lib/homeContent";
import { DEFAULT_ECOSYSTEM, ECOSYSTEM_SECTIONS, type EcosystemPageContent } from "@/lib/ecosystemContent";
import type { SectionMeta } from "@/lib/pageContent";

// Every CMS-editable fixed-layout page. Adding a page = a content file with
// sections + defaults, an entry here, a CMS editor, and a sidebar link.
// Client-safe.

export type PageContentMap = {
  home: HomeContent;
  ecosystem: EcosystemPageContent;
};

export type PageKey = keyof PageContentMap;

export type PageConfig<P extends PageKey> = {
  label: string;
  /** Public route, revalidated when a section is saved. */
  path: string;
  sections: SectionMeta<Extract<keyof PageContentMap[P], string>>[];
  defaults: PageContentMap[P];
};

export const PAGES: { [P in PageKey]: PageConfig<P> } = {
  home:      { label: "Home",      path: "/",          sections: HOME_SECTIONS,      defaults: DEFAULT_HOME },
  ecosystem: { label: "Ecosystem", path: "/ecosystem", sections: ECOSYSTEM_SECTIONS, defaults: DEFAULT_ECOSYSTEM },
};

export function isPageKey(value: string): value is PageKey {
  return value in PAGES;
}
