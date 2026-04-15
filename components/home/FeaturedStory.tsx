"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Section from "../common/Section";
import { Container } from "../common/Container";
import Title from "../common/Title";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import BlogImg1 from "@/public/temp/home/blogs/blog-1.jpg"
import BlogImg2 from "@/public/temp/home/blogs/blog-2.jpg"
import BlogImg3 from "@/public/temp/home/blogs/blog-3.jpg"
import BlogImg4 from "@/public/temp/home/blogs/blog-4.jpg"
import BlogImg5 from "@/public/temp/home/blogs/blog-5.jpg"
import BlogImg6 from "@/public/temp/home/blogs/blog-6.jpg"
import BlogImg7 from "@/public/temp/home/blogs/blog-7.webp"
import BlogImg8 from "@/public/temp/home/blogs/blog-8.webp"
import BlogImg9 from "@/public/temp/home/blogs/blog-9.jpg"
import BlogImg10 from "@/public/temp/home/blogs/blog-10.jpg"
import BlogImg11 from "@/public/temp/home/blogs/blog-11.jpg"
import BlogImg12 from "@/public/temp/home/blogs/blog-12.webp"
import BlogImg13 from "@/public/temp/home/blogs/blog-13.jpg"
import BlogImg14 from "@/public/temp/home/blogs/blog-14.jpg"
import BlogImg15 from "@/public/temp/home/blogs/blog-15.jpg"
import BlogImg16 from "@/public/temp/home/blogs/blog-16.jpg"

const slides = [
  {
    id: 1,
    thumbnail: BlogImg1 ,
    main: BlogImg1,
    title: "NEBULA DRIFT",
    subtitle: "Vol. 01 — Cosmos Series",
    description:
      "Interstellar formations captured at the edge of observable space. Each frame holds a billion years of stellar evolution frozen in light.",
  },
  {
    id: 2,
    thumbnail: BlogImg2,
    main: BlogImg2,
    title: "VOID SIGNAL",
    subtitle: "Vol. 02 — Deep Space",
    description:
      "Radio waves translated into visual frequencies. The universe communicates in patterns we are only beginning to decode.",
  },
  {
    id: 3,
    thumbnail: BlogImg3,
    main: BlogImg3,
    title: "CHROMATIC BURST",
    subtitle: "Vol. 03 — Light Study",
    description:
      "Wavelengths split and refracted through crystalline structures. Pure energy made visible for a fraction of a second.",
  },
  {
    id: 4,
    thumbnail: BlogImg4,
    main: BlogImg4,
    title: "AURORA PHASE",
    subtitle: "Vol. 04 — Atmosphere",
    description:
      "Solar wind colliding with magnetic fields at the poles. Nature's own light installation, running for millennia.",
  },
  {
    id: 5,
    thumbnail: BlogImg5,
    main: BlogImg5,
    title: "STELLAR MASS",
    subtitle: "Vol. 05 — Star Formation",
    description:
      "Gravity pulling hydrogen clouds into incandescent spheres. The birth of a star is the universe's most spectacular performance.",
  },
  {
    id: 6,
    thumbnail: BlogImg6,
    main: BlogImg6,
    title: "DARK MATTER",
    subtitle: "Vol. 06 — The Unseen",
    description:
      "The invisible scaffold of the cosmos. 85% of all matter never emits or absorbs light — yet shapes everything we see.",
  },
  {
    id: 7,
    thumbnail: BlogImg7,
    main: BlogImg7,
    title: "EVENT HORIZON",
    subtitle: "Vol. 07 — Singularity",
    description:
      "The boundary beyond which nothing returns. At the edge of a black hole, time itself becomes geography.",
  },
  {
    id: 8,
    thumbnail: BlogImg8,
    main: BlogImg8,
    title: "CHROMATIC BURST",
    subtitle: "Vol. 03 — Light Study",
    description:
      "Wavelengths split and refracted through crystalline structures. Pure energy made visible for a fraction of a second.",
  },
  {
    id: 9,
    thumbnail: BlogImg9,
    main: BlogImg9,
    title: "AURORA PHASE",
    subtitle: "Vol. 04 — Atmosphere",
    description:
      "Solar wind colliding with magnetic fields at the poles. Nature's own light installation, running for millennia.",
  },
  {
    id: 10,
    thumbnail: BlogImg10,
    main: BlogImg10,
    title: "STELLAR MASS",
    subtitle: "Vol. 05 — Star Formation",
    description:
      "Gravity pulling hydrogen clouds into incandescent spheres. The birth of a star is the universe's most spectacular performance.",
  },
  {
    id: 11,
    thumbnail: BlogImg11,
    main: BlogImg11,
    title: "DARK MATTER",
    subtitle: "Vol. 06 — The Unseen",
    description:
      "The invisible scaffold of the cosmos. 85% of all matter never emits or absorbs light — yet shapes everything we see.",
  },
  {
    id: 12,
    thumbnail: BlogImg12,
    main: BlogImg12,
    title: "EVENT HORIZON",
    subtitle: "Vol. 07 — Singularity",
    description:
      "The boundary beyond which nothing returns. At the edge of a black hole, time itself becomes geography.",
  },
  {
    id: 13,
    thumbnail: BlogImg13,
    main: BlogImg13,
    title: "EVENT HORIZON",
    subtitle: "Vol. 07 — Singularity",
    description:
      "The boundary beyond which nothing returns. At the edge of a black hole, time itself becomes geography.",
  },
  {
    id: 14,
    thumbnail: BlogImg14,
    main: BlogImg14,
    title: "EVENT HORIZON",
    subtitle: "Vol. 07 — Singularity",
    description:
      "The boundary beyond which nothing returns. At the edge of a black hole, time itself becomes geography.",
  },
  {
    id: 15,
    thumbnail: BlogImg15,
    main: BlogImg15,
    title: "EVENT HORIZON",
    subtitle: "Vol. 07 — Singularity",
    description:
      "The boundary beyond which nothing returns. At the edge of a black hole, time itself becomes geography.",
  },
  {
    id: 16,
    thumbnail: BlogImg16,
    main: BlogImg16,
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
                  <Image
                    className={`hero-img z1 ${direction === "down" ? "exit-down" : "exit-up"}`}
                    src={slides[prevIndex].main}
                    alt=""
                  />
                )}
                <Image
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
                  <Image src={s.thumbnail} alt={s.title} loading="lazy" />
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