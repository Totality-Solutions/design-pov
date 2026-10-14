import type { Metadata } from "next";
import FAQContent from "@/components/faq/FAQContent";
import { getPageContent } from "@/lib/pageContentServer";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about Design POV — the show, tickets, participation, and the venue.",
};

// Saving in CMS → FAQ revalidates this page immediately; this is only the
// fallback refresh interval.
export const revalidate = 3600;

export default async function FAQPage() {
  const { intro, questions } = await getPageContent("faq");

  return (
    <FAQContent
      title={intro.enabled ? intro.title : null}
      categories={questions.enabled ? questions.categories : []}
    />
  );
}
