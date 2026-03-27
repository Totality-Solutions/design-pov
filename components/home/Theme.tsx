'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Container } from '../common/Container'
import CTABtn from '../common/CTABtn'
import { useScroll, useTransform, useSpring } from "framer-motion"
import MasonryGrid, { MasonryMediaItem } from './Mansonrygrid'
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

const MEDIA: MasonryMediaItem[] = [
  { src: img1,  type: "image", alt: "Theme 1"  },
  { src: img2,  type: "image", alt: "Theme 2"  },
  { src: img3,  type: "image", alt: "Theme 3"  },
  { src: img4,  type: "image", alt: "Theme 4"  },
  { src: img5,  type: "image", alt: "Theme 5"  },
  { src: img6,  type: "image", alt: "Theme 6"  },
  { src: img7,  type: "image", alt: "Theme 7"  },
  { src: img8,  type: "image", alt: "Theme 8"  },
  { src: img9,  type: "image", alt: "Theme 9"  },
  { src: img10, type: "image", alt: "Theme 10" },
  { src: img11, type: "image", alt: "Theme 11" },
  { src: img12, type: "image", alt: "Theme 12" },
  { src: img13, type: "image", alt: "Theme 13" },
]

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
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  // y goes from 0 to -scrollRange
  // Start at 0 so first images are visible at top of right panel
  const y = useTransform(smoothProgress, [0, 1], [0, -scrollRange])

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '500vh' }}>
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
              <CTABtn label="2026 THEME" />
            </div>

            {/* Right — gallery scrolls up as user scrolls page */}
            <div className="w-[70%] h-full" style={{ overflow: 'hidden' }}>
              <MasonryGrid
                ref={gridRef}
                items={MEDIA}
                columns={2}
                gap={4}
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