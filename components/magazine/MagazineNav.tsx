"use client";

import React, { useState, useRef, useEffect } from "react";

interface NavProps {
  activeCategory: string;
  setActiveCategory: (val: string) => void;
}

const navItems = [
  { label: "Magazine" },
  { label: "POV Blogs" },
  { label: "Art" },
  { label: "Design" },
  { label: "Spotlight" },
  { label: "Submit" },
];

export default function MagazineNav({ activeCategory, setActiveCategory }: NavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateSlider = (index: number | null) => {
    // We only update the position if the index is valid and not the first item (Magazine)
    if (index !== null && index !== 0 && itemRefs.current[index]) {
      const element = itemRefs.current[index];
      if (element) {
        setSliderStyle({
          left: element.offsetLeft,
          width: element.offsetWidth,
        });
      }
    } else {
      // If index is null or "Magazine", we reset width to 0 to hide it effectively
      setSliderStyle((prev) => ({ ...prev, width: 0 }));
    }
  };

  // Effect to update slider position when activeCategory changes 
  // (This keeps the position data ready, but opacity handles visibility)
  useEffect(() => {
    const activeIdx = navItems.findIndex(item => item.label === activeCategory);
    updateSlider(activeIdx);
  }, [activeCategory]);

  return (
    <nav 
      className="w-full h-full bg-white border border-[#DDDDDD] flex items-center justify-start overflow-x-auto no-scrollbar"
      style={{ paddingLeft: "60px", paddingRight: "60px" }}
    >
      <div 
        className="relative flex items-center gap-[10px] min-w-max" 
        onMouseLeave={() => {
          setHoveredIndex(null);
          // Optional: also call updateSlider(null) if you want it to shrink immediately
          updateSlider(null); 
        }}
      >
        
        {/* ✅ THE SLIDING RED UNDERLINE */}
        <div 
          className="absolute bottom-[-1px] h-[2px] bg-[#E02914] transition-all duration-500 ease-in-out pointer-events-none z-20"
          style={{
            left: `${sliderStyle.left}px`,
            width: `${sliderStyle.width}px`,
            // CHANGE: Underline is ONLY visible if hoveredIndex is not null and not the first item
            opacity: (hoveredIndex !== null && hoveredIndex !== 0) ? 1 : 0
          }}
        />

        {navItems.map((item, index) => {
          const isActive = activeCategory === item.label;
          const isFirst = index === 0;
          const isHovered = hoveredIndex === index;

          return (
            <button
              key={item.label}
              ref={(el) => { itemRefs.current[index] = el; }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                updateSlider(index);
              }}
              onClick={() => setActiveCategory(item.label)}
              className={`
                relative flex items-center justify-center transition-colors duration-300
                font-['Montserrat'] text-[16px] leading-[24px] outline-none cursor-pointer
                ${isFirst ? "py-[15px] pr-[28px] border-r border-[#DDDDDD] font-normal" : "px-[30px] py-[15px] font-normal"}
                ${isFirst ? "text-black opacity-100" : (isHovered || isActive) ? "text-primary-red font-semibold opacity-100" : "text-black opacity-50"}
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}