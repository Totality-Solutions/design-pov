import Hero from "@/components/home/Hero";
import WhatPOV from "@/components/home/WhatPOV";
import Theme from "@/components/home/Theme";
import Ecosystem from "@/components/home/Ecosystem";
import FeaturedDesigners from "@/components/home/Featured";
import ClientLogo from "@/components/home/ClientLogo";
import FeaturedStory from "@/components/home/FeaturedStory";
import CTAStrip from "@/components/common/CTAStrip";
import ScrollMaskText from "@/components/home/ScrollRevealText";
import HomeSponsors from "@/components/home/HomeSponsors";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import DeferredRender from "@/components/common/DeferredRender";
import { getHomeContent } from "@/lib/homeContentServer";

// Saving a section in CMS → Home revalidates "/" immediately; this is only
// the fallback refresh interval.
export const revalidate = 3600;

export default async function HomePage() {
  const home = await getHomeContent();

  return (
    <>
      {home.hero.enabled && <Hero slides={home.hero.slides} />}
      {home.intro.enabled && <ScrollMaskText {...home.intro} />}
      {home.whatPov.enabled && <WhatPOV paragraphs={home.whatPov.paragraphs} items={home.whatPov.items} />}
      {home.theme.enabled && (
        <DeferredRender minHeight="720px">
          <Theme {...home.theme} />
        </DeferredRender>
      )}
      {home.ecosystem.enabled && (
        <DeferredRender minHeight="620px">
          <Ecosystem heading={home.ecosystem.heading} items={home.ecosystem.items} />
        </DeferredRender>
      )}
      {home.ctaStrip.enabled && (
        <DeferredRender minHeight="120px">
          <div className="w-full z-10 bg-white border-t border-b border-[#DFDFDF]">
            <CTAStrip
              title={home.ctaStrip.title}
              ctaLabel={home.ctaStrip.ctaLabel}
              ctaHref={home.ctaStrip.ctaHref}
              hoverBgColor="#000000"
              textColor="var(--primary-red)"
              hoverTextColor="var(--color-white)"
            />
          </div>
        </DeferredRender>
      )}
      {home.coreCollective.enabled && (
        <DeferredRender minHeight="680px">
          <FeaturedDesigners heading={home.coreCollective.heading} tiles={home.coreCollective.tiles} />
        </DeferredRender>
      )}
      {home.partners.enabled && (
        <DeferredRender minHeight="320px">
          <HomeSponsors heading={home.partners.heading} />
        </DeferredRender>
      )}
      {home.magazine.enabled && (
        <DeferredRender minHeight="620px">
          <FeaturedStory heading={home.magazine.heading} />
        </DeferredRender>
      )}
      {/* <DeferredRender minHeight="220px"> */}
        <ShowDeckCTA />
      {/* </DeferredRender> */}
      {home.brands.enabled && (
        <DeferredRender minHeight="180px">
          <ClientLogo headingMain={home.brands.headingMain} headingBold={home.brands.headingBold} />
        </DeferredRender>
      )}
    </>
  );
}
