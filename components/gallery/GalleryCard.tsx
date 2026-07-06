"use client";

import { memo } from "react";
import Image from "next/image";
import type { GalleryItem } from "./types";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onSelect?: (item: GalleryItem) => void;
}

function GalleryCard({ item, index, onSelect }: GalleryCardProps) {
  return (
    <article
      className="break-inside-avoid mb-[10px] rounded-[10px] overflow-hidden bg-white cursor-pointer"
      onClick={() => onSelect?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect?.(item); }}
    >
      <div className="relative overflow-hidden rounded-[10px] p-[10px]">
        <div className="relative w-full rounded-[10px] overflow-hidden">
          <Image
            src={item.imageSrc}
            alt={item.title}
            width={item.imageWidth}
            height={item.imageHeight}
            className="w-full h-auto rounded-[10px]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            loading="lazy"
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
      </div>
      <div className="px-[20px] pb-[12px] pt-[2px]">
        <div className="flex items-center justify-between">
          <span className="text-black text-[16px] font-[family-name:var(--font-family)] font-medium leading-[20px]">
            {item.title}
          </span>
          <div className="flex gap-[5px] items-center">
            <span className="w-1 h-1 bg-black rounded-full" />
            <span className="w-1 h-1 bg-black rounded-full" />
            <span className="w-1 h-1 bg-black rounded-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(GalleryCard);
