
import ElevateForm from "@/components/ecosystem/elevate/ElevateForm";
import ElevateGallery from "@/components/ecosystem/elevate/ElevateGallery";
import ElevateHero from "@/components/ecosystem/elevate/ElevateHero";
import type { Metadata } from "next";

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

export default function ElevatePage() {
  return (
    <main className="w-full min-h-screen bg-white">
        <ElevateHero />
        <ElevateGallery />
        <ElevateForm />
    </main>
  );
}