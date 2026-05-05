"use client";

import React from "react";
import { Container } from "../common/Container";
import CTABtn from "../common/CTABtn";

export default function ScrollMaskText() {
  return (
    <section className="w-full pt-5 lg:pt-20">
      <div className=" w-full  bg-black py-12 px-6 md:px-10">
        <Container className="flex flex-col lg:flex-row gap-8 items-center justify-between">
        {/* Left Text */}
        <div className="max-w-4xl">
          <h2 className="text-body-mobile md:text-2xl font-medium text-white duration-300"
            style={{ fontFamily: 'Montserrat' }}>
            A platform where architects, brands, artists, and thinkers come
            together to shape environments that go beyond the{" "}
            <span className="text-primary-red font-semibold">visual.</span>
          </h2>
        </div>

        {/* Right CTA */}
        <div className="flex-shrink-0">
          <CTABtn
            label="Explore the Show"
            iconType="arrow"
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
            href="/edition"
          />
        </div>
        </Container>
        
      </div>
    </section>
  );
}