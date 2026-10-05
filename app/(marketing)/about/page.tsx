import DesignHero from "@/components/about/AboutHero";
import TheThreePillars from "@/components/about/TheThreePillars";
import ThisIsUsSection from "@/components/about/ThisIsUs";
import Ecosystem from "@/components/about/EcosystemSection";
import type { Metadata } from "next";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import { getPressMentions } from "@/lib/pressMentions";

export const metadata: Metadata = {
  title: "Apply & Partner",
  description: "Exhibit, sponsor, speak, curate, or collaborate with Design POV 2026.",
};

// Press mentions are edited in the CMS — re-fetch at most once a minute.
export const revalidate = 60;

export default async function AboutPage() {
  const pressMentions = await getPressMentions();

  return (
    <div>
        <DesignHero />
        <TheThreePillars />
        <ThisIsUsSection />
        <Ecosystem items={pressMentions} />
        <ShowDeckCTA />
    </div>
  );
}