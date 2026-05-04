"use client";

import React, { useState, useEffect, useRef } from 'react';
import SectionHeading from '../common/SectionHeading';

const CATEGORIES = [
  "Partners",
  "Brands",
  "Brand Collaborators",
  "Build Partners",
  "Gifting Partners",
  "Media Partners",
  "Degital Media Partner",
  "Ticketing Partners",
  "Sensory Collaborator",
  "Key execution Partner"
];

const PartnersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Partners");
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(cat);
    const target = e.currentTarget;
    
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
    // Partners
    { id: 1, category: "Partners", logo: "/temp/edition/sponsors/2.png" },
    { id: 2, category: "Partners", logo: "/temp/edition/sponsors/4.png" },
    { id: 7, category: "Partners", logo: "/temp/edition/sponsors/1.png" },
    { id: 9, category: "Partners", logo: "/temp/edition/sponsors/3.png" },
    // Brands
    ...Array.from({ length: 48 }, (_, i) => ({ id: 100 + i, category: "Brands", logo: `/temp/edition/brands/${i + 1}.png` })),
    // Brand Collaborators
    { id: 30, category: "Brand Collaborators", logo: "/logos/logo-placeholder.svg" },
    // Build Partners
    { id: 3, category: "Build Partners", logo: "/logos/logo3.svg" },
    { id: 8, category: "Build Partners", logo: "/logos/logo8.svg" },
    { id: 10, category: "Build Partners", logo: "/logos/logo10.svg" },
    { id: 13, category: "Build Partners", logo: "/logos/logo13.svg" },
    { id: 15, category: "Build Partners", logo: "/logos/logo15.svg" },
    { id: 17, category: "Build Partners", logo: "/logos/logo17.svg" },
    // Gifting Partners
    { id: 40, category: "Gifting Partners", logo: "/temp/edition/gifting-partners/1.png" },
    { id: 40, category: "Gifting Partners", logo: "/temp/edition/gifting-partners/2.png" },
    { id: 40, category: "Gifting Partners", logo: "/temp/edition/gifting-partners/4.png" },
    // Media Partners
    { id: 50, category: "Media Partners", logo: "/temp/edition/media-partners/1.png" },
    { id: 50, category: "Media Partners", logo: "/temp/edition/media-partners/2.png" },
    { id: 50, category: "Media Partners", logo: "/temp/edition/media-partners/3.png" },
    // Degital Media Partner
    { id: 60, category: "Degital Media Partner", logo: "/temp/edition/media-partners/4.png" },
    // Ticketing Partners
    { id: 70, category: "Ticketing Partners", logo: "/temp/edition/ticketing-partners/1.png" },
    // Sensory Collaborator
    { id: 5, category: "Sensory Collaborator", logo: "/temp/edition/sensory/12.png" },
    // Key execution Partner
    { id: 6, category: "Key execution Partner", logo: "/temp/edition/key-execution/1.jpg" },
  ];
  
  const filtered = partners.filter(p => p.category === activeTab);
  
  const columns = isMobile ? 3 : 1;
  const remainder = filtered.length % columns;
  const paddingNeeded = remainder === 0 ? 0 : columns - remainder;
  const displayCount = filtered.length === 0 ? columns : filtered.length + paddingNeeded;
  const gridCells = Array.from({ length: displayCount });
      const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full bg-white flex flex-col font-display"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <SectionHeading 
        titleMain="POV PARTNERS" 
        sticky={false}
        bgColor = "black"
        isSectionHovered={isHovered} 
      >
      </SectionHeading>

      {/* 2. TAB NAVIGATION (Responsive Spacing Fix) */}
      <div 
        ref={scrollContainerRef}
        className="w-full bg-white border-b border-[#EEEEEE] overflow-x-auto scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Added px-5 (mobile) and lg:px-[60px] (desktop) to match the header.
            gap-6 (mobile) to gap-10 (desktop) for better breathing room.
        */}
        <div className="flex gap-6 md:gap-10 px-5 lg:px-[60px] min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={(e) => handleTabClick(cat, e)}
              className={`py-[18px] text-[15px] md:text-[18px] transition-all duration-300 border-b-2 whitespace-nowrap outline-none relative ${
                activeTab === cat 
                ? "border-[#E02914] text-[#E02914] font-semibold" 
                : "border-transparent text-[#999999] hover:text-black font-medium"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PARTNER LOGO GRID */}
      <div className="w-full bg-white pb-12">
        <div className="grid grid-cols-3 md:grid-cols-6 border-t border-[#EEEEEE] ">
          {gridCells.map((_, index) => {
            const partner = filtered[index];
            return (
              <div
                key={index}
                className="aspect-square flex items-center justify-center p-4 md:p-8 border-b mx-4 border-pov-black/30 transition-colors duration-300 hover:bg-gray-50/50"
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

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;