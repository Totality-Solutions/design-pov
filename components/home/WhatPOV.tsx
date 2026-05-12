"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Container } from "../common/Container"
import MarqueeFlow from "../common/MarqueeFlow"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

import img1 from "@/public/temp/home/section2/1.jpg"
import img2 from "@/public/temp/home/section2/2.jpg"
import img3 from "@/public/temp/home/section2/3.jpg"
import img4 from "@/public/temp/home/section2/4.jpg"
import img5 from "@/public/temp/home/section2/5.jpg"
import img6 from "@/public/temp/home/section2/6.jpg"
import img7 from "@/public/temp/home/section2/7.jpg"
import img8 from "@/public/temp/home/section2/8.jpg"
import img9 from "@/public/temp/home/section2/9.jpg"

interface ArrivalItem {
  id: number;
  img: string | StaticImageData;
  title: string;
  href: string;
}

const NEW_ARRIVALS: ArrivalItem[] = [
  { id: 1,  img: img1,                          title: 'Simply Dummy', href: '#' },
  { id: 10, img: '/temp/home/section2/1.mp4',   title: 'Simply Dummy', href: '#' },
  { id: 2,  img: img2,                          title: 'Dynamic Video', href: '#' },
  { id: 11, img: '/temp/home/section2/2.mp4',   title: 'Simply Dummy', href: '#' },
  { id: 3,  img: img3,                          title: 'Simply Dummy', href: '#' },
  { id: 12, img: '/temp/home/section2/3.mp4',   title: 'Simply Dummy', href: '#' },
  { id: 4,  img: img4,                          title: 'Simply Dummy', href: '#' },
  { id: 13, img: '/temp/home/section2/4.mp4',   title: 'Simply Dummy', href: '#' },
  { id: 5,  img: img5,                          title: 'Simply Dummy', href: '#' },
  { id: 6,  img: img6,                          title: 'Simply Dummy', href: '#' },
  { id: 7,  img: img7,                          title: 'Simply Dummy', href: '#' },
  { id: 8,  img: img8,                          title: 'Simply Dummy', href: '#' },
  { id: 9,  img: img9,                          title: 'Simply Dummy', href: '#' },
];

const text1 = `Design POV is a curated platform that brings together multiple disciplines to explore how design is lived, not just displayed.`
const text2 = `Across immersive installations, collaborative spaces, and evolving narratives, it creates a setting where design moves beyond product and into experience.`

function Word({ word, progress, range }: any) {
  const opacity = useTransform(progress, range, [0.3, 1])
  const color = useTransform(
    progress,
    range,
    ["rgb(156 163 175)", "rgb(0 0 0)"]
  )

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-2">
      {word}
    </motion.span>
  )
}

function WordReveal({ text, progress, range }: any) {
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
          />
        )
      })}
    </p>
  )
}

const WhatPOV = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"], // Anchored to top to keep content visible
  })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <Container>
      {/* Container is 300vh to give plenty of room for sequential reveal */}
      <div
        ref={scrollContainerRef}
        className="relative h-[200vh] w-full"
      >
        {/* We keep this sticky the ENTIRE time so it doesn't disappear */}
        <div className="sticky top-10 pt-20 h-screen flex flex-col justify-between gap-12 overflow-hidden">
          
          {/* 🔹 TEXT REVEAL SECTION */}
          <div className="flex items-center justify-center px-6 md:px-10">
            <div className="space-y-8 max-w-4xl w-full text-center">
              <WordReveal 
                text={text1} 
                progress={smooth} 
                range={[0, 0.4]} 
              />
              <WordReveal 
                text={text2} 
                progress={smooth} 
                range={[0.4, 0.8]} 
              />
            </div>
          </div>

          {/* 🔹 MARQUEE SECTION */}
          <div className="flex items-center justify-center">
            <div className="w-full overflow-hidden h-[360px] md:h-[300px] lg:h-[340px] flex items-end">
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
                        <video
                          src={item.img as string}
                          autoPlay loop muted playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                        />
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