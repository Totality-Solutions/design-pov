"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or use your own icon path

const ecosystemPillars = [
  {
    id: 1,
    title: "The Core",
    description: "Sixteen design studios create immersive environments where ideas take spatial form.",
    imageSrc: "/temp/home/ecosystem/N1.jpg",
    logoSrc: "/temp/ecosystem/icons/core.png"
  },
  {
    id: 2,
    title: "Circle",
    description: "A live forum for dialogue—bringing together voices shaping how we think, build, and live.",
    imageSrc: "/temp/home/ecosystem/N-3.jpg",
    logoSrc: "/temp/ecosystem/icons/circle.png"
  },
  {
    id: 3,
    title: "Objects",
    description: "A collection of original, one-of-one pieces—each a distilled expression of perspective.",
    imageSrc: "/temp/home/ecosystem/OBJECT.jpeg",
    logoSrc: "/temp/ecosystem/icons/objects.png"
  },
  {
    id: 4,
    title: "Elevate",
    description: "Curated extensions that create meaningful brand moments beyond the show floor.",
    imageSrc: "/temp/home/ecosystem/N-2.jpg",
    logoSrc: "/temp/ecosystem/icons/elevate.png"
  },
  {
    id: 5,
    title: "Afterhours",
    description: "Where the industry unwinds—a late-night program of music, culture, and networking.",
    imageSrc: "/temp/home/ecosystem/N-4.png",
    logoSrc: "/temp/ecosystem/icons/afterhours.png"
  }
];

export default function EcosystemCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scrolls by one full view width
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-pov-white border-b border-pov-black/10 relative ">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 z-40">
        <button 
          onClick={() => scroll("left")}
          className="p-2 bg-white border border-pov-black/10 hover:bg-black hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-2 z-40">
        <button 
          onClick={() => scroll("right")}
          className="p-2 bg-white border border-pov-black/10 hover:bg-black hover:text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory transition-all duration-500 ease-in-out"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {ecosystemPillars.map((pillar) => (
          <div
            key={pillar.id}
            className="flex-shrink-0 border-r border-pov-black/10 px-12 mx-auto pb-12 group snap-start
                       w-full md:w-[33.33vw] lg:w-[25vw]"
          >
            <PillarCard pillar={pillar} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PillarCard({ pillar }: { pillar: (typeof ecosystemPillars)[0] }) {
  return (
    <div className="flex flex-col items-start text-left">
      <div className="relative w-full aspect-[6/3] bg-[#F2F2F2] overflow-hidden my-8">
        <Image
          src={pillar.imageSrc}
          alt={pillar.title}
          fill
          className="object-cover transition-all duration-700 hover:scale-110"
        />

        <div className="absolute inset-0 z-20 flex items-center justify-center bg-pov-black/30 transition-opacity duration-500 hover:opacity-0">
          <div className="relative w-28 h-14">
            <Image
              src={pillar.logoSrc || "/icons/scanner.png"}
              alt={`${pillar.title} logo`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-body-mobile md:text-body-tab lg:text-body max-w-[260px] opacity-90 leading-snug">
          {pillar.description}
        </p>
      </div>
    </div>
  );
}