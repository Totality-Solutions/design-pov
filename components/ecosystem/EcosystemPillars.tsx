"use client";

import React, { useRef } from "react";
import Image from "@/components/common/SmartImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { EcosystemPillar } from "@/lib/ecosystemContent";

export default function EcosystemCarousel({ pillars: ecosystemPillars }: { pillars: EcosystemPillar[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden border-b border-pov-black/10 bg-pov-white">
      
      {/* LEFT NAV */}
      <div className="absolute left-2 top-2/5 z-40 -translate-y-1/2">
        <button
          onClick={() => scroll("left")}
          className="
            flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center
            border border-pov-black/10
            bg-white
            transition-colors
            hover:bg-black hover:text-white
          "
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* RIGHT NAV */}
      <div className="absolute right-2 top-2/5 z-40 -translate-y-1/2">
        <button
          onClick={() => scroll("right")}
          className="
            flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center
            border border-pov-black/10
            bg-white
            transition-colors
            hover:bg-black hover:text-white
          "
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* CAROUSEL */}
      <div
        ref={scrollRef}
        className="
          flex
          overflow-x-auto
          snap-x snap-mandatory
          scrollbar-hide
          scroll-smooth
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {ecosystemPillars.map((pillar, i) => (
          <div
            key={i}
            className="
              group
              flex-shrink-0
              snap-start
              border-r border-pov-black/10

              w-full
              md:w-1/2
              lg:w-1/4

              px-6 lg:px-10
              py-8 md:py-10
            "
          >
            <PillarCard pillar={pillar} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
}: {
  pillar: EcosystemPillar;
}) {
  return (
    <Link
      href={pillar.href || "#"}
      className="flex h-full flex-col"
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[8/4] overflow-hidden bg-black/5">

        {pillar.image && (
        <Image
          src={pillar.image}
          alt={pillar.title}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />
        )}

        {/* OVERLAY */}
        <div
          className="
            absolute inset-0 z-20
            flex items-center justify-center
            bg-black/25
            transition-opacity duration-500
            group-hover:opacity-0
          "
        >
          {pillar.logo && (
          <div className="relative h-14 w-28">
            <Image
              src={pillar.logo}
              alt={`${pillar.title} logo`}
              fill
              className="object-contain"
            />
          </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col pt-5">
        
        <h3
          className="
            text-[22px]
            md:text-[24px]
            font-medium
            tracking-[-0.04em]
            mb-3
          "
        >
          {pillar.title}
        </h3>

        <p
          className="
            text-body-mobile
            md:text-body-tab
            lg:text-body
            leading-relaxed
            opacity-80
          "
        >
          {pillar.description}
        </p>
      </div>
    </Link>
  );
}