import CmsPageShell from "@/components/cms/page-editor/CmsPageShell";
import PageEditorClient from "@/components/cms/page-editor/PageEditorClient";
import { getPageContent, getSavedSections } from "@/lib/pageContentServer";

export const dynamic = "force-dynamic";

export default async function MagazineCmsPage() {
  const [content, { saved, error }] = await Promise.all([getPageContent("magazine"), getSavedSections("magazine")]);

  return (
    <CmsPageShell
      title="Magazine Page"
      description="The Magazine landing page. Articles are managed in Blogs."
      viewLinks={[{ href: "/magazine", label: "View magazine page" }]}
      error={error}
    >
      <PageEditorClient page="magazine" initial={content} saved={saved} />
    </CmsPageShell>
  );
}