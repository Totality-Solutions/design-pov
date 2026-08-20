"use client";

import { cdn } from "@/lib/cdn";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../common/Container";

type Slide = {
  src: string;
  type?: "image" | "video";
  poster?: string;
  alt?: string;
  href?: string;
};

const POV_INDEX_URL = "http://povindex.designpovindia.com/";

const SLIDES: Slide[] = [
  { src: "/temp/home-hero-banner.jpeg", alt: "Design POV showcase", href: POV_INDEX_URL },
  {
    src: cdn("/video/POV ad 1.mp4"),
    type: "video",
    poster: cdn("/temp/home/section2/1.jpg"),
    alt: "Design POV film",
  },
];

const AUTOPLAY_MS = 5000;

function HeroVideo({
  src,
  poster,
  active,
}: {
  src: string;
  poster?: string;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const handleNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [index, goTo]);

  return (
    <Container className="w-full overflow-hidden lg:max-w-none px-0 pt-20">
      <div className="group relative w-full aspect-5/3 sm:aspect-21/8 md:aspect-16/7 overflow-hidden">
        {SLIDES.map((slide, i) => {
          const isActive = i === index;
          const content =
            slide.type === "video" ? (
              <HeroVideo src={slide.src} poster={slide.poster} active={isActive} />
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt ?? `Hero slide ${i + 1}`}
                fill
                priority={isActive}
                sizes="100vw"
                className="object-cover"
              />
            );

          return (
            <div
              key={`${slide.type ?? "image"}-${slide.src}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {slide.href ? (
                <a href={slide.href} className="block w-full h-full" aria-label={slide.alt ?? `Go to ${slide.href}`}>
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          );
        })}

        {/* Manual nav arrows — always visible on touch, hidden until hover on desktop */}
        <button
          onClick={handlePrev}
          aria-label="Previous hero slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 text-white flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next hero slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 text-white flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to hero slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
