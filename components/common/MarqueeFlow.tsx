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
  gap = 16,
  speed = 80,
  mobileCount = 1,
  tabletCount = 2,
  desktopCount = 4,
}: MarqueeFlowProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Animation refs
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const lastTsRef = useRef(0);
  const pausedRef = useRef(false);
  const speedRef = useRef(speed);

  // Measurement refs
  const itemWidthRef = useRef(0);
  const cycleWidthRef = useRef(0);

  // State tracking
  const previousIndexRef = useRef<number>(-1);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // UI State
  const [visibleCount, setVisibleCount] = useState(desktopCount);
  const [activeGap, setActiveGap] = useState(gap);
  const [itemWidth, setItemWidth] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0);

  // Create seamless loop - 4 copies for smooth infinite scroll
  const COPIES = 4;
  const repeated = useMemo(() => {
    return Array.from({ length: COPIES }, () => items).flat();
  }, [items]);

  // ✅ Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVisibleCount(mobileCount);
        setActiveGap(12);
      } else if (w < 1024) {
        setVisibleCount(tabletCount);
        setActiveGap(14);
      } else {
        setVisibleCount(desktopCount);
        setActiveGap(gap);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileCount, tabletCount, desktopCount, gap]);

  // ✅ Measure items and container
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerW = container.offsetWidth;
      const visibleItemsCount = Math.floor(visibleCount);
      
      // Calculate item width: (container - all gaps) / visible items
      const totalGapWidth = (visibleItemsCount - 1) * activeGap;
      const iw = (containerW - totalGapWidth) / visibleItemsCount;

      setItemWidth(iw);
      itemWidthRef.current = iw;

      // One cycle = all items + gaps
      const cycleWidth = items.length * (iw + activeGap) - activeGap;
      cycleWidthRef.current = cycleWidth;

      offsetRef.current = cycleWidth;
    };

    const timer = setTimeout(measure, 100);
    window.addEventListener("resize", measure);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [visibleCount, activeGap, items.length]);

  // ✅ Animation loop with seamless wrapping
  useEffect(() => {
    let lastTime = 0;

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);

      if (!lastTime) lastTime = now;
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const iw = itemWidthRef.current;
      const cycleWidth = cycleWidthRef.current;

      if (!iw || !cycleWidth) return;

      // Update offset
      if (!pausedRef.current) {
        offsetRef.current += speedRef.current * dt;
      }

      // Seamless loop - reset when we've scrolled one full cycle
      if (offsetRef.current >= cycleWidth) {
        offsetRef.current -= cycleWidth;
      }

      // Apply transform
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      // ✅ Detect which item is at left edge (every gap + item width)
      const itemWithGap = iw + activeGap;
      const currentItemIndex = Math.floor(offsetRef.current / itemWithGap) % items.length;

      // Only trigger expansion when item changes
      if (previousIndexRef.current !== currentItemIndex) {
        previousIndexRef.current = currentItemIndex;
        setExpandedIndex(currentItemIndex);

        // Smooth pause animation
        pausedRef.current = true;

        // Resume after 3000ms
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }

        pauseTimeoutRef.current = setTimeout(() => {
          pausedRef.current = false;
          lastTime = 0; // Reset delta time for smooth resume
        }, 3000);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [items.length, activeGap, speed]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden px-0"
      style={{
        clipPath: "inset(0)",
        overflowX: "hidden",
        overflowY: "visible",
      }}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{
          gap: `${activeGap}px`,
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        {repeated.map((item, i) => {
          const realIndex = i % items.length;
          const isExpanded = realIndex === expandedIndex;

          return (
            <div
              key={`${i}-${realIndex}`}
              className="flex-shrink-0 flex items-end overflow-visible"
              style={{
                width: `${itemWidth}px`,
                transition: isExpanded 
                  ? "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" 
                  : "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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