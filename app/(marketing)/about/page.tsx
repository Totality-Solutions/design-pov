import DesignHero from "@/components/about/AboutHero";
import TheThreePillars from "@/components/about/TheThreePillars";
import ThisIsUsSection from "@/components/about/ThisIsUs";
import Ecosystem from "@/components/about/EcosystemSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply & Partner",
  description: "Exhibit, sponsor, speak, curate, or collaborate with Design POV 2026.",
};

export default function AboutPage() {
  return (
    <div>
        <DesignHero />
        <TheThreePillars />
        <ThisIsUsSection />
        <Ecosystem />
    </div>
  );
}