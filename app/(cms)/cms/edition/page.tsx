import CmsPageShell from "@/components/cms/page-editor/CmsPageShell";
import PageEditorClient from "@/components/cms/page-editor/PageEditorClient";
import { getPageContent, getSavedSections } from "@/lib/pageContentServer";

export const dynamic = "force-dynamic";

export default async function EditionCmsPage() {
  const [content, { saved, error }] = await Promise.all([getPageContent("edition"), getSavedSections("edition")]);

  return (
    <CmsPageShell
      title="Edition Page"
      description="The Edition overview page, plus the Apply strip on Edition → Core."
      viewLinks={[{ href: "/edition", label: "View edition page" }, { href: "/edition/core", label: "View core page" }]}
      error={error}
    >
      <PageEditorClient page="edition" initial={content} saved={saved} />
    </CmsPageShell>
  );
}