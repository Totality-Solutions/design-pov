"use client";

import React, { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "@/public/temp/featured/1.png";
import img2 from "@/public/temp/featured/2.png";
import img3 from "@/public/temp/featured/3.png";
import img4 from "@/public/temp/featured/1.png";
import img5 from "@/public/temp/featured/3.png";
const video1 = "/temp/featured/4.mp4";
import { Container } from "../common/Container";
import Section from "../common/Section";
import Title from "../common/Title";
import SectionHeading from "../common/SectionHeading";

type DesignerMedia = {
  src: StaticImageData | string;
  type?: "image" | "video";
};

type Designer = {
  id: number;
  name: string;
  role: string;
  media: DesignerMedia[];
};

const GRID_POSITIONS = [
  // TOP ROW
  { col: "1 / 2", row: "1 / 2" },
  { col: "2 / 3", row: "1 / 2" },
  { col: "3 / 4", row: "1 / 3" }, // center (unchanged)
  { col: "4 / 5", row: "1 / 2" },
  { col: "5 / 6", row: "1 / 2" },

  // BOTTOM ROW (FIXED → no spanning)
  { col: "1 / 2", row: "2 / 3" },
  { col: "2 / 3", row: "2 / 3" },
  { col: "4 / 5", row: "2 / 3" },
  { col: "5 / 6", row: "2 / 3" },
];

// ─── Media ─────────────────────────
function MediaCell({ src, type }: any) {
  if (type === "video") {
    return (
      <video
        src={src}
        aria-label="video"
        autoPlay
        muted
        loop
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }
  return (
    <Image src={src} alt="" fill style={{ objectFit: "cover" }} />
  );
}

// ─── Tile ─────────────────────────
function DesignerTile({
  designer,
  gridPos,
  isFeatured,
  isMobile,
  isActiveSlide,
}: any) {
  const [isActive, setIsActive] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const intervalRef = useRef<any>(null);

  // Desktop hover (unchanged)
  const startHover = () => {
    if (isMobile) return;
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setMediaIndex((p: number) => (p + 1) % designer.media.length);
    }, 700);
  };

  const stopHover = () => {
    if (isMobile) return;
    setIsActive(false);
    clearInterval(intervalRef.current);
    setMediaIndex(0);
  };

  // Mobile blinking logic
  useEffect(() => {
    if (!isMobile) return;

    clearInterval(intervalRef.current);

    if (isActiveSlide) {
      const timeout = setTimeout(() => {
        setIsActive(true);

        intervalRef.current = setInterval(() => {
          setMediaIndex((p: number) => (p + 1) % designer.media.length);
        }, 700);
      }, 3000);

      return () => {
        clearTimeout(timeout);
        clearInterval(intervalRef.current);
        setIsActive(false);
        setMediaIndex(0);
      };
    } else {
      setIsActive(false);
      setMediaIndex(0);
    }
  }, [isActiveSlide, isMobile, designer.media.length]);

  const currentMedia = designer.media[mediaIndex];

  return (
    <div
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      style={{
        ...(isMobile
          ? {
              width: "100%",
              height: "300px",
              flex: "0 0 100%",
              position: "relative",
            }
          : {
              gridColumn: gridPos?.col,
              gridRow: gridPos?.row,
              position: "relative",
            }),
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mediaIndex}
          initial={{ opacity: isActive ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <MediaCell src={currentMedia.src} type={currentMedia.type} />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "16px",
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
        }}
      >
        <span style={{ color: "#fff", fontSize: "13px" }}>
          {designer.name}
        </span>

        {!isMobile && isFeatured && (
          <span style={{ color: "#fff" }}>→</span>
        )}
      </motion.div>

      {/* Mobile preview icon */}
      {/* {isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          👁
        </div>
      )} */}
    </div>
  );
}

// ─── Data ─────────────────────────
const designers: Designer[] = [
  { id: 1, name: "Rahul Mehta", role: "", media: [{ src: img1 }, { src: img2 }] },
  { id: 2, name: "Priya Nair", role: "", media: [{ src: img2 }, { src: img4 }] },
  { id: 3, name: "Arjun Sharma", role: "", media: [{ src: video1, type: "video" }] },
  { id: 4, name: "Meera Iyer", role: "", media: [{ src: img4 }, { src: img5 }] },
  { id: 5, name: "Kabir Das", role: "", media: [{ src: img5 }, { src: img2 }] },
  { id: 6, name: "Ananya Roy", role: "", media: [{ src: img1 }, { src: img3 }] },
  { id: 7, name: "Dev Patel", role: "", media: [{ src: img2 }, { src: img5 }] },
  { id: 8, name: "Ananya Roy", role: "", media: [{ src: img1 }, { src: img3 }] },
  { id: 9, name: "Dev Patel", role: "", media: [{ src: img2 }, { src: img5 }] },
];

// ─── Main ─────────────────────────
export default function FeaturedDesigners() {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false)

  const baseSlots = designers;
  const loopedSlots = [...baseSlots, ...baseSlots, ...baseSlots];

  const [activeIndex, setActiveIndex] = useState(baseSlots.length);

  // detect screen
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // auto scroll
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  // center active tile
useEffect(() => {
  if (!isMobile) return;

  const interval = setInterval(() => {
    setActiveIndex((prev) => prev + 1);
  }, 5000);

  return () => clearInterval(interval);
}, [isMobile]);

useEffect(() => {
  if (!isMobile) return;

  if (activeIndex >= baseSlots.length * 2) {
    setTimeout(() => {
      setActiveIndex(baseSlots.length);
    }, 500);
  }
}, [activeIndex, isMobile, baseSlots.length]);

  return (

    <div  
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="pt-4"
    >
      <SectionHeading
        titleMain="Featured_" 
        titleBold="Designers" 
        sticky={false}
        isSectionHovered={isHovered} 
        className=' !border-0'
      >
      </SectionHeading>

      <Section className="!py-0 !pb-8">
        <Container>
    
          {/* DESKTOP */}
          {!isMobile && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1.8fr 1fr 1fr",
                gridTemplateRows: "290px 290px",
                gap: "4px",
              }}
            >
              {baseSlots.map((d, i) => (
                <DesignerTile
                  key={i}
                  designer={d}
                  isFeatured={i === 2}
                  gridPos={GRID_POSITIONS[i]}
                  isMobile={false}
                />
              ))}
            </div>
          )}
  
          {/* MOBILE */}
          {isMobile && (
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  transform: `translateX(-${activeIndex * 100}%)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {loopedSlots.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      width: "100%",
                      flex: "0 0 100%",
                    }}
                  >
                    <DesignerTile
                      designer={d}
                      isMobile={true}
                      isActiveSlide={i === activeIndex}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
      </Container>
    </Section>
  </div>
  );
}