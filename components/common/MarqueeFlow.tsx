"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";

interface MarqueeFlowProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isExpanded: boolean) => React.ReactNode;
  gap?: number;
  speed?: number;
  mobileCount?: number;
  tabletCount?: number;
  desktopCount?: number;
}

export default function MarqueeFlow<T>({
  items,
  renderItem,
  gap = 24,
  speed = 60,
  mobileCount = 1.2,
  tabletCount = 2.2,
  desktopCount = 4,
}: MarqueeFlowProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const lastTsRef = useRef(0);

  const pausedRef = useRef(false);
  const speedRef = useRef(speed);

  const itemWidthRef = useRef(0);
  const totalWidthRef = useRef(0);

  const previousIndexRef = useRef<number>(-1);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [visibleCount, setVisibleCount] = useState(desktopCount);
  const [activeGap, setActiveGap] = useState(gap);
  const [itemWidth, setItemWidth] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const COPIES = 3;

  const repeated = useMemo(() => {
    return Array.from({ length: COPIES }, () => items).flat();
  }, [items]);

  // ✅ Responsive
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVisibleCount(mobileCount);
        setActiveGap(12);
      } else if (w < 1024) {
        setVisibleCount(tabletCount);
        setActiveGap(16);
      } else {
        setVisibleCount(desktopCount);
        setActiveGap(gap);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mobileCount, tabletCount, desktopCount, gap]);

  // ✅ Measure
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerW = container.offsetWidth;
      const iw =
        (containerW - (visibleCount - 1) * activeGap) / visibleCount;

      setItemWidth(iw);

      itemWidthRef.current = iw + activeGap;
      totalWidthRef.current = itemWidthRef.current * items.length;

      offsetRef.current = totalWidthRef.current;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visibleCount, activeGap, items.length]);

  // ✅ Smooth stop
  const smoothStop = () => {
    let start = performance.now();

    const slowDown = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / 300, 1);

      speedRef.current = speed * (1 - progress);

      if (progress < 1) {
        requestAnimationFrame(slowDown);
      } else {
        pausedRef.current = true;
      }
    };

    requestAnimationFrame(slowDown);
  };

  // ✅ Animation loop
  useEffect(() => {
    const tick = (ts: number) => {
      rafRef.current = requestAnimationFrame(tick);

      const dt = lastTsRef.current
        ? (ts - lastTsRef.current) / 1000
        : 0;

      lastTsRef.current = ts;

      if (!pausedRef.current) {
        offsetRef.current += speedRef.current * dt;
      }

      const iw = itemWidthRef.current;
      const total = totalWidthRef.current;

      if (!iw || !total) return;

      if (offsetRef.current >= total * 2) {
        offsetRef.current -= total;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      // ✅ LEFT-most detection
      const scrolledItems = offsetRef.current / iw;
      const leftIndex = Math.floor(scrolledItems) % items.length;
      const normalized = (leftIndex + items.length) % items.length;

      if (previousIndexRef.current !== normalized) {
        previousIndexRef.current = normalized;

        // 🔥 smooth stop first
   // Step 1: smooth stop
let start = performance.now();

const slowDown = (now: number) => {
  const elapsed = now - start;
  const progress = Math.min(elapsed / 300, 1);

  speedRef.current = speed * (1 - progress);

  if (progress < 1) {
    requestAnimationFrame(slowDown);
  } else {
    // ✅ FULLY STOPPED HERE
    pausedRef.current = true;

    // ✅ Step 2: NOW trigger expansion
    setExpandedIndex(normalized);

    // ✅ Step 3 + 4: total pause = 4000ms
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
      speedRef.current = speed;
      lastTsRef.current = 0;
    }, 4000);
  }
};

requestAnimationFrame(slowDown);

        // 🔥 total pause = 4000ms
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }

        pauseTimeoutRef.current = setTimeout(() => {
          pausedRef.current = false;
          speedRef.current = speed;
          lastTsRef.current = 0;
        }, 4000);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items.length, speed]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex"
        style={{
          gap: `${activeGap}px`,
          willChange: "transform",
        }}
      >
        {repeated.map((item, i) => {
          const realIndex = i % items.length;
          const isExpanded = realIndex === expandedIndex;

          return (
            <div
              key={i}
              className="flex-shrink-0 flex items-end overflow-hidden"
              style={{
                width: `${itemWidth}px`,
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