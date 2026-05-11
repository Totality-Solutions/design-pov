"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  // ── Initial page load overlay ──────────────────────────────────────────────
  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setInitialLoaded(true);
      return;
    }
    const onLoad = () => setInitialLoaded(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // ── Route-change progress bar ──────────────────────────────────────────────
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Clear any running timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Start bar at 20%, race to 80%, then complete
    setProgress(20);
    setVisible(true);

    timerRef.current = setTimeout(() => setProgress(80), 120);
    timerRef.current = setTimeout(() => {
      setProgress(100);
      // Fade out after bar hits 100
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  return (
    <>
      {/* Route-change top progress bar */}
      {visible && (
        <div
          className="fixed top-0 left-0 z-9999 h-[3px] bg-[#0000B3] transition-all duration-300 ease-out"
          style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
        />
      )}

      {/* Initial page-load full-screen overlay */}
      {!initialLoaded && (
        <div className="fixed inset-0 z-9998 bg-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#0000B3] animate-spin" />
            <p
              className="text-sm tracking-widest uppercase text-gray-400"
              style={{ fontFamily: "var(--font-family)" }}
            >
              Loading
            </p>
          </div>
        </div>
      )}

      {children}
    </>
  );
}
