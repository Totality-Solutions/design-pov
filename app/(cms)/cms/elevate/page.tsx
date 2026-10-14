import CmsPageShell from "@/components/cms/page-editor/CmsPageShell";
import PageEditorClient from "@/components/cms/page-editor/PageEditorClient";
import { getPageContent, getSavedSections } from "@/lib/pageContentServer";

export const dynamic = "force-dynamic";

export default async function ElevateCmsPage() {
  const [content, { saved, error }] = await Promise.all([getPageContent("elevate"), getSavedSections("elevate")]);

  return (
    <CmsPageShell
      title="Elevate"
      description="The Ecosystem → Elevate page."
      viewLinks={[{ href: "/ecosystem/elevate", label: "View elevate page" }]}
      error={error}
    >
      <PageEditorClient page="elevate" initial={content} saved={saved} />
    </CmsPageShell>
  );
}