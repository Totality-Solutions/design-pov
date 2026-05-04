"use client";

import React, { useState } from "react";
import { Container } from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const ClientLogo = () => {
  // const IGNORED_IDS = [41, 27, 40, 50, 18, 21, 53, 20];
  const [isHovered, setIsHovered] = useState(false)

  const Client = Array.from({ length: 10 }, (_, i) => i + 1)
    // .filter((id) => !IGNORED_IDS.includes(id))
    .map((id) => ({
      src: `/temp/clientlogo/${id}.png`,
      alt: `Client Logo ${id}`,
    }));

  return (
    <Container 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    <div className="overflow-hidden flex items-center gap-2 md:gap-4">
      <div className="shrink-0 whitespace-nowrap">
  <SectionHeading 
    titleMain="Brands" 
    titleBold="2026" 
    sticky={false}
    isSectionHovered={isHovered} 
  />
</div>
      <div className="marquee-track py-6">
        {[...Client, ...Client].map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="h-12 w-auto object-contain shrink-0 "
            draggable={false}
          />
        ))}
      </div>
    </div>
    </Container>
  );
};

export default ClientLogo;