"use client";

import React, { useState, useEffect, useRef } from 'react';
import SectionHeading from '../common/SectionHeading';

const CATEGORIES = [
  "Partners",
  // "Brands",
  // "Brand Collaborators",
  "Build Partners",
  "Gifting Partners",
  "Media Partners",
  "Digital Media Partners",
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
    { id: 1, category: "Partners", logo: "/temp/edition/sponsors/1.png" },
    { id: 2, category: "Partners", logo: "/temp/edition/sponsors/2.png" },
    { id: 7, category: "Partners", logo: "/temp/edition/sponsors/3.png" },
    { id: 9, category: "Partners", logo: "/temp/edition/sponsors/4.png" },
    { id: 12, category: "Partners", logo: "/temp/edition/sponsors/5.png" },
    // Brands
    ...Array.from({ length: 48 }, (_, i) => ({ id: 100 + i, category: "Brands", logo: `/temp/edition/brands/${i + 1}.png` })),
    // Brand Collaborators
    { id: 30, category: "Brand Collaborators", logo: "/logos/logo-placeholder.svg" },
    // Build Partners
    { id: 3, category: "Build Partners", logo: "/temp/edition/build-partners/1.png" },
    { id: 8, category: "Build Partners", logo: "/temp/edition/build-partners/2.png" },
    { id: 10, category: "Build Partners", logo: "/temp/edition/build-partners/3.png" },
    { id: 13, category: "Build Partners", logo: "/temp/edition/build-partners/4.png" },
    { id: 15, category: "Build Partners", logo: "/temp/edition/build-partners/5.png" },
    { id: 17, category: "Build Partners", logo: "/temp/edition/build-partners/6.png" },
    { id: 17, category: "Build Partners", logo: "/temp/edition/build-partners/7.png" },
    { id: 17, category: "Build Partners", logo: "/temp/edition/build-partners/8.png" },
    { id: 17, category: "Build Partners", logo: "/temp/edition/build-partners/9.png" },
    // Gifting Partners
    { id: 40, category: "Gifting Partners", logo: "/temp/edition/gifting-partners/1.png" },
    { id: 40, category: "Gifting Partners", logo: "/temp/edition/gifting-partners/2.png" },
    { id: 40, category: "Gifting Partners", logo: "/temp/edition/gifting-partners/4.png" },
    // Media Partners
    { id: 50, category: "Media Partners", logo: "/temp/edition/media-partners/1.png" },
    { id: 50, category: "Media Partners", logo: "/temp/edition/media-partners/2.png" },
    { id: 50, category: "Media Partners", logo: "/temp/edition/media-partners/3.png" },
    // Degital Media Partners
    { id: 60, category: "Digital Media Partners", logo: "/temp/edition/media-partners/4.png" },
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
        <div className="hidden md:flex">
            <a href='/edition/brands' className="opacity-100 hover:cursor-pointer hover:underline hover:text-primary-red text-lg font-medium text-black">
              View Brands
            </a>
          </div>
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
        <div className={`grid border-t border-[#EEEEEE] ${
          activeTab === "Partners" 
          ? "grid-cols-1 md:grid-cols-6" // Larger layout for main Partners
          : "grid-cols-3 md:grid-cols-6" // Standard layout for others
        }`}>
          {gridCells.map((_, index) => {
            const partner = filtered[index];
            const isMain = activeTab === "Partners";
            
            return (
              <div
                key={index}
                className={`flex items-center justify-center border-b border-pov-black/30 transition-colors duration-300 hover:bg-gray-50/50 ${
                  isMain 
                  ? "aspect-[16/13] mx-4" 
                  : "aspect-[16/13] p-8  mx-4"
                }`}
              >
                {partner ? (
                  <img 
                    src={partner.logo} 
                    alt="Partner Logo" 
                    className={`object-contain transition-all duration-500 ${
                      isMain ? "max-w-[85%] max-h-[70%]" : "max-w-[75%] max-h-[50%]"
                    }`}
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