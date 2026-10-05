"use client";

import React from "react";
import CTABtn from "../common/CTABtn";
import type { HomeContent } from "@/lib/homeContent";

type IntroProps = Omit<HomeContent["intro"], "enabled">;

export default function ScrollMaskText({ text, highlight, ctaLabel, ctaHref }: IntroProps) {
  return (
    <section className="w-full lg:pt-20">
      <div className=" w-full bg-black py-6 md:py-12 px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
        {/* Left Text */}
        <div className="max-w-4xl">
          <h2 className="text-body-mobile md:text-2xl font-medium text-white duration-300"
            style={{ fontFamily: 'Montserrat' }}>
            {text}
            {highlight && (
              <>
                {" "}
                <span className="text-primary-red font-semibold">{highlight}</span>
              </>
            )}
          </h2>
        </div>

        {/* Right CTA */}
        {ctaLabel && ctaHref && (
        <div className="flex-shrink-0">
          <CTABtn
            label={ctaLabel}
            btnBg="var(--primary-blue)"
            btnHoverBg="var(--primary-blue)"
            textColor="var(--color-white)"
            borderColor="var(--primary-blue)"
            borderHoverColor="var(--primary-blue)"
            lineColor="transparent"
            lineHoverColor="transparent"
            bottomKey1Width="40px"
            bottomKey2Width="12px"
            bottomKey1Right="50px"
            bottomKey2Right="15px"
            href={ctaHref}
          />
        </div>
        )}
        </div>

      </div>
    </section>
  );
}
