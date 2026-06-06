"use client";
import { cdn } from "@/lib/cdn";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const video1 = cdn("/temp/home/core-collective/4.mp4");

// Components
import { Container } from "../common/Container";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";

type DesignerMedia = {
  src: StaticImageData | string;
  type?: "image" | "video";
  poster?: StaticImageData | string;
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
function LazyDesignerVideo({ src }: { src: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          requestAnimationFrame(() => video.play().catch(() => {}));
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      aria-label="video"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

function MediaCell({ src, type, poster, isMobile }: any) {
  if (type === "video") {
    if (isMobile && poster) {
      return (
        <Image src={poster} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
      );
    }

    return <LazyDesignerVideo src={src} />;
  }
  return (
    <Image src={src} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectFit: "cover" }} />
  );
}

// ─── Designer Tile ─────────────────────────
function DesignerTile({
  designer,
  gridPos,
  isFeatured,
  isMobile,
  isActiveSlide,
  shouldAnimate = true,
}: any) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const shouldCycle = shouldAnimate && (isMobile ? !isActiveSlide : !paused);

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
          <MediaCell
            src={currentMedia.src}
            type={currentMedia.type}
            poster={currentMedia.poster}
            isMobile={isMobile}
          />
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
  { id: 1, media: [{ src: cdn("/temp/home/core/ADND.jpg"), name: "ADND", link: "/edition/core?designer=01" }, { src: cdn("/temp/home/core/ALARA STUDIO.jpg"), name: "Alara Studio", link: "/edition/core?designer=02" }] },
  { id: 2, media: [{ src: cdn("/temp/home/core/Abin.jpg"), name: "Abin Design Studio", link: "/edition/core?designer=03" }, { src: cdn("/temp/home/core/BALDIWALA EDGE.jpg"), name: "Baldiwala Edge", link: "/edition/core?designer=04" }] },
  { id: 3, media: [{ src: video1, type: "video", poster: cdn("/temp/home/core/ADND.jpg"), name: "Arjun Sharma", link: "/edition/core" }] },
  { id: 4, media: [{ src: cdn("/temp/home/core/CITYSPACE.png"), name: "Cityspace’82 Architects", link: "/edition/core?designer=05" }, { src: cdn("/temp/home/core/DESIGN HEX.jpg"), name: "Design Hex", link: "/edition/core?designer=06" }] },
  { id: 5, media: [{ src: cdn("/temp/home/core/DSP DESIGN.jpg"), name: "DSP Design", link: "/edition/core?designer=07" }, { src: cdn("/temp/home/core/JANNAT VASI.jpg"), name: "Jannat Vasi Design", link: "/edition/core?designer=08" }] },
  { id: 6, media: [{ src: cdn("/temp/home/core/NA ARCHITECT.jpg"), name: "NA Architects", link: "/edition/core?designer=09" }, { src: cdn("/temp/home/core/POONAM AKASH.jpg"), name: "Poonam Akash", link: "/edition/core?designer=10" }] },
  { id: 7, media: [{ src: cdn("/temp/home/core/SANJAY PURI.jpg"), name: "Sanjay Puri Architects", link: "/edition/core?designer=11" }, { src: cdn("/temp/home/core/SAV.jpg"), name: "SAV", link: "/edition/core?designer=12" }] },
  { id: 8, media: [{ src: cdn("/temp/home/core/SHROFFLEON.jpg"), name: "Shroffleón", link: "/edition/core?designer=13" }, { src: cdn("/temp/home/core/SPARC DESIGN.jpg"), name: "Sparc Design", link: "/edition/core?designer=14" }] },
  { id: 9, media: [{ src: cdn("/temp/home/core/STUDIO ARCHOHM.jpg"), name: "Studio Archohm", link: "/edition/core?designer=15" }, { src: cdn("/temp/home/core/TALATI & PARTNER.jpg"), name: "Talati & Partners", link: "/edition/core?designer=16" }] },
];

// ─── Main Component ─────────────────────────
export default function FeaturedDesigners() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);

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
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && document.visibilityState === "visible"),
      { rootMargin: "160px 0px", threshold: 0.01 }
    );

    const handleVisibility = () => {
      setIsInView(document.visibilityState === "visible");
    };

    observer.observe(section);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, isInView]);

  useEffect(() => {
    if (!isMobile) return;
    if (activeIndex >= baseSlots.length * 2) {
      setTimeout(() => setActiveIndex(baseSlots.length), 500);
    }
  }, [activeIndex, isMobile, baseSlots.length]);

  return (
    <div  
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="pt-6 lg:pt-0"
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
                  shouldAnimate={isInView}
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
                      shouldAnimate={isInView}
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
