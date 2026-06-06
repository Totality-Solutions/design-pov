"use client";
import { cdn } from "@/lib/cdn";

import { forwardRef, useRef, useEffect, useState } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";


import Link  from "next/link";

// ✅ Flexible Cell (image | video | empty for color)
function Cell({
  type = "image",
  src,
  alt,
  poster,
}: {
  type?: "image" | "video" | "empty";
  src?: any;
  alt?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (type !== "video" || isMobile || !videoRef.current) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          requestAnimationFrame(() => video.play().catch(() => {}));
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [type, isMobile]);

  if (type === "video" && src) {
    if (isMobile && poster) {
      return (
        <div className="relative w-full h-full">
          <Image src={poster} alt={alt || ""} fill sizes="100vw" className="bg-black object-cover" />
        </div>
      );
    }

    return (
      <video
        ref={videoRef}
        src={shouldLoadVideo ? src : undefined}
        preload="none"
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    );
  }

  if (type === "image" && src) {
    return (
      <div className="relative w-full h-full">
        <Image src={src} alt={alt || ""} fill sizes="(max-width: 768px) 100vw, 50vw" className="bg-black object-cover" />
      </div>
    );
  }

  // empty → just color bg from parent
  return null;
}

interface MasonryGridProps {
  y: MotionValue<number>;
}

const THEME_CAROUSEL_SLIDES = [
  {
    src: cdn("/temp/home/theme/WEBSITE_THEME BANNER_4.jpg.jpeg"),
    alt: "Theme 1",
  },
  {
    src: cdn("/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg"),
    alt: "Theme 2",
  },
  {
    src: cdn("/temp/home/theme/WEBSITE_THEME BANNER_3.jpg.jpeg"),
    alt: "Theme 3",
  },
  {
    src: cdn("/temp/home/theme/sens-sensibility.jpg"),
    alt: "Theme 6",
  },
];

const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ y }, ref) => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
      const checkViewport = () => setIsMobile(window.innerWidth < 768);
      checkViewport();
      window.addEventListener("resize", checkViewport);
      return () => window.removeEventListener("resize", checkViewport);
    }, []);

    useEffect(() => {
      if (!isMobile) return;
      const interval = setInterval(() => {
        setActiveSlide((current) => (current + 1) % THEME_CAROUSEL_SLIDES.length);
      }, 3500);
      return () => clearInterval(interval);
    }, [isMobile]);

    if (isMobile) {
      return (
        <div ref={ref} className="w-full overflow-hidden">
          <div className="relative h-[360px] w-full overflow-hidden bg-black">
            <Link href="/edition/theme" className="block h-full cursor-pointer">
              <div
                className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {THEME_CAROUSEL_SLIDES.map((slide, index) => (
                  <div key={slide.src} className="relative h-full w-full shrink-0">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="100vw"
                      loading={activeSlide === index ? "eager" : "lazy"}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                ))}
              </div>
            </Link>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {THEME_CAROUSEL_SLIDES.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Show theme image ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlide === index ? "w-8 bg-white" : "w-1.5 bg-white/45"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className="w-full overflow-hidden h-fit md:h-full">
        <Link href="/edition/theme" className="cursor-pointer">
        <motion.div style={{ y }}>
          <div className="h-full grid grid-cols-2 auto-rows-[100px] md:auto-rows-[300px] w-full">

            {/* 01 IMAGE */}
            <div className="row-span-2">
              <Cell type="image" src={cdn("/temp/home/theme/WEBSITE_THEME BANNER_4.jpg.jpeg")} alt="Theme 1" />
            </div>

            {/* 02 BRAND COLOR (KEEP) */}
            <div className="hidden md:block bg-[var(--primary-blue)]">
              <Cell type="empty" />
            </div>

            {/* 03 IMAGE */}
            <div className="hidden md:block row-span-2">
              <Cell type="image" src={cdn("/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg")} alt="Theme 2" />
            </div>

            {/* 04 BRAND COLOR (KEEP) */}
            <div className="hidden md:block  bg-[var(--primary-red)]">
              <Cell type="empty" />
            </div>

            {/* 05 IMAGE */}
            <div className="hidden md:block row-span-3">
              <Cell type="image" src={cdn("/temp/home/theme/WEBSITE_THEME BANNER_3.jpg.jpeg")} alt="Theme 3" />
            </div>

            {/* 06 VIDEO EXAMPLE */}
            <div className="row-span-2">
              <Cell
                type="video"
                src={cdn("/temp/home/theme/WEBSITE1.mp4")}
                poster={cdn("/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg")}
                alt="Theme video"
              />
            </div>

            {/* 07 IMAGE */}
            {/* <div className="row-span-2">
              <Cell type="image" src={img4} alt="Theme 4" />
            </div> */}

            {/* 08 IMAGE */}
            {/* <div>
              <Cell type="image" src={img8} alt="Theme 5" />
            </div> */}

            {/* 09 BRAND BLACK (KEEP) */}
            <div className="hidden md:block bg-[var(--color-black)]">
              <Cell type="empty" />
            </div>

            {/* 10 FULL WIDTH IMAGE */}
            <div className="col-span-2">
              <Cell type="image" src={cdn("/temp/home/theme/sens-sensibility.jpg")} alt="Theme 6" />
            </div>

          </div>

        </motion.div>
        </Link>
      </div>
    );
  }
);

MasonryGrid.displayName = "MasonryGrid";
export default MasonryGrid;
