"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems } from "./galleryData";
import GalleryCard from "./GalleryCard";
import GalleryHero from "./GalleryHero";
import type { GalleryItem } from "./types";

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [shuffledGallery, setShuffledGallery] = useState<GalleryItem[]>([]);
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shuffled = [...galleryItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledGallery(shuffled);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const baseItems = useMemo(() => {
    const source = shuffledGallery.length > 0 ? shuffledGallery : galleryItems;
    if (activeCategory === "all") return source;
    return source.filter((item) => item.category === activeCategory);
  }, [activeCategory, shuffledGallery]);

  const displayItems = useMemo(() => {
    const items: GalleryItem[] = [];
    for (let i = 0; i < page; i++) {
      baseItems.forEach((item) => {
        items.push({ ...item, id: `${item.id}-page-${i}` });
      });
    }
    return items;
  }, [baseItems, page]);

  const selectedItem = useMemo(
    () =>
      displayItems.find((item) => item.id === selectedId) ??
      shuffledGallery.find((item) => item.id === selectedId) ??
      null,
    [displayItems, shuffledGallery, selectedId]
  );

  const handleSelect = useCallback((item: GalleryItem) => {
    setSelectedId(item.id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setSelectedId(null);
    setPage(1);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
  }, []);

  const handleToggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <GalleryHero
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        selectedItem={selectedItem}
        onBack={handleBack}
        isFormOpen={isFormOpen}
        onToggleForm={handleToggleForm}
      />
      
      <div className="w-full px-[23px] py-[30px] pt-[100px] sm:pt-[30px]">
        <motion.div 
          layout
          className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-flow-dense place-content-start items-start w-full"
          style={{ 
            display: "grid",
            gridAutoRows: "10px", 
            gap: "10px" 
          }}
        >
          {/* mode="popLayout" pulls exiting items out of the flow immediately */}
          <AnimatePresence mode="popLayout">
            {displayItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                isExpanded={selectedId === item.id}
                onSelect={handleSelect}
                onClose={handleClose}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        <div ref={sentinelRef} className="h-px w-full" />
      </div>
    </motion.div>
  );
}