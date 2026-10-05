"use client";

import PageEditor from "../page-editor/PageEditor";
import { ECOSYSTEM_EDITORS, validateEcosystemSection } from "./sectionEditors";
import type { EcosystemPageContent } from "@/lib/ecosystemContent";

// Client wrapper so the server page can render the editor without passing
// functions (the section editors) across the server/client boundary.
export default function EcosystemEditor({
  initial,
  saved,
}: {
  initial: EcosystemPageContent;
  saved: Record<string, string>;
}) {
  return (
    <PageEditor
      page="ecosystem"
      initial={initial}
      saved={saved}
      editors={ECOSYSTEM_EDITORS}
      validate={validateEcosystemSection}
    />
  );
}
