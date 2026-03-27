"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "@/public/temp/featured/1.png";
import img2 from "@/public/temp/featured/2.png";
import img3 from "@/public/temp/featured/3.png";
import img4 from "@/public/temp/featured/1.png";
import img5 from "@/public/temp/featured/3.png";
import Section from "../common/Section";
import { Container } from "../common/Container";
import Title from "../common/Title";

export type DesignerMedia = {
  src: StaticImageData | string;
  type?: "image" | "video";
};

export type Designer = {
  id: number;
  name: string;
  role: string;
  href?: string;
  media: DesignerMedia[]; // multiple images/videos — cycles on hover
};

interface FeaturedDesignersProps {
  designers: Designer[];
  title?: string;
}

// ─── Grid layout: 5 cells, center one is featured (large) ────────────────────
// Layout:  [0][1] [FEATURED] [2][3]
//          [  4 ]            [  5 ]
const GRID_POSITIONS = [
  { col: "1 / 2", row: "1 / 2" },   // top-left small
  { col: "2 / 3", row: "1 / 2" },   // top-left small
  { col: "3 / 4", row: "1 / 3" },   // CENTER — large (spans 2 rows)
  { col: "4 / 5", row: "1 / 2" },   // top-right small
  { col: "5 / 6", row: "1 / 2" },   // top-right small
  { col: "1 / 3", row: "2 / 3" },   // bottom-left wide
  { col: "4 / 6", row: "2 / 3" },   // bottom-right wide
];

// ─── Single media cell ────────────────────────────────────────────────────────
function MediaCell({
  src,
  type = "image",
  alt = "",
}: {
  src: StaticImageData | string;
  type?: "image" | "video";
  alt?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [src]);

  if (type === "video") {
    return (
      <video
        ref={videoRef}
        src={typeof src === "string" ? src : ""}
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "cover" }}
      sizes="(max-width: 768px) 50vw, 25vw"
    />
  );
}

// ─── Single designer tile ─────────────────────────────────────────────────────
function DesignerTile({
  designer,
  isFeatured,
  gridPos,
}: {
  designer: Designer;
  isFeatured: boolean;
  gridPos: { col: string; row: string };
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = useCallback(() => {
    setIsHovered(true);
    if (designer.media.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setMediaIndex((prev) => (prev + 1) % designer.media.length);
    }, 400); // blink interval — fast for strobe effect
  }, [designer.media.length]);

  const stopCycling = useCallback(() => {
    setIsHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMediaIndex(0);
  }, []);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const currentMedia = designer.media[mediaIndex];

  return (
    <div
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
      style={{
        gridColumn: gridPos.col,
        gridRow: gridPos.row,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: "#0a0a0a",
      }}
    >
      {/* Media with blink transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${designer.id}-${mediaIndex}`}
          initial={{ opacity: isHovered ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }} // very fast = blink/strobe feel
          style={{ position: "absolute", inset: 0 }}
        >
          <MediaCell
            src={currentMedia.src}
            type={currentMedia.type}
            alt={designer.name}
          />
        </motion.div>
      </AnimatePresence>

      {/* Hover overlay — name + arrow (only on featured center) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "16px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#fff", fontSize: isFeatured ? "15px" : "12px", fontWeight: 400, letterSpacing: "0.01em" }}>
          {designer.name}
        </span>
        {isFeatured && (
          <span style={{ color: "#fff", fontSize: "14px" }}>→</span>
        )}
      </motion.div>
    </div>
  );
}


const designers: Designer[] = [
  {
    id: 1,
    name: "Rahul Mehta",
    role: "Product Designer",
    media: [
      { src: img1, type: "image" },
      { src: img2, type: "image" },
      { src: img3, type: "image" },
    ],
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Visual Designer",
    media: [
      { src: img2, type: "image" },
      { src: img4, type: "image" },
    ],
  },
  {
    id: 3,
    name: "Arjun Sharma",       // ← slot 2 = center featured tile
    role: "Creative Director",
    media: [
      { src: img3, type: "image" },
      { src: img5, type: "image" },
      { src: img1, type: "image" },
      { src: img4, type: "image" },
    ],
  },
  {
    id: 4,
    name: "Meera Iyer",
    role: "Brand Designer",
    media: [{ src: img4, type: "image" },{ src: img5, type: "image" },],
  },
  {
    id: 5,
    name: "Kabir Das",
    role: "Motion Designer",
    media: [
      { src: img5, type: "image" },
      { src: img2, type: "image" },
    ],
  },
  {
    id: 6,
    name: "Ananya Roy",
    role: "UX Designer",
    media: [
      { src: img1, type: "image" },
      { src: img3, type: "image" },
    ],
  },
  {
    id: 7,
    name: "Dev Patel",
    role: "Industrial Designer",
    media: [
      { src: img2, type: "image" },
      { src: img5, type: "image" },
    ],
  },
];
// ─── Main component ───────────────────────────────────────────────────────────
export default function FeaturedDesigners() {
  // Pad/trim to exactly 7 slots
  const slots = Array.from({ length: 7 }, (_, i) => designers[i] ?? designers[i % designers.length]);

  return (
    <Section >
        <Container>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", padding: "0 4px" }}>
        <Title normalText="Featured" boldText="Designers" />
        <div style={{ display: "flex", gap: "80px" }}>
          <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Lorem Ipsum</span>
          <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Lorem Ipsum</span>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.8fr 1fr 1fr", // center col wider
          gridTemplateRows: "250px 320px",
          gap: "4px",
          width: "100%",
        }}
      >
        {slots.map((designer, i) => (
          <DesignerTile
            key={i}
            designer={designer}
            isFeatured={i === 2}
            gridPos={GRID_POSITIONS[i]}
          />
        ))}
      </div>
        </Container>
    </Section>
  );
}