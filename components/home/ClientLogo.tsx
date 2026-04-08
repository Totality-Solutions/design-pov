"use client";

import React, { useState } from "react";
import { Container } from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const ClientLogo = () => {
  const IGNORED_IDS = [41, 27, 40, 50, 18, 21, 53, 20];
  const [isHovered, setIsHovered] = useState(false)

  const Client = Array.from({ length: 10 }, (_, i) => i + 1)
    .filter((id) => !IGNORED_IDS.includes(id))
    .map((id) => ({
      src: `/temp/client/${id}.png`,
      alt: `Client Logo ${id}`,
    }));

  return (
    <Container 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    <div className="overflow-hidden ">
      <SectionHeading 
        titleMain="Brands_" 
        titleBold="2026" 
        sticky={false}
        isSectionHovered={isHovered} 
      >
      </SectionHeading>
      <div className="marquee-track ">
        {[...Client, ...Client].map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="h-24 w-auto object-contain shrink-0"
            draggable={false}
          />
        ))}
      </div>
    </div>
    </Container>
  );
};

export default ClientLogo;