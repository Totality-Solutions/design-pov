"use client";

import React, { ReactNode } from "react";

interface SectionHeadingProps {
  titleMain: string;
  titleBold?: string;
  subTitle?: string;
  children?: ReactNode;
  isSectionHovered?: boolean;
  sticky?: boolean;
  stickyTop?: string;
  bgColor?: string;
  textColor?: string;      // New: Prop for dynamic text color (e.g., "text-white")
  className?: string;
}

export default function SectionHeading({
  titleMain,
  titleBold,
  subTitle,
  children,
  isSectionHovered = false,
  sticky = false,
  stickyTop = "top-0",
  bgColor = "bg-white",
  textColor = "text-black", // Defaulting to black
  className = "",
}: SectionHeadingProps) {
  
  /**
   * Helper to ensure the small dot matches the text color when not hovered.
   * If you pass 'text-white', the dot becomes 'bg-white'.
   */
  const dotBaseColor = textColor.replace("text-", "bg-");

  return (
    <div
      className={`
        w-full flex flex-col md:flex-row items-start md:items-center justify-between border-b
        px-6 md:px-[60px] py-6 z-40 transition-colors duration-300 
        ${sticky ? `sticky ${stickyTop}` : "relative"}
        ${bgColor}
        ${className}
      `}
    >
      {/* LEFT SIDE: ICON + TITLES */}
      <div className="flex items-start gap-[10px]">
        {/* BLINKING DOT ICON */}
        <div className="relative w-[33px] h-[33px] flex items-center justify-center mt-[-4px] md:mt-[-3px]">
          <div
            className={`
              absolute w-[14px] h-[14px] bg-[var(--primary-red)] rounded-full blur-[10px] 
              transition-all duration-300
              ${isSectionHovered ? "animate-pulse-glow opacity-80" : "opacity-0"}
            `}
          />
          {/* Static Center: Toggles between Red (hover) and the dynamic Text Color (base) */}
          <div className={`relative w-[7px] h-[7px] rounded-full z-10 transition-colors duration-300
              ${isSectionHovered ? "bg-[var(--primary-red)]" : dotBaseColor}  
            `} />
        </div>

        {/* DYNAMIC TITLE GROUP */}
        <div className={`flex flex-col ${textColor}`}>
          <div className="font-['Montserrat'] text-[20px] md:text-[22px] leading-[1.2]">
            <span className="font-medium">{titleMain}</span>
            <span className="font-bold">{titleBold}</span>
          </div>
          {subTitle && (
            <span className="text-[14px] opacity-50 font-['Montserrat'] mt-1">
              {subTitle}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: FLEXIBLE CHILDREN */}
      <div className={`mt-6 md:mt-0 flex flex-wrap items-center gap-4 md:gap-6 ${textColor}`}>
        {children}
      </div>
      
      {sticky && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/5" />}
    </div>
  );
}



