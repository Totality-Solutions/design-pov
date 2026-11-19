import { pageMetadata } from "@/lib/seo";

// Unlinked placeholder page (outdated template content) — kept out of search results.
export const metadata = pageMetadata({
  title: "Visit",
  description: "Visit Design POV in Mumbai.",
  path: "/edition/visit",
  noIndex: true,
});

export default function VisitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
