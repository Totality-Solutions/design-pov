"use client";

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import MarqueeFlow from '../common/MarqueeFlow';
import Image from 'next/image';
import Link from 'next/link';

// Sample data items
const ITEMS = [
  { id: 1, img: "/temp/1.jpg", title: 'Architects', href: '#' },
  { id: 2, img: "/temp/2.jpg", title: 'Designers', href: '#' },
  { id: 3, img: "/temp/3.jpg", title: 'Builders', href: '#' },
  { id: 4, img: "/temp/4.jpeg", title: 'Brands', href: '#' },
  { id: 5, img: "/temp/5.jpg", title: 'Creative', href: '#' },
];

const EcosystemSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 20, 
    restDelta: 0.001 
  });

  // Scroll ranges for the Marquee appearance (matching your reference)
  const marqueeOpacity = useTransform(smooth, [0.78, 0.95], [0, 1]);
  const marqueeY = useTransform(smooth, [0.75, 0.9], [80, 0]);
  const marqueeBlur = useTransform(smooth, [0.75, 0.9], [10, 0]);
  const marqueeBlurPx = useTransform(marqueeBlur, (v) => `blur(${v}px)`);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-white">
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
      >
        <motion.div
          style={{
            opacity: marqueeOpacity,
            y: marqueeY,
            filter: marqueeBlurPx,
          }}
          className="w-full flex items-end justify-center overflow-hidden"
        >
          <MarqueeFlow
                items={ITEMS}
                gap={5}
                speed={200}
                desktopCount={4}
                renderItem={(item, _index, isExpanded) => (
                  <Link
                    href={item.href || '#'}
                    className="relative block w-full overflow-hidden shadow-xl"
                    style={{
  aspectRatio: isExpanded ? '6/5' : '10/5', // fixed base
  // transform: isExpanded ? 'scaleY(1.2)' : 'scaleY(1)',
  transition: "aspect-ratio 2000ms cubic-bezier(0.22, 1, 0.36, 1)",
  transformOrigin: 'bottom',
}}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.aspectRatio = '6/5'
                      const img = el.querySelector('img')
                      if (img) img.style.transform = 'translate3d(0,0,0) scale(1.15)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.aspectRatio = isExpanded ? '6/5' : '10/5'
                      const img = el.querySelector('img')
                      if (img) img.style.transform = isExpanded
                        ? 'translate3d(0,0,0) scale(1.15)'
                        : 'translate3d(0,0,0) scale(1)'
                    }}
                  >
                    <Image
                      src={item.img}
                      alt={item.title || 'New Arrival'}
                      fill
                      className="object-cover will-change-transform"
                      style={{
                        transform: isExpanded
                          ? 'translate3d(0,0,0) scale(1.15)'
                          : 'translate3d(0, 0, 0) scale(1)',
                        backfaceVisibility: 'hidden',
                        transition: 'transform 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
                        transformOrigin: 'bottom center',
                      }}
                      sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw"
                    />
                  </Link>
                )}
              />
        </motion.div>
      </div>
    </div>
  );
};

export default EcosystemSection;