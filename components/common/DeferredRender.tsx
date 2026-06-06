"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type DeferredRenderProps = {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
};

export default function DeferredRender({
  children,
  minHeight = "1px",
  rootMargin = "900px 0px",
}: DeferredRenderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div
      ref={ref}
      style={{
        minHeight: shouldRender ? undefined : minHeight,
        contentVisibility: "auto",
        containIntrinsicSize: minHeight,
      }}
    >
      {shouldRender ? children : null}
    </div>
  );
}
