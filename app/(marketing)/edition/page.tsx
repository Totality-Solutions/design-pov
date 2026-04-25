"use client";

import CTAStrip from "@/components/common/CTAStrip";
import BrandsSection from "@/components/edition26/BrandsSection";
import CoreSection from "@/components/edition26/CoreSection";
import PartnersSection from "@/components/edition26/PartnersSection";
import ScheduleSection from "@/components/edition26/ScheduleSection";
import ThemeSection from "@/components/edition26/ThemeSection";
import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import PopupForm from "@/components/common/PopupForm";

export default function Edition2026() {
    const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="bg-pov-black min-h-screen">
      <ThemeSection />
      <CoreSection />
      <BrandsSection />
      <ScheduleSection />
      <PartnersSection />
      <div className="w-full z-10 bg-white border-b">
        <CTAStrip
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          // 3. Pass the open function to onClick
          onClick={() => setIsFormOpen(true)} 
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
      </div>
      <PopupForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
}
