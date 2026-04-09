"use client";

import React from "react";
import PressGrid from "@/components/common/PressGrid";

const PRESS_DATA = [
  {
    category: "Architecture",
    title: "Lorem Ipsum is simply dummy text of the printing",
    author: "Design POV",
    date: "26 feb, 2026",
    image: "/temp/press-1.jpg",
  },
  {
    category: "Interiors",
    title: "Lorem Ipsum is simply dummy text of the printing",
    author: "Design POV",
    date: "26 feb, 2026",
    image: "/temp/press-2.jpg",
  },
  {
    category: "Materials",
    title: "Lorem Ipsum is simply dummy text of the printing",
    author: "Design POV",
    date: "26 feb, 2026",
    image: "/temp/press-3.jpg",
  },
  {
    category: "Installations",
    title: "Lorem Ipsum is simply dummy text of the printing",
    author: "Design POV",
    date: "26 feb, 2026",
    image: "/temp/press-4.jpg",
  },
];

export default function PressSection() {
  return (
    <PressGrid
      data={PRESS_DATA}
      titleMain="Latest"
      rightLabel="Manisha AR"
    />
  );
}