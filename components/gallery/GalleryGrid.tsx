"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems } from "./galleryData";
import GalleryCard from "./GalleryCard";
import GalleryHero from "./GalleryHero";
import Lightbox from "./Lightbox";
import Toast from "./Toast";
import type { ToastData } from "./Toast";
import type { GalleryItem } from "./types";

const INITIAL_BATCH = 12;
const LOAD_BATCH = 12;

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeYear, setActiveYear] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [shuffledGallery, setShuffledGallery] = useState<GalleryItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
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
          setVisibleCount((c) => c + LOAD_BATCH);
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

  // Reveals items in small batches as the user scrolls (see the
  // IntersectionObserver above) instead of rendering the whole gallery at
  // once. Cycles back through baseItems to keep the scroll feeling infinite.
  const displayItems = useMemo(() => {
    if (baseItems.length === 0) return [];
    const count = visibleCount;
    const items: GalleryItem[] = [];
    for (let i = 0; i < count; i++) {
      const base = baseItems[i % baseItems.length];
      const cycle = Math.floor(i / baseItems.length);
      items.push({ ...base, id: `${base.id}-${cycle}` });
    }
    return items;
  }, [baseItems, visibleCount]);

  const selectedItem = useMemo(
    () =>
      displayItems.find((item) => item.id === selectedId) ??
      shuffledGallery.find((item) => item.id === selectedId) ??
      null,
    [displayItems, shuffledGallery, selectedId]
  );

  const handleView = useCallback((item: GalleryItem) => {
    setSelectedId(item.id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  const handleExpand = useCallback((item: GalleryItem) => {
    setExpandedId(item.id);
  }, []);

  const handleCollapse = useCallback(() => {
    setExpandedId(null);
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setSelectedId(null);
    setExpandedId(null);
    setVisibleCount(INITIAL_BATCH);
  }, []);

  const handleYearChange = useCallback((year: string) => {
    setActiveYear(year);
    setSelectedId(null);
    setExpandedId(null);
    setVisibleCount(INITIAL_BATCH);
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
                  isExpanded={expandedId === item.id}
                  onExpand={handleExpand}
                  onCollapse={handleCollapse}
                  onView={handleView}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          <div ref={sentinelRef} className="h-px w-full" />
        </div>
      </motion.div>

      <Lightbox item={selectedItem} onClose={handleClose} />

      <Toast toast={toast} onDismiss={handleDismissToast} />
    </>
  );
}
