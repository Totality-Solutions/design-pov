"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";  
import CTABtn from "../common/CTABtn";

const images = [
'/temp/collaborate/brand1.jpeg',
'/temp/collaborate/brand2.jpg',
'/temp/collaborate/circle1.jpeg',
'/temp/collaborate/circle2.jpg',
'/temp/collaborate/core1.jpg',
'/temp/collaborate/core2.jpg',
'/temp/collaborate/elevate1.jpeg',
'/temp/collaborate/object1.jpeg',
'/temp/collaborate/partner1.jpeg',
'/temp/collaborate/partner2.jpeg',
'/temp/collaborate/partner3.jpeg',
'/temp/collaborate/partner4.jpg',
];

const CollaborateSection = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);

  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const duplicatedImages = [...images, ...images];

  // ✅ PERFECT SEAMLESS MARQUEE
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastTime = 0;
    const speed = 40;

    const animate = (time: number) => {
      rafRef.current = requestAnimationFrame(animate);

      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHovered) {
        offsetRef.current += speed * delta;
      }

      const totalWidth = track.scrollWidth / 2;

      if (totalWidth === 0) return;

      // 🔥 CRITICAL FIX (prevents stopping)
      if (offsetRef.current >= totalWidth) {
        offsetRef.current = offsetRef.current - totalWidth;
      }

      track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered]);

  // ✅ Disable scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
      {/* ===== SECTION ===== */}
      <section className="w-full bg-white pt-6 lg:pt-24 lg:pb-16 px-6 md:px-10 lg:px-10">

        <div className="flex flex-col gap-6 lg:gap-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat]">
                Collaborate
              </h2>
              {/* <ArrowUpRight className="w-5 h-5 mb-4 stroke-[1.5]" /> */}
            </div>

            {/* <CTABtn
              label="View Opportunities"
              btnBg="transparent"
              btnHoverBg="var(--primary-blue)"
              textColor="black"
              borderColor="black"
              borderHoverColor="transparent"
              lineColor="white"
              lineHoverColor="transparent"
              bottomKey1Width="40px"
              bottomKey2Width="12px"
              bottomKey1Right="50px"
              bottomKey2Right="15px"
              href="#tickets"
            /> */}
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 text-black text-base md:text-lg leading-relaxed font-[Montserrat]">
            <p>
              From immersive spaces to conversations, objects, and extensions beyond the show - Design POV is an ecosystem shaped by many voices.
              If you’d like to be part of it, we’d like to hear from you.
            </p>
            {/* <p>
             If you’d like to be part of it, we’d like to hear from you.
            </p> */}
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div
        className="relative mt-14 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-3 md:gap-2 will-change-transform"
        >
          {duplicatedImages.map((img, i) => (
            <div key={i} className="relative group flex-shrink-0">

              {/* ✅ NATURAL WIDTH */}
              <img
                src={img}
                alt=""
                className="h-32 md:h-40 w-auto object-cover flex-shrink-0 transition-transform duration-500 "
              />

              {/* Overlay */}
              {/* <div className="absolute inset-0 bg-black/50 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition flex items-center justify-center">
                <button
                  onClick={() => {
                    setActiveIndex(i % images.length);
                    setLightboxOpen(true);
                  }}
                  className="flex items-center justify-center py-1 px-2 transition-all duration-300 "
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </button>
              </div> */}

            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-neutral-200"></div>
      </div>

      {/* ===== LIGHTBOX ===== */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center">

          <div className="relative flex items-center justify-center">

            <img
              src={images[activeIndex]}
              className="max-h-[70vh] max-w-[70vw] object-contain shadow-xl"
              alt=""
            />
          </div>


          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-10 top-10 text-white"
          >
            <X size={26} />
          </button>

          {/* Arrows */}
          <button
            onClick={() =>
              setActiveIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
            className="absolute left-10 text-white"
          >
            <ArrowLeft size={30} />
          </button>

          <button
            onClick={() =>
              setActiveIndex((prev) =>
                (prev + 1) % images.length
              )
            }
            className="absolute right-10 text-white"
          >
            <ArrowRight size={30} />
          </button>
        </div>
      )}
    </>
  );
};

export default CollaborateSection;