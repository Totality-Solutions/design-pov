"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Magazine", href: "/magazine" },
  { label: "Sponsors", href: "/magazine/sponsors" },
  { label: "Partners", href: "/magazine/partners" },
  { label: "Archives", href: "/magazine/archives" },
  { label: "Submit", href: "/magazine/submit" },
  { label: "Team", href: "/magazine/team" },
  { label: "Contact", href: "/magazine/contact" },
];

export default function MagazineNav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Function to update the red line position
  const updateSlider = (index: number | null) => {
    if (index !== null && index !== 0 && itemRefs.current[index]) {
      const element = itemRefs.current[index];
      if (element) {
        setSliderStyle({
          left: element.offsetLeft,
          width: element.offsetWidth,
        });
      }
    } else {
      // Hide or reset if hovering "Magazine" or nothing
      setSliderStyle((prev) => ({ ...prev, width: 0 }));
    }
  };

  useEffect(() => {
    // Optional: Reset slider to active item on mount/route change
    const activeIdx = navItems.findIndex(item => item.href === pathname);
    if (activeIdx > 0) updateSlider(activeIdx);
  }, [pathname]);

  return (
    <nav 
      className="w-full h-full bg-white border-b border-[#DDDDDD] flex items-center justify-start overflow-x-auto no-scrollbar"
      style={{ paddingLeft: "60px", paddingRight: "60px" }}
      ref={navRef}
    >
      <div className="relative flex items-center gap-[10px] min-w-max" onMouseLeave={() => setHoveredIndex(null)}>
        
        {/* ✅ THE SLIDING RED UNDERLINE */}
        <div 
          className="absolute bottom-[-1px] h-[2px] bg-[#E02914] transition-all duration-500 ease-in-out pointer-events-none z-20"
          style={{
            left: `${sliderStyle.left}px`,
            width: `${sliderStyle.width}px`,
            opacity: hoveredIndex !== null && hoveredIndex !== 0 ? 1 : 0
          }}
        />

        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const isFirst = index === 0;
          const isHovered = hoveredIndex === index;

          return (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => { itemRefs.current[index] = el; }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                updateSlider(index);
              }}
              className={`
                relative flex items-center justify-center transition-colors duration-300
                font-['Montserrat'] text-[18px] leading-[24px]
                ${isFirst ? "py-[12px] pr-[28px] border-r border-[#DDDDDD] font-normal" : "px-[30px] py-[20px] font-normal"}
                
                /* ✅ TEXT RED LOGIC */
                ${isFirst 
                  ? "text-black opacity-100" 
                  : (isHovered || isActive) 
                    ? "text-[#E02914] opacity-100" 
                    : "text-black opacity-50"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}