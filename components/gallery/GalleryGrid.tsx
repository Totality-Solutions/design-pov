"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems } from "./galleryData";
import GalleryCard from "./GalleryCard";
import GalleryHero from "./GalleryHero";
import Toast from "./Toast";
import type { ToastData } from "./Toast";
import type { GalleryItem } from "./types";

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeYear, setActiveYear] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [shuffledGallery, setShuffledGallery] = useState<GalleryItem[]>([]);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<ToastData | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const toastIdRef = useRef(0);

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
    return source.filter(
      (item) =>
        (activeCategory === "all" || item.category === activeCategory) &&
        (activeYear === "all" || item.year?.toString() === activeYear)
    );
  }, [activeCategory, activeYear, shuffledGallery]);

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

  const handleYearChange = useCallback((year: string) => {
    setActiveYear(year);
    setSelectedId(null);
    setPage(1);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
  }, []);

  const handleToggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  const handleFormSuccess = useCallback(() => {
    setIsFormOpen(false);
    toastIdRef.current += 1;
    setToast({
      id: `toast-${toastIdRef.current}`,
      message: "Thank you! Your project has been submitted successfully.",
      type: "success",
    });
  }, []);

  const handleFormError = useCallback((message: string) => {
    toastIdRef.current += 1;
    setToast({
      id: `toast-${toastIdRef.current}`,
      message,
      type: "error",
    });
  }, []);

  const handleDismissToast = useCallback((id: string) => {
    setToast((prev) => (prev?.id === id ? null : prev));
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <GalleryHero
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          activeYear={activeYear}
          onYearChange={handleYearChange}
          selectedItem={selectedItem}
          onBack={handleBack}
          isFormOpen={isFormOpen}
          onToggleForm={handleToggleForm}
          onFormSuccess={handleFormSuccess}
          onFormError={handleFormError}
        />
        
        <div className="w-full px-[23px] py-[30px] pt-[100px] sm:pt-[30px]">
          <motion.div
            className="relative columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-[10px]"
          >
            <AnimatePresence>
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

      <Toast toast={toast} onDismiss={handleDismissToast} />
    </>
  );
}
