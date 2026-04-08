"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Section from "../common/Section";
import { Container } from "../common/Container";
import Title from "../common/Title";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    const el = container?.querySelector(`[data-idx="${activeIndex}"]`) as HTMLElement;

    if (!container || !el) return;

    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
      // 👉 Horizontal centering
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      const offset =
        elRect.left -
        containerRect.left +
        container.scrollLeft -
        container.clientWidth / 2 +
        el.clientWidth / 2;

      container.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    } else {
      // 👉 Vertical centering (desktop)
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
    }
  }, [activeIndex]);

  const current = slides[activeIndex];

  return (
    <Container className="border-y border-gray-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
     >
     <SectionHeading
       titleMain="Featured_" 
       titleBold="Story" 
       sticky={false}
       isSectionHovered={isHovered} 
       className=' !border-t-0'
     >
     </SectionHeading>
      <Section className="!py-0 ">
        <div className="mc-root">
          <div className="mc-wrap ">

            {/* ── LEFT ── */}
            <div className="w-full h-full flex flex-col items-start justify-center gap-10">
              {/* <Title normalText="Featured" boldText="Story" /> */}
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
                <div key={`big-${textKey}`} onClick={next} className="text-big rtl s4">
                  {current.title}
                  <Image src="/icons/arrow-top-right.svg" alt="arrow" className="text-arrow" width={24} height={24} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}