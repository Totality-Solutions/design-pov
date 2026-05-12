"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CTABtn from "./CTABtn";

type CTAProps = {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref?: string;
  onClick?: () => void;

  // Background Props (Normal)
  bgColor?: string;
  bgImage?: string;
  bgVideo?: string;

  // Background Props (Hover)
  hoverBgColor?: string;

  // Text Colors
  textColor?: string;
  hoverTextColor?: string;

  // Floating Image (3D effect)
  floatingImage?: string;
  floatingImageHeight?: number;
  floatingImageWidth?: number;

  className?: string;
};

const CTAStrip = ({
  title,
  ctaLabel,
  ctaHref = "#",
  onClick,
  bgColor = "#ffffff",
  bgImage,
  bgVideo,
  hoverBgColor,
  textColor = "#000000",
  hoverTextColor,
  floatingImage,
  floatingImageWidth = 200, 
  floatingImageHeight = 160,
  className = "",
}: CTAProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Logic: Mobile/Tablet (< 1024px) will act as "permanently hovered"
      setIsTouchDevice(window.innerWidth < 1024);
      setIsHovered(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsHovered(false);
  };

  const handleMobileAction = () => {
    if (onClick) {
      onClick();
    } else if (ctaHref) {
      window.location.href = ctaHref;
    }
  };

  // Determine if we should show the "Hover" look (True if mobile OR currently hovered on desktop)
  const showActiveState = isTouchDevice || isHovered;

  const currentBg = showActiveState && hoverBgColor ? hoverBgColor : bgColor;
  const currentText = showActiveState && hoverTextColor ? hoverTextColor : textColor;

  const aspectRatio = floatingImageWidth / floatingImageHeight;

  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-visible transition-colors duration-500 ease-in-out ${className}`}
      style={{ backgroundColor: currentBg }}
    >
      {/* --- 1. BACKGROUND MEDIA LAYER --- */}
      {(bgImage || bgVideo) && (
        <div 
          className={`absolute inset-0 z-0 transition-opacity duration-500 ${
            showActiveState && hoverBgColor ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {bgImage && <Image src={bgImage} alt="" fill sizes="100vw" className="object-cover" />}
          {bgVideo && (
            <video
              src={bgVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* --- 2. FLOATING IMAGE --- */}
      {floatingImage && (
        <button 
          onClick={isTouchDevice ? handleMobileAction : undefined}
          className={`absolute z-20 transition-all duration-700 ease-out origin-bottom outline-none
            hidden lg:block
            ${isTouchDevice ? "pointer-events-auto cursor-pointer" : "pointer-events-none"}
            lg:w-[var(--desktop-width)]
          `}
          style={{ 
            "--desktop-width": `${floatingImageWidth}px`,
            aspectRatio: aspectRatio, 
            right: "25%", 
            bottom: "0px", 
            transform: showActiveState 
              ? "translateY(-20px) rotate(-10deg) " 
              : "translateY(0) rotate(0deg) scale(1)",
            filter: showActiveState 
              ? "drop-shadow(0px 25px 35px rgba(0,0,0,0.25))" 
              : "drop-shadow(0px 5px 10px rgba(0,0,0,0.1))"
          } as React.CSSProperties}
        >
          <Image 
            src={floatingImage} 
            alt="3D decorative element" 
            fill 
            className="object-contain object-bottom" 
            priority
          />
        </button>
      )}

      {/* --- 3. CONTENT LAYER --- */}
      <div className="relative z-10 px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
        
        <div className="flex-1 md:max-w-[350px] ">
          <h2
            className={`text-lg md:text-xl lg:text-2xl font-semibold transition-colors tracking-tight duration-300`}
            style={{ color: currentText, fontFamily: 'Montserrat, sans-serif' }}
          >
            {title}
          </h2>
        </div>

        <div className="shrink-0 relative z-30 block">
          <CTABtn
            label={ctaLabel}
            href={onClick ? undefined : ctaHref}
            onClick={onClick}
            iconType="arrow"
            btnBg="var(--color-white)"
            btnHoverBg="var(--primary-blue)"
            textColor="var(--color-black)"
            borderColor="var(--color-black)"
            borderHoverColor="var(--primary-blue)"
            lineColor="var(--color-white)"
            lineHoverColor="var(--primary-blue)"
            bottomKey1Width="40px"
            bottomKey2Width="12px"
            bottomKey1Right="50px"
            bottomKey2Right="15px"
            forceHover={showActiveState}
          />
        </div>
      </div>
    </section>
  );
};

export default CTAStrip;