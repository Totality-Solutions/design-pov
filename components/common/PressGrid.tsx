"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

interface PressItem {
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
}

interface PressGridProps {
  data: PressItem[];
  titleMain: string;
  titleBold?: string;
  rightLabel?: string;
}

export default function PressGrid({
  data,
  titleMain,
  titleBold,
  rightLabel,
}: PressGridProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="w-full bg-white font-['Montserrat']"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. SECTION HEADING */}
      <SectionHeading
        titleMain={titleMain}
        titleBold={titleBold}
        isSectionHovered={isHovered}
        sticky={true}
        stickyTop="top-0"
      >
        {rightLabel && (
          <div className="hidden md:flex">
            <span className="opacity-100 text-lg font-medium text-black">
              {rightLabel}
            </span>
          </div>
        )}
      </SectionHeading>

      {/* 2. GRID CONTENT */}
      <div className="px-6 md:px-[70px] py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {data.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-2">
                <span className="text-[16px] text-black/60">
                  {item.category}
                </span>
                <h3 className="text-[18px] md:text-[20px] font-normal leading-[1.2] text-black line-clamp-2 group-hover:text-[var(--primary-red)] transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-[12px] font-medium text-black/60">
                  <span>by {item.author}</span>
                  <span className="w-[1px] h-[12px] bg-black/20" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}