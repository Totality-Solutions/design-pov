"use client";

import React from "react";
import PressGrid  from "@/components/common/PressGrid";
import { DEFAULT_MAGAZINE, youTubeThumbnail, type MagazinePageContent } from "@/lib/magazineContent";

const DEFAULTS = DEFAULT_MAGAZINE.interviews;

export default function InterviewSection({
  heading = DEFAULTS.heading,
  rightLabel = DEFAULTS.rightLabel,
  items = DEFAULTS.items,
}: Partial<Omit<MagazinePageContent["interviews"], "enabled">>) {
  const data = items.map(({ videoUrl, ...item }) => ({ ...item, slug: videoUrl, image: youTubeThumbnail(videoUrl) }));

  return (
    <PressGrid
      data={data}
      titleMain={heading}
      rightLabel={rightLabel}
    />
  );
}