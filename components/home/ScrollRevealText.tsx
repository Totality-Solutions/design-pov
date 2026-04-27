"use client";

import React from "react";
import Section from "../common/Section";
import { Container } from "../common/Container";

export default function ScrollMaskText() {


  return (
    <Container className="w-full flex items-center justify-center px-6 pt-10">
      <h1 className="text-3xl font-semibold leading-tight capitalize text-center max-w-6xl text-[#000]">
        A platform where architects, brands, artists, and thinkers come
        together to shape environments that go beyond the {" "}
        
        {/* Masked word */}
        <span
          className="bg-clip-text text-[3rem] text-transparent font-extrabold"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          visual
        </span>
        .
      </h1>
    </Container>
  );
}