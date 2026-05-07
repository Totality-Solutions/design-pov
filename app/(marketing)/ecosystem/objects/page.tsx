import ObjectsForm from "@/components/ecosystem/objects/ObjectsForm";
import ObjectsHero from "@/components/ecosystem/objects/ObjectsHero";
import ObjectsMarquee from "@/components/ecosystem/objects/ObjectsMarquee";
import type { Metadata } from "next";

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

export default function ObjectsPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <ObjectsHero />
      <ObjectsMarquee />
      <ObjectsForm />
    </main>
  );
}