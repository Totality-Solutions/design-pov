"use client";
import React from 'react';
import MarqueeFlow from '@/components/common/MarqueeFlow';

// Sample data structure
interface EcosystemItem {
  id: number;
  title: string;
  image: string;
}

const ECOSYSTEM_DATA: EcosystemItem[] = [
  { id: 1, title: "Architects", image: "https://placehold.co/400x600" },
  { id: 2, title: "Designers", image: "https://placehold.co/400x600" },
  { id: 3, title: "Builders", image: "https://placehold.co/400x600" },
  { id: 4, title: "Brands", image: "https://placehold.co/400x600" },
  { id: 5, title: "Creative", image: "https://placehold.co/400x600" },
];

const EcosystemSection: React.FC = () => {
  return (
    <section className="relative z-20 w-full bg-white flex flex-col font-['Montserrat',sans-serif]">
      
      {/* HEADER (NOT STICKY) */}
      <div className="w-full h-[60px] bg-white border-b border-[#DFDFDF] px-6 md:px-[70px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          
          {/* Red Glowing Dot Icon */}
          <div className="relative w-[33.33px] h-[33.33px] flex items-center justify-center">
            <div className="absolute w-[13.33px] h-[13.33px] bg-[#E02914] opacity-20 rounded-full blur-[6.67px]" />
            <div className="w-[6.67px] h-[6.67px] bg-[#E02914] rounded-full" />
          </div>

          <h2 className="text-[22px] leading-none text-black">
            <span className="font-medium">Press_</span>
            <span className="font-bold">Mentions</span>
          </h2>
        </div>
        
        <div className="hidden md:flex gap-[100px]">
          <span className="opacity-60 text-lg font-medium tracking-tight uppercase">
            LOREM IPSUM
          </span>
        </div>
      </div>

      {/* MARQUEE CONTAINER */}
      <div className="w-full py-20 border-b border-[#DFDFDF]">
        <MarqueeFlow
          items={ECOSYSTEM_DATA}
          gap={32}
          speed={40}
          desktopCount={4}
          tabletCount={2}
          mobileCount={1}
          defaultExpandedIndex={0}
          expandPauseDuration={3000}
          renderItem={(item, index, isExpanded) => (
            <div className="relative w-full transition-all duration-700 ease-in-out px-2">
              
              {/* IMAGE */}
              <div
                className={`relative overflow-hidden transition-all duration-700 ${
                  isExpanded
                    ? 'h-[500px] scale-100'
                    : 'h-[350px] scale-95 opacity-40 grayscale'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>

              {/* TEXT */}
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-xs font-bold opacity-30 tracking-widest uppercase">
                  0{index + 1}
                </span>
                <h3
                  className={`text-2xl font-bold uppercase transition-opacity duration-500 ${
                    isExpanded ? 'opacity-100' : 'opacity-10'
                  }`}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default EcosystemSection;