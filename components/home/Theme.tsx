'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Container } from '../common/Container'
import CTABtn from '../common/CTABtn'
import { useScroll, useTransform, useSpring } from "framer-motion"
import MasonryGrid from './Mansonrygrid'
import img1 from "@/public/temp/theme/1.png"
import img2 from "@/public/temp/theme/2.png"
import img3 from "@/public/temp/theme/3.png"
import img4 from "@/public/temp/theme/4.png"
import img5 from "@/public/temp/theme/5.png"
import img6 from "@/public/temp/theme/6.png"
import img7 from "@/public/temp/theme/7.png"
import img8 from "@/public/temp/theme/8.png"
import img9 from "@/public/temp/theme/9.png"
import img10 from "@/public/temp/theme/10.png"
import img11 from "@/public/temp/theme/11.png"
import img12 from "@/public/temp/theme/12.png"
import img13 from "@/public/temp/theme/13.png"



const Theme = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef      = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(1200) // sensible default

  useEffect(() => {
    // Measure after paint so grid heights are real
    const measure = () => {
      if (!gridRef.current) return
      const gridH   = gridRef.current.scrollHeight
      const parentH = gridRef.current.parentElement?.clientHeight ?? window.innerHeight
      const range   = Math.max(gridH - parentH, 0)
      if (range > 0) setScrollRange(range)
    }

    // Measure immediately + after a frame to catch image load shifts
    measure()
    const raf = requestAnimationFrame(measure)
    const t   = setTimeout(measure, 500)
    window.addEventListener('resize', measure)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 220,
  damping: 30,
  mass: 0.4,
});

  // y goes from 0 to -scrollRange
  // Start at 0 so first images are visible at top of right panel
  const y = useTransform(smoothProgress, [0, 1], [0, -scrollRange])

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '350vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <Container>
          <div className="flex h-[100vh]">

            {/* Left */}
            <div className="w-[30%] px-10 flex flex-col justify-end pb-[10rem] gap-4">
              <h1 className="text-5xl font-semibold uppercase">2026 THEME</h1>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur.
                psum dolor sit amet consectetur.
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

  href="#tickets"
              />
            </div>

            {/* Right — gallery scrolls up as user scrolls page */}
            <div className="w-[70%] h-full" style={{ overflow: 'hidden' }}>
              <MasonryGrid
                ref={gridRef}
                y={y}
              />
            </div>

          </div>
        </Container>
      </div>
    </div>
  )
}

export default Theme