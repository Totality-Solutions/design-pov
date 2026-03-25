"use client"

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '../common/Section'
import { Container } from '../common/Container'
import bgImage from '@/public/temp/ecosystem.png'
import CTABtn from '../common/CTABtn'

// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const ECOSYSTEM: EcosystemItem[] = [
  {
    id: 'core',
    label: 'CORE',
    tag: 'THE FOUNDATION TRACK',
    bgImage: bgImage.src,
    title: 'CORE',
    description:
      'The backbone of Design POV India. A curated cohort of designers, thinkers, and makers forming the nucleus of India\'s most ambitious creative network.',
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
      '12 emerging designers paired with India\'s most established creative directors for a structured 3-month guided practice. Highly competitive, application-based.',
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
      'A bi-annual publication documenting Indian design in its rawest, most unfiltered form. Essays, interviews, and visual journalism from the inside.',
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
      'An intimate membership for design professionals who want access, dialogue, and community. Monthly salons, studio visits, and critical conversations.',
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
      'A living digital archive of Indian design thinking. Long-form writing, process documentation, and speculative futures from practitioners across the country.',
    stats: [
      { value: '100+', unit: 'ESSAYS' },
      { value: 'OPEN', unit: 'ACCESS' },
    ],
    cta: 'READ JOURNAL',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
const EcosystemSection = () => {
  // CORE is default; last hovered card stays open — never closes
  const [activeId, setActiveId] = useState<string>('core')
  const containerRef = useRef<HTMLDivElement>(null)

  const activeItem = ECOSYSTEM.find((e) => e.id === activeId)!

  return (
    <Section>
        <Container>

        {/* Header */}
        <div style={{ padding: '0 0 10px 0' }}>
            <h1 className="text-4xl font-medium ">Five <span className='font-bold'>Pathways</span></h1>
            <h2
            style={{
                fontStyle: 'italic',
                fontSize: '56px',
                fontWeight: 700,
                color: '#e63422',
                letterSpacing: '-0.01em',
            }}
            >
            Ecosystem.
            </h2>
        </div>

        {/* Cards Row */}
        <div
            ref={containerRef}
            style={{
            display: 'flex',
            flex: 1,
            position: 'relative',
            borderTop: '1px solid #222',
            }}
        >
            {ECOSYSTEM.map((item, index) => {
            const isHovered = activeId === item.id
            const isAnyHovered = true  // always one card active

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
                    borderRight: index < ECOSYSTEM.length - 1 ? '2px solid #ffffff35' : 'none',
                    minHeight: '520px',
                    background: '#0d0d0d',
                }}
                >
                {/* Background image layer (dark overlay) */}
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

                {/* Expanded content */}
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

                        {/* CTA Button */}
                        <CTABtn label={item.cta} className='text-xs' />
                        </motion.div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </motion.div>
            )
            })}
        </div>
        </Container>
    </Section>
  )
}

export default EcosystemSection