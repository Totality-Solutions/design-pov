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
export const revalidate = 3600;

export default async function HomePage() {
  return (
    <>
      <Hero />
      <ScrollMaskText/>
      <WhatPOV />
      <DeferredRender minHeight="720px">
        <Theme />
      </DeferredRender>
      <DeferredRender minHeight="620px">
        <Ecosystem />
      </DeferredRender>
      <DeferredRender minHeight="120px">
        <div className="w-full z-10 bg-white border-t border-b border-[#DFDFDF]">
          <CTAStrip
            title="Become a part of a design led platform like no other."
            ctaLabel="Apply Now"
            ctaHref="/collaborate"
            hoverBgColor="#000000"
            textColor="var(--primary-red)"
            hoverTextColor="var(--color-white)"
          />
        </div>
      </DeferredRender>
      <DeferredRender minHeight="680px">
        <FeaturedDesigners />
      </DeferredRender>
      <DeferredRender minHeight="320px">
        <HomeSponsors />
      </DeferredRender>
      <DeferredRender minHeight="620px">
        <FeaturedStory />
      </DeferredRender>
      <DeferredRender minHeight="220px">
        <ShowDeckCTA />
      </DeferredRender>
      <DeferredRender minHeight="180px">
        <ClientLogo />
      </DeferredRender>
    </>
  );
}
