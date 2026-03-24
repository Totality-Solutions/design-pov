import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhatPOV from "@/components/home/WhatPOV";

export const metadata: Metadata = {
  title: "Design POV — A Platform for Design Beyond Sight",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatPOV/>
    </>
  );
}
