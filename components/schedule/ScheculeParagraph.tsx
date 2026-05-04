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
    <section className="w-full bg-white pt-24 pb-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat] text-black">
              {title}
            </h2>
            {/* <ArrowUpRight className="w-5 h-5 mb-4 stroke-[1.5] text-black" /> */}
          </div>

          {/* <CTABtn
            label={ctaLabel}
            btnBg="transparent"
            btnHoverBg="var(--primary-blue)"
            textColor="black"
            borderColor="black"
            borderHoverColor="transparent"
            lineColor="white"
            lineHoverColor="transparent"
            bottomKey1Width="40px"
            bottomKey2Width="12px"
            bottomKey1Right="50px"
            bottomKey2Right="15px"
            href={ctaHref}
          /> */}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-[1fr_0.6fr] gap-8 text-black text-base md:text-lg leading-relaxed font-[Montserrat]">
          <p>{description1}</p>
          <p>{description2}</p>
        </div>
      </div>
    </section>
  );
};

export default ScheduleParagraph;