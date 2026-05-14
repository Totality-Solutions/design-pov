"use client";
import { cdn } from "@/lib/cdn";

import { forwardRef, useRef, useEffect } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";


import Link  from "next/link";

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

interface MasonryGridProps {
  y: MotionValue<number>;
}

const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ y }, ref) => {
    return (
      <div ref={ref} className="w-full overflow-hidden h-fit md:h-full">
        <Link href="/edition/theme" className="cursor-pointer">
        <motion.div style={{ y }}>
          <div className="h-full grid grid-cols-2 auto-rows-[100px] md:auto-rows-[300px] w-full">

            {/* 01 IMAGE */}
            <div className="row-span-2">
              <Cell type="image" src={cdn("/temp/home/theme/WEBSITE_THEME BANNER_4.jpg.jpeg")} alt="Theme 1" />
            </div>

            {/* 02 BRAND COLOR (KEEP) */}
            <div className="hidden md:block bg-[var(--primary-blue)]">
              <Cell type="empty" />
            </div>

            {/* 03 IMAGE */}
            <div className="hidden md:block row-span-2">
              <Cell type="image" src={cdn("/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg")} alt="Theme 2" />
            </div>

            {/* 04 BRAND COLOR (KEEP) */}
            <div className="hidden md:block  bg-[var(--primary-red)]">
              <Cell type="empty" />
            </div>

            {/* 05 IMAGE */}
            <div className="hidden md:block row-span-3">
              <Cell type="image" src={cdn("/temp/home/theme/WEBSITE_THEME BANNER_3.jpg.jpeg")} alt="Theme 3" />
            </div>

            {/* 06 VIDEO EXAMPLE */}
            <div className="row-span-2">
              <Cell type="video" src={cdn("/temp/home/theme/WEBSITE1.mp4")} />
            </div>

            {/* 07 IMAGE */}
            {/* <div className="row-span-2">
              <Cell type="image" src={img4} alt="Theme 4" />
            </div> */}

            {/* 08 IMAGE */}
            {/* <div>
              <Cell type="image" src={img8} alt="Theme 5" />
            </div> */}

            {/* 09 BRAND BLACK (KEEP) */}
            <div className="hidden md:block bg-[var(--color-black)]">
              <Cell type="empty" />
            </div>

            {/* 10 FULL WIDTH IMAGE */}
            <div className="col-span-2">
              <Cell type="image" src={cdn("/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg")} alt="Theme 6" />
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