"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Container } from "../common/Container"
import Section from "../common/Section"
import MarqueeFlow from "../common/MarqueeFlow"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

import img1 from  "@/public/temp/home/section2/1.jpg"
import img2 from  "@/public/temp/home/section2/2.jpg"
import img3 from  "@/public/temp/home/section2/3.jpg"
import img4 from  "@/public/temp/home/section2/4.jpg"
import img5 from  "@/public/temp/home/section2/5.jpg"
import img6 from  "@/public/temp/home/section2/6.jpg"
import img7 from  "@/public/temp/home/section2/7.jpg"
import img8 from  "@/public/temp/home/section2/8.jpg"
import img9 from  "@/public/temp/home/section2/9.jpg"

interface ArrivalItem {
  id: number;
  img: string | StaticImageData;
  title: string;
  href: string;
}

const text1 = `Design POV is a curated platform that brings together multiple disciplines to explore how design is lived, not just displayed.`
const text2 = `Across immersive installations, collaborative spaces, and evolving narratives, it creates a setting where design moves beyond product and into experience.`

function Word({ word, progress, range }: any) {
  const opacity = useTransform(progress, range, [0.5, 1])
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

function WordReveal({ text, progress }: any) {
  const words = text.split(" ")
  const step = 0.6 / words.length

  return (
    <p className="leading-relaxed text-lg md:text-xl lg:text-2xl font-medium tracking-tight">
      {words.map((word: string, i: number) => {
        const start = i * step
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
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

   const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start center", "end center"],
  })

  // Calculate if reveal is complete
  const [revealComplete, setRevealComplete] = React.useState(false)

  React.useEffect(() => {
    return scrollYProgress.onChange((v) => {
      setRevealComplete(v >= 1.4) // Unlock sticky at 95% progress
    })
  }, [scrollYProgress])

   useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768)
      check()
      window.addEventListener('resize', check)
      return () => window.removeEventListener('resize', check)
    }, [])
  

  const NEW_ARRIVALS: ArrivalItem[] = [
    { id: 1, img: img1, title: 'Simply Dummy', href: '#' },
    { id: 10, img: '/temp/home/section2/1.mp4', title: 'Simply Dummy', href: '#' },
    { id: 2, img: img2, title: 'Dynamic Video', href: '#' },
    { id: 11, img: '/temp/home/section2/2.mp4', title: 'Simply Dummy', href: '#' },
    { id: 3, img: img3, title: 'Simply Dummy', href: '#' },
    { id: 12, img: '/temp/home/section2/3.mp4', title: 'Simply Dummy', href: '#' },
    { id: 4, img: img4, title: 'Simply Dummy', href: '#' },
    { id: 13, img: '/temp/home/section2/4.mp4', title: 'Simply Dummy', href: '#' },
    { id: 5, img: img5, title: 'Simply Dummy', href: '#' },
    { id: 6, img: img6, title: 'Simply Dummy', href: '#' },
    { id: 7, img: img7, title: 'Simply Dummy', href: '#' },
    { id: 8, img: img8, title: 'Simply Dummy', href: '#' },
    { id: 9, img: img9, title: 'Simply Dummy', href: '#' },
  ];
    const smooth = useSpring(scrollYProgress, {
      stiffness: 120,
      damping: 25,
      restDelta: 0.001,
    })

  const marqueeY = useTransform(
    smooth,
    isMobile ? [0.40, 0.65] : [0.65, 0.90],
    [80, 0]
  )

  return (
    // <Section>
      <Container>
        <div
          ref={scrollContainerRef}
          className="relative min-h-[200vh] pt-16 md:pt-20 "
        >
          {/* Sticky wrapper for both text and marquee - locked until reveal complete */}
          <div className={`${revealComplete ? '' : 'sticky top-20'} z-10 h-full flex flex-col justify-between bg-white transition-all duration-300`}>
            
            {/* 🔹 TEXT (STICKY) - Top */}
            <div className="flex items-center justify-center px-6 md:px-0 py-8 md:py-12">
              <div className="space-y-6 max-w-4xl w-full text-center">
                <WordReveal text={text1} progress={scrollYProgress} />
                <WordReveal text={text2} progress={scrollYProgress} />
              </div>
            </div>

            {/* 🔹 MARQUEE (STICKY) - Bottom */}
            <div className="flex items-center justify-center pb-8 md:pb-12">
              <div className="w-full overflow-hidden h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] flex items-end">
        <MarqueeFlow
          items={NEW_ARRIVALS}
          gap={5}
          speed={200}
          desktopCount={4}
          renderItem={(item, _index, isExpanded) => {
          const isVideo = typeof item.img === 'string' && item.img.match(/\.(mp4|webm|ogg)$/i);
            return (
              <Link
                href={item.href || '#'}
                className="relative block w-full overflow-hidden shadow-xl"
                style={{
                  aspectRatio: isExpanded ? '6/5' : '10/5',
                  transition: "aspect-ratio 2000ms cubic-bezier(0.22, 1, 0.36, 1)",
                  transformOrigin: 'bottom',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget;
                  el.style.aspectRatio = '6/5';
                  const media = el.querySelectorAll<HTMLElement>('img, video');
                  media.forEach(m => m.style.transform = 'translate3d(0,0,0) scale(1.15)');
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget;
                  el.style.aspectRatio = isExpanded ? '6/5' : '10/5';
                  const media = el.querySelectorAll<HTMLElement>('img, video');
                  media.forEach(m => {
                    m.style.transform = isExpanded ? 'translate3d(0,0,0) scale(1.15)' : 'translate3d(0,0,0) scale(1)';
                  });
                }}
              >
                {isVideo ? (
                  <video
                    src={item.img as string}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover will-change-transform"
                    style={{
                      transform: isExpanded ? 'translate3d(0,0,0) scale(1.15)' : 'translate3d(0,0,0) scale(1)',
                      transition: 'transform 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'bottom center',
                    }}
                  />
                ) : (
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover will-change-transform"
                    style={{
                      transform: isExpanded ? 'translate3d(0,0,0) scale(1.15)' : 'translate3d(0,0,0) scale(1)',
                      transition: 'transform 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'bottom center',
                      backfaceVisibility: 'hidden',
                    }}
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
    // </Section>
  )
}

export default WhatPOV