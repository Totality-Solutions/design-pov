"use client";

import React from "react";
// Agar PressGrid named export hai toh braces {} lagana
import PressGrid  from "@/components/common/PressGrid";

const INTERVIEW_DATA = [
  {
    category: "Designers",
    title: "Conversations on the future of sustainable architecture",
    author: "Design POV",
    date: "12 Mar, 2026",
    image: "/temp/interview-1.jpg", 
  },
  {
    category: "Architects",
    title: "How to balance aesthetics with structural integrity",
    author: "Design POV",
    date: "05 Mar, 2026",
    image: "/temp/interview-2.jpg",
  },
  {
    category: "Visionaries",
    title: "The role of AI in the modern design process",
    author: "Design POV",
    date: "28 Feb, 2026",
    image: "/temp/interview-3.jpg",
  },
  {
    category: "Builders",
    title: "Scaling craft: A deep dive into bespoke construction",
    author: "Design POV",
    date: "20 Feb, 2026",
    image: "/temp/interview-4.jpg",
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