"use client";

import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import Link from 'next/link';

const HomeSponsors: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // The 4 logos you want to display
  const partners = [
     { id: 1, logo: "/temp/edition/sponsors/1.png", href: "https://www.kajariaceramics.com/"},
    { id: 2, logo: "/temp/edition/sponsors/2.png", href: "https://www.pacific-surfaces.com/" },
    { id: 3, logo: "/temp/edition/sponsors/3.png", href: "https://www.allhome.in/" },
    { id: 4, logo: "/temp/edition/sponsors/4.png", href: "https://www.essentiahome.com/?srsltid=AfmBOoqCYRZnQWfAJ8Tx74fKI-F59l2uzZUYhcKm6bUDxvV6r0RBMmld" },
    { id: 5, logo: "/temp/edition/sponsors/5.png", href: "https://www.pantone.com/hk/en/" },
  ];

  return (
    <section 
      className="w-full bg-white flex flex-col font-display"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. HEADING */}
      <SectionHeading 
        titleMain="POV PARTNERS" 
        sticky={false}
        bgColor="black"
        isSectionHovered={isHovered} 
      />

      {/* 2. PARTNER LOGO GRID (Exact same structure as your snippet) */}
      <div className="w-full bg-white">
        <div className="grid grid-cols-2 md:grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="aspect-[9/4] lg:aspect-[6/3] flex items-center justify-center lg:p-2 transition-colors duration-300 hover:bg-gray-50/50 overflow-hidden"
            >
              {/* Make the Link a flex container that fills the parent */}
              <Link 
                href={partner?.href} 
                className="w-full h-full flex items-center justify-center border-b mx-6 border-pov-black/30 cursor-pointer"
              >
                <img 
                  src={partner.logo} 
                  alt={"Partner Logo"} 
                  className="max-w-full max-h-full object-cover hover:scale-105 transition-all duration-500"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSponsors;