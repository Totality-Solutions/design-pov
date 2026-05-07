import React from 'react';
import BrandLogo from './BrandLogo';

export default function Brands() {
  const brandsData = Array.from({ length: 48 }, (_, i) => ({
    src: `/temp/edition/brands/${i + 1}.png`,
    name: `Brand ${i + 1}`
  }));

  return <BrandLogo title="Brands" logos={brandsData} />;
}