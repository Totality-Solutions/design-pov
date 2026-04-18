

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// Common UI Components
import Section from "../common/Section";
import { Container } from "../common/Container";
import SectionHeading from "../common/SectionHeading";

// Import External Data
import { slides } from "../../data/slidesData";

export default function MarqueeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imgKey, setImgKey] = useState(0);
  const [textKey, setTextKey] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [isHovered, setIsHovered] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
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

  const next = useCallback(() => {
    const nextIdx = (activeIndex + 1) % slides.length;
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
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [next]);

  useEffect(() => {
    const container = carouselRef.current;
    const el = container?.querySelector(`[data-idx="${activeIndex}"]`) as HTMLElement;

    if (!container || !el) return;

    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset =
        elRect.left -
        containerRect.left +
        container.scrollLeft -
        container.clientWidth / 2 +
        el.clientWidth / 2;

      container.scrollTo({ left: offset, behavior: "smooth" });
    } else {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset =
        elRect.top -
        containerRect.top +
        container.scrollTop -
        container.clientHeight / 2 +
        el.clientHeight / 2;

      container.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, [activeIndex]);

  const current = slides[activeIndex];

  return (
    <Container
      className="border-y border-gray-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="Featured_"
        titleBold="Story"
        sticky={false}
        isSectionHovered={isHovered}
        className=" !border-t-0"
      />
      <Section className="!py-0 !pb-6 md:!pb-0 ">
        <div className="mc-root">
          <div className="mc-wrap">
            {/* ── LEFT (Hero Image) ── */}
            <div className="w-full h-full flex flex-col items-start justify-center gap-10">
              <div className="hero-frame">
                {prevIndex !== null && (
                  <Image
                    className={`hero-img z1 ${direction === "down" ? "exit-down" : "exit-up"}`}
                    src={slides[prevIndex].main}
                    alt=""
                    priority
                  />
                )}
                <Image
                  key={imgKey}
                  className={`hero-img z2 ${direction === "down" ? "enter-down" : "enter-up"}`}
                  src={current.main}
                  alt={current.title}
                  priority
                />
              </div>
            </div>

            {/* ── CENTER (Thumbnails) ── */}
            <div className="thumb-strip" ref={carouselRef}>
              {slides.map((s, i) => (
                <div
                  key={s.id}
                  data-idx={i}
                  className={`thumb-item${i === activeIndex ? " active" : ""}`}
                  onClick={() => goTo(i)}
                >
                  <Image src={s.thumbnail} alt={s.title} loading="lazy" />
                </div>
              ))}
            </div>

            {/* ── RIGHT (Text Panel) ── */}
            <div className="text-panel">
              <div className="clip">
                <p key={`desc-${textKey}`} className="text-desc rtl s1">
                  {current.description}
                </p>
              </div>

              <div>
                <div className="clip">
                  <p key={`label-${textKey}`} className="text-label rtl s2">
                    {current.author}
                  </p>
                </div>
                <div className="clip">
                  <p key={`sub-${textKey}`} className="text-sub rtl s3">
                    {current.subtitle}
                  </p>
                </div>
              </div>

              <div className="clip">
                <div key={`big-${textKey}`} onClick={next} className="text-big rtl s4">
                  {current.title}
                  <Image
                    src="/icons/arrow-top-right.svg"
                    alt="arrow"
                    className="text-arrow"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}