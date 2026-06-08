"use client";
import { cdn } from "@/lib/cdn";

import React, { useState } from "react";
import MarqueeFlow from "../common/MarqueeFlow";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../common/SectionHeading";
import CTABtn from "../common/CTABtn";

const ITEMS = [
  { id: 1, img: cdn("/temp/about/architecture-design.png"), title: "Architects", href: "https://www.architectureplusdesign.in/business-centre/asif-sataar-gagan-bhatia-perspective-risks-rewards-reinventing-design-pov/" },
  { id: 2, img: cdn("/temp/about/the-hindu.png"), title: "Designers", href: "https://www.thehindu.com/society/mumbais-design-pov-from-bachelor-pad-to-disco-bar/article69767762.ece" },
  { id: 3, img: cdn("/temp/about/design-pataki.png"), title: "Builders", href: "https://www.designpataki.com/dp-cult/how-design-pov-is-reimagining-indias-creative-landscape/#:~:text=The%20execution%20of%20the%20inaugural,studio's%20narrative%20vividly%20to%20life.&text=%E2%80%9CWhen%20we%20were%20organising%20Design,visitors%20in%20just%20three%20days.%E2%80%9D" },
  { id: 4, img: cdn("/temp/about/india-today-home.png"), title: "Brands", href: "https://www.indiatoday.in/magazine/supplements/home/story/20250728-news-events-inside-access-2757644-2025-07-18" },
  { id: 5, img: cdn("/temp/about/the-ideal-home.png"), title: "Creative", href: "https://theidealhomeandgarden.com/interior-design-exhibition-india-design-pov-2025/" },
  { id: 6, img: cdn("/temp/about/svasa.png"), title: "Creative", href: "https://svasalife.com/designpov/?fbclid=PAZXh0bgNhZW0CMTEAAadcYvYRMj3T9_rqVZnFQk7ihe8c_gAlpfQQqJaue2l-n9xWZFxKhdwWDBMIKA_aem_nnZVMvsCr74BaBir8c-TrA" },
];

const EcosystemSection = () => {
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
          items={ITEMS}
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