import DesignHero from "@/components/about/AboutHero";
import TheThreePillars from "@/components/about/TheThreePillars";
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
    </div>
  );
}