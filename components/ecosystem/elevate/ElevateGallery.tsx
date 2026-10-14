"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "@/components/common/SmartImage";

import { Container } from "@/components/common/Container";
import Section from "@/components/common/Section";
import { DEFAULT_ELEVATE } from "@/lib/elevateContent";

const DEFAULTS = DEFAULT_ELEVATE.gallery;

export default function ElevateGallery({
  heading = DEFAULTS.heading,
  body = DEFAULTS.body,
  images = DEFAULTS.images,
}: { heading?: string; body?: string; images?: string[] }) {
  const gallery = images.filter(Boolean).map((src, i) => ({ id: i + 1, image: src, thumbnail: src }));
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imgKey, setImgKey] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

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

      setTimeout(() => {
        setIsAnimating(false);
        setPrevIndex(null);
      }, 800);
    },
    [isAnimating, activeIndex]
  );

  const next = useCallback(() => {
    const nextIdx = (activeIndex + 1) % gallery.length;
    goTo(nextIdx, "down");
  }, [activeIndex, goTo, gallery.length]);

  useEffect(() => {
    if (gallery.length < 2) return;
    autoRef.current = setTimeout(next, 4000);

    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [next, gallery.length]);

  useEffect(() => {
    const container = carouselRef.current;

    const el = container?.querySelector(
      `[data-idx="${activeIndex}"]`
    ) as HTMLElement;

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

      container.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    } else {
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

  const current = gallery[activeIndex];
  if (!current) return null;

  return (
    <Container className="pb-10">
      <Section className="!py-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[0.9fr_1fr] gap-8 lg:gap-12 items-center">

          {/* LEFT IMAGE */}
          <div className="w-full">
            <div className="relative w-full aspect-[16/10] overflow-hidden">

              {/* Previous */}
              {prevIndex !== null && (
                <Image
                  src={gallery[prevIndex].image}
                  alt=""
                  fill
                  loading="lazy"
                  className={`object-cover z-[1]
                  ${
                    direction === "down"
                      ? "animate-[heroExitDown_0.6s_cubic-bezier(0.4,0,1,1)_forwards]"
                      : "animate-[heroExitUp_0.6s_cubic-bezier(0.4,0,1,1)_forwards]"
                  }`}
                />
              )}

              {/* Current */}
              <Image
                key={imgKey}
                src={current.image}
                alt="Gallery Image"
                fill
                loading="lazy"
                className={`object-cover z-[2]
                ${
                  direction === "down"
                    ? "animate-[heroEnterDown_0.82s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                    : "animate-[heroEnterUp_0.82s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                }`}
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-[3]" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-[1fr_220px] gap-2 items-center">

            {/* TEXT */}
            <div className="flex items-center text-justify">
              <div className="max-w-[480px] flex flex-col gap-4">

                <div className="">
                  <h2 className="text-[clamp(24px,1vw,40px)] font-bold leading-none text-black animate-[rtlIn_0.58s_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:0.12s]">
                    {heading}
                  </h2>
                </div>
                <div className="">
                  <p className="text-[15px] font-light leading-[1.3] text-black max-w-[450px] 2xl:pr-0 lg:pr-8 whitespace-pre-line animate-[rtlIn_0.58s_cubic-bezier(0.16,1,0.3,1)_both]">
                    {body}
                  </p>
                </div>


              </div>
            </div>

            {/* THUMBNAILS */}
            <div
              ref={carouselRef}
              className="
                flex flex-row lg:flex-col
                gap-2 
                max-w-full lg:max-h-[480px]
                overflow-x-auto lg:overflow-y-auto
                overflow-y-hidden lg:overflow-x-hidden
                no-scrollbar
                items-end lg:items-start mb-6 lg:mb-0
              "
            >
              {gallery.map((item, i) => (
                <div
                  key={item.id}
                  data-idx={i}
                  onClick={() => goTo(i)}
                  className={`
                    relative overflow-hidden cursor-pointer shrink-0
                    transition-all duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                
                    ${
                      i === activeIndex
                        ? "w-[120px] h-[70px] lg:w-[200px] lg:h-[113px]"
                        : "w-[90px] h-[70px] lg:w-[160px] lg:h-[113px]"
                    }
                  `}
                >
                  <Image
                    src={item.thumbnail}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.08]"
                  />

                  {/* Overlay */}
                  <div
                    className={`
                      absolute inset-0 bg-black/30
                      transition-opacity duration-500
                      ${i === activeIndex ? "opacity-0" : "opacity-100"}
                    `}
                  />

                  {/* Active Bar */}
                  {i === activeIndex && (
                    <div
                      className="
                        absolute
                        left-0 lg:right-0 lg:left-auto
                        top-0 bottom-0
                        w-[3px]
                        bg-black
                        z-10
                        animate-[barIn_0.35s_ease_forwards]
                      "
                    />
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </Section>
    </Container>
  );
}