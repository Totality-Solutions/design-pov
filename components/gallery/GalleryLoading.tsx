"use client";

import { motion } from "framer-motion";
import { galleryItems } from "./galleryData";

const GRADIENTS = [
  { from: "#FFDDBF", to: "#998573" },
  { from: "#E7DDFF", to: "#8B8499" },
  { from: "#CEEBFF", to: "#7C8D99" },
  { from: "#FFE2E2", to: "#998787" },
];

export default function GalleryLoading() {
  return (
    <motion.div
      className="w-full bg-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="w-full px-[23px] pt-[140px] pb-[60px]">
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-[10px]">
          {galleryItems.map((item, index) => {
            const gradient = GRADIENTS[index % GRADIENTS.length];
            return (
              <div
                key={item.id}
                className="relative break-inside-avoid mb-[10px] overflow-hidden"
                style={{
                  aspectRatio: `${item.imageWidth} / ${item.imageHeight}`,
                  background: `linear-gradient(180deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                  opacity: 0.6,
                }}
              >
                <div className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/90">
                  <span className="w-1 h-1 bg-black rounded-full mx-[1px]" />
                  <span className="w-1 h-1 bg-black rounded-full mx-[1px]" />
                  <span className="w-1 h-1 bg-black rounded-full mx-[1px]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
