import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhatPOV from "@/components/home/WhatPOV";
import Theme from "@/components/home/Theme";
import Ecosystem from "@/components/home/Ecosystem";
import FeaturedDesigners from "@/components/home/Featured";
import ClientLogo from "@/components/home/ClientLogo";
import FeaturedStory from "@/components/home/FeaturedStory";
import CTAStrip from "@/components/common/CTAStrip";

export const metadata: Metadata = {
  title: "Design POV — A Platform for Design Beyond Sight",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatPOV />
      <Theme />
      <Ecosystem />
      <FeaturedDesigners />
      <FeaturedStory />
      <div className="w-full z-10 bg-white  border-b border-[#DFDFDF]">
        <CTAStrip
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          ctaHref="#"
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
      </div>
      <ClientLogo />
    </>
  );
}
