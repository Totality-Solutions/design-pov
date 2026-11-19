// Renders schema.org structured data (JSON-LD) — what search engines and AI
// answer engines read to understand who/what/when a page is about.
// "<" is escaped so CMS text can never close the script tag.
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
