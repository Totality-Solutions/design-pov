"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import GalleryLoading from "@/components/gallery/GalleryLoading";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryFooter from "@/components/gallery/GalleryFooter";

export default function GalleryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <GalleryLoading key="loading" />
      ) : (
        <>
          <GalleryGrid key="grid" />
          <GalleryFooter key="footer" />
        </>
      )}
    </AnimatePresence>
  );
}
