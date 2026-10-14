import CmsPageShell from "@/components/cms/page-editor/CmsPageShell";
import PageEditorClient from "@/components/cms/page-editor/PageEditorClient";
import { getPageContent, getSavedSections } from "@/lib/pageContentServer";

export const dynamic = "force-dynamic";

export default async function LegalCmsPage() {
  const [content, { saved, error }] = await Promise.all([getPageContent("legal"), getSavedSections("legal")]);

  return (
    <CmsPageShell
      title="Legal"
      description="Privacy Policy and Terms & Conditions."
      viewLinks={[{ href: "/legal/privacy-policy", label: "View privacy policy" }, { href: "/legal/terms-of-use", label: "View terms" }]}
      error={error}
    >
      <PageEditorClient page="legal" initial={content} saved={saved} />
    </CmsPageShell>
  );
}