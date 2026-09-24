"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getGalleryItems,
  getLikedGalleryIds,
  setGalleryLike,
  deriveCategories,
  deriveYears,
} from "@/lib/gallery";
import GalleryCard from "./GalleryCard";
import GalleryHero from "./GalleryHero";
import Lightbox from "./Lightbox";
import Toast from "./Toast";
import type { ToastData } from "./Toast";
import type { GalleryItem } from "./types";

const INITIAL_BATCH = 12;
const LOAD_BATCH = 12;

// displayItems suffix ids with "-<cycle>" for the infinite scroll; strip it
// to get the database id back.
function sourceId(displayId: string) {
  return displayId.slice(0, displayId.lastIndexOf("-"));
}

export default function GalleryGrid() {
  // Empty array means "All" — no category filter applied.
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeYear, setActiveYear] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [shuffledGallery, setShuffledGallery] = useState<GalleryItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const [showLiked, setShowLiked] = useState(false);
  // Counts updated in this session, keyed by source id; falls back to the
  // count loaded with the gallery. Kept separate from galleryItems so a like
  // doesn't trigger a reshuffle.
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const likedIdsRef = useRef(likedIds);
  const pendingLikesRef = useRef(new Set<string>());
  const sentinelRef = useRef<HTMLDivElement>(null);
  const toastIdRef = useRef(0);

  useEffect(() => {
    getGalleryItems().then(setGalleryItems);
    getLikedGalleryIds().then((ids) => setLikedIds(new Set(ids)));
  }, []);

  useEffect(() => {
    likedIdsRef.current = likedIds;
  }, [likedIds]);

  useEffect(() => {
    if (galleryItems.length === 0) return;
    const shuffled = [...galleryItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledGallery(shuffled);
  }, [galleryItems]);

  const categories = useMemo(() => deriveCategories(galleryItems), [galleryItems]);
  const years = useMemo(() => deriveYears(galleryItems), [galleryItems]);

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
    // The Liked view shows every liked image, ignoring year/category filters.
    if (showLiked) return source.filter((item) => likedIds.has(item.id));
    return source.filter(
      (item) =>
        (activeCategories.length === 0 || activeCategories.includes(item.category)) &&
        (activeYear === "all" || item.year?.toString() === activeYear)
    );
  }, [activeCategories, activeYear, shuffledGallery, showLiked, likedIds]);

  // Pinned items lead the "All" year tab (in the order they were pinned);
  // individual year tabs and the Liked view ignore pinning.
  const pinnedItems = useMemo(() => {
    if (activeYear !== "all" || showLiked) return [];
    return baseItems
      .filter((item) => item.pinnedAt)
      .sort((a, b) => a.pinnedAt!.localeCompare(b.pinnedAt!));
  }, [baseItems, activeYear, showLiked]);

  // Reveals items in small batches as the user scrolls (see the
  // IntersectionObserver above) instead of rendering the whole gallery at
  // once. Pinned items appear once at the top; the rest cycle to keep the
  // scroll feeling infinite.
  const displayItems = useMemo(() => {
    if (baseItems.length === 0) return [];
    // A personal list shouldn't loop — show each liked image once.
    if (showLiked) {
      return baseItems.slice(0, visibleCount).map((item) => ({ ...item, id: `${item.id}-0` }));
    }
    const rest = pinnedItems.length > 0 ? baseItems.filter((item) => !item.pinnedAt) : baseItems;
    const items: GalleryItem[] = pinnedItems
      .slice(0, visibleCount)
      .map((item) => ({ ...item, id: `${item.id}-0` }));
    if (rest.length === 0) return items;
    for (let i = 0; items.length < visibleCount; i++) {
      const base = rest[i % rest.length];
      const cycle = Math.floor(i / rest.length);
      items.push({ ...base, id: `${base.id}-${cycle}` });
    }
    return items;
  }, [baseItems, pinnedItems, visibleCount, showLiked]);

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

  const handleToggleLikedView = useCallback(() => {
    setShowLiked((prev) => !prev);
    setSelectedId(null);
    setExpandedId(null);
    setVisibleCount(INITIAL_BATCH);
  }, []);

  const applyCategories = useCallback((update: (prev: string[]) => string[]) => {
    setActiveCategories(update);
    setShowLiked(false);
    setSelectedId(null);
    setExpandedId(null);
    setVisibleCount(INITIAL_BATCH);
  }, []);

  const handleCategoryToggle = useCallback(
    (cat: string) =>
      applyCategories((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
      ),
    [applyCategories]
  );

  const handleCategoryClear = useCallback(() => applyCategories(() => []), [applyCategories]);

  // A card's title pill adds its category to the filter (never removes it).
  const handleCategoryAdd = useCallback(
    (cat: string) => applyCategories((prev) => (prev.includes(cat) ? prev : [...prev, cat])),
    [applyCategories]
  );

  const handleYearChange = useCallback((year: string) => {
    setActiveYear(year);
    setShowLiked(false);
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

  // Optimistic: flip the heart and count immediately, then reconcile with
  // the server's count, or roll back if the request fails.
  const handleToggleLike = useCallback(
    async (item: GalleryItem) => {
      const id = sourceId(item.id);
      if (pendingLikesRef.current.has(id)) return;
      pendingLikesRef.current.add(id);

      const wasLiked = likedIdsRef.current.has(id);
      const setLiked = (liked: boolean) =>
        setLikedIds((prev) => {
          const next = new Set(prev);
          if (liked) next.add(id);
          else next.delete(id);
          return next;
        });

      const delta = wasLiked ? -1 : 1;
      const applyDelta = (d: number) =>
        setLikeCounts((prev) => ({
          ...prev,
          [id]: Math.max((prev[id] ?? item.likeCount ?? 0) + d, 0),
        }));

      setLiked(!wasLiked);
      applyDelta(delta);

      const result = await setGalleryLike(id, !wasLiked);
      pendingLikesRef.current.delete(id);

      if (result) {
        setLikeCounts((prev) => ({ ...prev, [id]: result.likeCount }));
      } else {
        setLiked(wasLiked);
        applyDelta(-delta);
        handleFormError("Couldn't save your like. Please try again.");
      }
    },
    [handleFormError]
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <GalleryHero
          categories={categories}
          years={years}
          activeCategories={activeCategories}
          onCategoryToggle={handleCategoryToggle}
          onCategoryClear={handleCategoryClear}
          showLiked={showLiked}
          likedCount={likedIds.size}
          onToggleLiked={handleToggleLikedView}
          activeYear={activeYear}
          onYearChange={handleYearChange}
          selectedItem={selectedItem}
          onBack={handleBack}
          isFormOpen={isFormOpen}
          onToggleForm={handleToggleForm}
          onFormSuccess={handleFormSuccess}
          onFormError={handleFormError}
        />
        
        <div className="w-full px-[23px] pt-[100px] pb-24 sm:pt-[30px] sm:pb-[30px]">
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
                  isPinned={index < pinnedItems.length}
                  isLiked={likedIds.has(sourceId(item.id))}
                  likeCount={likeCounts[sourceId(item.id)] ?? item.likeCount ?? 0}
                  onToggleLike={handleToggleLike}
                  onExpand={handleExpand}
                  onCollapse={handleCollapse}
                  onView={handleView}
                  onCategoryClick={handleCategoryAdd}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          {showLiked && baseItems.length === 0 && (
            <div className="py-24 flex flex-col items-center text-center gap-3">
              <p className="text-[15px] font-(family-name:--font-family) font-medium text-black">
                No liked images yet
              </p>
              <p className="text-[13px] font-(family-name:--font-family) text-black/50 max-w-[280px]">
                Tap the heart on any image to save it here.
              </p>
              <button
                type="button"
                onClick={handleToggleLikedView}
                className="mt-2 px-4 py-2 text-[13px] font-(family-name:--font-family) bg-black text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                Browse gallery
              </button>
            </div>
          )}
          <div ref={sentinelRef} className="h-px w-full" />
        </div>
      </motion.div>

      <Lightbox item={selectedItem} onClose={handleClose} />

      <Toast toast={toast} onDismiss={handleDismissToast} />
    </>
  );
}
