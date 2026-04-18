"use client"

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '../common/Section'
import { Container } from '../common/Container'
import CTABtn from '../common/CTABtn'
import { FiMinus } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import CTAStrip from '../common/CTAStrip'

import bgImage1 from '@/public/temp/home/ecosystem/N1.jpg'
import bgImage2 from '@/public/temp/home/ecosystem/N-2.jpg'
import bgImage3 from '@/public/temp/home/ecosystem/N-3.jpg'
import bgImage4 from '@/public/temp/home/ecosystem/N-2.jpg'
import bgImage5 from '@/public/temp/home/ecosystem/N1.jpg'

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
  {
    id: 'core',
    label: 'CORE',
    tag: 'THE FOUNDATION TRACK',
    bgImage: bgImage1.src,
    title: 'CORE',
    description: 'The backbone of Design POV India...',
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
    bgImage: bgImage2.src,
    title: 'ELEVATE',
    description: '12 emerging designers paired...',
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
    bgImage: bgImage3.src,
    title: 'EDIT',
    description: 'A bi-annual publication...',
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
    bgImage: bgImage4.src,
    title: 'CIRCLE',
    description: 'An intimate membership...',
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
    bgImage: bgImage5.src,
    title: 'JOURNAL',
    description: 'A living digital archive...',
    stats: [
      { value: '100+', unit: 'ESSAYS' },
      { value: 'OPEN', unit: 'ACCESS' },
    ],
    cta: 'READ JOURNAL',
  },
]

const EcosystemSection = () => {
  const [activeId, setActiveId] = useState<string>('core')
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="Five_Pathways_"
        titleBold="Ecosystem"
        sticky={false}
        isSectionHovered={isHovered}
      />

      <Section className="!py-8">
        <Container>
          {/* ───────── DESKTOP (Accordion) ───────── */}
          <div
            className="hidden md:flex"
            style={{
              flex: 1,
              position: 'relative',
              borderTop: '1px solid #222',
            }}
          >
            {ECOSYSTEM.map((item, index) => {
              const isActive = activeId === item.id
              // We hide the right border if THIS item is active 
              // OR if the NEXT item is active (to avoid double lines with the blue accent)
              const nextIsActive = ECOSYSTEM[index + 1]?.id === activeId;
              const isLast = index === ECOSYSTEM.length - 1;

              return (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  animate={{
                    flex: isActive ? 5 : 0.6,
                  }}
                  transition={{ duration: 0.55, ease: [0.32, 0, 0.08, 1] }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#0d0d0d',
                    minHeight: '480px',
                    borderRight: (isActive || nextIsActive || isLast) 
                      ? 'none' 
                      : '1px solid #ffffff15', // Subtle separator for inactive states
                  }}
                >
                  {/* Background Image */}
                  <motion.img
                    src={item.bgImage}
                    alt={item.title}
                    animate={{ opacity: isActive ? 0.3 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'var(--primary-blue)',
                      pointerEvents: 'none',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Active Blue Line */}
                  <motion.div
                    animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
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

                  {/* Collapsed Label */}
                  <motion.div
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
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
                      <div className="flex bg-[#ffffff25] w-px h-12" />
                      <span>{item.label}</span>
                    </div>
                  </motion.div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isActive && (
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
                        {/* Top: Tag */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'var(--primary-blue)',
                            }}
                          />
                          <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#fff' }}>
                            {item.tag}
                          </span>
                        </div>

                        {/* Middle: Text */}
                        <div>
                          <motion.h3
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={{
                              fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                              fontWeight: 600,
                              color: '#f0f0f0',
                              margin: '0 0 20px',
                              lineHeight: 1,
                            }}
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={{
                              fontSize: '15px',
                              lineHeight: 1.4,
                              color: '#ffffff75',
                              maxWidth: '420px',
                            }}
                          >
                            {item.description}
                          </motion.p>
                        </div>

                        {/* Bottom: Stats & CTA */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', gap: '40px' }}>
                            {item.stats.map((stat, i) => (
                              <div key={i}>
                                <div style={{ fontSize: '24px', fontWeight: 500, color: '#fff' }}>
                                  {stat.value}
                                </div>
                                <div style={{ fontSize: '10px', color: '#ffffff75', letterSpacing: '0.1em' }}>
                                  {stat.unit}
                                </div>
                              </div>
                            ))}
                          </div>
                          <CTABtn
                            label={item.cta}
                            className="text-xs"
                            iconType="arrow"
                            btnBg="var(--primary-blue)"
                            textColor="#fff"
                            borderColor="var(--primary-blue)"
                            href="#apply"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* ───────── MOBILE (Stacked) ───────── */}
          <div className="md:hidden">
            {ECOSYSTEM.map((item) => {
              const isActive = activeId === item.id
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  style={{
                    position: 'relative',
                    borderTop: '1px solid #222',
                    background: '#0d0d0d',
                  }}
                >
                  <motion.div
                    animate={{ scaleX: isActive ? 1 : 0 }}
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

                  {!isActive ? (
                    <div className="p-5 flex justify-between items-center text-[#ffffff55] font-bold">
                      <span>{item.label}</span>
                      <FiMinus />
                    </div>
                  ) : (
                    <div className="p-10 relative z-10">
                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-blue)' }} />
                        <span style={{ fontSize: '11px', color: '#fff' }}>{item.tag}</span>
                      </div>
                      <h3 className="text-4xl font-semibold text-[#f0f0f0] mb-4">{item.title}</h3>
                      <p className="text-sm text-[#ffffff75] mb-8 leading-relaxed">{item.description}</p>
                      
                      <div className="flex gap-8 mb-8">
                        {item.stats.map((stat, i) => (
                          <div key={i}>
                            <div className="text-xl text-white font-medium">{stat.value}</div>
                            <div className="text-[10px] text-[#ffffff75]">{stat.unit}</div>
                          </div>
                        ))}
                      </div>

                      <CTABtn
                        label={item.cta}
                        iconType="arrow"
                        btnBg="var(--color-black)"
                        borderColor="#fff"
                        textColor="#fff"
                        href="#apply"
                      />
                    </div>
                  )}
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
          textColor="var(--primary-red)"
          hoverTextColor="var(--color-white)"
        />
      </div>
    </div>
  )
}

export default EcosystemSection