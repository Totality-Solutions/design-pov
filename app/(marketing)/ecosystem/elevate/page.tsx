
import ElevateForm from "@/components/ecosystem/elevate/ElevateForm";
import ElevateGallery from "@/components/ecosystem/elevate/ElevateGallery";
import ElevateHero from "@/components/ecosystem/elevate/ElevateHero";
import type { Metadata } from "next";
import { getPageContent } from "@/lib/pageContentServer";

export const metadata: Metadata = {
  title: "Elevate | Design POV India",
  description:
    "Explore Elevate by Design POV India — a curated showcase of collectible design, material expression, and contemporary Elevate shaping spatial narratives.",
  keywords: [
    "Design POV",
    "Elevate",
    "Collectible Design",
    "Interior Design",
    "Furniture",
    "Design Exhibition",
    "India Design",
    "Contemporary Design",
  ],
  openGraph: {
    title: "Elevate | Design POV India",
    description:
      "Explore Elevate by Design POV India — a curated showcase of collectible design, material expression, and contemporary Elevate shaping spatial narratives.",
    url: "https://designpovindia.com/Elevate",
    siteName: "Design POV India",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevate | Design POV India",
    description:
      "Explore Elevate by Design POV India — a curated showcase of collectible design, material expression, and contemporary Elevate shaping spatial narratives.",
  },
};

// Saving in CMS → Elevate revalidates this page immediately; this is only
// the fallback refresh interval.
export const revalidate = 3600;

export default async function ElevatePage() {
  const { intro, gallery, form } = await getPageContent("elevate");

  return (
    <main className="w-full min-h-screen bg-white">
        {intro.enabled && <ElevateHero paragraphs={intro.paragraphs} />}
        {gallery.enabled && <ElevateGallery heading={gallery.heading} body={gallery.body} images={gallery.images} />}
        {form.enabled && <ElevateForm heading={form.heading} />}
    </main>
  );
}