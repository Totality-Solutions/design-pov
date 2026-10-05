"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Container } from "../common/Container"
import MarqueeFlow from "../common/MarqueeFlow"
import Image from "@/components/common/SmartImage";
import Link from "next/link"
import type { MarqueeItem } from "@/lib/homeContent"

// Scroll progress (0 → 1) the text reveal is spread across; the rest of the
// scroll is spent with all paragraphs fully revealed.
const REVEAL_END = 0.8

function Word({ word, progress, range, isStatic }: any) {
  // If isStatic is true, we ignore the scroll progress and show the word fully
  const opacity = useTransform(progress, range, isStatic ? [1, 1] : [0.3, 1])
  const color = useTransform(
    progress,
    range,
    isStatic ? ["rgb(0 0 0)", "rgb(0 0 0)"] : ["rgb(156 163 175)", "rgb(0 0 0)"]
  )

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-2">
      {word}
    </motion.span>
  )
}

function WordReveal({ text, progress, range, isStatic }: any) {
  const words = text.split(" ")
  const [startRange, endRange] = range
  const step = (endRange - startRange) / words.length

  return (
    <p className="leading-relaxed text-lg md:text-xl lg:text-2xl font-medium tracking-tight">
      {words.map((word: string, i: number) => {
        const start = startRange + (i * step)
        const end = start + step
        return (
          <Word
            key={i}
            word={word}
            progress={progress}
            range={[start, end]}
            isStatic={isStatic}
          />
        )
      })}
    </p>
  )
}

function LazyMarqueeVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src} // ✅ ALWAYS set src
      autoPlay
      loop
      muted
      playsInline
      preload="metadata" // ✅ IMPORTANT
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
const WhatPOV = ({ paragraphs, items }: { paragraphs: string[]; items: MarqueeItem[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isMobileOrTab, setIsMobileOrTab] = useState(true)
  const [expandedIndex, setExpandedIndex] = useState(0)

  useEffect(() => {
    const check = () => setIsMobileOrTab(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <Container>
      <div
        ref={scrollContainerRef}
        className="relative w-full h-auto lg:h-[200vh]"
      >
        <div className="relative lg:sticky lg:top-10 lg:h-screen flex flex-col justify-center lg:justify-between pt-10 lg:pt-20 gap-16 md:gap-24 lg:gap-0">
          
          {/* 🔹 TEXT SECTION */}
          <div className="flex items-justify justify-center px-6 md:px-10">
            <div className="space-y-6 md:space-y-8 w-full text-center">
              {paragraphs.map((text, i) => {
                const step = REVEAL_END / paragraphs.length
                return (
                  <WordReveal
                    key={i}
                    text={text}
                    progress={smooth}
                    range={[i * step, (i + 1) * step]}
                    isStatic={isMobileOrTab}
                  />
                )
              })}
            </div>
          </div>

          {/* 🔹 MARQUEE SECTION */}
          <div className="w-full">
            {/* Added explicit height classes for mobile to ensure visibility */}
            <div className="w-full overflow-hidden h-[280px] sm:h-[320px] md:h-[300px] lg:h-[340px] flex items-end">
              <MarqueeFlow
                items={items}
                gap={5}
                speed={200}
                desktopCount={4}
                onExpandChange={setExpandedIndex}
                renderItem={(item, index) => {
                  const isExpanded = index === expandedIndex;
                  const isVideo = item.type === 'video';
                  // Mobile shows a still for videos: the poster, or the
                  // legacy same-name .jpg convention.
                  const still = item.poster || item.src.replace(/\.(mp4|webm|ogg)$/i, ".jpg");
                  return (
                    <Link
                      href={item.href || '#'}
                      className="relative block w-full overflow-hidden shadow-xl"
                      style={{
                        aspectRatio: isExpanded ? '6/5' : '10/5',
                        transition: "aspect-ratio 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
                        transformOrigin: 'bottom',
                      }}
                    >
                      <div className="absolute inset-0 w-full h-full">
                        {isVideo ? (
                          isMobileOrTab ? (
                            <Image
                              src={still}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="50vw"
                              loading="lazy"
                            />
                          ) : (
                            <LazyMarqueeVideo src={item.src} />
                          )
                        ) : (
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </Link>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default WhatPOV
