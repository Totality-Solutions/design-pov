"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import { GALLERY_CATEGORIES } from "./galleryData";
import type { GalleryItem } from "./types";

interface GalleryHeroProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  selectedItem?: GalleryItem | null;
  onBack?: () => void;
}

export default function GalleryHero({
  activeCategory,
  onCategoryChange,
  selectedItem,
  onBack,
}: GalleryHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-20"
    >
      <div className="w-full bg-black px-[60px] py-4 flex items-center">
        <div className="flex items-center gap-6 w-full">
          {selectedItem ? (
            <div className="flex items-center self-stretch flex-1">
              <div className="flex items-center self-stretch px-6 border-l border-white">
                <Image
                  src="/icon/gallery.svg"
                  alt="Gallery"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <div className="flex items-center self-stretch gap-[10px] px-6 bg-white/10 border-l border-white">
                <span className="text-white font-(family-name:--font-family) text-[16px] font-normal leading-[20px]">
                  Project name
                </span>
                <button
                  onClick={onBack}
                  className="relative w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Back to gallery"
                >
                  <div
                    className="absolute outline outline-2 outline-white"
                    style={{
                      width: "19.77px",
                      height: "1px",
                      left: "14px",
                      top: "14px",
                      transform: "rotate(42deg)",
                      transformOrigin: "top left",
                    }}
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 border-l border-white pl-6">
              <span className="text-white font-(family-name:--font-family) text-[16px] font-normal leading-[20px]">
                Gallery
              </span>
              <Image
                src="/icon/gallery.svg"
                alt="Gallery"
                width={20}
                height={20}
                className="w-6 h-6"
              />
            </div>
          )}
          <div className="flex-1" />
          <div className="w-[48px] h-[49px] flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="w-full bg-white border-b border-black px-20 pt-4 flex items-start gap-10 overflow-x-auto">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`pb-3 text-[15px] font-(family-name:--font-family) leading-6 whitespace-nowrap cursor-pointer transition-all duration-200 ${
              activeCategory === cat.id
                ? "text-black border-b-2 border-black font-medium"
                : "text-black/50 border-b-2 border-transparent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
