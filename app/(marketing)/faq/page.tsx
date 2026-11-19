import FAQContent from "@/components/faq/FAQContent";
import JsonLd from "@/components/seo/JsonLd";
import { getPageContent } from "@/lib/pageContentServer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQs",
  description:
    "Answers about Design POV: dates and venue (Jio World Convention Centre, Mumbai), tickets, who it's for, The Core, brand participation, sponsorship, media and practical information.",
  path: "/faq",
});

// Saving in CMS → FAQ revalidates this page immediately; this is only the
// fallback refresh interval.
export const revalidate = 3600;

export default async function FAQPage() {
  const { intro, questions } = await getPageContent("faq");
  const categories = questions.enabled ? questions.categories : [];

  // Every question and answer as schema.org FAQPage — built from the CMS content, so it updates with it.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((c) =>
      c.items
        .filter((q) => q.question && q.answer)
        .map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        }))
    ),
  };

  return (
    <>
      {faqSchema.mainEntity.length > 0 && <JsonLd data={faqSchema} />}
      <FAQContent title={intro.enabled ? intro.title : null} categories={categories} />
    </>
  );
}
