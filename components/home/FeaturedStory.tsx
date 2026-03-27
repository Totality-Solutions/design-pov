"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Section from "../common/Section";
import { Container } from "../common/Container";
import Title from "../common/Title";

const slides = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=200&q=80",
    main: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=900&q=90",
    title: "NEBULA DRIFT",
    subtitle: "Vol. 01 — Cosmos Series",
    description:
      "Interstellar formations captured at the edge of observable space. Each frame holds a billion years of stellar evolution frozen in light.",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=200&q=80",
    main: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=900&q=90",
    title: "VOID SIGNAL",
    subtitle: "Vol. 02 — Deep Space",
    description:
      "Radio waves translated into visual frequencies. The universe communicates in patterns we are only beginning to decode.",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=200&q=80",
    main: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=900&q=90",
    title: "CHROMATIC BURST",
    subtitle: "Vol. 03 — Light Study",
    description:
      "Wavelengths split and refracted through crystalline structures. Pure energy made visible for a fraction of a second.",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=200&q=80",
    main: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=900&q=90",
    title: "AURORA PHASE",
    subtitle: "Vol. 04 — Atmosphere",
    description:
      "Solar wind colliding with magnetic fields at the poles. Nature's own light installation, running for millennia.",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=200&q=80",
    main: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=90",
    title: "STELLAR MASS",
    subtitle: "Vol. 05 — Star Formation",
    description:
      "Gravity pulling hydrogen clouds into incandescent spheres. The birth of a star is the universe's most spectacular performance.",
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1540198163009-7afda7da2945?w=200&q=80",
    main: "https://images.unsplash.com/photo-1540198163009-7afda7da2945?w=900&q=90",
    title: "DARK MATTER",
    subtitle: "Vol. 06 — The Unseen",
    description:
      "The invisible scaffold of the cosmos. 85% of all matter never emits or absorbs light — yet shapes everything we see.",
  },
  {
    id: 7,
    thumbnail: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=200&q=80",
    main: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=900&q=90",
    title: "EVENT HORIZON",
    subtitle: "Vol. 07 — Singularity",
    description:
      "The boundary beyond which nothing returns. At the edge of a black hole, time itself becomes geography.",
  },
  {
    id: 8,
    thumbnail: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=200&q=80",
    main: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=900&q=90",
    title: "CHROMATIC BURST",
    subtitle: "Vol. 03 — Light Study",
    description:
      "Wavelengths split and refracted through crystalline structures. Pure energy made visible for a fraction of a second.",
  },
  {
    id: 9,
    thumbnail: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=200&q=80",
    main: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=900&q=90",
    title: "AURORA PHASE",
    subtitle: "Vol. 04 — Atmosphere",
    description:
      "Solar wind colliding with magnetic fields at the poles. Nature's own light installation, running for millennia.",
  },
  {
    id: 10,
    thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=200&q=80",
    main: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=90",
    title: "STELLAR MASS",
    subtitle: "Vol. 05 — Star Formation",
    description:
      "Gravity pulling hydrogen clouds into incandescent spheres. The birth of a star is the universe's most spectacular performance.",
  },
  {
    id: 11,
    thumbnail: "https://images.unsplash.com/photo-1540198163009-7afda7da2945?w=200&q=80",
    main: "https://images.unsplash.com/photo-1540198163009-7afda7da2945?w=900&q=90",
    title: "DARK MATTER",
    subtitle: "Vol. 06 — The Unseen",
    description:
      "The invisible scaffold of the cosmos. 85% of all matter never emits or absorbs light — yet shapes everything we see.",
  },
  {
    id: 12,
    thumbnail: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=200&q=80",
    main: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=900&q=90",
    title: "EVENT HORIZON",
    subtitle: "Vol. 07 — Singularity",
    description:
      "The boundary beyond which nothing returns. At the edge of a black hole, time itself becomes geography.",
  },
];

