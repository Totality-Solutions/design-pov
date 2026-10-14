"use client";

import React from "react";
import { UnderlineText } from "../common/Underlinetext";
import { DEFAULT_MAGAZINE } from "@/lib/magazineContent";

export default function MagazineHero({
  headline = DEFAULT_MAGAZINE.hero.headline,
  subtext = DEFAULT_MAGAZINE.hero.subtext,
}: { headline?: string; subtext?: string }) {
  return (
    <section className="w-full h-fit bg-pov-white border-b border-pov-black/40">
      {/* TEXT SECTION: Clean horizontal layout with border */}

    <div className="w-full pt-10 lg:pt-20">
      <UnderlineText lineHeight={72} className="text-h2-mobile md:text-h2-tab lg:text-h2 tracking-tight font-semibold">
        {headline}
      </UnderlineText>
      

</div>
      <div className="grid grid-cols-4 items-center justify-center w-full px-6 md:px-10 py-10">
        {/* 75% Column */}
        <div className="col-span-3">
          <p className="text-body-mobile md:text-body-tab lg:text-body tracking-tight font-semibold">
            {subtext}
          </p>
        </div>
        
        {/* 25% Column */}
        {/* <div className="col-span-1 flex items-center justify-end"> 
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
        </div> */}
      </div>

      {/* MEDIA SECTION: Responsive container for Image or Video */}
      {/* <div className="relative w-full overflow-hidden flex items-center justify-center">

        <div className="relative z-10 w-full h-[400px] bg-black overflow-hidden">
          <MediaRenderer 
            src={cdn("/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg")} 
            alt="Ecosystem Highlight"
            className="w-full h-full object-cover"
          />
        </div>

      </div> */}
    </section>
  );
}