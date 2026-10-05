"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '../common/Section'
import { Container } from '../common/Container'
import CTABtn from '../common/CTABtn'
import { FiMinus } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import CTAStrip from '../common/CTAStrip'

import type { EcosystemItem } from '@/lib/homeContent'

const EcosystemSection = ({ heading, items: ECOSYSTEM }: { heading: string; items: EcosystemItem[] }) => {
  // Panels are identified by position; the first one starts open.
  const [activeId, setActiveId] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(true)

  useEffect(() => {
    const checkViewport = () => setIsMobileViewport(window.innerWidth < 768)
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='pt-6 lg:pt-0'
    >
      <SectionHeading
        titleBold={heading}
        sticky={false}
        isSectionHovered={isHovered}
      />

      <Section className="!py-0 lg:!pb-8 !px-0 lg:!px-10">
        <Container>
          {/* ───────── DESKTOP (Accordion) ───────── */}
          {!isMobileViewport && (
          <div
            className="hidden md:flex"
            style={{
              flex: 1,
              position: 'relative',
              borderTop: '1px solid #222',
            }}
          >
            {ECOSYSTEM.map((item, index) => {
              const isActive = activeId === index
              // We hide the right border if THIS item is active
              // OR if the NEXT item is active (to avoid double lines with the blue accent)
              const nextIsActive = index + 1 === activeId;
              const isLast = index === ECOSYSTEM.length - 1;

              return (
                <motion.div
                  key={index}
                  onMouseEnter={() => setActiveId(index)}
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
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
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
                            label={item.ctaLabel}
                            className="text-tab-body"
                            iconType="arrow"
                            btnBg="var(--primary-blue)"
                            textColor="#fff"
                            borderColor="var(--primary-blue)"
                            href={item.href}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
          )}

          {/* ───────── MOBILE (Stacked) ───────── */}
          {isMobileViewport && (
          <div className="md:hidden ">
  {ECOSYSTEM.map((item, index) => {
    const isActive = activeId === index

    return (
      <div
        key={index}
        onClick={() => setActiveId(index)}
        style={{
          position: 'relative',
          borderTop: '1px solid #222',
          overflow: 'hidden',
          background: '#0d0d0d',
        }}
      >
        {/* Background Image */}
        {isActive && (
          <motion.img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0.35, scale: 1 }}
            animate={{
              opacity: 0.35,
              scale: 1,
            }}
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
        )}

        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            zIndex: 1,
          }}
        />

        {/* Top Blue Line */}
        <motion.div
          animate={{ scaleX: isActive ? 1 : 0 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: '100%',
            background: 'var(--primary-blue)',
            transformOrigin: 'left',
            zIndex: 5,
          }}
        />

        {!isActive ? (
          <div className="relative z-10 p-6 flex justify-between items-center text-[#ffffff55] font-bold">
            <span>{item.label}</span>
            <FiMinus />
          </div>
        ) : (
          <div className="relative z-10 p-10">
            <h3 className="text-4xl font-semibold text-[#f0f0f0] mb-4">
              {item.title}
            </h3>

            <div className="mb-8">
              {item.description?.map((para, index) => (
                <p
                  key={index}
                  className="text-sm text-[#ffffff85] leading-relaxed mb-3"
                >
                  {para}
                </p>
              ))}
            </div>

            <CTABtn
              label={item.ctaLabel}
              className="text-mob-body"
              iconType="arrow"
              btnBg="var(--color-black)"
              borderColor="#fff"
              textColor="#fff"
              href={item.href}
            />
          </div>
        )}
      </div>
    )
  })}
</div>
          )}
        </Container>
      </Section>

      
    </div>
  )
}

export default EcosystemSection
