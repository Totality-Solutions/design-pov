import React from 'react';
import Image from "@/components/common/SmartImage";
import { UnderlineText } from '../../common/Underlinetext';
import type { BrandsPageContent } from '@/lib/brandsContent';

type BrandsHeroProps = Omit<BrandsPageContent["hero"], "enabled">;

const BrandsHero = ({ image, alt, headline }: BrandsHeroProps) => {
  return (
    <section className="w-full flex flex-col pb-12 bg-white">
      {/* 1. Visual Image Container */}
      {image && (
      <div className="w-full h-[408px] overflow-hidden flex items-center justify-center">
        <div className="w-full h-full bg-black relative flex items-center justify-center">
            <Image
              src={image}
              alt={alt || "Brand Hero"}
              fill
              className="object-cover"
            />
        </div>
      </div>
      )}

      {/* 2. Headline Sections */}
      <div className="w-full flex flex-col mt-6">
        {/* Top Headline Line */}
        <UnderlineText lineHeight={72} className="text-h2-mobile md:text-h2-tab lg:text-h2 tracking-tight font-semibold">
            {headline}
        </UnderlineText>
      </div>
    </section>
  );
};

export default BrandsHero;
