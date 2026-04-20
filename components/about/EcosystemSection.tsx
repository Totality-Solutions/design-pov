"use client";

import React, { useState } from "react";
import MarqueeFlow from "../common/MarqueeFlow";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../common/SectionHeading";
import CTABtn from "../common/CTABtn";

const ITEMS = [
  { id: 1, img: "/temp/1.jpg", title: "Architects", href: "#" },
  { id: 2, img: "/temp/2.jpg", title: "Designers", href: "#" },
  { id: 3, img: "/temp/3.jpg", title: "Builders", href: "#" },
  { id: 4, img: "/temp/4.jpeg", title: "Brands", href: "#" },
  { id: 5, img: "/temp/5.jpg", title: "Creative", href: "#" },
];

const EcosystemSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      className="w-full bg-white py-16"
    >
      {/* <div className="w-full h-[60px] bg-white px-6 md:px-[70px] py-12 flex items-center border-b justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative w-[33.33px] h-[33.33px] flex items-center justify-center">
            <div className="absolute w-[13.33px] h-[13.33px] bg-[#E02914] opacity-20 rounded-full blur-[6.67px]" />
            <div className="w-[6.67px] h-[6.67px] bg-[#E02914] rounded-full" />
          </div>
          <h2 className="text-[18px] md:text-[22px] leading-none text-black">
            <span className="font-medium">Press_</span>
            <span className="font-bold">Mentions</span>
          </h2>
        </div>
        <div className="hidden md:flex gap-[100px]">
          <span className="opacity-60 text-sm md:text-lg font-medium tracking-tight uppercase">Lorem Ipsum</span>
        </div>
      </div> */}
      <SectionHeading 
        titleMain="Press_" 
        titleBold="Mentions" 
        sticky={false}
        isSectionHovered={isHovered} 
      >
        {/* <p className="text-sm opacity-60">View all our work</p>
        <CTABtn /> */}
      </SectionHeading>
      <div className="w-full overflow-hidden h-[220px] sm:h-[260px] md:h-[320px] lg:h-[320px] flex items-end">
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