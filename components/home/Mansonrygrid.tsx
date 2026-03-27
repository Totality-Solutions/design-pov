"use client";

import React, { forwardRef, useMemo } from "react";
import { motion, MotionValue } from "framer-motion";
import Image, { StaticImageData } from "next/image";

export type MasonryMediaItem = {
  src: StaticImageData | string;
  type?: "image" | "video";
  alt?: string;
};

interface MasonryGridProps {
  items: MasonryMediaItem[];
  columns?: number;
  gap?: number;
  y: MotionValue<number>;
}

// Square-ish heights so images tile tightly with no awkward gaps
const HEIGHT_POOL = [280, 340, 300, 380, 260, 320, 360, 290];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function MasonryCell({ item, height }: { item: MasonryMediaItem; height: number }) {
  return (
    <div style={{ height, width: "100%", overflow: "hidden", position: "relative", flexShrink: 0 }}>
      {item.type === "video" ? (
        <video
          src={typeof item.src === "string" ? item.src : ""}
          autoPlay muted loop playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <Image
          src={item.src}
          alt={item.alt || ""}
          fill
          style={{ objectFit: "cover" }}
          sizes="35vw"
        />
      )}
    </div>
  );
}

const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ items, columns = 2, gap = 0, y }, ref) => {
    const rng = useMemo(() => seededRandom(42), []);

    // Fill each column with enough items to overflow well past 100vh
    // We need at least ~2500px of content per column
    const allItems = useMemo(() => {
      if (items.length === 0) return [];
      const minItems = columns * 10; // enough for tall scroll
      const repeated: MasonryMediaItem[] = [];
      while (repeated.length < minItems) repeated.push(...items);
      return repeated; // do NOT slice — use all repeated items
    }, [items, columns]);

    // Round-robin distribute
    const columnItems: MasonryMediaItem[][] = useMemo(() => {
      const cols: MasonryMediaItem[][] = Array.from({ length: columns }, () => []);
      allItems.forEach((item, i) => cols[i % columns].push(item));
      return cols;
    }, [allItems, columns]);

    // Heights — each item gets a height, cycling through pool
    const columnHeights: number[][] = useMemo(() =>
      columnItems.map((col) =>
        col.map((_, i) => HEIGHT_POOL[(i + Math.floor(rng() * 3)) % HEIGHT_POOL.length])
      ),
    [columnItems]);

    return (
      <div
        ref={ref}
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        <motion.div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap,
            y,
          }}
        >
          {columnItems.map((col, ci) => (
            <div
              key={ci}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap,
                minWidth: 0,
              }}
            >
              {col.map((item, i) => (
                <MasonryCell key={i} item={item} height={columnHeights[ci][i]} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    );
  }
);

MasonryGrid.displayName = "MasonryGrid";
export default MasonryGrid;