export default function MarqueeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imgKey, setImgKey] = useState(0);
  const [textKey, setTextKey] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const carouselRef = useRef(null);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number, dir?: "up" | "down") => {
      if (isAnimating || index === activeIndex) return;
      const d = dir ?? (index > activeIndex ? "down" : "up");
      setDirection(d);
      setPrevIndex(activeIndex);
      setIsAnimating(true);
      setActiveIndex(index);
      setImgKey((k) => k + 1);
      setTextKey((k) => k + 1);
      setTimeout(() => {
        setIsAnimating(false);
        setPrevIndex(null);
      }, 800);
    },
    [isAnimating, activeIndex]
  );

  // Seamless infinite loop — wraps back to 0 with same smooth "down" transition
  const next = useCallback(() => {
    const nextIdx = (activeIndex + 1) % slides.length;
    // Force allow even if nextIdx === activeIndex (shouldn't happen with 7 slides)
    setDirection("down");
    setPrevIndex(activeIndex);
    setIsAnimating(true);
    setActiveIndex(nextIdx);
    setImgKey((k) => k + 1);
    setTextKey((k) => k + 1);
    setTimeout(() => {
      setIsAnimating(false);
      setPrevIndex(null);
    }, 800);
  }, [activeIndex]);

  useEffect(() => {
    autoRef.current = setTimeout(next, 4000);
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [next]);


 useEffect(() => {
  const container = carouselRef.current;
  const el = container?.querySelector(`[data-idx="${activeIndex}"]`);

  if (!container || !el) return;

  const containerRect = container.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  const offset =
    elRect.top -
    containerRect.top +
    container.scrollTop -
    container.clientHeight / 2 +
    el.clientHeight / 2;

  container.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}, [activeIndex]);
  
  const current = slides[activeIndex];

  return (
        <Container className="border-y border-gray-200 bottom-2">
    <Section>
        <style>{`
            :root {
            --bg: #f0ede8;
            --ink: #0d0d0d;
            --muted: #8a8782;
            }

            body { background: var(--bg); }

            .mc-root {
            min-height: 100vh;
            background: var(--bg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'DM Sans', sans-serif;
            overflow: hidden;
            }

            .mc-wrap {
            width: 100%;
            max-width: 1400px;
            display: grid;
            grid-template-columns: 1fr 130px 1fr;
            gap: 0 28px;
            align-items: center;
            min-height: 540px;
            }

            /* ──────────────────────────────────────
            LEFT: HERO IMAGE
            ────────────────────────────────────── */
            .hero-frame {
            position: relative;
            width: 100%;
            aspect-ratio: 16/10;
            overflow: hidden;
            border-radius: 4px;
            }

            .hero-img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            will-change: transform, opacity;
            }
            .hero-img.z2 { z-index: 2; }
            .hero-img.z1 { z-index: 1; }

            .hero-img.enter-down { animation: heroEnterDown 0.82s cubic-bezier(0.16,1,0.3,1) forwards; }
            .hero-img.enter-up   { animation: heroEnterUp   0.82s cubic-bezier(0.16,1,0.3,1) forwards; }
            .hero-img.exit-down  { animation: heroExitDown  0.6s  cubic-bezier(0.4,0,1,1) forwards; }
            .hero-img.exit-up    { animation: heroExitUp    0.6s  cubic-bezier(0.4,0,1,1) forwards; }

            @keyframes heroEnterDown {
            from { transform: scale(1.1) translateY(5%); opacity: 0; }
            to   { transform: scale(1)   translateY(0);  opacity: 1; }
            }
            @keyframes heroEnterUp {
            from { transform: scale(1.1) translateY(-5%); opacity: 0; }
            to   { transform: scale(1)   translateY(0);   opacity: 1; }
            }
            @keyframes heroExitDown {
            from { transform: scale(1)    translateY(0);   opacity: 1; }
            to   { transform: scale(0.96) translateY(-3%); opacity: 0; }
            }
            @keyframes heroExitUp {
            from { transform: scale(1)    translateY(0);  opacity: 1; }
            to   { transform: scale(0.96) translateY(3%); opacity: 0; }
            }

            /* bottom gradient */
            .hero-frame::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.2) 100%);
            pointer-events: none;
            z-index: 3;
            }

            /* ──────────────────────────────────────
            CENTER: THUMBNAIL STRIP
            Active thumb grows smoothly via CSS transition on width+height.
            No JS layout tricks — pure transition.
            ────────────────────────────────────── */
            .thumb-strip {
            display: flex;
            flex-direction: column;
            gap: 8px;
            max-height: 480px;
            overflow-y: auto;
            scrollbar-width: none;
            align-items: start;
            }
            .thumb-strip::-webkit-scrollbar { display: none; }

            .thumb-item {
            /* base size */
            width: 80px;
            height: 56px;
            border-radius: 3px;
            overflow: hidden;
            cursor: pointer;
            position: relative;
            flex-shrink: 0;
            /* THE key: transition width & height so growth is physically smooth */
            transition:
                width  0.5s cubic-bezier(0.34, 1.15, 0.64, 1),
                height 0.5s cubic-bezier(0.34, 1.15, 0.64, 1),
                box-shadow 0.4s ease;
            }

            /* Active thumb grows to larger size */
            .thumb-item.active {
            width: 112px;
            height: 80px;
            box-shadow: 0 8px 28px rgba(0,0,0,0.26);
            }

            .thumb-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
            }
            .thumb-item:hover img { transform: scale(1.08); }

            /* dim overlay fades out on active */
            .thumb-item::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.3);
            transition: opacity 0.45s ease;
            pointer-events: none;
            }
            .thumb-item.active::after { opacity: 0; }

            /* white left accent bar — scales in on active */
            .thumb-item::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 3px;
            background: #fff;
            z-index: 2;
            transform: scaleY(0);
            transform-origin: top;
            transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
            }
            /* active indicator bar */
            .thumb-item.active::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 3px;
            background: var(--ink);
            z-index: 2;
            animation: barIn 0.35s ease forwards;
            }
            @keyframes barIn {
            from { transform: scaleY(0); }
            to   { transform: scaleY(1); }
            }

            /* ──────────────────────────────────────
            RIGHT: TEXT PANEL — slides RIGHT → LEFT
            ────────────────────────────────────── */
            .text-panel {
            padding-left: 32px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            }

            /* Each animated child needs a clipping parent */
            .clip { overflow: hidden; }

            .text-desc {
            font-size: 15px;
            font-weight: 300;
            line-height: 1.75;
            color: var(--ink);
            max-width: 340px;
            }
            .text-label {
            font-size: 14px;
            font-weight: 500;
            color: var(--ink);
            letter-spacing: 0.02em;
            }
            .text-sub {
            font-size: 13px;
            font-weight: 300;
            color: var(--muted);
            letter-spacing: 0.01em;
            margin-top: 3px;
            }
            .text-big {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(52px, 5.5vw, 88px);
            letter-spacing: 0.02em;
            line-height: 0.92;
            color: var(--ink);
            display: flex;
            align-items: flex-end;
            gap: 12px;
            }
            .text-arrow {
            font-family: 'DM Sans', sans-serif;
            font-size: 20px;
            font-weight: 300;
            margin-bottom: 6px;
            opacity: 0.45;
            cursor: pointer;
            transition: opacity 0.2s, transform 0.2s;
            flex-shrink: 0;
            }
            .text-arrow:hover { opacity: 1; transform: translate(2px,-2px); }

            /* RIGHT-TO-LEFT reveal animation */
            .rtl {
            animation: rtlIn 0.58s cubic-bezier(0.16, 1, 0.3, 1) both;
            }
            /* staggered delays */
            .rtl.s1 { animation-delay: 0.04s; }
            .rtl.s2 { animation-delay: 0.10s; }
            .rtl.s3 { animation-delay: 0.16s; }
            .rtl.s4 { animation-delay: 0.22s; }

            @keyframes rtlIn {
            from { transform: translateX(72px); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
            }

            /* ──────────────────────────────────────
            PROGRESS BAR
            ────────────────────────────────────── */
            .progress-bar {
            position: fixed;
            bottom: 0; left: 0;
            height: 2px;
            background: var(--ink);
            animation: progAnim 4s linear forwards;
            }
            @keyframes progAnim {
            from { width: 0%; }
            to   { width: 100%; }
            }

            /* ──────────────────────────────────────
            DOTS
            ────────────────────────────────────── */
            .dots {
            position: fixed;
            bottom: 18px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            }
            .dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--muted);
            cursor: pointer;
            transition: background 0.3s, transform 0.3s;
            }
            .dot.active { background: var(--ink); transform: scale(1.5); }

            @media (max-width: 900px) {
            .mc-wrap {
                grid-template-columns: 1fr;
                padding: 24px;
                gap: 20px 0;
            }
            .thumb-strip { flex-direction: row; overflow-x: auto; }
            .text-panel { padding-left: 0; }
            }
        `}</style>
        <Title normalText="Featured" boldText="Story" />
        <div className="mc-root">
            <div className="mc-wrap">

            {/* ── LEFT ── */}
            <div className="hero-frame">
                {prevIndex !== null && (
                <img
                    className={`hero-img z1 ${direction === "down" ? "exit-down" : "exit-up"}`}
                    src={slides[prevIndex].main}
                    alt=""
                />
                )}
                <img
                key={imgKey}
                className={`hero-img z2 ${direction === "down" ? "enter-down" : "enter-up"}`}
                src={current.main}
                alt={current.title}
                />
            </div>

            {/* ── CENTER ── */}
            <div className="thumb-strip" ref={carouselRef}>
                {slides.map((s, i) => (
                <div
                    key={s.id}
                    data-idx={i}
                    className={`thumb-item${i === activeIndex ? " active" : ""}`}
                    onClick={() => goTo(i)}
                >
                    <img src={s.thumbnail} alt={s.title} loading="lazy" />
                </div>
                ))}
            </div>

            {/* ── RIGHT ── */}
            <div className="text-panel">

                {/* Description */}
                <div className="clip">
                <p key={`desc-${textKey}`} className="text-desc rtl s1">
                    {current.description}
                </p>
                </div>

                {/* Meta: title + subtitle share one clip wrapper to animate together */}
                <div>
                <div className="clip">
                    <p key={`label-${textKey}`} className="text-label rtl s2">
                    {current.title}
                    </p>
                </div>
                <div className="clip">
                    <p key={`sub-${textKey}`} className="text-sub rtl s3">
                    {current.subtitle}
                    </p>
                </div>
                </div>

                {/* Big title */}
                <div className="clip">
                <div key={`big-${textKey}`} className="text-big rtl s4">
                    {current.title}
                    <span className="text-arrow" onClick={next}>↗</span>
                </div>
                </div>

            </div>
            </div>

            {/* Progress bar — key forces re-mount on every slide change */}
            {/* <div key={`prog-${activeIndex}`} className="progress-bar" /> */}

            {/* Dots */}
            {/* <div className="dots">
            {slides.map((_, i) => (
                <div
                key={i}
                className={`dot${i === activeIndex ? " active" : ""}`}
                onClick={() => goTo(i)}
                />
            ))}
            </div> */}
        </div>
    </Section>
        </Container>
  );
}