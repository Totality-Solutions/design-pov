"use client";

import React, { useState } from "react";
import MarqueeFlow from "../common/MarqueeFlow";
import Image from "@/components/common/SmartImage";
import Link from "next/link";
import SectionHeading from "../common/SectionHeading";
import type { PressMention } from "@/lib/pressMentions";

// Items come from the CMS (About → Press Mentions) via the About page.
const EcosystemSection = ({ items }: { items: PressMention[] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      className="w-full bg-white py-8"
    >
      <SectionHeading 
        titleMain="Press" 
        titleBold="Mentions" 
        sticky={false}
        isSectionHovered={isHovered} 
      >
        {/* <p className="text-sm opacity-60">View all our work</p>
        <CTABtn /> */}
      </SectionHeading>
      <div className="w-full bg-white overflow-hidden h-[160px] md:h-[140px] 2xl:h-[200px] py-4 flex items-end">
        <MarqueeFlow
          items={items}
          gap={0}
          speed={200}
          desktopCount={4}
          onExpandChange={setExpandedIndex}
          renderItem={(item, index) => {
            const isExpanded = index === expandedIndex;
            const isVideo = typeof item.img === 'string' && item.img.match(/\.(mp4|webm|ogg)$/i);
            return (
              <Link
                href={item.href || '#'}
                {...(item.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="relative block w-full overflow-hidden border-r  border-gray-200 hover:bg-black/10"
                style={{
                  aspectRatio:'14/4',
                  transition: "aspect-ratio 2000ms cubic-bezier(0.22, 1, 0.36, 1)",
                  transformOrigin: 'bottom',
                }}
              >
                {isVideo ? (
                  <video
                    src={item.img as string}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata" 
                    className="absolute inset-0 w-full h-full object-contain will-change-transform"
                    style={{
                      transform: isExpanded ? 'translate3d(0,0,0) scale(1.15)' : 'translate3d(0,0,0) scale(1)',
                      transition: 'transform 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'bottom center',
                    }}
                  />
                ) : (
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain will-change-transform p-2"
                    style={{
                      transform: isExpanded ? 'translate3d(0,0,0) scale(1)' : 'translate3d(0,0,0) scale(1)',
                      transition: 'transform 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'bottom center',
                      backfaceVisibility: 'hidden',
                    }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
              </Link>
            );
          }}
        />
      </div>
    </section>
  );
};

export default EcosystemSection;