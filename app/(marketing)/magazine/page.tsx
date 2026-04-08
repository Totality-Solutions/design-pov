import type { Metadata } from "next";
import ApplyFunnels from "@/components/apply/ApplyFunnels";
import MagazineHero from "@/components/magazine/MagazineHero";
import MagazineNav from "@/components/magazine/MagazineNav";

export const metadata: Metadata = {
  title: "Magazine",
  description: "Exhibit, sponsor, speak, curate, or collaborate with Design POV 2026.",
};


export default function MagazinePage() {
  return (
    <main>
      <MagazineHero />
      <MagazineNav />
    </main>
  );
}