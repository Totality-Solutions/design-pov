"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import CTABtn from "@/components/common/CTABtn"; // Adjust the import path based on your file structure

interface ScheduleParagraphProps {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  description1?: string;
  description2?: string;
}

const ScheduleParagraph: React.FC<ScheduleParagraphProps> = ({
  title = "Collaborate",
  ctaLabel = "View Opportunities",
  ctaHref = "#tickets",
  description1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  description2 = "It has survived not only five centuries, but also the leap into electronic typesetting. It has survived not only five centuries, but also the leap into electronic typesetting.",
}) => {
  return (
    <section className="w-full bg-white py-6 md:py-10 lg:pt-24 lg:pb-16 px-6 lg:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-5 lg:gap-10">
        
        {/* Header */}
          <div className="flex items-center ">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium font-[Montserrat] text-black">
              {title}
            </h2>
          </div>


        {/* Content */}
        <div className="grid lg:grid-cols-[1fr_0.6fr] gap-6 lg:gap-8 text-black text-base md:text-md lg:text-lg leading-relaxed font-[Montserrat]">
          <p>{description1}</p>
          <p>{description2}</p>
        </div>
      </div>
    </section>
  );
};

export default ScheduleParagraph;