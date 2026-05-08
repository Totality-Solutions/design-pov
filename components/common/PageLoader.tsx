"use client";

import { useEffect, useState } from "react";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setLoaded(true);
      return;
    }
    const onLoad = () => setLoaded(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <>
      {!loaded && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
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
