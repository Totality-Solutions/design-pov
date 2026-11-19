import { pageMetadata } from "@/lib/seo";

// The gallery page is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photographs from Design POV editions: The Core installations, artists, brand pavilions, The Circle conversations, objects and the people who made the show.",
  path: "/gallery",
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
