"use client";

import React, { useEffect, useState, useRef } from "react";

interface MarqueeFlowProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isExpanded: boolean) => React.ReactNode;
  overlayImage?: string;
  gap?: number;
  speed?: number;
  mobileCount?: number;
  tabletCount?: number;
  desktopCount?: number;
  autoExpand?: boolean;
  onExpandChange?: (expandedIndex: number) => void;
}

export default function MarqueeFlow<T>({
  items,
  renderItem,
  overlayImage,
  gap = 16,
  speed = 80,
  mobileCount = 1,
  tabletCount = 2,
  desktopCount = 4,
  autoExpand = true,
  onExpandChange,
}: MarqueeFlowProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rafRef = useRef<number>(0);
  const xPositions = useRef<number[]>([]);
  const itemWidthRef = useRef(0);
  const gapRef = useRef(gap);
  const speedRef = useRef(speed);
  const lastTsRef = useRef(0);
  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expandedIndexRef = useRef(0);
  const onExpandChangeRef = useRef(onExpandChange);
  useEffect(() => { onExpandChangeRef.current = onExpandChange; }, [onExpandChange]);

  const [visibleCount, setVisibleCount] = useState(desktopCount);
  const [activeGap, setActiveGap] = useState(gap);
  const [itemWidth, setItemWidth] = useState(0);

  // Responsive visible count
  useEffect(() => {
    const handle = () => {
      const w = window.innerWidth;
      if (w < 640)       { setVisibleCount(mobileCount);  setActiveGap(0); }
      else if (w < 1024) { setVisibleCount(tabletCount);  setActiveGap(14); }
      else               { setVisibleCount(desktopCount); setActiveGap(gap); }
    };
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [mobileCount, tabletCount, desktopCount, gap]);

  // Measure and initialise positions
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;

      const totalGaps = (Math.floor(visibleCount) - 1) * activeGap;
      const iw = (container.offsetWidth - totalGaps) / Math.floor(visibleCount);
      itemWidthRef.current = iw;
      gapRef.current = activeGap;
      setItemWidth(iw);

      // Place items side by side starting from x = 0
      xPositions.current = items.map((_, i) => i * (iw + activeGap));

      // Apply positions and set item 0 as the initial expanded item
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translateX(${xPositions.current[i]}px)`;
        const isExp = i === expandedIndexRef.current;
        el.dataset.expanded = isExp ? "true" : "false";
        const btn = el.querySelector<HTMLElement>(".marquee-item-btn");
        if (btn) btn.style.clipPath = isExp ? "inset(0% 0 0 0)" : "inset(40% 0 0 0)";
      });

      onExpandChangeRef.current?.(expandedIndexRef.current);
    };

    const t = setTimeout(measure, 50);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, [visibleCount, activeGap, items]);

  // Animation loop — teleport items instead of copying
  useEffect(() => {
    if (!itemWidth) return;

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);

      const dt = lastTsRef.current ? (now - lastTsRef.current) / 1000 : 0;
      lastTsRef.current = now;

      if (pausedRef.current || !dt) return;

      const iw = itemWidthRef.current;
      const g  = gapRef.current;
      const step = speedRef.current * dt;
      const n = xPositions.current.length;

      // Advance all items
      for (let i = 0; i < n; i++) {
        xPositions.current[i] -= step;
      }

      // Teleport: if an item goes fully off-screen left, move it to the right end
      const rightEdge = Math.max(...xPositions.current);
      for (let i = 0; i < n; i++) {
        if (xPositions.current[i] < -(iw + g)) {
          xPositions.current[i] = rightEdge + iw + g;
        }
      }

      // Apply transforms — direct DOM, no React re-render
      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (el) el.style.transform = `translateX(${xPositions.current[i]}px)`;
      }

      // AutoExpand: find the leftmost item whose right edge is still on screen
      if (autoExpand && containerRef.current) {
        let closestIdx = 0;
        let leftmostX = Infinity;
        for (let i = 0; i < n; i++) {
          const x = xPositions.current[i];
          // item is partially visible (right edge > 0) and further left than current best
          if (x + iw > 0 && x < leftmostX) { leftmostX = x; closestIdx = i; }
        }

        if (expandedIndexRef.current !== closestIdx) {
          expandedIndexRef.current = closestIdx;
          onExpandChangeRef.current?.(closestIdx);

          // Direct DOM update — no React re-render
          for (let i = 0; i < n; i++) {
            const el = itemRefs.current[i];
            if (!el) continue;
            const isExp = i === closestIdx;
            el.dataset.expanded = isExp ? "true" : "false";
            const btn = el.querySelector<HTMLElement>(".marquee-item-btn");
            if (btn && !btn.matches(":hover")) {
              btn.style.clipPath = isExp ? "inset(0% 0 0 0)" : "inset(40% 0 0 0)";
            }
          }

          pausedRef.current = true;
          if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
          pauseTimeoutRef.current = setTimeout(() => {
            pausedRef.current = false;
            lastTsRef.current = 0;
          }, 3000);
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [itemWidth, autoExpand]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative"
      style={{ height: "100%" }}
    >
      {/* Absolute container so items can be individually positioned */}
      <div
        className="relative w-full h-full"
        style={{ willChange: "transform" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            data-expanded="false"
            className="absolute top-0 left-0 flex items-end group"
            style={{
              width: `${itemWidth}px`,
              height: "100%",
              transform: `translateX(${xPositions.current[i] ?? i * (itemWidth + activeGap)}px)`,
              willChange: "transform",
            }}
          >
            {renderItem(item, i, false)}

            {overlayImage && (
              <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ease-in-out group-hover:opacity-0 flex items-center justify-center">
                <img src={overlayImage} alt="overlay" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
