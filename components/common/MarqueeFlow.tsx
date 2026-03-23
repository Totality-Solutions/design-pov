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
  mobileCount = 2,     // ← was 1, now 2 so cards aren't full-width
  tabletCount = 3,
  desktopCount = 4
}: MarqueeFlowProps<T>) {
  const [visibleItems, setVisibleItems] = useState(desktopCount);
  const [activeGap, setActiveGap] = useState(gap);      // ← new: responsive gap
  const [activeSpeed, setActiveSpeed] = useState(speed); // ← new: responsive speed
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const isResettingRef = useRef(false);

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

  const jumpTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "none";
    track.style.transform = getTransform(idx);
    void track.offsetHeight;
  };

  const slideTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "transform 700ms ease-in-out";
    track.style.transform = getTransform(idx);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVisibleItems(mobileCount);
        setActiveGap(Math.round(gap * 0.5));     // ← half gap on mobile
        setActiveSpeed(Math.round(speed * 0.8)); // ← slightly faster on mobile
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
      if (isResettingRef.current) return;
      const next = indexRef.current + scrollBy;
      indexRef.current = next;
      slideTo(next);

      if (next >= realOffset + items.length) {
        isResettingRef.current = true;
        setTimeout(() => {
          indexRef.current = realOffset;
          jumpTo(realOffset);
          isResettingRef.current = false;
        }, 720);
      }
    }, activeSpeed); // ← uses activeSpeed now

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
          gap: `${activeGap}px`,  // ← uses activeGap now
          transform: getTransform(realOffset),
          willChange: "transform",
        }}
      >
        {cloned.map((item: T, i: number) => (
          <div
            key={i}
            className="flex-shrink-0"
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