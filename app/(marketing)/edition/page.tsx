import BrandsSection from "@/components/edition26/BrandsSection";
import CoreSection from "@/components/edition26/CoreSection";
import PartnersSection from "@/components/edition26/PartnersSection";
import ScheduleSection from "@/components/edition26/ScheduleSection";
import ThemeSection from "@/components/edition26/ThemeSection";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2026 Edition — Sense & Sensibility",
  description: "The Design POV 2026 edition. A meditation on how design speaks to our bodies before our minds.",
};

// const SECTIONS = [
//   { label: "Theme", href: "/2026/theme", desc: "Sense & Sensibility — the conceptual framework" },
//   { label: "Core Collective", href: "/2026/core", desc: "The studios defining this edition" },
//   { label: "Design Partners", href: "/2026/design-partners", desc: "Brands building the culture" },
//   { label: "The Circle", href: "/2026/circle", desc: "Panels, speakers, conversation" },
//   { label: "Art & Installations", href: "/2026/art-installations", desc: "Commissioned works" },
//   { label: "Visit", href: "/2026/visit", desc: "Join the waitlist for May 2026" },
// ];

export default function Edition2026() {
  return (
    <div className="bg-pov-black min-h-screen">
      <ThemeSection />
      <CoreSection />
      <BrandsSection />
      <ScheduleSection />
      <PartnersSection />
    </div>
  );
}
