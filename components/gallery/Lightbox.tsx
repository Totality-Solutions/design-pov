"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Download, Share2, X } from "lucide-react";
import type { GalleryItem } from "./types";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setImageLoaded(false);
  }, [item?.id]);

  // next/image's onLoad can miss cached images that finish loading before
  // React attaches the listener, leaving the spinner stuck forever. Fall
  // back to checking the native <img>'s `complete` flag once mounted.
  useEffect(() => {
    if (!item) return;
    const id = requestAnimationFrame(() => {
      if (imgRef.current?.complete) setImageLoaded(true);
    });
    // Last-resort safety net so the spinner can never spin forever.
    const timer = setTimeout(() => setImageLoaded(true), 10000);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(timer);
    };
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  const handleShare = useCallback(async () => {
    if (!item) return;
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
  }, [item]);

  const handleDownload = useCallback(async () => {
    if (!item) return;
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
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-9999 bg-black/95 flex items-center justify-center p-4 sm:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full h-full max-w-6xl flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex-1 min-h-0">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <Image
                ref={imgRef}
                src={item.imageSrc}
                alt={item.title}
                fill
                onLoad={() => setImageLoaded(true)}
                className={`object-contain transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="90vw"
                quality={90}
                priority
              />
            </div>

            <button
              onClick={onClose}
              className="absolute top-0 right-0 sm:-top-4 sm:-right-4 w-[36px] h-[36px] flex items-center justify-center bg-black/60 rounded-full hover:bg-black/80 transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-[18px] h-[18px] text-white" strokeWidth={2} />
            </button>

            <div className="w-full flex items-center justify-between px-4 py-3.5 mt-3 bg-black/60">
              <span className="text-white text-[16px] font-(family-name:--font-family) font-medium leading-5 truncate">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
