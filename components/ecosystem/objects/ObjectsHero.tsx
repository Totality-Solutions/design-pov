"use client";

import React from "react";
import Image from "next/image";
import { MediaRenderer } from "../../common/MediaRenderer";
import CTABtn from "../../common/CTABtn";
import { UnderlineText } from "@/components/common/Underlinetext";

export default function ObjectsHero() {
  return (
    <section className="w-full h-fit bg-pov-white">
      {/* TEXT SECTION: Clean horizontal layout with border */}

    <div className="w-full pt-10 lg:pt-20">
      <UnderlineText lineHeight={72} className="text-h2-mobile md:text-h2-tab lg:text-h2 tracking-tight font-semibold">
        A collection of original, one-of-one pieces—each a distilled expression of perspective.
        
      </UnderlineText>
    </div>

      {/* <div className="grid grid-cols-4 items-center justify-center w-full px-6 md:px-10 py-10">

        <div className="col-span-3">
          <p className="text-body-mobile md:text-body-tab lg:text-body tracking-tight font-semibold">
            An editorial platform capturing the voices and narratives shaping design today.
          </p>
        </div>
        
        <div className="col-span-1 flex items-center justify-end"> 
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
      </div> */}

      {/* MEDIA SECTION: Responsive container for Image or Video */}
      {/* <div className="relative w-full overflow-hidden flex items-center justify-center">

        <div className="relative z-10 w-full h-[400px] bg-black overflow-hidden">
          <MediaRenderer 
            src="/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg" 
            alt="Ecosystem Highlight"
            className="w-full h-full object-cover"
          />
        </div>

      </div> */}
    </section>
  );
}