"use client";

import PageEditor from "../page-editor/PageEditor";
import { SECTION_EDITORS, validateSection } from "./sectionEditors";
import type { HomeContent } from "@/lib/homeContent";

// Client wrapper so the server page can render the Home editor without
// passing functions (the section editors) across the server/client boundary.
export default function HomeEditor({ initial, saved }: { initial: HomeContent; saved: Record<string, string> }) {
  return <PageEditor page="home" initial={initial} saved={saved} editors={SECTION_EDITORS} validate={validateSection} />;
}
