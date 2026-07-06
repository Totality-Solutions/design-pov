"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { galleryItems } from "./galleryData";
import GalleryCard from "./GalleryCard";
import GalleryHero from "./GalleryHero";
import GalleryFeatured from "./GalleryFeatured";
import type { GalleryItem } from "./types";

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const handleSelect = useCallback((item: GalleryItem) => {
    setSelectedItem(item);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setSelectedItem(null);
  }, []);

  const relatedItems = useMemo(
    () => {
      if (!selectedItem) return [];
      return galleryItems.filter(
        (item) =>
          item.category === selectedItem.category &&
          item.id !== selectedItem.id
      );
    },
    [selectedItem]
  );

  const rightSideItems = useMemo(
    () => relatedItems.slice(0, 3),
    [relatedItems]
  );

  const bottomItems = useMemo(
    () => relatedItems.slice(3),
    [relatedItems]
  );

  const displayItems = useMemo(
    () => {
      const items =
        activeCategory === "all"
          ? galleryItems
          : galleryItems.filter((item) => item.category === activeCategory);
      if (!selectedItem) return items;
      const excludedIds = new Set([
        selectedItem.id,
        ...relatedItems.map((r) => r.id),
      ]);
      return items.filter((item) => !excludedIds.has(item.id));
    },
    [activeCategory, selectedItem, relatedItems]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <GalleryHero
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        selectedItem={selectedItem}
        onBack={handleBack}
      />
      <div className="w-full max-w-[1440px] mx-auto px-[23px] py-[30px]">
        {selectedItem && (
          <div className="mb-[10px]">
            <div className="flex flex-col xl:flex-row gap-[10px]">
              <div className="xl:w-[70%]">
                <GalleryFeatured key="featured" item={selectedItem} />
              </div>
              {rightSideItems.length > 0 && (
                <div className="xl:w-[30%]">
                  <div className="columns-1 gap-[10px]">
                    {rightSideItems.map((item, index) => (
                      <GalleryCard
                        key={item.id}
                        item={item}
                        index={index}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {bottomItems.length > 0 && (
              <div
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 mt-[10px]"
                style={{ columnGap: "10px" }}
              >
                {bottomItems.map((item, index) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    index={index}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {!selectedItem && (
          <div
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
            style={{ columnGap: "10px" }}
          >
            {displayItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
