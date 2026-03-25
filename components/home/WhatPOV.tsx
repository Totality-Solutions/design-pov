"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
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

// ─── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(text: string, duration: number, enabled = true) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!enabled) {
      setDisplayed('')
      return
    }
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, duration / text.length)

    return () => clearInterval(interval)
  }, [enabled])

  return displayed
}

// ─── Phases ───────────────────────────────────────────────────────────────────
// 0 → idle
// 1 → typewriter runs
// 2 → h1 blurs in
// 3 → p exits LEFT, h1 exits RIGHT
// 4 → hero-desc fades in (typewriter block conditionally removed from DOM)

const WhatPOV = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0)

  useEffect(() => {
    if (!isInView) return
    setPhase(1)
    const t2 = setTimeout(() => setPhase(2), 2800)
    const t3 = setTimeout(() => setPhase(3), 5500)
    const t4 = setTimeout(() => setPhase(4), 6800)
    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [isInView])

  const typewriterText = useTypewriter(
    "India's Most INTERNATIONAL",
    2200,
    phase >= 1
  )

  const NEW_ARRIVALS = [
    { id: 1, img: img1, title: 'Simply Dummy', href: '#' },
    { id: 2, img: img2, title: 'Simply Dummy', href: '#' },
    { id: 3, img: img3, title: 'Simply Dummy', href: '#' },
    { id: 4, img: img4, title: 'Simply Dummy', href: '#' },
    { id: 5, img: img5, title: 'Simply Dummy', href: '#' },
    { id: 6, img: img3, title: 'Simply Dummy', href: '#' },
  ]

  const exitEase = [0.4, 0, 0.6, 1] as const
  const exitDuration = 1.0

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Section>
        <Container>
          <div className="hero-text">
            <div ref={ref} className="typewriter-wrapper overflow-hidden">

              {/* ── Typewriter block — unmounted from DOM once phase 4 is reached ── */}
              {phase < 4 && (
                <div className="typewriter" style={{ overflow: 'hidden' }}>

                  {/* P: exits to the LEFT in phase 3 */}
                  <motion.p
                    className="typewriter-text"
                    animate={
                      phase === 3
                        ? { x: '-120vw', opacity: 0 }
                        : { x: 0, opacity: 1 }
                    }
                    transition={
                      phase === 3
                        ? { duration: exitDuration, ease: exitEase }
                        : { duration: 0 }
                    }
                  >
                    {typewriterText}
                  </motion.p>

                  {/* H1: blurs in at phase 2, exits to the RIGHT in phase 3 */}
                  <motion.h1
                    className="italic uppercase focus-text"
                    initial={{ opacity: 0, filter: 'blur(14px)', x: 0 }}
                    animate={
                      phase === 3
                        ? { x: '120vw', opacity: 0, filter: 'blur(14px)' }
                        : phase >= 2
                        ? { opacity: 1, filter: 'blur(0px)', x: 0 }
                        : { opacity: 0, filter: 'blur(14px)', x: 0 }
                    }
                    transition={
                      phase === 3
                        ? { duration: exitDuration, ease: exitEase }
                        : { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }
                    }
                  >
                    DESIGN PLATFORMS.
                  </motion.h1>

                </div>
              )}

              {/* ── HERO DESCRIPTION — fades in at phase 4 ── */}
              <motion.h1
                className="hero-desc"
                initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                animate={
                  phase >= 4
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 24, filter: 'blur(10px)' }
                }
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span>Design POV India</span> is an annual platform that brings
                together the most progressive creative <br /> minds in the country.
                Through <span>Residencies, Exhibitions, Publications,</span> and{' '}
                <span>Critical Dialogue</span>, we <br /> shape the narrative of
                Indian design—on Indian terms.
              </motion.h1>

            </div>
          </div>

          <div className="mt-8 h-[350px] flex items-end justify-center">
            <MarqueeFlow
              items={NEW_ARRIVALS}
              gap={5}
              speed={4000}
              desktopCount={4}
              renderItem={(item) => (
                <Link
                  href={item.href || '#'}
                  className="relative block w-full overflow-hidden shadow-xl"
                  style={{
                    aspectRatio: '10/5',
                    transition: 'aspect-ratio 800ms cubic-bezier(0.4, 0, 0.2, 1)',
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
                    el.style.aspectRatio = '10/5'
                    const img = el.querySelector('img')
                    if (img) img.style.transform = 'translate3d(0,0,0) scale(1)'
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.title || 'New Arrival'}
                    fill
                    className="object-cover will-change-transform"
                    style={{
                      transform: 'translate3d(0, 0, 0) scale(1)',
                      backfaceVisibility: 'hidden',
                      transition: 'transform 4000ms cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'bottom center',
                    }}
                    sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw"
                  />
                </Link>
              )}
            />
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default WhatPOV