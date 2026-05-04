"use client";

import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';

const HomeSponsors: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // The 4 logos you want to display
  const partners = [
     { id: 1, logo: "/temp/edition/sponsors/2.png" },
    { id: 2, logo: "/temp/edition/sponsors/4.png" },
    { id: 7, logo: "/temp/edition/sponsors/1.png" },
    { id: 9, logo: "/temp/edition/sponsors/3.png" },
  ];

  return (
    <section 
      className="w-full bg-white flex flex-col font-display"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. HEADING */}
      <SectionHeading 
        titleMain="POV SPONSORS" 
        sticky={false}
        bgColor="black"
        isSectionHovered={isHovered} 
      />

      {/* 2. PARTNER LOGO GRID (Exact same structure as your snippet) */}
      <div className="w-full bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 ">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="aspect-[2/1] flex items-center justify-center p-4 md:p-8 border-b mx-4 border-pov-black/30 transition-colors duration-300 hover:bg-gray-50/50"
            >
              <img 
                src={partner.logo} 
                alt="Partner Logo" 
                className="max-w-[75%] max-h-[50%] object-contain grayscale brightness-0 opacity-80 hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
          
          {/* Optional: If you want to keep the "empty grid" look to match 
              a 4-column row exactly, no extra spacers are needed here. */}
        </div>
      </div>
    </section>
  );
};

export default HomeSponsors;