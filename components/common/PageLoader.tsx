"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase =
  | "appear"
  | "grow"
  | "split"
  | "word-0"
  | "word-1"
  | "word-2"
  | "collapse"
  | "shrink"
  | "pause";

const TIMINGS: Record<Phase, number> = {
  appear:   500,
  grow:     700,
  split:    600,
  "word-0": 1300,
  "word-1": 1300,
  "word-2": 1300,
  collapse: 650,
  shrink:   700,
  pause:    400,
};

const NEXT: Record<Phase, Phase> = {
  appear:   "grow",
  grow:     "split",
  split:    "word-0",
  "word-0": "word-1",
  "word-1": "word-2",
  "word-2": "collapse",
  collapse: "shrink",
  shrink:   "pause",
  pause:    "appear",
};

const WORDS = ["DESIGN", "DONE", "DIFFERENTLY"];

const COMPACT_O  = 72;
const GROWN_O    = 128;
const SPLIT_GAP  = 140;
const FONT_SIZE  = 96;
const T          = "0.55s cubic-bezier(0.4, 0, 0.2, 1)";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  // ── Overlay ────────────────────────────────────────────────────────────────
  const [showOverlay, setShowOverlay]   = useState(true);
  const [overlayOpaque, setOverlayOpaque] = useState(true);
  const [mounted, setMounted]           = useState(false);
  const [scale, setScale]               = useState(1);

  useEffect(() => {
    // ~480px is the full width of the loader at max split; leave 32px padding
    const update = () => setScale(Math.min(1, (window.innerWidth - 32) / 480));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let done = false;
    const fadeOut = () => {
      if (done) return;
      done = true;
      setOverlayOpaque(false);
      setTimeout(() => setShowOverlay(false), 600);
    };
    if (document.readyState === "complete") { fadeOut(); return; }
    window.addEventListener("load", fadeOut);
    // Hard cap: never block the page more than 8 s
    const safeguard = setTimeout(fadeOut, 8000);
    return () => {
      window.removeEventListener("load", fadeOut);
      clearTimeout(safeguard);
    };
  }, []);

  // ── Route-change progress bar ──────────────────────────────────────────────
  const pathname    = usePathname();
  const [progress, setProgress]     = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const prevPath    = useRef(pathname);
  const barTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const crawlTimer  = useRef<ReturnType<typeof setInterval> | null>(null);

  // Click interceptor — bar starts the moment a nav link is clicked
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href.startsWith("mailto") ||
        href.startsWith("tel")
      ) return;
      if (href === prevPath.current) return;

      if (crawlTimer.current) clearInterval(crawlTimer.current);
      if (barTimer.current) clearTimeout(barTimer.current);

      setBarVisible(true);
      setProgress(8);
      let p = 8;
      crawlTimer.current = setInterval(() => {
        p = Math.min(p + Math.random() * 14, 80);
        setProgress(p);
      }, 300);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // Pathname changed — complete the bar
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    if (crawlTimer.current) clearInterval(crawlTimer.current);
    if (barTimer.current) clearTimeout(barTimer.current);

    setProgress(100);
    barTimer.current = setTimeout(() => {
      setBarVisible(false);
      setProgress(0);
    }, 350);

    return () => { if (barTimer.current) clearTimeout(barTimer.current); };
  }, [pathname]);

  // ── Animation phase machine ────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("appear");
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!showOverlay) return;
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    phaseTimer.current = setTimeout(() => setPhase(p => NEXT[p]), TIMINGS[phase]);
    return () => { if (phaseTimer.current) clearTimeout(phaseTimer.current); };
  }, [phase, showOverlay]);

  // ── Derived visual state ───────────────────────────────────────────────────
  const isGrown  = ["split","word-0","word-1","word-2","collapse"].includes(phase);
  const isSplit  = ["word-0","word-1","word-2"].includes(phase);
  const wordIdx  = phase === "word-0" ? 0 : phase === "word-1" ? 1 : phase === "word-2" ? 2 : -1;

  const oSize    = isGrown ? GROWN_O : COMPACT_O;
  const borderW  = Math.round(oSize * 0.17);
  const containerW = isSplit ? GROWN_O + SPLIT_GAP : oSize;

  return (
    <>
      {/* Route-change bar */}
      {barVisible && (
        <div
          className="fixed top-0 left-0 z-[9999] h-[3px] bg-[#0000B3] transition-all duration-300 ease-out"
          style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
        />
      )}

      {/* Initial load overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-[9998] bg-black flex items-center justify-center select-none overflow-hidden"
          style={{ opacity: overlayOpaque ? 1 : 0, transition: "opacity 0.55s ease" }}
        >
          <style>{`
            @keyframes wordIn {
              0%   { opacity: 0; transform: translateY(-18px); }
              18%  { opacity: 1; transform: translateY(0px);   }
              72%  { opacity: 1; transform: translateY(0px);   }
              90%  { opacity: 0; transform: translateY(18px);  }
              100% { opacity: 0; transform: translateY(18px);  }
            }
          `}</style>

          {/* POV wrapper — fades + scales in on mount, scales down on mobile */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              opacity: mounted ? 1 : 0,
              transform: mounted ? `scale(${scale})` : `scale(${scale * 0.92})`,
              transition: "opacity 0.45s ease, transform 0.45s ease",
              transformOrigin: "center center",
            }}
          >
            {/* ── P ── */}
            <span
              style={{
                fontSize: FONT_SIZE,
                fontWeight: 700,
                color: "white",
                lineHeight: 1,
                fontFamily: "",
                display: "block",
              }}
            >
              P
            </span>

            {/* ── O clip wrapper — height locked to P/V, position:relative for word centering ── */}
            <div
              style={{
                position: "relative",
                height: COMPACT_O,
                overflow: "hidden",
                flexShrink: 0,
                width: containerW,
                transition: `width ${T}`,
              }}
            >
              {/* O split container — absolutely centered so ring overflows top/bottom evenly */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: containerW,
                  height: oSize,
                  transition: `width ${T}, height ${T}`,
                }}
              >
                {/* Left half */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: oSize / 2,
                    height: oSize,
                    overflow: "hidden",
                    transition: `width ${T}, height ${T}`,
                  }}
                >
                  <div
                    style={{
                      width: oSize,
                      height: oSize,
                      borderRadius: "50%",
                      border: `${borderW}px solid white`,
                      boxSizing: "border-box",
                      transition: `all ${T}`,
                    }}
                  />
                </div>

                {/* Right half */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: oSize / 2,
                    height: oSize,
                    overflow: "hidden",
                    transition: `width ${T}, height ${T}`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      width: oSize,
                      height: oSize,
                      borderRadius: "50%",
                      border: `${borderW}px solid white`,
                      boxSizing: "border-box",
                      transition: `all ${T}`,
                    }}
                  />
                </div>
              </div>

              {/* Word — direct child of clip wrapper so top:50% = visible center */}
              {wordIdx >= 0 && (
                <div
                  key={wordIdx}
                  style={{
                    position: "absolute",
                    left: GROWN_O / 2,
                    right: GROWN_O / 2,
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: `wordIn ${TIMINGS[`word-${wordIdx}` as Phase]}ms ease-in-out forwards`,
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: 13,
                      letterSpacing: 5,
                      fontWeight: 300,
                      fontFamily: "",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {WORDS[wordIdx]}
                  </span>
                </div>
              )}
            </div>{/* end O clip wrapper */}

            {/* ── V ── */}
            <span
              style={{
                fontSize: FONT_SIZE,
                fontWeight: 700,
                color: "white",
                lineHeight: 1,
                fontFamily: "",
                display: "block",
              }}
            >
              V
            </span>
          </div>
        </div>
      )}

      {children}
    </>
  );
}
