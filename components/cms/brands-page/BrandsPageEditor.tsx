"use client";

import PageEditor from "../page-editor/PageEditor";
import { BRANDS_PAGE_EDITORS } from "./sectionEditors";
import type { BrandsPageContent } from "@/lib/brandsContent";

// Client wrapper so the server page can render the editor without passing
// functions (the section editors) across the server/client boundary.
export default function BrandsPageEditor({
  initial,
  saved,
}: {
  initial: BrandsPageContent;
  saved: Record<string, string>;
}) {
  return <PageEditor page="brands" initial={initial} saved={saved} editors={BRANDS_PAGE_EDITORS} />;
}
