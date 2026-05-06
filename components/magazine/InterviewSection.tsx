"use client";

import React from "react";
// Agar PressGrid named export hai toh braces {} lagana
import PressGrid  from "@/components/common/PressGrid";

const INTERVIEW_DATA = [
  {
    category: "Designers",
    title: "Episode 1 of #TheCore’25: Ameet Mirpuri’s Nostalgia",
    author: "Design POV",
    date: "12 Mar, 2026",
    image: "/temp/about/1.png", 
    slug: "https://youtu.be/g4k7-ZfcDlk?si=58JIvM0aUCQ9qmSs"
  },
  {
    category: "Architects",
    title: "How to balance aesthetics with structural integrity",
    author: "Design POV",
    date: "05 Mar, 2026",
    image: "/temp/about/2.png",
    slug: "https://www.youtube.com/"
  },
  {
    category: "Visionaries",
    title: "The role of AI in the modern design process",
    author: "Design POV",
    date: "28 Feb, 2026",
    image: "/temp/about/3.png",
    slug: "https://www.youtube.com/"
  },
  {
    category: "Builders",
    title: "Scaling craft: A deep dive into bespoke construction",
    author: "Design POV",
    date: "20 Feb, 2026",
    image: "/temp/about/1.png",
    slug: "https://www.youtube.com/"
  },
];

export default function InterviewSection() {
  return (
    <PressGrid
      data={INTERVIEW_DATA}
      titleMain="Interviews"
      rightLabel="Dialogue Series"
    />
  );
}