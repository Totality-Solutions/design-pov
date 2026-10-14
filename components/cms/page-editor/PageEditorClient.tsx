"use client";

import PageEditor, { type SectionEditors } from "./PageEditor";
import type { PageContentMap, PageKey } from "@/lib/pageRegistry";
import { EDITION_EDITORS } from "../edition/sectionEditors";
import { MAGAZINE_EDITORS } from "../magazine/sectionEditors";
import { CONTACT_EDITORS } from "../contact/sectionEditors";
import { FAQ_EDITORS, validateFaq } from "../faq/sectionEditors";
import { ELEVATE_EDITORS } from "../elevate/sectionEditors";
import { LEGAL_EDITORS } from "../legal/sectionEditors";
import { ABOUT_EDITORS } from "../about/sectionEditors";
import { COLLABORATE_EDITORS } from "../collaborate/sectionEditors";
import { OBJECTS_PAGE_EDITORS } from "../objects-page/sectionEditors";

// Client wrapper so server pages can render a page editor by key, without
// passing the section editors (functions) across the server/client boundary.
// Home, Ecosystem and Brands keep their own wrappers.

type ClientPageKey = Exclude<PageKey, "home" | "ecosystem" | "brands">;

const EDITORS: { [P in ClientPageKey]: SectionEditors<PageContentMap[P]> } = {
  edition: EDITION_EDITORS,
  magazine: MAGAZINE_EDITORS,
  contact: CONTACT_EDITORS,
  faq: FAQ_EDITORS,
  elevate: ELEVATE_EDITORS,
  legal: LEGAL_EDITORS,
  about: ABOUT_EDITORS,
  collaborate: COLLABORATE_EDITORS,
  objects: OBJECTS_PAGE_EDITORS,
};

const VALIDATORS: Partial<Record<ClientPageKey, (section: string, value: unknown) => string | null>> = {
  faq: validateFaq,
};

export default function PageEditorClient<P extends ClientPageKey>({
  page,
  initial,
  saved,
}: {
  page: P;
  initial: PageContentMap[P];
  saved: Record<string, string>;
}) {
  return (
    <PageEditor
      page={page}
      initial={initial}
      saved={saved}
      editors={EDITORS[page] as SectionEditors<PageContentMap[P]>}
      validate={VALIDATORS[page]}
    />
  );
}
