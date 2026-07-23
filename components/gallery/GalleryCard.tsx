"use client";

import { memo, useCallback, useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Share2, X } from "lucide-react";
import type { GalleryItem } from "./types";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  isExpanded: boolean;
  onSelect: (item: GalleryItem) => void;
  onClose: () => void;
}

function GalleryCard({ item, index, isExpanded, onSelect, onClose }: GalleryCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        dotsRef.current &&
        !dotsRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleClick = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(item);
      }
    },
    [item, onSelect]
  );

  const toggleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  }, []);

  const handleShare = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      setMenuOpen(false);
      try {
        const imageUrl = item.imageSrc;
        if (navigator.share) {
          await navigator.share({
            title: item.title,
            text: item.title,
            url: window.location.origin + imageUrl,
          });
        } else {
          await navigator.clipboard.writeText(window.location.origin + imageUrl);
          alert("Image link copied to clipboard.");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [item]
  );

  const handleDownload = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      setMenuOpen(false);
      try {
        const response = await fetch(item.imageSrc);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${item.title.replace(/\s+/g, "-")}.jpg`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed", error);
      }
    },
    [item]
  );

  const rowSpan = useMemo(() => {
    if (isExpanded) {
      return Math.round((500 + 10) / 20);
    }
    const width = item.imageWidth || 800;
    const height = item.imageHeight || 600;
    const aspectRatio = height / width;
    const estimatedImageHeight = 300 * aspectRatio;
    const targetHeight = estimatedImageHeight + 70;
    return Math.round((targetHeight + 10) / 20);
  }, [item.imageWidth, item.imageHeight, isExpanded]);

  return (
    <motion.article
      layout
      layoutId={item.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{
        gridRowEnd: `span ${rowSpan}`,
        height: "100%",
      }}
      className={`overflow-hidden border border-[#EFEFEF] transform-gpu origin-center w-full ${
        isExpanded
          ? "col-span-2 sm:col-span-2 lg:col-span-2 xl:col-span-2 z-10 bg-black"
          : "col-span-1 z-0 bg-white"
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {isExpanded ? (
        <motion.div layout className="relative h-full w-full">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className={`${
              isExpanded ? "object-contain" : "object-cover object-top"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
            priority
          />
          <button
            onClick={handleClose}
            className="absolute top-[14px] right-[14px] w-[32px] h-[32px] flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-colors cursor-pointer z-10"
            aria-label="Close"
          >
            <X className="w-[18px] h-[18px] text-white" strokeWidth={2} />
          </button>
          <div className="absolute bg-black/90 bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3.5">
            <span className="text-white text-[16px] font-(family-name:--font-family) font-medium leading-5 truncate drop-shadow-md">
              {item.title}
            </span>
            <div className="flex items-center gap-3.5 shrink-0 ml-2">
              <button
                type="button"
                onClick={handleShare}
                className="text-white hover:opacity-80 transition cursor-pointer"
                aria-label="Share image"
              >
                <Share2 className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="text-white hover:opacity-80 transition cursor-pointer"
                aria-label="Download image"
              >
                <Download className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div layout className="flex flex-col h-full w-full">
          <div className="relative flex-1 p-[10px] min-h-0">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            </div>
          </div>
          <div className="shrink-0 px-5 pb-3 pt-0.5 flex items-center justify-between">
            <span className="text-black text-[16px] font-(family-name:--font-family) font-medium leading-5 truncate">
              {item.title}
            </span>
            <div className="relative flex items-center shrink-0 ml-2">
              <div
                ref={dotsRef}
                onClick={toggleMenu}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    setMenuOpen((prev) => !prev);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Image options"
                className="flex gap-1.25 items-center cursor-pointer px-1 py-1 hover:opacity-60 transition-opacity"
              >
                <span className="w-1 h-1 bg-black rounded-full" />
                <span className="w-1 h-1 bg-black rounded-full" />
                <span className="w-1 h-1 bg-black rounded-full" />
              </div>

              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute bottom-full right-0 mb-1 z-20 bg-white border border-gray-200 shadow-lg min-w-[140px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-black hover:bg-gray-100 transition-colors"
                  >
                    <Download size={15} strokeWidth={1.5} />
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-black hover:bg-gray-100 transition-colors"
                  >
                    <Share2 size={15} strokeWidth={1.5} />
                    Share
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}

export default memo(GalleryCard);
