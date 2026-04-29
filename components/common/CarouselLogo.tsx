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

  // 1. Triple the logos to ensure there is always a buffer for large screens
  const items = [...logos, ...logos, ...logos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateAnimation = () => {
      const fullWidth = track.scrollWidth;
      // Because we tripled the array, one full loop is exactly 1/3 of the total width
      const singleSetWidth = fullWidth / 3;
      const duration = singleSetWidth / pxPerSecond;

      track.style.setProperty("--marquee-duration", `${duration}s`);
      track.style.setProperty("--marquee-distance", `-${singleSetWidth}px`);
    };

    updateAnimation();
    window.addEventListener("resize", updateAnimation);
    return () => window.removeEventListener("resize", updateAnimation);
  }, [logos.length, pxPerSecond]);

  return (
    <div className="w-full overflow-hidden select-none">
      <div
        ref={trackRef}
        className="flex items-center w-max animate-logo-scroll"
        style={{ 
          gap: `${gap}px`, 
          paddingRight: `${gap}px`, // Essential: matches spacing at the loop point
          willChange: "transform" 
        }}
      >
        {items.map((logo, i) => (
          <div key={i} className="shrink-0 flex items-center justify-center" style={{ height: `${height}px` }}>
            <Image
              src={logo.src}
              alt={logo.alt}
              height={height}
              width={height * 3} // Sufficient width for aspect ratio
              className="object-contain w-auto h-full"
              style={{ opacity: opacity / 100 }}
              unoptimized // Recommended for cloudfront external images to avoid Next.js cache spikes
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes logo-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(var(--marquee-distance, -33.33%), 0, 0); }
        }
        .animate-logo-scroll {
          animation: logo-scroll var(--marquee-duration, 20s) linear infinite;
        }
      `}</style>
    </div>
  );
}