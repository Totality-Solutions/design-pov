import CmsPageShell from "@/components/cms/page-editor/CmsPageShell";
import PageEditorClient from "@/components/cms/page-editor/PageEditorClient";
import { getPageContent, getSavedSections } from "@/lib/pageContentServer";

export const dynamic = "force-dynamic";

export default async function ContactCmsPage() {
  const [content, { saved, error }] = await Promise.all([getPageContent("contact"), getSavedSections("contact")]);

  return (
    <CmsPageShell
      title="Contact"
      viewLinks={[{ href: "/contact", label: "View contact page" }]}
      error={error}
    >
      <PageEditorClient page="contact" initial={content} saved={saved} />
    </CmsPageShell>
  );
}