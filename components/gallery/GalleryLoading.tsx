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
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-[10px]">
          {galleryItems.map((item, index) => {
            const gradient = GRADIENTS[index % GRADIENTS.length];
            return (
              <div
                key={item.id}
                className="break-inside-avoid mb-[10px] bg-[#EFEFEF] rounded-[10px] overflow-hidden"
                style={{ padding: "10px" }}
              >
                <div
                  className="w-full rounded-[10px]"
                  style={{
                    aspectRatio: `${item.imageWidth} / ${item.imageHeight}`,
                    background: `linear-gradient(180deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                    opacity: 0.6,
                  }}
                />
                <div className="flex items-center justify-between px-[10px] py-[12px]">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="flex gap-[5px]">
                    <div className="w-1 h-1 bg-black rounded-full" />
                    <div className="w-1 h-1 bg-black rounded-full" />
                    <div className="w-1 h-1 bg-black rounded-full" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
