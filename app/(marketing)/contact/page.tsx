import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHeader from "@/components/contact/ContactHeader";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import { getPageContent } from "@/lib/pageContentServer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Design POV",
  description:
    "Contact Design POV, Mumbai: stall and exhibitor enquiries, sponsorship, partnerships, media and tickets. WhatsApp +91 90763 89336 · marketing@designpovindia.com · Andheri West, Mumbai.",
  path: "/contact",
  keywords: [
    "Design POV contact", "Design POV phone number", "Design POV WhatsApp", "Design POV email",
    "Design POV stall enquiry", "Design POV office Mumbai", "Design POV tickets",
  ],
});

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
