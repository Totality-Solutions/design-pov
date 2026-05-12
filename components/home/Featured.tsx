"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Assets
import img1 from "@/public/temp/home/core/ADND.jpg";
import img2 from "@/public/temp/home/core/ALARA STUDIO.jpg";
import img3 from "@/public/temp/home/core/Abin.jpg";
import img4 from "@/public/temp/home/core/BALDIWALA EDGE.jpg";
import img5 from "@/public/temp/home/core/CITYSPACE.png";
import img6 from "@/public/temp/home/core/DESIGN HEX.jpg";
import img7 from "@/public/temp/home/core/DSP DESIGN.jpg";
import img8 from "@/public/temp/home/core/JANNAT VASI.jpg";
import img9 from "@/public/temp/home/core/NA ARCHITECT.jpg";
import img10 from "@/public/temp/home/core/POONAM AKASH.jpg";
import img11 from "@/public/temp/home/core/SANJAY PURI.jpg";
import img12  from "@/public/temp/home/core/SAV.jpg";
import img13  from "@/public/temp/home/core/SHROFFLEON.jpg";
import img14  from "@/public/temp/home/core/SPARC DESIGN.jpg";
import img15  from "@/public/temp/home/core/STUDIO ARCHOHM.jpg";
import img16  from "@/public/temp/home/core/TALATI & PARTNER.jpg";
const video1 = "/temp/home/core-collective/4.mp4";

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
  const [mediaIndex, setMediaIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const shouldCycle = isMobile ? !isActiveSlide : !paused;

  useEffect(() => {
    if (!shouldCycle) return;
    const id = setInterval(() => {
      setMediaIndex(p => (p + 1) % designer.media.length);
    }, 700);
    return () => clearInterval(id);
  }, [shouldCycle, designer.media.length]);

  const handleMouseEnter = () => { if (!isMobile) setPaused(true); };
  const handleMouseLeave = () => { if (!isMobile) setPaused(false); };

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
              height: "350px",
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
      {currentMedia.type !== "video" && (
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
      background:
        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
      zIndex: 10,
      pointerEvents: "none",
    }}
  >
    <span className="uppercase" style={{ color: "#fff", fontSize: "13px" }}>
      {currentMedia.name}
    </span>

    {!isMobile && isFeatured && (
      <span style={{ color: "#fff" }}>→</span>
    )}
  </motion.div>
)}
    </a>
  );
}

// ─── Data ─────────────────────────
const designers: Designer[] = [
  { id: 1, media: [{ src: img1, name: "ADND", link: "/edition/core?designer=01" }, { src: img2, name: "Alara Studio", link: "/edition/core?designer=02" }] },
  { id: 2, media: [{ src: img3, name: "Abin Design Studio", link: "/edition/core?designer=03" }, { src: img4, name: "Baldiwala Edge", link: "/edition/core?designer=04" }] },
  { id: 3, media: [{ src: video1, type: "video", name: "Arjun Sharma", link: "/edition/core" }] },
  { id: 4, media: [{ src: img5, name: "Cityspace’82 Architects", link: "/edition/core?designer=05" }, { src: img6, name: "Design Hex", link: "/edition/core?designer=06" }] },
  { id: 5, media: [{ src: img7, name: "DSP Design", link: "/edition/core?designer=07" }, { src: img8, name: "Jannat Vasi Design", link: "/edition/core?designer=08" }] },
  { id: 6, media: [{ src: img9, name: "NA Architects", link: "/edition/core?designer=09" }, { src: img10, name: "Poonam Akash", link: "/edition/core?designer=10" }] },
  { id: 7, media: [{ src: img11, name: "Sanjay Puri Architects", link: "/edition/core?designer=11" }, { src: img12, name: "SAV", link: "/edition/core?designer=12" }] },
  { id: 8, media: [{ src: img13, name: "Shroffleón", link: "/edition/core?designer=13" }, { src: img14, name: "Sparc Design", link: "/edition/core?designer=14" }] },
  { id: 9, media: [{ src: img15, name: "Studio Archohm", link: "/edition/core?designer=15" }, { src: img16, name: "Talati & Partners", link: "/edition/core?designer=16" }] },
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
    >
      <SectionHeading
        titleMain="Core Collective" 
        sticky={false}
        isSectionHovered={isHovered} 
        className=' !border-0'
      />

      <Section className="!py-0 !pb-0">
        <Container>
          {!isMobile && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1.8fr 1fr 1fr",
                gridTemplateRows: "290px 290px",
                gap: "1px",
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