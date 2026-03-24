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

const WhatPOV = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [startExit, setStartExit] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const t1 = setTimeout(() => setStartExit(true), 5200);
    const t2 = setTimeout(() => setShowDesc(true), 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isInView]);

    const NEW_ARRIVALS = [
        { id: 1, img: img1, title: 'Simply Dummy', href: "#" },
        { id: 2, img: img2, title: 'Simply Dummy', href: "#" },
        { id: 3, img: img3, title: 'Simply Dummy', href: "#" },
        { id: 4, img: img4, title: 'Simply Dummy', href: "#" },
        { id: 5, img: img5, title: 'Simply Dummy', href: "#" },
        { id: 6, img: img3, title: 'Simply Dummy', href: "#" },
    ];

    return (
        <Section>
            <Container>

                <div className="hero-text">
<div ref={ref} className="typewriter-wrapper overflow-hidden">
      
      {/* TYPEWRITER BLOCK */}
      <motion.div
        className="typewriter"
        initial={{ opacity: 1 }}
        animate={
          isInView && startExit
            ? { opacity: 0, scale: 0.95, height: 0 }
            : {}
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* P TAG */}
        <motion.p
          className="typewriter-text"
          initial={{ x: 0, opacity: 1 }}
          animate={
            isInView && startExit
              ? { x: "-120vw", opacity: 0 }
              : {}
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          India's Most <span>INTERNATIONAL</span>
        </motion.p>

        {/* H1 TAG */}
        <motion.h1
          className="italic uppercase focus-text"
          initial={{ opacity: 0, letterSpacing: "-0.5em", filter: "blur(12px)" }}
          animate={
            isInView
              ? startExit
                ? { x: "120vw", opacity: 0 }
                : {
                    opacity: 1,
                    letterSpacing: "0em",
                    filter: "blur(0px)",
                  }
              : {}
          }
          transition={{
            duration: 1.3,
            delay: isInView ? 3.8 : 0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          DESIGN PLATFORMS.
        </motion.h1>
      </motion.div>

      {/* HERO DESCRIPTION */}
      <motion.h1
        className="hero-desc"
        initial={{
          opacity: 0,
          y: 20,
          letterSpacing: "-0.5em",
          filter: "blur(12px)",
        }}
        animate={
          isInView && showDesc
            ? {
                opacity: 1,
                y: 0,
                letterSpacing: "0em",
                filter: "blur(0px)",
              }
            : {}
        }
        transition={{
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <span> Design POV India </span>is an annual platform that brings together
        the most progressive creative <br /> minds in the country. Through{" "}
        <span>Residencies, Exhibitions, Publications, </span> and{" "}
        <span>Critical Dialogue</span>, we <br /> shape the narrative of Indian
        design—on Indian terms.
      </motion.h1>
    </div>
                    </div>
                    <div className="mt-8 h-[400px] flex items-end justify-center">

                    <MarqueeFlow
                        items={NEW_ARRIVALS}
                        gap={5}
                        speed={4000}
                        desktopCount={4}
                        renderItem={(item) => (
                            /* Each card is now a Link providing unique navigation based on item data */
                            <Link
                                href={item.href || "#"}
                                className="relative block  w-full overflow-hidden shadow-xl"
                                style={{
                                    aspectRatio: '10/5',
                                    transition: 'aspect-ratio 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                                    transformOrigin: 'top center',
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget;
                                    el.style.aspectRatio = '6/5';
                                    const img = el.querySelector('img');
                                    if (img) img.style.transform = 'translate3d(0,0,0) scale(1.15)';
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget;
                                    el.style.aspectRatio = '10/5';
                                    const img = el.querySelector('img');
                                    if (img) img.style.transform = 'translate3d(0,0,0) scale(1)';
                                }}
                            >
                                <Image
                                    src={item.img}
                                    alt={item.title || "New Arrival"}
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
    )
}

export default WhatPOV