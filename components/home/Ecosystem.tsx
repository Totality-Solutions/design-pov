"use client"

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '../common/Section'
import { Container } from '../common/Container'
import bgImage from '@/public/temp/ecosystem.png'
import CTABtn from '../common/CTABtn'
import Title from '../common/Title'
import { FiMinus } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import CTAStrip from '../common/CTAStrip'

interface EcosystemItem {
  id: string
  label: string
  tag: string
  title: string
  description: string
  stats: { value: string; unit: string }[]
  cta: string
  bgImage?: string
}

const ECOSYSTEM: EcosystemItem[] = [
  // SAME DATA (unchanged)
  {
    id: 'core',
    label: 'CORE',
    tag: 'THE FOUNDATION TRACK',
    bgImage: bgImage.src,
    title: 'CORE',
    description:
      'The backbone of Design POV India...',
    stats: [
      { value: '40', unit: 'MEMBERS' },
      { value: '12', unit: 'MONTHS' },
    ],
    cta: 'APPLY TO CORE',
  },
  {
    id: 'elevate',
    label: 'ELEVATE',
    tag: 'THE MENTORSHIP TRACK',
    bgImage: bgImage.src,
    title: 'ELEVATE',
    description:
      '12 emerging designers paired...',
    stats: [
      { value: '12', unit: 'PAIRS' },
      { value: '3', unit: 'MONTHS' },
    ],
    cta: 'APPLY AS DESIGNER',
  },
  {
    id: 'edit',
    label: 'EDIT',
    tag: 'THE PUBLICATION TRACK',
    bgImage: bgImage.src,
    title: 'EDIT',
    description:
      'A bi-annual publication...',
    stats: [
      { value: '2', unit: 'ISSUES/YR' },
      { value: '500', unit: 'COPIES' },
    ],
    cta: 'CONTRIBUTE',
  },
  {
    id: 'circle',
    label: 'CIRCLE',
    tag: 'THE COMMUNITY TRACK',
    bgImage: bgImage.src,
    title: 'CIRCLE',
    description:
      'An intimate membership...',
    stats: [
      { value: '200', unit: 'MEMBERS' },
      { value: '12', unit: 'EVENTS/YR' },
    ],
    cta: 'JOIN CIRCLE',
  },
  {
    id: 'journal',
    label: 'JOURNAL',
    tag: 'THE ARCHIVE TRACK',
    bgImage: bgImage.src,
    title: 'JOURNAL',
    description:
      'A living digital archive...',
    stats: [
      { value: '100+', unit: 'ESSAYS' },
      { value: 'OPEN', unit: 'ACCESS' },
    ],
    cta: 'READ JOURNAL',
  },
]

