"use client"

import React, { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from 'framer-motion'
import { Container } from '../common/Container'
import MarqueeFlow from '../common/MarqueeFlow'
import Image from 'next/image'
import Link from 'next/link'
import img1 from "@/public/temp/1.jpg"
import img2 from "@/public/temp/2.jpg"
import img3 from "@/public/temp/3.jpg"
import img4 from "@/public/temp/4.jpeg"
import img5 from "@/public/temp/5.jpg"
import Section from '../common/Section'

// ─── Typewriter ─────────────────────────────────────────────
function ScrollTypewriter({
  text,
  progress,
  isMobile,
}: {
  text: string
  progress: MotionValue<number>
  isMobile: boolean
}) {
  return (
    <span aria-label={text}>
      {text.split('').map((char, i) => {
        const threshold = i / text.length
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(progress, [threshold, threshold + 0.04], [0, 1])
        return (
          <motion.span key={i} style={{ opacity: isMobile ? 1 : opacity }}>
            {char}
          </motion.span>
        )
      })}
    </span>
  )
}

// ─── Component ─────────────────────────────────────────────
const WhatPOV = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  })

  const lockedProgress = useMotionValue(isMobile ? 1 : 0)
  const typeProgressRaw = useTransform(smooth, [0, 0.30], [0, 1])
  const typeProgress = isMobile ? lockedProgress : typeProgressRaw

  // FIX: Adjusted opacity ranges for better visibility of h1
  const h1Opacity = useTransform(smooth, [0.25, 0.45], [0, 1])
  const h1Blur = useTransform(smooth, [0.25, 0.45], [14, 0])
  const h1BlurPx = useTransform(h1Blur, v => `blur(${v}px)`)

  const pX = useTransform(smooth, [0.45, 0.60], ['0vw', '-120vw'])
  const pOpacity = useTransform(smooth, [0.45, 0.60], [1, 0])

  const h1X = useTransform(smooth, [0.45, 0.60], ['0vw', '120vw'])
  const h1ExitOp = useTransform(smooth, [0.45, 0.60], [1, 0])

  const h1CombinedOp = useTransform(
    [h1Opacity, h1ExitOp] as MotionValue[],
    ([enter, exit]: number[]) => enter * exit
  )

  const typeBlockOpacity = useTransform(smooth, [0.59, 0.61], [1, 0], { clamp: true })

  // FIX: Adjusted scroll ranges for mobile-friendly marquee visibility
  const descOpacity = useTransform(smooth, isMobile ? [0.30, 0.50] : [0.60, 0.80], [0, 1])
  const descY = useTransform(smooth, isMobile ? [0.30, 0.50] : [0.60, 0.80], [24, 0])
  const descBlur = useTransform(smooth, isMobile ? [0.30, 0.50] : [0.60, 0.80], [10, 0])
  const descBlurPx = useTransform(descBlur, v => `blur(${v}px)`)

  // FIX: Marquee appears earlier and stays longer on mobile
  const marqueeOpacity = useTransform(
    smooth,
    isMobile ? [0.45, 0.70] : [0.70, 0.95],
    [0, 1]
  )
  const marqueeY = useTransform(
    smooth,
    isMobile ? [0.40, 0.65] : [0.65, 0.90],
    [80, 0]
  )
  const marqueeBlur = useTransform(
    smooth,
    isMobile ? [0.40, 0.65] : [0.65, 0.90],
    [10, 0]
  )
  const marqueeBlurPx = useTransform(marqueeBlur, v => `blur(${v}px)`)

  // FIX: Adjusted container height for better scroll behavior on mobile
  const containerHeight = isMobile ? '250vh' : '200vh'

  const NEW_ARRIVALS = [
    { id: 1, img: img1, title: 'Simply Dummy', href: '#' },
    { id: 2, img: img2, title: 'Simply Dummy', href: '#' },
    { id: 3, img: img3, title: 'Simply Dummy', href: '#' },
    { id: 4, img: img4, title: 'Simply Dummy', href: '#' },
    { id: 5, img: img5, title: 'Simply Dummy', href: '#' },
    { id: 6, img: img3, title: 'Simply Dummy', href: '#' },
  ]

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: containerHeight }}
    >
      {/* ── Sticky viewport ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Section>
          <Container>

        {/* ── Single centered anchor — everything overlaps here ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '40px' : '20px',
            paddingBottom: isMobile ? '40px' : '0px',
          }}
        >

          {/* ── PHASE 1 + 2 wrapper: typewriter line + h1 (overlap each other) ── */}
          <motion.div
            style={{ opacity: typeBlockOpacity }}
            className="w-full text-center px-4 sm:px-6 typewriter"
          >
            {/* Phase 1 — typewriter line */}
            <motion.p
              className="typewriter-text text-sm sm:text-base md:text-lg"
              style={{ x: pX, opacity: pOpacity }}
            >
              <ScrollTypewriter
                text="India's Most INTERNATIONAL"
                progress={typeProgress}
                isMobile={isMobile}
              />
            </motion.p>

            {/* Phase 2 — focus h1, sits directly below typewriter line */}
            <motion.h1
              className="italic uppercase focus-text text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
              style={{
                opacity: h1CombinedOp,
                filter: h1BlurPx,
                x: h1X,
              }}
            >
              DESIGN PLATFORMS.
            </motion.h1>
          </motion.div>

          <div className="phase-3-marquee-wrapper w-full">

            {/* Phase 3 — hero-desc: hidden on mobile, visible on desktop */}
            <motion.h1
              className="hero-desc w-full text-center px-4 sm:px-6 hidden md:block text-lg md:text-xl lg:text-2xl leading-relaxed"
              style={{
                opacity: descOpacity,
                y: descY,
                filter: descBlurPx,
                pointerEvents: 'none',
              }}
            >
              <span className="font-semibold">Design POV India</span> is an annual platform that brings
              together the most progressive creative minds in the country.
              Through <span className="font-semibold">Residencies, Exhibitions, Publications,</span> and{' '}
              <span className="font-semibold">Critical Dialogue</span>, we shape the narrative of
              Indian design—on Indian terms.
            </motion.h1>

            {/* Phase 3 — Mobile description: visible on mobile only */}
            <motion.h1
              className="hero-desc w-full text-center px-4 sm:px-6 md:hidden text-base leading-relaxed"
              style={{
                opacity: descOpacity,
                y: descY,
                filter: descBlurPx,
                pointerEvents: 'none',
              }}
            >
              <span className="font-semibold">Design POV India</span> brings together progressive creative minds.
              Through <span className="font-semibold">Residencies, Exhibitions, Publications,</span> and{' '}
              <span className="font-semibold">Critical Dialogue</span>, we shape Indian design.
            </motion.h1>

            {/* Marquee */}
            <motion.div
              style={{
                opacity: marqueeOpacity,
                y: marqueeY,
                filter: marqueeBlurPx,
              }}
              className="mt-8 w-full  h-[220px] sm:h-[260px] md:h-[320px] lg:h-[350px] flex items-end justify-center overflow-hidden"
            >
              <MarqueeFlow
                items={NEW_ARRIVALS}
                gap={5}
                speed={200}
                desktopCount={4}
                renderItem={(item, _index, isExpanded) => (
                  <Link
                    href={item.href || '#'}
                    className="relative block w-full overflow-hidden shadow-xl"
                    style={{
                      aspectRatio: isExpanded ? '6/5' : '10/5', // fixed base
                      // transform: isExpanded ? 'scaleY(1.2)' : 'scaleY(1)',
                      transition: "aspect-ratio 2000ms cubic-bezier(0.22, 1, 0.36, 1)",
                      transformOrigin: 'bottom',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.aspectRatio = '6/5'
                      const img = el.querySelector('img')
                      if (img) img.style.transform = 'translate3d(0,0,0) scale(1.15)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.aspectRatio = isExpanded ? '6/5' : '10/5'
                      const img = el.querySelector('img')
                      if (img) img.style.transform = isExpanded
                        ? 'translate3d(0,0,0) scale(1.15)'
                        : 'translate3d(0,0,0) scale(1)'
                    }}
                  >
                    <Image
                      src={item.img}
                      alt={item.title || 'New Arrival'}
                      fill
                      className="object-cover will-change-transform"
                      style={{
                        transform: isExpanded
                          ? 'translate3d(0,0,0) scale(1.15)'
                          : 'translate3d(0, 0, 0) scale(1)',
                        backfaceVisibility: 'hidden',
                        transition: 'transform 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
                        transformOrigin: 'bottom center',
                      }}
                      sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw"
                    />
                  </Link>
                )}
              />
            </motion.div>

          </div>

        </div>
          </Container>
          </Section>
      </div>
    </div>
  )
}

export default WhatPOV