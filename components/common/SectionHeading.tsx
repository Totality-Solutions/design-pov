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
  textColor?: string;
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
  textColor = "text-pov-black", // Updated to your variable
  className = "",
}: SectionHeadingProps) {
  
  const dotBaseColor = textColor.replace("text-", "bg-");

  return (
    <div
      className={`
        w-full flex flex-col md:flex-row items-start md:items-center justify-between border-b
        px-6 md:px-10 py-[30px] z-40 transition-colors duration-300 
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
              absolute w-[14px] h-[14px] bg-primary-red rounded-full blur-[10px] 
              transition-all duration-300
              ${isSectionHovered ? "animate-pulse-glow opacity-80" : "opacity-0"}
            `}
          />
          <div className={`relative w-[7px] h-[7px] rounded-full z-10 transition-colors duration-300
              ${isSectionHovered ? "bg-primary-red" : dotBaseColor}  
            `} />
        </div>

        {/* DYNAMIC TITLE GROUP */}
        <div className={`flex flex-col font-display ${textColor}`}>
          {/* Using text-h3 responsive scale: 28px (Deskt) / 22px (Tab) / 18px (Mob) */}
          <div className="text-h3-mobile md:text-h3-tab leading-[1.2]">
            <span className="font-medium">{titleMain}</span>
            <span className="font-bold space-x-1"> {titleBold}</span>
          </div>
          
          {/* Using text-small responsive scale: 14px / 12px / 10px */}
          {subTitle && (
            <span className="text-small-mobile md:text-small-tab lg:text-small opacity-50 mt-1">
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