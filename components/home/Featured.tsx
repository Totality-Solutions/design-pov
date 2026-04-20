"use client";

import React, { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Assets
import img1 from "@/public/temp/featured/1.png";
import img2 from "@/public/temp/featured/2.png";
import img3 from "@/public/temp/featured/3.png";
import img4 from "@/public/temp/featured/1.png";
import img5 from "@/public/temp/featured/3.png";
const video1 = "/temp/featured/4.mp4";

// Components
import { Container } from "../common/Container";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";

type DesignerMedia = {
  src: StaticImageData | string;
  type?: "image" | "video";
  name: string;
  link: string;
};

type Designer = {
  id: number;
  media: DesignerMedia[];
};

const GRID_POSITIONS = [
  { col: "1 / 2", row: "1 / 2" },
  { col: "2 / 3", row: "1 / 2" },
  { col: "3 / 4", row: "1 / 3" }, // Center Feature
  { col: "4 / 5", row: "1 / 2" },
  { col: "5 / 6", row: "1 / 2" },
  { col: "1 / 2", row: "2 / 3" },
  { col: "2 / 3", row: "2 / 3" },
  { col: "4 / 5", row: "2 / 3" },
  { col: "5 / 6", row: "2 / 3" },
];

// ─── Media Cell ─────────────────────────
function MediaCell({ src, type }: any) {
  if (type === "video") {
    return (
      <video
        src={src}
        aria-label="video"
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }
  return (
    <Image src={src} alt="" fill style={{ objectFit: "cover" }} />
  );
}

// ─── Designer Tile ─────────────────────────
function DesignerTile({
  designer,
  gridPos,
  isFeatured,
  isMobile,
  isActiveSlide,
}: any) {
  const [isActive, setIsActive] = useState(true);
  const [mediaIndex, setMediaIndex] = useState(0);
  const intervalRef = useRef<any>(null);

  const startCycling = () => {
    setIsActive(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setMediaIndex((p: number) => (p + 1) % designer.media.length);
    }, 700);
  };

  const stopCycling = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isMobile) startCycling();
    return () => clearInterval(intervalRef.current);
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (isMobile) return;
    stopCycling();
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    startCycling();
  };

  useEffect(() => {
    if (!isMobile) return;
    if (isActiveSlide) {
      stopCycling();
    } else {
      startCycling();
    }
    return () => clearInterval(intervalRef.current);
  }, [isActiveSlide, isMobile, designer.media.length]);

  const currentMedia = designer.media[mediaIndex];

  return (
    <a
      href={currentMedia.link}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "block",
        textDecoration: "none",
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
      <AnimatePresence mode="popLayout">
        <motion.div
          key={mediaIndex}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.9 }}
          transition={{ duration: 0.1 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <MediaCell src={currentMedia.src} type={currentMedia.type} />
        </motion.div>
      </AnimatePresence>

      {/* Changed animate={{ opacity: 1 }} so title stays visible on hover */}
      <motion.div
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "16px",
          background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
          zIndex: 10,
          pointerEvents: "none" // Ensures overlay doesn't block the link click
        }}
      >
        <span style={{ color: "#fff", fontSize: "13px" }}>
          {currentMedia.name}
        </span>
        {!isMobile && isFeatured && (
          <span style={{ color: "#fff" }}>→</span>
        )}
      </motion.div>
    </a>
  );
}

// ─── Data ─────────────────────────
const designers: Designer[] = [
  { id: 1, media: [{ src: img1, name: "Rahul Mehta", link: "/rahul" }, { src: img2, name: "Concept Art", link: "/concept" }] },
  { id: 2, media: [{ src: img2, name: "Priya Nair", link: "/priya" }, { src: img4, name: "Loft Studio", link: "/loft" }] },
  { id: 3, media: [{ src: video1, type: "video", name: "Arjun Sharma", link: "/arjun-showreel" }] },
  { id: 4, media: [{ src: img4, name: "Meera Iyer", link: "/meera" }, { src: img5, name: "Textiles", link: "/textiles" }] },
  { id: 5, media: [{ src: img5, name: "Kabir Das", link: "/kabir" }, { src: img2, name: "Abstracts", link: "/abstracts" }] },
  { id: 6, media: [{ src: img1, name: "Ananya Roy", link: "/ananya" }, { src: img3, name: "Editorials", link: "/editorials" }] },
  { id: 7, media: [{ src: img2, name: "Dev Patel", link: "/dev" }, { src: img5, name: "Branding", link: "/branding" }] },
  { id: 8, media: [{ src: img1, name: "Sana Khan", link: "/sana" }, { src: img3, name: "Exhibition", link: "/exhibition" }] },
  { id: 9, media: [{ src: img2, name: "Vikram Seth", link: "/vikram" }, { src: img5, name: "Digital Art", link: "/digital" }] },
];

// ─── Main Component ─────────────────────────
export default function FeaturedDesigners() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const baseSlots = designers;
  const loopedSlots = [...baseSlots, ...baseSlots, ...baseSlots];
  const [activeIndex, setActiveIndex] = useState(baseSlots.length);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      setTimeout(() => setActiveIndex(baseSlots.length), 500);
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
      />

      <Section className="!py-0 !pb-8">
        <Container>
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