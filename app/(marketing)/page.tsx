import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhatPOV from "@/components/home/WhatPOV";
import Theme from "@/components/home/Theme";
import Ecosystem from "@/components/home/Ecosystem";
import FeaturedDesigners from "@/components/home/Featured";
import ClientLogo from "@/components/home/ClientLogo";
import FeaturedStory from "@/components/home/FeaturedStory";

export const metadata: Metadata = {
  title: "Design POV — A Platform for Design Beyond Sight",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatPOV/>
      <Theme/>
      <Ecosystem/>
      <FeaturedDesigners />
      <FeaturedStory />
      <ClientLogo />
    </>
  );
}
