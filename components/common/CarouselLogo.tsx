

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { StaticImageData } from "next/image";

interface LogoItem {
  src: string | StaticImageData;
  alt: string;
}

interface LogoCarouselProps {
  logos: LogoItem[];
  pxPerSecond?: number;
  gap?: number;
  height?: number;
  opacity?: number;
}

export default function LogoCarousel({
  logos,
  pxPerSecond = 80,
  gap = 40,
  height = 40,
  opacity = 80,
}: LogoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...logos, ...logos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const fullWidth = track.scrollWidth;
    const singleWidth = fullWidth / 2;
    const duration = singleWidth / pxPerSecond;
    track.style.setProperty("--marquee-duration", `${duration}s`);
  }, [logos, pxPerSecond]);

  return (
    <div className="w-full max-w-[100vw] overflow-hidden">
      <div
        ref={trackRef}
        className="flex justify-center items-center w-max whitespace-nowrap animate-logo-scroll"
        style={{ 
          gap: `${gap}px`,
          backfaceVisibility: "hidden", // Fixes flickering on Android
        }}
      >
        {items.map((logo, i) => (
          <Image
            key={i}
            src={logo.src}
            alt={logo.alt}
            width={height}
            height={height}
            // Apply invert directly here. 
            // If the section is always black, use 'invert' to make dark logos white.
            className="object-contain shrink-0 invert-0 brightness-200 transition-all duration-300"
            style={{ 
              opacity: opacity / 100,
              minWidth: `${height}px` // Prevents image collapsing on mobile Chrome
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes logo-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            /* translate3d is much smoother on Android/Chrome than translateX */
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-logo-scroll {
          animation: logo-scroll var(--marquee-duration, 20s) linear infinite;
        }
      `}</style>
    </div>
  );
}