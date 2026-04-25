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
  tag?: string
  title: string
  description?: string[]
  stats: { value: string; unit: string }[]
  cta: string
  bgImage?: string
}

const ECOSYSTEM: EcosystemItem[] = [
  {
    id: 'core',
    label: 'THE CORE',
    tag: 'THE FOUNDATION TRACK',
    bgImage: bgImage1.src,
    title: 'THE CORE',
    description: [
      "At the heart of Design POV are 16 design studios—each invited to interpret the theme through a fully realised spatial narrative.",
      "These are not booths, they are environments.",
      "Each space is built in collaboration with leading brands and fabricators, resulting in distinct, immersive experiences that challenge how design is typically presented.",
    ],
    stats: [
      { value: '40', unit: 'MEMBERS' },
      { value: '12', unit: 'MONTHS' },
    ],
    cta: 'Apply to Core',
  },
  {
    id: 'circle',
    label: 'CIRCLE',
    tag: 'THE COMMUNITY TRACK',
    bgImage: bgImage4.src,
    title: 'CIRCLE',
    description: ["A live space for open dialogue and powerful discourse. Curated with the same intent as the show: to question, reflect, and reconsider, these discussions brought together the voices shaping India’s cultural landscape. Unfiltered and unscripted, the platform dove deep into the ideas shaping how we live, build, and collaborate."],
    stats: [
      { value: '200', unit: 'MEMBERS' },
      { value: '12', unit: 'EVENTS/YR' },
    ],
    cta: 'Join Circle',
  },
  {
    id: 'objects',
    label: 'OBJECTS',
    tag: 'THE PUBLICATION TRACK',
    bgImage: bgImage3.src,
    title: 'OBJECTS',
    description: ["A curated initiative where select architects, designers, product designers, and artists are invited to conceive and fabricate one original object in response to the edition's theme. Stripping away the noise to create something pure - a perspective in the form of a physical object."],
    stats: [
      { value: '2', unit: 'ISSUES/YR' },
      { value: '500', unit: 'COPIES' },
    ],
    cta: 'Contribute',
  },
  {
    id: 'elevate',
    label: 'ELEVATE',
    tag: 'THE MENTORSHIP TRACK',
    bgImage: bgImage2.src,
    title: 'ELEVATE',
    description: ["An initiative for brand moments worth remembering. Exclusively available for the POV ecosystem, it's designed to help you create strategic visibility that goes beyond the show floor."],
    stats: [
      { value: '12', unit: 'PAIRS' },
      { value: '3', unit: 'MONTHS' },
    ],
    cta: 'Apply as Designer',
  },
  {
    id: 'magazine',
    label: 'MAGAZINE',
    tag: 'THE ARCHIVE TRACK',
    bgImage: bgImage5.src,
    title: 'MAGAZINE',
    description: ["A curation of stories from those who consume and create design - from the Indian sub-continent and beyond."],
    stats: [
      { value: '100+', unit: 'ESSAYS' },
      { value: 'OPEN', unit: 'ACCESS' },
    ],
    cta: 'Read Magazine',
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
        titleBold="POV ECOSYSTEM"
        sticky={false}
        isSectionHovered={isHovered}
      />

      <Section className="!py-0 lg:!pb-8 !px-0 lg:!px-14">
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
                        {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                        </div> */}

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
                              marginBottom:'32px'
                            }}
                          >
                            {item.title}
                          </motion.h3>
                          <div style={{ maxWidth: '520px' }}>
                            {item.description?.map((para, index) => (
                              <motion.p
                                key={index}
                                initial={{ y: 12, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.1,
                                }}
                                style={{
                                  fontSize: '16px',
                                  lineHeight: 1.6,
                                  color: '#ffffff95',
                                  marginBottom: '12px',
                                }}
                              >
                                {para}
                              </motion.p>
                            ))}
                          </div>
                        </div>

                        {/* Bottom: Stats & CTA */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {/* <div style={{ display: 'flex', gap: '40px' }}>
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
                          </div> */}
                          <CTABtn
                            label={item.cta}
                            className="text-tab-body"
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
                       {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-blue)' }} />
                        <span style={{ fontSize: '11px', color: '#fff' }}>{item.tag}</span>
                      </div> */}
                      <h3 className="text-4xl font-semibold text-[#f0f0f0] mb-4">{item.title}</h3>
                      <div className="mb-8">
                        {item.description?.map((para, index) => (
                          <p
                            key={index}
                            className="text-sm text-[#ffffff75] leading-relaxed mb-3"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                      
                      {/* <div className="flex gap-8 mb-8">
                        {item.stats.map((stat, i) => (
                          <div key={i}>
                            <div className="text-xl text-white font-medium">{stat.value}</div>
                            <div className="text-[10px] text-[#ffffff75]">{stat.unit}</div>
                          </div>
                        ))}
                      </div> */}

                      <CTABtn
                        label={item.cta}
                        className='text-mob-body'
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