"use client";

import React from "react";

interface SectionHeadingProps {
  titleMain: string;
  titleBold: string;
  rightText?: string;
  isSectionHovered?: boolean;
  sticky?: boolean;          // Toggle sticky behavior
  stickyTop?: string;       // Custom top offset (e.g., "top-0" or "top-[80px]")
  bgColor?: string;         // Background color (important for sticky headers)
  className?: string;
}

export default function SectionHeading({
  titleMain,
  titleBold,
  rightText,
  isSectionHovered = false,
  sticky = false,
  stickyTop = "top-0",
  bgColor = "bg-white",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`
        w-full flex flex-col md:flex-row items-center justify-between border-b
        px-6 md:px-[70px] py-8 z-40 transition-colors duration-300
        ${sticky ? `sticky ${stickyTop}` : "relative"}
        ${bgColor}
        ${className}
      `}
    >
      {/* LEFT SIDE: ICON + TITLE */}
      <div className="flex items-center gap-[10px]">
        {/* BLINKING DOT ICON */}
        <div className="relative w-[33px] h-[33px] flex items-center justify-center">
          {/* Animated Pulsing Shadow */}
          <div
            className={`
              absolute w-[14px] h-[14px] bg-[var(--primary-red)] rounded-full blur-[6px] 
              transition-all duration-700
              ${isSectionHovered ? "animate-pulse-glow opacity-60" : "opacity-0"}
            `}
          />
          {/* Static Red Center */}
          <div className={`relative w-[7px] h-[7px]  rounded-full z-10
              ${isSectionHovered? "bg-[var(--primary-red)]":"bg-[var(--color-black)]"}  
            `} />
        </div>

        {/* DYNAMIC TITLE */}
        <div className="font-['Montserrat'] text-[20px] md:text-[22px] leading-[1.2] text-black">
          <span className="font-medium">{titleMain}</span>
          <span className="font-bold">{titleBold}</span>
        </div>
      </div>

      {/* RIGHT SIDE: SUBTEXT */}
      <div className="mt-4 md:mt-0 flex items-center">
        <div className="opacity-60 text-black text-[16px] md:text-[18px] font-['Montserrat'] font-normal leading-[24px]">
          {rightText}
        </div>
      </div>
      
      {/* Optional: Bottom Border for sticky headers */}
      {sticky && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/5" />}
    </div>
  );
}