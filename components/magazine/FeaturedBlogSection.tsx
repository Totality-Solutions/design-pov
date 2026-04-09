"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import CTABtn from "../common/CTABtn";

export default function FeaturedBlogSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="w-full bg-white font-['Montserrat'] pb-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. HEADER */}
      <SectionHeading
        titleMain="The "
        titleBold="Draft"
        subTitle="Editorial & Longform"
        isSectionHovered={isHovered}
        sticky={true}
        stickyTop="top-0"
      >
        <div className="hidden md:flex">
          <span className="text-lg font-medium text-black">Manisha AR</span>
        </div>
      </SectionHeading>

      <div className="px-6 md:px-[70px] mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          
          {/* LEFT COLUMN: MAIN LONG-FORM CONTENT */}
          <div className="flex flex-col gap-8 border-r border-neutral-100 pr-0 lg:pr-12">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
              <Image
                src="/temp/blog-main.jpg" 
                alt="Main Article"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-black rounded-full" />
                   <span className="text-black text-base font-medium">18 Mar 2026</span>
                </div>
                <div className="w-[1px] h-5 bg-black/20" />
                <span className="text-black text-base font-medium">Manisha AR</span>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-black/50 text-lg leading-relaxed max-w-[900px]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
                </p>
                <p className="text-black/50 text-lg leading-relaxed max-w-[900px]">
                  It has survived not only five centuries, but also the leap into electronic typesetting, 
                  remaining essentially unchanged.
                  It has survived not only five centuries, but also the leap into electronic typesetting, 
                  remaining essentially unchanged.
                  It has survived not only five centuries, but also the leap into electronic typesetting, 
                  remaining essentially unchanged.
                  It has survived not only five centuries, but also the leap into electronic typesetting, 
                  remaining essentially unchanged.
                </p>
              </div>

              <div className="mt-4">
                <CTABtn 
                  label="Read More" 
                  href="/blog/article-slug"
                  textColor="black"
                  borderColor="black"
                  btnBg="transparent"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR (MIX OF BLOGS & ADS) */}
          <div className="flex flex-col gap-10">
            
            {/* Sidebar Blog 1 */}
            <div className="flex flex-col gap-4 group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image 
                        src="/temp/press-1.jpg" 
                        alt="Sidebar blog" 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                        <span className="text-white/60 text-[10px] uppercase tracking-widest font-medium">Architecture</span>
                        <h4 className="text-white text-sm font-normal leading-tight line-clamp-1 mt-1">
                            Lorem Ipsum is simply dummy text of the printing
                        </h4>
                        <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <span className="text-white/40 text-[9px]">by Design POV</span>
                             <span className="text-white/40 text-[9px]">| 26 Feb, 2026</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* AD SLOT 1 */}
            <div className="flex flex-col gap-2">
                <span className="text-[9px] text-black/20 uppercase tracking-widest font-bold">Advertisement</span>
                <div className="relative aspect-[3/4] w-full bg-gray-50 border border-neutral-100 overflow-hidden">
                    <Image src="/temp/2.jpg" alt="Visual Ad" fill className="object-cover" />
                </div>
            </div>

            {/* Sidebar Blog 2 */}
            <div className="flex flex-col gap-4 group cursor-pointer">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image 
                        src="/temp/press-2.jpg" 
                        alt="Sidebar blog" 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                        <span className="text-white/60 text-[10px] uppercase tracking-widest font-medium">Interiors</span>
                        <h4 className="text-white text-sm font-normal leading-tight line-clamp-1 mt-1">
                            Modern Living: A deep dive into urban spaces
                        </h4>
                    </div>
                </div>
            </div>

            {/* AD SLOT 2 (Square) */}
            <div className="relative aspect-square w-full bg-gray-100 overflow-hidden flex items-center justify-center">
                 <Image src="/temp/3.jpg" alt="Promotion" fill className="object-cover opacity-50" />
                 <span className="relative z-10 text-black text-[10px] font-bold uppercase tracking-widest px-4 text-center">
                    New Collection <br/> Coming Soon
                 </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}