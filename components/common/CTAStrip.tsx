"use client";

import React, { useState } from "react";
import Image from "next/image";
import CTABtn from "./CTABtn";

type CTAProps = {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  
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
  floatingImageWidth?: number;
  
  className?: string;
};

const CTAStrip = ({
  title,
  ctaLabel,
  ctaHref,
  bgColor = "#ffffff",
  bgImage,
  bgVideo,
  hoverBgColor,
  textColor = "#000000",
  hoverTextColor,
  floatingImage,
  floatingImageWidth = 150,
  className = "",
}: CTAProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine current active styles
  const currentBg = isHovered && hoverBgColor ? hoverBgColor : bgColor;
  const currentText = isHovered && hoverTextColor ? hoverTextColor : textColor;

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full overflow-visible transition-all duration-500 ease-in-out ${className}`}
      style={{ backgroundColor: currentBg }}
    >
      {/* --- BACKGROUND MEDIA (Hidden on hover if hoverBgColor exists) --- */}
      {bgImage && (
        <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isHovered && hoverBgColor ? 'opacity-0' : 'opacity-100'}`}>
            <Image src={bgImage} alt="" fill className="object-cover" />
        </div>
      )}
      
      {bgVideo && (
        <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isHovered && hoverBgColor ? 'opacity-0' : 'opacity-100'}`}>
            <video src={bgVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>
      )}

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Text */}
        <div className="flex-1 max-w-[300px]">
          <h2
            className="text-2xl md:text-2xl font-semibold transition-colors tracking-tight duration-300"
            style={{ color: currentText, fontFamily: 'Montserrat, sans-serif' }}
          >
            {title}
          </h2>
        </div>

        {/* Right Side: Image + Button */}
        <div className="flex items-center gap-6 md:gap-12 relative">
          
          {floatingImage && (
            <div 
              className={`relative z-20 transition-all duration-700 ease-out pointer-events-none 
                ${isHovered ? "scale-110 -translate-y-16 rotate-3" : "scale-100 -translate-y-10"}`}
              style={{ width: floatingImageWidth, height: floatingImageWidth }}
            >
              <Image 
                src={floatingImage} 
                alt="3D element" 
                fill 
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
              />
            </div>
          )}

          <div className="shrink-0">
            {/* THE FIXED CTA BUTTON */}
            <CTABtn
              label={ctaLabel}
              href={ctaHref}
              iconType="arrow"
              btnBg="var(--color-white)"
              btnHoverBg="var(--primary-blue)"
              textColor="var(--color-black)"
              borderColor="var(--color-black)"
              borderHoverColor="transparent"
              lineColor="var(--color-white)"
              lineHoverColor="var(--primary-blue)"
              bottomKey1Width="40px"
              bottomKey2Width="12px"
              bottomKey1Right="50px"
              bottomKey2Right="15px"
              forceHover={isHovered}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAStrip;