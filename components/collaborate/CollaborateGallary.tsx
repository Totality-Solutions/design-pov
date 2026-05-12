"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

import { Container } from "@/components/common/Container";
import Section from "@/components/common/Section";

const img1 = "/temp/edition/elevate/1.JPG";
const img2 = "/temp/edition/elevate/2.JPG";
const img3 = "/temp/edition/elevate/3.JPG";
const img4 = "/temp/edition/elevate/4.JPG";
const img5 = "/temp/edition/elevate/5.JPG";
const img6 = "/temp/edition/elevate/6.JPG";
const img7 = "/temp/edition/elevate/7.JPG";
const img8 = "/temp/edition/elevate/8.JPG";
const img9 = "/temp/edition/elevate/9.JPG";
const img10 = "/temp/edition/elevate/10.JPG";
const img11 = "/temp/edition/elevate/11.JPG";
const img12 = "/temp/edition/elevate/12.JPG";

const gallery = [
  { id: 1, image: img1, thumbnail: img1 },
  { id: 2, image: img2, thumbnail: img2 },
  { id: 3, image: img3, thumbnail: img3 },
  { id: 4, image: img4, thumbnail: img4 },
  { id: 5, image: img5, thumbnail: img5 },
  { id: 6, image: img6, thumbnail: img6 },
  { id: 7, image: img7, thumbnail: img7 },
  { id: 8, image: img8, thumbnail: img8 },
  { id: 9, image: img9, thumbnail: img9 },
  { id: 10, image: img10, thumbnail: img10 },
  { id: 11, image: img11, thumbnail: img11 },
  { id: 12, image: img12, thumbnail: img12 },
];

export default function CollaborateGallary({ Images }: { Images: string[] }) {
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
  }, [activeIndex, goTo]);

  useEffect(() => {
    autoRef.current = setTimeout(next, 4000);

    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [next]);

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

  return (
    <Container className="pb-10">
      <Section className="!py-0">
        <div className="w-full gap-8 lg:gap-12 items-center">

          {/* LEFT IMAGE */}
          

          {/* RIGHT SIDE */}
          <div className="w-full flex flex-col-reverse gap-2 items-center">

            

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
              {Images.map((item, i) => (
                <div
                  key={i}
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
                    src={item}
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