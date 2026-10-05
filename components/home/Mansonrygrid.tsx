"use client";

import { forwardRef, useRef, useEffect } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "@/components/common/SmartImage";
import Link  from "next/link";
import type { ThemeMedia } from "@/lib/homeContent";

// ✅ Flexible Cell (image | video | empty for color)
function Cell({
  type = "image",
  src,
  alt,
}: {
  type?: "image" | "video" | "empty";
  src?: any;
  alt?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type !== "video" || !videoRef.current) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [type]);

  if (type === "video" && src) {
    return (
      <video
        ref={videoRef}
        src={src}
        preload="none"
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    );
  }

  if (type === "image" && src) {
    return (
      <div className="relative w-full h-full">
        <Image src={src} alt={alt || ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="bg-black object-cover" />
      </div>
    );
  }

  // empty → just color bg from parent
  return null;
}

// One of the five fixed layout slots (see THEME_SLOTS in lib/homeContent).
function MediaCell({ media }: { media?: ThemeMedia }) {
  if (!media?.src) return <Cell type="empty" />;
  return <Cell type={media.type} src={media.src} alt={media.alt} />;
}

interface MasonryGridProps {
  y: MotionValue<number>;
  media: ThemeMedia[];
  href: string;
}

const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ y, media, href }, ref) => {
    return (
      <div ref={ref} className="w-full overflow-hidden h-fit md:h-full">
        <Link href={href} className="cursor-pointer">
        <motion.div style={{ y }}>
          <div className="h-full grid grid-cols-2 auto-rows-[100px] md:auto-rows-[300px] w-full">

            {/* 01 IMAGE */}
            <div className="row-span-2">
              <MediaCell media={media[0]} />
            </div>

            {/* 02 BRAND COLOR (KEEP) */}
            <div className="hidden md:block bg-[var(--primary-blue)]">
              <Cell type="empty" />
            </div>

            {/* 03 IMAGE */}
            <div className="hidden md:block row-span-2">
              <MediaCell media={media[1]} />
            </div>

            {/* 04 BRAND COLOR (KEEP) */}
            <div className="hidden md:block  bg-[var(--primary-red)]">
              <Cell type="empty" />
            </div>

            {/* 05 IMAGE */}
            <div className="hidden md:block row-span-3">
              <MediaCell media={media[2]} />
            </div>

            {/* 06 VIDEO */}
            <div className="row-span-2">
              <MediaCell media={media[3]} />
            </div>

            {/* 09 BRAND BLACK (KEEP) */}
            <div className="hidden md:block bg-[var(--color-black)]">
              <Cell type="empty" />
            </div>

            {/* 10 FULL WIDTH IMAGE */}
            <div className="col-span-2">
              <MediaCell media={media[4]} />
            </div>

          </div>

        </motion.div>
        </Link>
      </div>
    );
  }
);

MasonryGrid.displayName = "MasonryGrid";
export default MasonryGrid;
