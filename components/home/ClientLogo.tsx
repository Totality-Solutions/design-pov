"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Link from "next/link";

const ClientLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);

  const Client = Array.from({ length: 65 }, (_, i) => i + 1).map((id) => ({
    src: `/temp/edition/brands/${id}.png`,
    alt: `Client Logo ${id}`,
  }));

  useEffect(() => {
    const measure = () => {
      if (!firstGroupRef.current || !trackRef.current) return;
      const w = firstGroupRef.current.offsetWidth;
      if (w > 0) {
        trackRef.current.style.setProperty("--marquee-shift", `${w}px`);
      }
    };

    measure();

    // Re-measure after each image loads so variable is always accurate
    const imgs = firstGroupRef.current?.querySelectorAll("img") ?? [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <div className="shrink-0 whitespace-nowrap">
          <SectionHeading
            titleMain="Brands"
            titleBold="2026"
            sticky={false}
            isSectionHovered={isHovered}
          />
        </div>
        {/* overflow-hidden is on its own wrapper so the track's max-content width is not constrained by flex layout */}
        <div className="overflow-hidden flex-1 min-w-0 w-full">
          <div ref={trackRef} className="marquee-track py-6">
            <div ref={firstGroupRef} className="flex gap-8 pr-8">
              {Client.map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain shrink-0"
                  draggable={false}
                />
              ))}
            </div>
            <div className="flex gap-8 pr-8" aria-hidden="true">
              {Client.map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain shrink-0"
                  draggable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClientLogo;
