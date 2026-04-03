"use client";

import React, { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  "Sponsors",
  "Build Partners",
  "Art Curation",
  "Space Scenting",
  "Operations",
  "Media", // Added more to test scrolling
  "Strategy"
];

const PartnersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Sponsors");
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Logic to scroll the active tab into view
  const handleTabClick = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(cat);
    const target = e.currentTarget;
    
    // Smooth scroll the clicked button into the center of the viewport
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const partners = [
    { id: 1, category: "Sponsors", logo: "/logos/logo1.svg" },
    { id: 2, category: "Sponsors", logo: "/logos/logo2.svg" },
    { id: 3, category: "Build Partners", logo: "/logos/logo3.svg" },
    { id: 4, category: "Art Curation", logo: "/logos/logo4.svg" },
    { id: 5, category: "Space Scenting", logo: "/logos/logo5.svg" },
    { id: 6, category: "Operations", logo: "/logos/logo6.svg" },
    { id: 7, category: "Sponsors", logo: "/logos/logo7.svg" },
    { id: 8, category: "Build Partners", logo: "/logos/logo8.svg" },
    { id: 9, category: "Sponsors", logo: "/logos/logo9.svg" },
    { id: 10, category: "Build Partners", logo: "/logos/logo10.svg" },
    { id: 11, category: "Sponsors", logo: "/logos/logo11.svg" },
    { id: 12, category: "Sponsors", logo: "/logos/logo12.svg" },
    { id: 13, category: "Build Partners", logo: "/logos/logo13.svg" },
    { id: 14, category: "Sponsors", logo: "/logos/logo14.svg" },
    { id: 15, category: "Build Partners", logo: "/logos/logo15.svg" },
    { id: 16, category: "Sponsors", logo: "/logos/logo16.svg" },
    { id: 17, category: "Build Partners", logo: "/logos/logo17.svg" },
  ];
  
  const filtered = partners.filter(p => p.category === activeTab);
  
  const columns = isMobile ? 3 : 6;
  const remainder = filtered.length % columns;
  const paddingNeeded = remainder === 0 ? 0 : columns - remainder;
  const displayCount = filtered.length === 0 ? columns : filtered.length + paddingNeeded;
  const gridCells = Array.from({ length: displayCount });

  return (
    <section className="w-full bg-white flex flex-col font-['Montserrat',sans-serif]">
      
      {/* 1. HEADER AREA */}
      <div className="w-full px-5 md:px-[60px] py-[25px] border-b border-[#EEEEEE] flex items-center justify-start">
        <div className="flex items-center gap-[12px]">
          <div className="relative w-[28px] h-[28px] flex items-center justify-center">
            <div className="absolute w-[12px] h-[12px] bg-[#E02914] opacity-30 rounded-full blur-[4px]" />
            <div className="w-[6px] h-[6px] bg-[#E02914] rounded-full relative z-10" />
          </div>
          <h2 className="text-[20px] md:text-[22px] tracking-tight text-black">
            <span className="font-normal">Partners_</span>
            <span className="font-bold">2026</span>
          </h2>
        </div>
      </div>

      {/* 2. TAB NAVIGATION (With auto-centering scroll) */}
      <div 
        ref={scrollContainerRef}
        className="w-full bg-white border-b border-[#EEEEEE] overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar md:mx-16 lg:mx-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex px-5 md:px-[60px] gap-8 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={(e) => handleTabClick(cat, e)}
              className={`py-[18px] text-[16px] md:text-[18px] transition-all duration-300 border-b-2 whitespace-nowrap outline-none snap-start ${
                activeTab === cat 
                ? "border-[#E02914] text-[#E02914] font-medium" 
                : "border-transparent text-[#999999] hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PARTNER LOGO GRID */}
      <div className="w-full bg-white">
        <div className="grid grid-cols-3 md:grid-cols-6 border-t border-[#EEEEEE]">
          {gridCells.map((_, index) => {
            const partner = filtered[index];
            return (
              <div
                key={index}
                className="aspect-square flex items-center justify-center p-4 md:p-8 border-r border-b border-[#EEEEEE] transition-colors duration-300 hover:bg-gray-50/50"
              >
                {partner ? (
                  <img 
                    src={partner.logo} 
                    alt="Partner Logo" 
                    className="max-w-[75%] max-h-[50%] object-contain grayscale brightness-0 opacity-80 hover:opacity-100 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS for hiding scrollbars (Tailwind doesn't have native no-scrollbar by default) */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;