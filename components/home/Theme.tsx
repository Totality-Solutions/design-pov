'use client'
import React, { useRef, useEffect, useState } from 'react'
import { useScroll, useTransform, useSpring } from "framer-motion"
import MasonryGrid from './Mansonrygrid'
import CTABtn from '../common/CTABtn'

const Theme = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(1200)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const measure = () => {
      // 1. Check if we are on mobile (less than 1024px)
      setIsMobile(window.innerWidth < 1024)

      if (!gridRef.current) return
      const gridH = gridRef.current.scrollHeight
      const parentH = gridRef.current.parentElement?.clientHeight ?? window.innerHeight
      const range = Math.max(gridH - parentH, 0)
      if (range > 0) setScrollRange(range)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.1,
  })

  const yRaw = useTransform(smoothProgress, [0, 1], [0, -scrollRange])
  
  // 2. Logic: If mobile, return 0 (no transform). If desktop, return the animated value.
  const y = useTransform(yRaw, (val) => {
    if (isMobile) return 0 
    return Math.max(val, -scrollRange)
  })

  return (
    <div 
      ref={containerRef} 
      className="relative h-auto lg:h-[200vh]" // h-auto on mobile lets it scroll normally
    >
      <div className="relative lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] w-full h-full pt-6 md:pt-12 py-0 gap-10 md:gap-4">
          
          <div className="w-full flex flex-col justify-end gap-4 lg:pb-12 px-6 lg:px-10">
            <h1 className="text-h2-mobile md:text-h2-tab lg:text-h2 font-semibold uppercase">2026 THEME</h1>
            <p className="text-body-tab">
              A sharper focus on how spaces are experienced - through texture, sound, atmosphere, and memory.
            </p>
            <CTABtn
              label="2026 THEME"
              btnBg="transparent"
              btnHoverBg="var(--primary-blue)"
              textColor="black"
              borderColor="black"
              borderHoverColor="white"
              lineColor="white"
              lineHoverColor="white"
              bottomKey1Width="40px"
              bottomKey2Width="12px"
              bottomKey1Right="50px"
              bottomKey2Right="15px"
              href="/edition/theme"
              size='md'
              />
          </div>

          <div className="w-full h-full lg:overflow-hidden">
            <MasonryGrid
              ref={gridRef}
              y={y}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Theme
