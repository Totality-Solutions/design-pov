"use client";

import { memo, useCallback, useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Eye, RotateCw, Share2, X } from "lucide-react";
import type { GalleryItem } from "./types";

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  isExpanded: boolean;
  onExpand: (item: GalleryItem) => void;
  onCollapse: () => void;
  onView: (item: GalleryItem) => void;
}

// Curated display ratios cycled by position so the masonry always shows real
// height variety, independent of the source photos' actual aspect ratios
// (most of this gallery's photos share the same 3:2 ratio).
const DISPLAY_RATIOS = [4 / 5, 1, 3 / 4, 4 / 3, 3 / 5, 1, 4 / 5, 5 / 4, 3 / 4];

function GalleryCard({ item, index, isExpanded, onExpand, onCollapse, onView }: GalleryCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [expandedImageLoaded, setExpandedImageLoaded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLButtonElement>(null);
  const expandedImgRef = useRef<HTMLImageElement>(null);
  const thumbImgRef = useRef<HTMLImageElement>(null);

  // next/image's onLoad can miss cached images that finish loading before
  // React attaches the listener, leaving the spinner/skeleton stuck forever.
  // Fall back to checking the native <img>'s `complete` flag on mount.
  useEffect(() => {
    if (!isExpanded) return;
    setRotation(0);
    if (expandedImgRef.current?.complete) {
      setExpandedImageLoaded(true);
      return;
    }
    // Last-resort safety net so the spinner can never spin forever.
    const timer = setTimeout(() => setExpandedImageLoaded(true), 10000);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  useEffect(() => {
    if (thumbImgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

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
    if (isExpanded) {
      onCollapse();
    } else {
      onExpand(item);
    }
  }, [isExpanded, item, onExpand, onCollapse]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const toggleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  }, []);

  const handleView = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setMenuOpen(false);
      onView(item);
    },
    [item, onView]
  );

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onCollapse();
    },
    [onCollapse]
  );

  const handleRotate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handleViewFull = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      window.open(item.imageSrc, "_blank", "noopener,noreferrer");
    },
    [item]
  );

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

  const displayRatio = DISPLAY_RATIOS[index % DISPLAY_RATIOS.length];

  // Same technique as the original grid: a small gridAutoRows increment on
  // the parent means a card's real pixel height is `rowSpan * rowUnit`, so
  // items pack tightly instead of leaving gaps like grid-cols-only masonry.
  const rowSpan = useMemo(() => {
    if (isExpanded) {
      return Math.round((500 + 10) / 20);
    }
    const estimatedImageHeight = 300 * displayRatio;
    return Math.round((estimatedImageHeight + 10) / 20);
  }, [isExpanded, displayRatio]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{
        gridRowEnd: `span ${rowSpan}`,
        height: "100%",
      }}
      className={`overflow-hidden  w-full transform-gpu origin-center transition-shadow ${
        isExpanded
          ? "col-span-2 sm:col-span-2 lg:col-span-2 xl:col-span-2 z-10 bg-black"
          : "col-span-1 z-0 bg-white hover:shadow-lg"
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {isExpanded ? (
        <div className="relative h-full w-full">
          {/* Tiny low-res placeholder — loads almost instantly and gets
              replaced by the full image once it finishes loading. */}
          <Image
            src={item.imageSrc}
            alt=""
            aria-hidden
            fill
            quality={30}
            sizes="128px"
            style={{ transform: `rotate(${rotation}deg)` }}
            className={`object-contain transition-opacity duration-500 ${
              expandedImageLoaded ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            ref={expandedImgRef}
            src={item.imageSrc}
            alt={item.title}
            fill
            onLoad={() => setExpandedImageLoaded(true)}
            style={{ transform: `rotate(${rotation}deg)` }}
            className={`object-contain transition-[opacity,transform] duration-500 ${
              expandedImageLoaded ? "opacity-100" : "opacity-0"
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
          <div className="absolute top-[14px] left-[14px] right-[56px] bg-black/50 rounded-full px-3.5 py-1.5">
            <span className="text-white text-[14px] font-(family-name:--font-family) font-medium leading-5 truncate block drop-shadow-md">
              {item.title}
            </span>
          </div>
          <div className="absolute bg-black/90 bottom-0 left-0 right-0 flex items-center justify-center gap-7 sm:gap-6 py-5 sm:py-3.5">
              <button
                type="button"
                onClick={handleRotate}
                className="text-white hover:opacity-80 transition cursor-pointer"
                aria-label="Rotate image"
              >
                <RotateCw className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={handleViewFull}
                className="text-white hover:opacity-80 transition cursor-pointer"
                aria-label="View full image"
              >
                <Eye className="w-5 h-5" strokeWidth={2} />
              </button>
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
      ) : (
        <div className="relative h-full w-full overflow-hidden bg-[#F2F2F2]">
          {!imageLoaded && (
            <div className="absolute inset-0 w-full h-full rounded-none animate-pulse bg-[#F2F2F2]" />
          )}
          <Image
            ref={thumbImgRef}
            src={item.imageSrc}
            alt={item.title}
            fill
            loading="lazy"
            decoding="async"
            quality={75}
            onLoad={() => setImageLoaded(true)}
            className={`object-cover object-top transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />

          <div className="absolute top-2 right-2 z-10">
            <button
              ref={dotsRef}
              type="button"
              onClick={toggleMenu}
              aria-label="Image options"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-sm cursor-pointer transition-colors"
            >
              <span className="w-1 h-1 bg-black rounded-full mx-[1px]" />
              <span className="w-1 h-1 bg-black rounded-full mx-[1px]" />
              <span className="w-1 h-1 bg-black rounded-full mx-[1px]" />
            </button>

            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full right-0 mt-1 z-20 bg-white border border-gray-200 shadow-lg min-w-[140px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleView}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-black hover:bg-gray-100 transition-colors"
                >
                  <Eye size={15} strokeWidth={1.5} />
                  View
                </button>
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
      )}
    </motion.article>
  );
}

export default memo(GalleryCard);
