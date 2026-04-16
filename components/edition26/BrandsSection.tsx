"use client";

import React from 'react';
import type { NextPage } from 'next';
import { useState } from 'react';
import ClientLogo from "../home/ClientLogo"; // Tera component yahan se import ho raha hai
import SectionHeading from '../common/SectionHeading';

const BrandsSection: NextPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full bg-white flex flex-col font-display"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
    >

      {/* 2. CALLING YOUR COMPONENT DIRECTLY */}
      <ClientLogo />

    </section>
  );
};

export default BrandsSection;