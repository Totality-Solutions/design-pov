"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import type { GalleryItem } from "./types";

interface GalleryFeaturedProps {
  item: GalleryItem;
}

export default function GalleryFeatured({ item }: GalleryFeaturedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full rounded-[10px] overflow-hidden bg-white border border-[#EFEFEF]"
    >
      <div className="flex flex-col xl:flex-row p-[10px] gap-[24px]">
        <div className="relative w-full xl:w-[634px] rounded-[10px] overflow-hidden flex-shrink-0">
          <Image
            src={item.imageSrc}
            alt={item.title}
            width={634}
            height={588}
            className="w-full h-auto xl:h-full object-cover rounded-[10px]"
            priority
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
              mixBlendMode: "multiply",
              opacity: 0.15,
            }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between py-[24px] px-[10px]">
          <div className="flex items-center justify-between">
            <span className="text-black text-[16px] font-[family-name:var(--font-family)] font-medium leading-[20px]">
              {item.title}
            </span>
            <div className="flex items-center gap-[14px]">
              <Share2 className="w-[16.44px] h-[16.44px] text-black" strokeWidth={1.5} />
              <Heart className="w-[16.44px] h-[16.44px] text-black" strokeWidth={1.5} />
              <div className="flex gap-[5px] items-center">
                <span className="w-1 h-1 bg-black rounded-full" />
                <span className="w-1 h-1 bg-black rounded-full" />
                <span className="w-1 h-1 bg-black rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between h-[46px] px-[15px] bg-black/[0.10] rounded-full border border-black/20 mt-6 xl:mt-0">
            <span className="text-black/20 text-[12px] font-[family-name:var(--font-family)] leading-[18px]">
              Add Comment
            </span>
            <div className="w-6 h-6 relative opacity-20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="#202023"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
