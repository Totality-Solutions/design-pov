"use client";

import React from "react";
import PressGrid  from "@/components/common/PressGrid";

function getYouTubeThumbnail(url: string): string {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;
    if (parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v");
    }
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }
  } catch {
    // not a valid URL
  }
  return "/temp/about/1.png";
}

const RAW_INTERVIEW_DATA = [
  {
    category: "Designers",
    title: "Episode 1 of #TheCore’25: Ameet Mirpuri’s Nostalgia",
    author: "Design POV",
    date: "12 Mar, 2026",
    slug: "https://youtu.be/g4k7-ZfcDlk?si=58JIvM0aUCQ9qmSs"
  },
  {
    category: "Architects",
    title: "Episode 2 of #TheCore2025: Sanjyt Syngh’s Glamour of Yesterday",
    author: "Design POV",
    date: "05 Mar, 2026",
    slug: "https://youtu.be/zKLPY89y8DI?si=Zd1FqiWjIXceQiJ8"
  },
  {
    category: "Visionaries",
    title: "Episode 3 of #TheCore2025: reD Architect's Beyond Boundaries",
    author: "Design POV",
    date: "28 Feb, 2026",
    slug: "https://youtu.be/hiaSTtlBWlk?si=P-S6oo3jKn9A2d5U"
  },
  {
    category: "Builders",
    title: "Episode 4 of #TheCore2025: Studio Nishita Kamdar's A Walk in the Garden",
    author: "Design POV",
    date: "20 Feb, 2026",
    slug: "https://youtu.be/3MHS7if24FU?si=DTJm9EkqKSBf26W7"
  },
];

const INTERVIEW_DATA = RAW_INTERVIEW_DATA.map((item) => ({
  ...item,
  image: getYouTubeThumbnail(item.slug),
}));

export default function InterviewSection() {
  return (
    <PressGrid
      data={INTERVIEW_DATA}
      titleMain="Interviews"
      rightLabel="Dialogue Series"
    />
  );
}