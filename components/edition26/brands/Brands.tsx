import React from 'react';
import BrandLogo from './BrandLogo';
import { cdn } from '@/lib/cdn';

export default function Brands() {
  const brandsData = Array.from({ length: 64 }, (_, i) => ({
    src: cdn(`/temp/edition/brands/${i + 1}.png`),
    name: `Brand ${i + 1}`
  }));

  return <BrandLogo title="Brands" logos={brandsData} />;
}