import CTAStrip from "@/components/common/CTAStrip";
import BrandsSection from "@/components/edition26/BrandsSection";
import CoreSection from "@/components/edition26/CoreSection";
import PartnersSection from "@/components/edition26/PartnersSection";
import ScheduleSection from "@/components/edition26/ScheduleSection";
import ThemeSection from "@/components/edition26/ThemeSection";
import type { Metadata } from "next";
import Link from "next/link";
import ShowDeckCTA from "@/components/common/ShowDeckCTA";
import WhoItIsFor from "@/components/edition26/WhoItIsFor";

export default function Edition2026() {
  return (
    <div className="bg-pov-black min-h-screen">
      <ThemeSection />
      <WhoItIsFor />
        <CoreSection />
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
      <BrandsSection />
      <ScheduleSection />
      <PartnersSection />
      <ShowDeckCTA />
    </div>
  );
}
