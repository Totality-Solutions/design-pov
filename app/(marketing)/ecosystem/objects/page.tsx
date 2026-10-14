import ObjectsForm from "@/components/ecosystem/objects/ObjectsForm";
import ObjectsHero from "@/components/ecosystem/objects/ObjectsHero";
import ObjectsCarousel from "@/components/ecosystem/objects/ObjectsCarousel";
import type { Metadata } from "next";
import { getPageContent } from "@/lib/pageContentServer";

export const metadata: Metadata = {
  title: "Objects | Design POV India",
  description:
    "Explore Objects by Design POV India — a curated showcase of collectible design, material expression, and contemporary objects shaping spatial narratives.",
  keywords: [
    "Design POV",
    "Objects",
    "Collectible Design",
    "Interior Design",
    "Furniture",
    "Design Exhibition",
    "India Design",
    "Contemporary Design",
  ],
  openGraph: {
    title: "Objects | Design POV India",
    description:
      "Explore Objects by Design POV India — a curated showcase of collectible design, material expression, and contemporary objects shaping spatial narratives.",
    url: "https://designpovindia.com/objects",
    siteName: "Design POV India",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Objects | Design POV India",
    description:
      "Explore Objects by Design POV India — a curated showcase of collectible design, material expression, and contemporary objects shaping spatial narratives.",
  },
};

// Saving in CMS → Objects revalidates this page immediately; this is only
// the fallback refresh interval.
export const revalidate = 3600;

export default async function ObjectsPage() {
  const { hero, carousel, form } = await getPageContent("objects");

  return (
    <main className="w-full min-h-screen bg-white">
      {hero.enabled && <ObjectsHero headline={hero.headline} />}
      {carousel.enabled && <ObjectsCarousel />}
      {form.enabled && <ObjectsForm />}
    </main>
  );
}