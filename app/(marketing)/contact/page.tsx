import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHeader from "@/components/contact/ContactHeader";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import { getPageContent } from "@/lib/pageContentServer";

// Saving in CMS → Contact revalidates this page immediately; this is only
// the fallback refresh interval.
export const revalidate = 3600;

export default async function ContactPage() {
  const { header, form } = await getPageContent("contact");

  return (
    <main className="min-h-screen">
      {header.enabled && <ContactHeader title={header.title} description={header.description} />}
      {form.enabled && <ContactFormSection />}
      <ShowDeckCTA />
    </main>
  );
}
