"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Container } from "../common/Container"
import MarqueeFlow from "../common/MarqueeFlow"
import Image from "next/image"
import Link from "next/link"
import { cdn } from "@/lib/cdn"

interface ArrivalItem {
  id: number;
  img: string;
  title: string;
  href: string;
}

const NEW_ARRIVALS: ArrivalItem[] = [
  { id: 1,  img: cdn('/temp/home/section2/1.jpg'),   title: 'Simply Dummy', href: '#' },
  { id: 10, img: cdn('/temp/home/section2/1.mp4'),   title: 'Simply Dummy', href: '#' },
  { id: 2,  img: cdn('/temp/home/section2/2.jpg'),   title: 'Dynamic Video', href: '#' },
  { id: 11, img: cdn('/temp/home/section2/2.mp4'),   title: 'Simply Dummy', href: '#' },
  { id: 3,  img: cdn('/temp/home/section2/3.jpg'),   title: 'Simply Dummy', href: '#' },
  { id: 12, img: cdn('/temp/home/section2/3.mp4'),   title: 'Simply Dummy', href: '#' },
  { id: 4,  img: cdn('/temp/home/section2/4.jpg'),   title: 'Simply Dummy', href: '#' },
  { id: 13, img: cdn('/temp/home/section2/4.mp4'),   title: 'Simply Dummy', href: '#' },
  { id: 5,  img: cdn('/temp/home/section2/5.jpg'),   title: 'Simply Dummy', href: '#' },
  { id: 6,  img: cdn('/temp/home/section2/6.jpg'),   title: 'Simply Dummy', href: '#' },
  { id: 7,  img: cdn('/temp/home/section2/7.jpg'),   title: 'Simply Dummy', href: '#' },
  { id: 8,  img: cdn('/temp/home/section2/8.jpg'),   title: 'Simply Dummy', href: '#' },
  { id: 9,  img: cdn('/temp/home/section2/9.jpg'),   title: 'Simply Dummy', href: '#' },
];

const text1 = `Design POV is a curated platform that brings together multiple disciplines to explore how design is lived, not just displayed.`
const text2 = `Across immersive installations, collaborative spaces, and evolving narratives, it creates a setting where design moves beyond product and into experience.`

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
const WhatPOV = () => {
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
              <WordReveal 
                text={text1} 
                progress={smooth} 
                range={[0, 0.4]} 
                isStatic={isMobileOrTab}
              />
              <WordReveal 
                text={text2} 
                progress={smooth} 
                range={[0.4, 0.8]} 
                isStatic={isMobileOrTab}
              />
            </div>
          </div>

          {/* 🔹 MARQUEE SECTION */}
          <div className="w-full">
            {/* Added explicit height classes for mobile to ensure visibility */}
            <div className="w-full overflow-hidden h-[280px] sm:h-[320px] md:h-[300px] lg:h-[340px] flex items-end">
              <MarqueeFlow
                items={NEW_ARRIVALS}
                gap={5}
                speed={200}
                desktopCount={4}
                onExpandChange={setExpandedIndex}
                renderItem={(item, index) => {
                  const isExpanded = index === expandedIndex;
                  const isVideo = typeof item.img === 'string' && item.img.match(/\.(mp4|webm|ogg)$/i);
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
                      {isVideo ? (
                        isMobileOrTab ? (
                          <Image
                            src={(item.img as string).replace(/\.(mp4|webm|ogg)$/i, ".jpg")}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="50vw"
                            
                          />
                        ) : (
                          <LazyMarqueeVideo src={item.img as string} />
                        )
                      ) : (
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      )}
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
