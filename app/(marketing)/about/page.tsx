import DesignHero from "@/components/about/AboutHero";
import TheThreePillars from "@/components/about/TheThreePillars";
import ThisIsUsSection from "@/components/about/ThisIsUs";
import Ecosystem from "@/components/about/EcosystemSection";
import type { Metadata } from "next";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import { getPressMentions } from "@/lib/pressMentions";
import { getPageContent } from "@/lib/pageContentServer";

export const metadata: Metadata = {
  title: "Apply & Partner",
  description: "Exhibit, sponsor, speak, curate, or collaborate with Design POV 2026.",
};

// Press mentions are edited in the CMS — re-fetch at most once a minute.
// (Saving a page section in CMS → About revalidates immediately.)
export const revalidate = 60;

export default async function AboutPage() {
  const [pressMentions, { hero, pillars, thisIsUs, press }] = await Promise.all([
    getPressMentions(),
    getPageContent("about"),
  ]);

  return (
    <div>
        {hero.enabled && <DesignHero slides={hero.slides} image={hero.image} />}
        {pillars.enabled && (
          <TheThreePillars
            headingMain={pillars.headingMain}
            headingBold={pillars.headingBold}
            items={pillars.items}
            ctaTitle={pillars.ctaTitle}
            ctaLabel={pillars.ctaLabel}
            ctaHref={pillars.ctaHref}
          />
        )}
        {thisIsUs.enabled && (
          <ThisIsUsSection
            heading={thisIsUs.heading}
            intro={thisIsUs.intro}
            question={thisIsUs.question}
            image={thisIsUs.image}
            founders={thisIsUs.founders}
          />
        )}
        {press.enabled && <Ecosystem items={pressMentions} headingMain={press.headingMain} headingBold={press.headingBold} />}
        <ShowDeckCTA />
    </div>
  );
}
