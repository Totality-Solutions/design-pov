"use client"

import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'
import Section from '../common/Section'
import { Container } from '../common/Container'
import MarqueeFlow from '../common/MarqueeFlow'
import Image from 'next/image'
import Link from 'next/link'
import img1 from "@/public/temp/1.jpg"
import img2 from "@/public/temp/2.jpg"
import img3 from "@/public/temp/3.jpg"
import img4 from "@/public/temp/4.jpeg"
import img5 from "@/public/temp/5.jpg"

// ─── Scroll-driven typewriter ─────────────────────────────────────────────────
// Maps a 0→1 MotionValue to a character-slice of `text`
function ScrollTypewriter({
  text,
  progress,          // MotionValue<number> 0→1
  className,
}: {
  text: string
  progress: MotionValue<number>
  className?: string
}) {
  // We render all chars but hide the ones beyond current progress via opacity
  return (
    <span className={className} aria-label={text} style={{ display: 'inline' }}>
      {text.split('').map((char, i) => {
        // Each char becomes visible when progress passes i/total
        const threshold = i / text.length
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(progress, [threshold, threshold + 0.04], [0, 1])
        return (
          <motion.span key={i} style={{ opacity }}>
            {char}
          </motion.span>
        )
      })}
    </span>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
const WhatPOV = () => {
  // The outer div is 300vh tall — sticky inner pins content while scroll drives animation
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth the scroll so it feels physical, not jittery
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 })

  // ── Scroll ranges (all map from smooth 0→1) ────────────────────────────────
  // 0.00 – 0.30  typewriter p appears char by char
  // 0.30 – 0.50  h1 blurs in
  // 0.50 – 0.65  p exits LEFT, h1 exits RIGHT
  // 0.65 – 0.85  hero-desc fades + slides up

  // Typewriter progress: 0→1 over scroll 0→0.30
  const typeProgress = useTransform(smooth, [0, 0.30], [0, 1])

  // H1 blur-in: opacity 0→1, blur 14px→0 over 0.30→0.50
  const h1Opacity  = useTransform(smooth, [0.30, 0.50], [0, 1])
  const h1Blur     = useTransform(smooth, [0.30, 0.50], [14, 0])
  const h1BlurPx   = useTransform(h1Blur, (v) => `blur(${v}px)`)

  // Exit — p slides LEFT: x 0→-120vw over 0.50→0.65
  const pX         = useTransform(smooth, [0.50, 0.65], ['0vw', '-120vw'])
  const pOpacity   = useTransform(smooth, [0.50, 0.65], [1, 0])

  // Exit — h1 slides RIGHT: x 0→120vw over 0.50→0.65
  const h1X        = useTransform(smooth, [0.50, 0.65], ['0vw', '120vw'])
  const h1ExitOp   = useTransform(smooth, [0.50, 0.65], [1, 0])

  // Combined h1 opacity = enter opacity * exit opacity
  const h1CombinedOp = useTransform(
    [h1Opacity, h1ExitOp] as MotionValue[],
    ([enter, exit]: number[]) => enter * exit
  )

  // Hero desc: opacity 0→1, y 24→0, blur 10→0 over 0.65→0.85
  const descOpacity = useTransform(smooth, [0.65, 0.85], [0, 1])
  const descY       = useTransform(smooth, [0.65, 0.85], [24, 0])
  const descBlur    = useTransform(smooth, [0.65, 0.85], [10, 0])
  const descBlurPx  = useTransform(descBlur, (v) => `blur(${v}px)`)

  // Hide typewriter block when exiting (past 0.65) — use opacity on wrapper
  const typeBlockOpacity = useTransform(smooth, [0.64, 0.66], [1, 0])
  const typeBlockPointer = useTransform(smooth, [0.65], ['auto']) // not needed but explicit

  const NEW_ARRIVALS = [
    { id: 1, img: img1, title: 'Simply Dummy', href: '#' },
    { id: 2, img: img2, title: 'Simply Dummy', href: '#' },
    { id: 3, img: img3, title: 'Simply Dummy', href: '#' },
    { id: 4, img: img4, title: 'Simply Dummy', href: '#' },
    { id: 5, img: img5, title: 'Simply Dummy', href: '#' },
    { id: 6, img: img3, title: 'Simply Dummy', href: '#' },
  ]

  return (
    // 300vh tall scroll canvas — gives 3× viewport of scroll room
    <div ref={containerRef} style={{ position: 'relative', height: '600vh' }}>

      {/* Sticky viewport — pins content while scroll drives animations */}
      <div
        style={{
          position: 'sticky',
          top: 50,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Section>
          <Container>
            <div className="hero-text">
              <div className="typewriter-wrapper" style={{ overflow: 'hidden' }}>

                {/* ── Typewriter block (p + h1) — fades out as a unit during exit ── */}
                <motion.div
                  className="typewriter"
                  style={{ overflow: 'hidden', opacity: typeBlockOpacity }}
                >
                  {/* P: scroll-driven char reveal + exits LEFT */}
                  <motion.p
                    className="typewriter-text"
                    style={{ x: pX, opacity: pOpacity }}
                  >
                    <ScrollTypewriter
                      text="India's Most INTERNATIONAL"
                      progress={typeProgress}
                    />
                  </motion.p>

                  {/* H1: blurs in then exits RIGHT */}
                  <motion.h1
                    className="italic uppercase focus-text"
                    style={{
                      opacity: h1CombinedOp,
                      filter: h1BlurPx,
                      x: h1X,
                    }}
                  >
                    DESIGN PLATFORMS.
                  </motion.h1>
                </motion.div>

                {/* ── Hero description — scroll-driven fade in ── */}
                <motion.h1
                  className="hero-desc"
                  style={{
                    opacity: descOpacity,
                    y: descY,
                    filter: descBlurPx,
                  }}
                >
                  <span>Design POV India</span> is an annual platform that brings
                  together the most progressive creative <br /> minds in the country.
                  Through <span>Residencies, Exhibitions, Publications,</span> and{' '}
                  <span>Critical Dialogue</span>, we <br /> shape the narrative of
                  Indian design—on Indian terms.
                </motion.h1>

              </div>
            </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} // run only once
                transition={{ duration: 2, ease: "easeOut" }}
                className="mt-8 h-[350px] flex items-end justify-center"
              >
              <MarqueeFlow
                items={NEW_ARRIVALS}
                gap={5}
                speed={200}
                desktopCount={4}
                defaultExpandedIndex={0}
                renderItem={(item, _index, isExpanded) => (
                  <Link
                    href={item.href || '#'}
                    className="relative block w-full overflow-hidden shadow-xl"
                    style={{
                      aspectRatio: isExpanded ? '6/5' : '10/5',
                      transition: 'aspect-ratio 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'top center',
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
          </Container>
        </Section>
      </div>
    </div>
  )
}

export default WhatPOV