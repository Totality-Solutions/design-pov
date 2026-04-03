"use client";

import React, { useState } from 'react';

const CATEGORIES = [
  "Sponsors",
  "Build Partners",
  "Art Curation",
  "Space Scenting",
  "Operations"
];

const PartnersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Sponsors");

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
  
  // Logic: Complete the row based on the 6-column desktop layout
  const columns = 6;
  const remainder = filtered.length % columns;
  const paddingNeeded = remainder === 0 ? 0 : columns - remainder;
  
  // If no partners, show 1 empty row (6 cells), otherwise fill the row
  const displayCount = filtered.length === 0 ? columns : filtered.length + paddingNeeded;
  const gridCells = Array.from({ length: displayCount });

  return (
    <section className="w-full bg-white flex flex-col font-['Montserrat',sans-serif]">
      
      {/* 1. HEADER AREA */}
      <div className="w-full px-6 md:px-[60px] py-[20px] border-b border-[#DFDFDF] flex items-center justify-start">
        <div className="flex items-center gap-[10px]">
          <div className="relative w-[33.33px] h-[33.33px] flex items-center justify-center">
            <div className="absolute w-[13.33px] h-[13.33px] bg-[#E02914] opacity-20 rounded-full blur-[6.67px]" />
            <div className="w-[6.67px] h-[6.67px] bg-[#E02914] rounded-full" />
          </div>
          <h2 className="text-[22px] leading-[36px] text-black">
            <span className="font-medium">Partners_</span>
            <span className="font-bold">2026</span>
          </h2>
        </div>
      </div>

      {/* 2. TAB NAVIGATION */}
      <div className="w-full bg-white border-b border-[#DDDDDD] overflow-x-auto scrollbar-hide">
        <div className="flex px-6 md:px-[60px] gap-6 md:gap-[24px]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`py-[20px] text-[18px] transition-all duration-300 border-b-2 whitespace-nowrap ${
                activeTab === cat 
                ? "border-[#E02914] text-[#E02914] opacity-100" 
                : "border-transparent text-black opacity-50 hover:opacity-80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PARTNER LOGO GRID */}
      <div className="w-full px-6 md:px-[70px] py-[50px] bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-t border-[#DDDDDD]/30">
          {gridCells.map((_, index) => {
            const partner = filtered[index];
            return (
              <div
                key={index}
                className="aspect-square flex items-center justify-center p-6 border-r border-b border-[#DDDDDD]/30 transition-colors duration-500 hover:bg-gray-50/50"
              >
                {partner ? (
                  <img 
                    src={partner.logo} 
                    alt="Partner" 
                    className="max-w-[80%] max-h-[60%] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full opacity-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;