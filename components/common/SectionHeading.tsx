"use client";

import React, { ReactNode, useState, useEffect } from "react";

interface SectionHeadingProps {
  titleMain?: string;
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
  textColor = "text-pov-black",
  className = "",
}: SectionHeadingProps) {
  const [isMobileOrTab, setIsMobileOrTab] = useState(false);

  // Check if current device is mobile or tablet (typically < 1024px)
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileOrTab(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Use the prop value on Desktop, but force 'true' on Mobile/Tab
  const isActive = isMobileOrTab || isSectionHovered;

  const dotBaseColor = textColor.replace("text-", "bg-");
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div
      className={`
        w-full
        flex flex-row
        items-start md:items-center
        ${hasChildren ? "justify-between" : "justify-start"}
        px-6 md:px-10
        py-4 md:py-[30px]
        z-40
        transition-colors duration-300
        ${sticky ? `sticky ${stickyTop}` : "relative"}
        ${bgColor}
        ${className}
      `}
    >
      {/* LEFT SIDE: ICON + TITLES */}
      <div className="flex items-center gap-[10px]">
        
        {/* BLINKING DOT ICON */}
        <div className="relative w-[25px] h-[25px] flex items-center justify-center shrink-0">
          
          {/* Glow */}
          <div
            className={`
              absolute w-[14px] h-[14px]
              bg-primary-red
              rounded-full
              blur-[10px]
              transition-all duration-300
              ${
                isActive // Changed from isSectionHovered
                  ? "animate-pulse-glow opacity-80"
                  : "opacity-0"
              }
            `}
          />

          {/* Main Dot */}
          <div
            className={`
              relative w-[7px] h-[7px]
              rounded-full
              z-10
              transition-colors duration-300
              ${isActive ? "bg-primary-red" : dotBaseColor} // Changed from isSectionHovered
            `}
          />
        </div>

        {/* TITLE GROUP */}
        <div className={`flex flex-col font-display ${textColor}`}>
          
          {/* Main Title */}
          <div className="text-h3-mobile md:text-h3-tab leading-[1.2] uppercase">
            <span className="font-bold">{titleMain}</span>
            <span className="font-bold"> {titleBold}</span>
          </div>

          {/* Subtitle */}
          {subTitle && (
            <span className="text-small-mobile md:text-small-tab lg:text-small opacity-50 mt-1">
              {subTitle}
            </span>
          )}
        </div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      {hasChildren && (
        <div
          className={`
            mt-0
            flex  items-center
            gap-4 md:gap-6
            ${textColor}
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
}