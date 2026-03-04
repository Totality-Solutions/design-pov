import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhatWeStandFor from "@/components/home/WhatWeStandFor";
import ThemeAnchor from "@/components/home/ThemeAnchor";
import EcosystemGrid from "@/components/home/EcosystemGrid";
import FeaturedDesigners from "@/components/home/FeaturedDesigners";
import JournalPreview from "@/components/home/JournalPreview";
import SponsorsStrip from "@/components/home/SponsorsStrip";
import CTABanner from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "Design POV — A Platform for Design Beyond Sight",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeStandFor />
      <CTABanner
        label="2026 Edition"
        heading="Apply to exhibit or partner with Design POV"
        cta={{ label: "Apply Now", href: "/apply" }}
      />
      <ThemeAnchor />
      <EcosystemGrid />
      <FeaturedDesigners />
      <JournalPreview />
      <SponsorsStrip />
      <CTABanner
        label="May 2026 · Mumbai"
        heading="Join the waitlist for Design POV 2026"
        cta={{ label: "Join Waitlist", href: "/2026/visit" }}
        variant="light"
      />
    </>
  );
}
