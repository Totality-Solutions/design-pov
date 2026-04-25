"use client";

import React from "react";
import Image from "next/image";
import { MediaRenderer } from "../common/MediaRenderer";
import CTABtn from "../common/CTABtn";

export default function MagazineHero() {
  return (
    <section className="w-full h-fit bg-pov-white border-b border-pov-black/40">
      {/* TEXT SECTION: Clean horizontal layout with border */}
      <div className="w-full border-b-2 border-pov-black px-3 md:px-10 lg:pt-20">
        <h1 className="text-h2-mobile md:text-h2-tab lg:text-h2 tracking-tight font-semibold">
          Lorem Ipsum is simply dummy text of the lore
        </h1>
      </div>
    
      <div className="w-full border-b-2 border-pov-black px-3 md:px-10 lg:pt-2">
        <p className="text-h2-mobile md:text-h2-tab lg:text-h2 tracking-tight font-semibold">
          and typesetting industry.
        </p>
      </div>

      <div className="grid grid-cols-4 items-center justify-center w-full px-3 md:px-10 py-10">
        {/* 75% Column */}
        <div className="col-span-3">
          <p className="text-body-mobile md:text-body-tab lg:text-body tracking-tight font-semibold">
            Explore studios, brands, objects, and ideas - connected through one evolving ecosystem
          </p>
        </div>
        
        {/* 25% Column */}
        <div className="col-span-1 flex items-center justify-end"> {/* justify-end looks better for the smaller column */}
          <CTABtn
            label="View Issues"
            btnBg="var(--primary-blue)"
            btnHoverBg="var(--primary-blue)"
            textColor="var(--color-white)"
            borderColor="var(--primary-blue)"
            borderHoverColor="var(--primary-blue)"
            lineColor="transparent"
            lineHoverColor="transparent"
            href="#tickets"
          />
        </div>
      </div>

      {/* MEDIA SECTION: Responsive container for Image or Video */}
      <div className="relative w-full overflow-hidden flex items-center justify-center">
        
        {/* Main Video/Image Asset (No background visuals) */}
        <div className="relative z-10 w-full h-[400px] bg-black overflow-hidden">
          <MediaRenderer 
            src="/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg" 
            alt="Ecosystem Highlight"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}