"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";

interface MarqueeFlowProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
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
  speed = 3500,
  mobileCount = 2,
  tabletCount = 3,
  desktopCount = 4,
}: MarqueeFlowProps<T>) {
  const [visibleItems, setVisibleItems] = useState(desktopCount);
  const [activeGap, setActiveGap] = useState(gap);
  const [activeSpeed, setActiveSpeed] = useState(speed);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const isAnimatingRef = useRef(false); // ← replaces isResettingRef

  const scrollBy = 1;
  const cloneCount = visibleItems;

  const cloned = useMemo(() => {
    if (items.length === 0) return [];
    const tail = items.slice(-cloneCount);
    const head = items.slice(0, cloneCount);
    return [...tail, ...items, ...head];
  }, [items, cloneCount]);

  const realOffset = cloneCount;

  const getTransform = (idx: number) =>
    `translateX(calc(${idx} * -1 * (100% + ${activeGap}px) / ${visibleItems}))`;

  // Instantly teleport with no transition, using double rAF to ensure the
  // browser has fully painted before re-enabling transitions.
  const jumpTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "none";
    track.style.transform = getTransform(idx);
    // Double rAF: first queues after paint, second queues after that paint —
    // guarantees the "none" transition is committed before any next slideTo.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isAnimatingRef.current = false;
      });
    });
  };

  const slideTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    isAnimatingRef.current = true;
    track.style.transition = "transform 2000ms cubic-bezier(0.4, 0, 0.7, 1)";
    track.style.transform = getTransform(idx);
  };

  // After each slide animation ends, check if we need to loop back.
  // Using transitionend instead of a setTimeout avoids timing drift.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      const idx = indexRef.current;
      if (idx >= realOffset + items.length) {
        indexRef.current = realOffset;
        jumpTo(realOffset);
      } else {
        isAnimatingRef.current = false;
      }
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, [realOffset, items.length, activeGap, visibleItems]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVisibleItems(mobileCount);
        setActiveGap(Math.round(gap * 0.5));
        setActiveSpeed(Math.round(speed * 0.8));
      } else if (w < 1024) {
        setVisibleItems(tabletCount);
        setActiveGap(gap);
        setActiveSpeed(speed);
      } else {
        setVisibleItems(desktopCount);
        setActiveGap(gap);
        setActiveSpeed(speed);
      }
    };
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(update, 150);
    };
    update();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [mobileCount, tabletCount, desktopCount, gap, speed]);

  useEffect(() => {
    indexRef.current = realOffset;
    isAnimatingRef.current = false;
    jumpTo(realOffset);
  }, [visibleItems, realOffset, activeGap]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || items.length === 0 || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      // Skip tick if previous animation hasn't finished yet
      if (isAnimatingRef.current) return;
      const next = indexRef.current + scrollBy;
      indexRef.current = next;
      slideTo(next);
    }, activeSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [activeSpeed, isVisible, items.length, visibleItems, realOffset, isPaused]);

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{
          gap: `${activeGap}px`,
          transform: getTransform(realOffset),
          willChange: "transform",
        }}
      >
        {cloned.map((item: T, i: number) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-end" 
            style={{
              flex: `0 0 calc((100% - ${(visibleItems - 1) * activeGap}px) / ${visibleItems})`,
            }}
          >
            {renderItem(item, i % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}