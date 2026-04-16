import DesignHero from "@/components/about/AboutHero";
import TheThreePillars from "@/components/about/TheThreePillars";
import ThisIsUsSection from "@/components/about/ThisIsUs";
import Ecosystem from "@/components/about/EcosystemSection";
import type { Metadata } from "next";
import CTAStrip from "@/components/common/CTAStrip";

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
        <div className="w-full z-10 bg-white">
        <CTAStrip
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          ctaHref="#"
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
          floatingImage="/temp/ctastrip/strip-1.png"
        />
        </div>
    </div>
  );
}