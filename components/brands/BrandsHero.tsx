import React from 'react';
import Image from 'next/image';

const BrandsHero = () => {
  return (
    <section className="w-full flex flex-col pb-12 bg-white">
      {/* 1. Visual Image Container */}
      <div className="w-full h-[408px] overflow-hidden flex items-center justify-center">
        {/* Replace with your actual image path */}
        <div className="w-full h-full bg-black relative flex items-center justify-center">
            <Image 
              src="/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg"
              alt="Brand Hero" 
              fill
              className="object-cover"
            />
        </div>
      </div>

      {/* 2. Headline Sections */}
      <div className="w-full flex flex-col mt-6">
        {/* Top Headline Line */}
        <div className="w-full px-6 md:px-10 py-3 md:py-5 border-b border-black">
          <h1 className="text-h1-mobile md:text-[40px] leading-tight md:leading-[48px] font-semibold font-montserrat text-[#010101]">
            Where Culture Meets Crowds
          </h1>
        </div>

        {/* Bottom Headline Line */}
        <div className="w-full px-6 md:px-10 py-3 md:py-5 border-b border-black">
          <h1 className="text-h1-mobile md:text-[40px] leading-tight md:leading-[48px] font-semibold font-montserrat text-[#010101]">
            And Brands Come Alive.
          </h1>
        </div>

        {/* 3. Sub-text & Action Row */}
        <div className="w-full px-6 md:px-10 py-4 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-h3-mobile md:text-h3 font-medium font-montserrat text-black opacity-70">
            Trusted by the Brands That Shape Culture
          </p>
          
          <button className="group relative w-[173px] h-10 flex items-center justify-center border-2 border-black transition-all hover:bg-black">
            <span className="text-base font-medium font-montserrat text-black group-hover:text-white transition-colors">
              Apply
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandsHero;