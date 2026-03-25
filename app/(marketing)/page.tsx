import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhatPOV from "@/components/home/WhatPOV";
import Theme from "@/components/home/Theme";
import Ecosystem from "@/components/home/Ecosystem";

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
    </>
  );
}
