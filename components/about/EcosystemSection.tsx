"use client";

import React, { useState } from "react";
import MarqueeFlow from "../common/MarqueeFlow";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../common/SectionHeading";
import CTABtn from "../common/CTABtn";

const ITEMS = [
  { id: 1, img: "/temp/1.jpg", title: "Architects", href: "https://www.architectureplusdesign.in/business-centre/asif-sataar-gagan-bhatia-perspective-risks-rewards-reinventing-design-pov/" },
  { id: 2, img: "/temp/2.jpg", title: "Designers", href: "https://www.thehindu.com/society/mumbais-design-pov-from-bachelor-pad-to-disco-bar/article69767762.ece" },
  { id: 3, img: "/temp/3.jpg", title: "Builders", href: "https://www.designpataki.com/dp-cult/how-design-pov-is-reimagining-indias-creative-landscape/#:~:text=The%20execution%20of%20the%20inaugural,studio's%20narrative%20vividly%20to%20life.&text=%E2%80%9CWhen%20we%20were%20organising%20Design,visitors%20in%20just%20three%20days.%E2%80%9D" },
  { id: 4, img: "/temp/4.jpeg", title: "Brands", href: "https://www.indiatoday.in/magazine/supplements/home/story/20250728-news-events-inside-access-2757644-2025-07-18" },
  { id: 5, img: "/temp/5.jpg", title: "Creative", href: "https://theidealhomeandgarden.com/interior-design-exhibition-india-design-pov-2025/" },
  { id: 6, img: "/temp/5.jpg", title: "Creative", href: "https://svasalife.com/designpov/?fbclid=PAZXh0bgNhZW0CMTEAAadcYvYRMj3T9_rqVZnFQk7ihe8c_gAlpfQQqJaue2l-n9xWZFxKhdwWDBMIKA_aem_nnZVMvsCr74BaBir8c-TrA" },
];

const EcosystemSection = () => {
  const [isHovered, setIsHovered] = useState(false);
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
      <div className="w-full overflow-hidden h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] flex items-end">
        <MarqueeFlow
          items={ITEMS}
          gap={5}
          speed={200}
          desktopCount={4}
          renderItem={(item, _index, isExpanded) => {
          const isVideo = typeof item.img === 'string' && item.img.match(/\.(mp4|webm|ogg)$/i);
            return (
              <Link
                href={item.href || '#'}
                className="relative block w-full overflow-hidden shadow-xl"
                style={{
                  aspectRatio: isExpanded ? '6/5' : '10/5',
                  transition: "aspect-ratio 2000ms cubic-bezier(0.22, 1, 0.36, 1)",
                  transformOrigin: 'bottom',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget;
                  el.style.aspectRatio = '6/5';
                  const media = el.querySelectorAll<HTMLElement>('img, video');
                  media.forEach(m => m.style.transform = 'translate3d(0,0,0) scale(1.15)');
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget;
                  el.style.aspectRatio = isExpanded ? '6/5' : '10/5';
                  const media = el.querySelectorAll<HTMLElement>('img, video');
                  media.forEach(m => {
                    m.style.transform = isExpanded ? 'translate3d(0,0,0) scale(1.15)' : 'translate3d(0,0,0) scale(1)';
                  });
                }}
              >
                {isVideo ? (
                  <video
                    src={item.img as string}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover will-change-transform"
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
                    className="object-cover will-change-transform"
                    style={{
                      transform: isExpanded ? 'translate3d(0,0,0) scale(1.15)' : 'translate3d(0,0,0) scale(1)',
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