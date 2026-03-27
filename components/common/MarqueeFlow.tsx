"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";

interface MarqueeFlowProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isExpanded: boolean) => React.ReactNode;
  gap?: number;
  /** px per second */
  speed?: number;
  mobileCount?: number;
  tabletCount?: number;
  desktopCount?: number;
  /** which visible position is always expanded (0 = first) */
  defaultExpandedIndex?: number;
}

export default function MarqueeFlow<T>({
  items,
  renderItem,
  gap = 24,
  speed = 30,
  mobileCount = 2,
  tabletCount = 3,
  desktopCount = 4,
  defaultExpandedIndex,
}: MarqueeFlowProps<T>) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const rafRef        = useRef<number>(0);
  const offsetRef     = useRef(0);          // continuous px offset, never resets
  const lastTsRef     = useRef<number>(0);
  const pausedRef     = useRef(false);
  const itemWidthRef  = useRef(0);          // width of one item + gap in px
  const totalWidthRef = useRef(0);          // width of one full set in px

  const [visibleCount, setVisibleCount] = useState(desktopCount);
  const [activeGap,    setActiveGap]    = useState(gap);
  // expandedItemIndex: which real item index (0-based) is currently in the expanded slot
  const [expandedItemIndex, setExpandedItemIndex] = useState(
    defaultExpandedIndex !== undefined ? defaultExpandedIndex : -1
  );

  // We render 3 full copies so there's always content ahead and behind
  const COPIES = 3;
  const repeated = useMemo(() => {
    if (items.length === 0) return [];
    return Array.from({ length: COPIES }, () => items).flat();
  }, [items]);

  // ── Responsive ────────────────────────────────────────────────────────────
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVisibleCount(mobileCount);
        setActiveGap(Math.round(gap * 0.5));
      } else if (w < 1024) {
        setVisibleCount(tabletCount);
        setActiveGap(gap);
      } else {
        setVisibleCount(desktopCount);
        setActiveGap(gap);
      }
    };
    const onResize = () => { clearTimeout(t); t = setTimeout(update, 150); };
    update();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, [mobileCount, tabletCount, desktopCount, gap]);

  // ── Measure item width after mount / resize ───────────────────────────────
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerW = container.offsetWidth;
      const iw = (containerW - (visibleCount - 1) * activeGap) / visibleCount;
      itemWidthRef.current  = iw + activeGap;
      totalWidthRef.current = itemWidthRef.current * items.length;
      // Seed offset to start at copy #1 (middle copy) so we have room in both directions
      offsetRef.current = totalWidthRef.current;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visibleCount, activeGap, items.length]);

  // ── rAF loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (items.length === 0) return;

    const tick = (ts: number) => {
      rafRef.current = requestAnimationFrame(tick);
      if (pausedRef.current) { lastTsRef.current = ts; return; }

      const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
      lastTsRef.current = ts;

      const iw    = itemWidthRef.current;
      const total = totalWidthRef.current;
      if (iw === 0 || total === 0) return;

      // Advance offset
      offsetRef.current += speed * dt;

      // Seamless wrap: once we've scrolled past copy #2 start, jump back by one full set
      // This is invisible because copy #1 and copy #3 are identical
      if (offsetRef.current >= total * 2) {
        offsetRef.current -= total;
      }

      const track = trackRef.current;
      if (track) {
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      // ── Update which item is in the expanded slot ──────────────────────────
      if (defaultExpandedIndex !== undefined && iw > 0) {
        // Use floor so the expanded item only hands off once the next item
        // has fully entered the slot — no premature collapse
        const scrolledItems = offsetRef.current / iw;
        const idx = Math.floor(scrolledItems + defaultExpandedIndex) % items.length;
        const normalized = (idx + items.length) % items.length;
        setExpandedItemIndex((prev) => prev !== normalized ? normalized : prev);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items.length, speed, defaultExpandedIndex]);

  // ── Pause on hover ────────────────────────────────────────────────────────
  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{
          gap: `${activeGap}px`,
          willChange: "transform",
          // No CSS transition — rAF owns all movement
        }}
      >
        {repeated.map((item: T, i: number) => {
          const realIndex = i % items.length;
          const isExpanded =
            defaultExpandedIndex !== undefined && realIndex === expandedItemIndex;

          return (
            <div
              key={i}
              className="flex-shrink-0 flex items-end"
              style={{
                // Fixed width based on visibleCount — same for all items
                width: `calc((100vw - ${(visibleCount - 1) * activeGap}px) / ${visibleCount})`,
                flexShrink: 0,
              }}
            >
              {renderItem(item, realIndex, isExpanded)}
            </div>
          );
        })}
      </div>
    </div>
  );
}