"use client";

import React, { forwardRef } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";

// ✅ Import images locally (inside this file only)
import img1 from "@/public/temp/theme/11.png";
import img2 from "@/public/temp/theme/2.png";
import img3 from "@/public/temp/theme/3.png";
import img4 from "@/public/temp/theme/4.png";
import img5 from "@/public/temp/theme/5.png";
import img6 from "@/public/temp/theme/6.png";
import img7 from "@/public/temp/theme/7.png";
import img8 from "@/public/temp/theme/12.png";

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
  if (type === "video" && src) {
    return (
      <video
        src={src}
        autoPlay
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
        <Image src={src} alt={alt || ""} fill className="object-cover" />
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
      <div ref={ref} className="w-full overflow-hidden h-full">
        <motion.div style={{ y }}>
          <div className="h-full grid grid-cols-2 auto-rows-[300px] w-full">

            {/* 01 IMAGE */}
            <div className="row-span-2">
              <Cell type="image" src={img7} alt="Theme 1" />
            </div>

            {/* 02 BRAND COLOR (KEEP) */}
            <div className="bg-[var(--primary-blue)]">
              <Cell type="empty" />
            </div>

            {/* 03 IMAGE */}
            <div className="row-span-2">
              <Cell type="image" src={img2} alt="Theme 2" />
            </div>

            {/* 04 BRAND COLOR (KEEP) */}
            <div className="bg-[var(--primary-red)]">
              <Cell type="empty" />
            </div>

            {/* 05 IMAGE */}
            <div className="row-span-3">
              <Cell type="image" src={img3} alt="Theme 3" />
            </div>

            {/* 06 VIDEO EXAMPLE */}
            <div className="row-span-2">
              <Cell type="video" src="/video/home.mp4" />
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
            <div className="bg-[var(--color-black)]">
              <Cell type="empty" />
            </div>

            {/* 10 FULL WIDTH IMAGE */}
            <div className="col-span-2">
              <Cell type="image" src={img1} alt="Theme 6" />
            </div>

          </div>

        </motion.div>
      </div>
    );
  }
);

MasonryGrid.displayName = "MasonryGrid";
export default MasonryGrid;