const EcosystemSection = () => {
  const [activeId, setActiveId] = useState<string>('core')
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered ] = useState(false)

  const activeItem = ECOSYSTEM.find((e) => e.id === activeId)!

  return (
    <div  
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <SectionHeading
          titleMain="Five Pathways" 
          titleBold="Ecosystem" 
          sticky={false}
          isSectionHovered={isHovered} 
        >
        </SectionHeading>

    <Section className='!py-8'>
      <Container>
        {/* ───────── DESKTOP (UNCHANGED) ───────── */}
        <div
          ref={containerRef}
          className="hidden md:flex"
          style={{
            flex: 1,
            position: 'relative',
            borderTop: '1px solid #222',
          }}
        >
          {ECOSYSTEM.map((item, index) => {
            const isHovered = activeId === item.id
            const isAnyHovered = true

            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                animate={{
                  flex: isHovered ? 5 : isAnyHovered ? 0.6 : 1,
                }}
                transition={{ duration: 0.55, ease: [0.32, 0, 0.08, 1] }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRight:
                    index < ECOSYSTEM.length - 1
                      ? '2px solid #ffffff35'
                      : 'none',
                  minHeight: '520px',
                  background: '#0d0d0d',
                }}
              >
                {/* YOUR ORIGINAL CODE — NOT TOUCHED */}
                {/* (keeping everything same) */}

                <motion.img
                  src={item.bgImage}
                  alt={item.title}
                  animate={{ opacity: isHovered ? 0.18 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'var(--primary-blue)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Blue accent line — left edge */}
                <motion.div
                    animate={{ scaleY: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'var(--primary-blue)',
                    transformOrigin: 'top',
                    zIndex: 10,
                    }}
                />

                {/* Vertical label (collapsed state) */}
                <motion.div
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    }}
                >
                    <div 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '30px',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                        fontSize: 'var(--font-size-base)',
                        letterSpacing: '0.15em',
                        color: '#ffffff55',
                        fontWeight: 700,
                        userSelect: 'none',
                    }}
                    >
                    <div className="flex bg-[#ffffff25] w-px h-12 items-center justify-center pointer-events-none"/>
                    <span>{item.label}</span>
                    </div>

                </motion.div>

                    <AnimatePresence>
                    {isHovered && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '36px 40px 36px 48px',
                        minWidth: '420px',
                        }}
                    >
                        {/* Top: tag */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                            style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--primary-blue)',
                            textTransform: 'uppercase',
                            flexShrink: 0,
                            display: 'inline-block',
                            }}
                        />
                        <span
                            style={{
                            fontSize: '11px',
                            letterSpacing: '0.1em',
                            color: 'var(--color-white)',
                            fontWeight: 400,
                            }}
                        >
                            {item.tag}
                        </span>
                        </div>

                        {/* Middle: title + desc */}
                        <div>
                        <motion.h3
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            style={{
                            fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                            fontWeight: 600,
                            color: '#f0f0f0',
                            margin: '0 0 20px',
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                            }}
                        >
                            {item.title}
                        </motion.h3>
                        <motion.p
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.22 }}
                            style={{
                            fontSize: 'var(--font-size-base)',
                            lineHeight: 1.4,
                            letterSpacing: '0.03em',
                            color: '#ffffff75',
                            margin: 0,
                            maxWidth: '420px',
                            }}
                        >
                            {item.description}
                        </motion.p>
                        </div>

                        {/* Bottom: stats + CTA */}
                        <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.28 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0',
                        }}
                        >
                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '0', flex: 1 }}>
                            {item.stats.map((stat, i) => (
                            <div
                                key={i}
                                style={{
                                paddingRight: '24px',
                                marginRight: '24px',
                                borderRight: i < item.stats.length - 1 ? '1px solid #333' : 'none',
                                }}
                            >
                                <div
                                style={{
                                    fontSize: 'clamp(1.4rem, 2vw,1rem)',
                                    fontWeight: 500,
                                    color: '#ffffff',
                                    lineHeight: 1,
                                }}
                                >
                                {stat.value}
                                </div>
                                <div
                                style={{
                                    fontSize: '10px',
                                    letterSpacing: '0.14em',
                                    color: '#ffffff75',
                                    marginTop: '4px',
                                }}
                                >
                                {stat.unit}
                                </div>
                            </div>
                            ))}
                        </div>
                {/* CTA */}
                <CTABtn
                  label={item.cta}
                  iconType="arrow"
                  className='text-xs'
                  btnBg="var(--color-black)"
                  btnHoverBg="var(--primary-blue)"
                  textColor="var(--color-white)"
                  borderColor="var(--color-white)"
                  borderHoverColor="var(--primary-blue)"
                  lineColor="var(--color-black)"
                  lineHoverColor="var(--color-black)"
                  bottomKey1Width="40px"
                  bottomKey2Width="12px"
                  bottomKey1Right="50px"
                  bottomKey2Right="15px"
                  href="#tickets"
                />
                </motion.div>
                </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* ───────── MOBILE (TOP → BOTTOM) ───────── */}
        <div className="md:hidden">
  {ECOSYSTEM.map((item, index) => {
    const isActive = activeId === item.id

    return (
      <div
        key={item.id}
        onClick={() => setActiveId(item.id)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid #222',
          background: '#0d0d0d',
          cursor: 'pointer',
        }}
      >
        {/* Background Image */}
        <motion.img
          src={item.bgImage}
          alt={item.title}
          animate={{ opacity: isActive ? 0.18 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />

        {/* Blue Accent Line */}
        <motion.div
          animate={{
            scaleX: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '2px',
            width: '100%',
            background: 'var(--primary-blue)',
            transformOrigin: 'left',
            zIndex: 5,
          }}
        />

        {/* COLLAPSED STATE */}
        {!isActive && (
          <div
            style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#ffffff55',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}
          >
            <span>{item.label}</span>
            <span><FiMinus/></span>
          </div>
        )}

        {/* EXPANDED STATE */}
<motion.div
  initial={false}
  animate={{
    height: isActive ? "auto" : 0,
    opacity: isActive ? 1 : 0,
  }}
  transition={{
    height: { duration: 0.45, ease: [0.32, 0, 0.08, 1] },
    opacity: { duration: 0.2 },
  }}
  style={{
    overflow: "hidden",
  }}
>
  {isActive && (
  <div
    style={{
      padding: "40px 20px 40px",
      position: "relative",
      zIndex: 2,
    }}
  >
              {/* Tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary-blue)',
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: '#ffffff',
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <div className=" flex flex-col gap-12 justify-start items-start">
              <div className="">
                {/* Title */}
                <h3
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 2.6rem)',
                    fontWeight: 600,
                    marginBottom: '14px',
                    color: '#f0f0f0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: '#ffffff75',
                  }}
                >
                  {item.description}
                </p>
              </div>

                  {/* Stats */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '24px',
                    }}
                  >
                    {item.stats.map((stat, i) => (
                      <div key={i}>
                        <div
                          style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            color: '#ffffff',
                          }}
                        >
                          {stat.value}
                        </div>
                        <div
                          style={{
                            fontSize: '10px',
                            letterSpacing: '0.14em',
                            color: '#ffffff75',
                          }}
                        >
                          {stat.unit}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <CTABtn
                    label={item.cta}
                    iconType="arrow"
                    className='text-xs'
                    btnBg="var(--color-black)"
                    btnHoverBg="var(--primary-blue)"
                    textColor="var(--color-white)"
                    borderColor="var(--color-white)"
                    borderHoverColor="var(--primary-blue)"
                    lineColor="var(--color-black)"
                    lineHoverColor="var(--color-black)"
                    bottomKey1Width="40px"
                    bottomKey2Width="12px"
                    bottomKey1Right="50px"
                    bottomKey2Right="15px"
                    href="#tickets"
                  />
              </div>

            </div>
          )}
        </motion.div>
      </div>
    )
  })}
</div>

      </Container>
    </Section>

      <div className="w-full z-10 bg-white border-t border-b border-[#DFDFDF]">
        <CTAStrip
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          ctaHref="#"
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
      </div>
    </div>
  )
}

export default EcosystemSection