"use client"

import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { Container } from "@/components/common/Container"


const text1 =
  `Elevate is a platform for experimental thinking, immersive storytelling, and spatial expression shaped through contemporary design.`

const text2 =
  `Bringing together creators, brands, and visionaries, it transforms ideas into experiences that blur the boundaries between object, environment, and emotion.`

function Word({ word, progress, range }: any) {
  const opacity = useTransform(progress, range, [0.2, 1])

  const color = useTransform(
    progress,
    range,
    ["rgb(163 163 163)", "rgb(0 0 0)"]
  )

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-2"
    >
      {word}
    </motion.span>
  )
}

function WordReveal({ text, progress, range }: any) {
  const words = text.split(" ")

  const [startRange, endRange] = range

  const step = (endRange - startRange) / words.length

  return (
    <p className="leading-[1.2] text-h3-mobile md:text-h3-tab lg:text-h3 font-medium tracking-[-0.04em]">
      {words.map((word: string, i: number) => {
        const start = startRange + i * step
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

const ElevateHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <Container>
      <section
        ref={containerRef}
        className="relative h-[200vh] w-full"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center">
          
          <div className="max-w-[1200px] px-6 md:px-10 text-center space-y-10">
            
            <WordReveal
              text={text1}
              progress={smoothProgress}
              range={[0, 0.45]}
            />

            <WordReveal
              text={text2}
              progress={smoothProgress}
              range={[0.45, 0.9]}
            />

          </div>
        </div>
      </section>
    </Container>
  )
}

export default ElevateHero