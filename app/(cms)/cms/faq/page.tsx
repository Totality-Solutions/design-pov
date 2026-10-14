import CmsPageShell from "@/components/cms/page-editor/CmsPageShell";
import PageEditorClient from "@/components/cms/page-editor/PageEditorClient";
import { getPageContent, getSavedSections } from "@/lib/pageContentServer";

export const dynamic = "force-dynamic";

export default async function FaqCmsPage() {
  const [content, { saved, error }] = await Promise.all([getPageContent("faq"), getSavedSections("faq")]);

  return (
    <CmsPageShell
      title="FAQ"
      description="Questions and answers on the FAQ page."
      viewLinks={[{ href: "/faq", label: "View FAQ page" }]}
      error={error}
    >
      <PageEditorClient page="faq" initial={content} saved={saved} />
    </CmsPageShell>
  );
}