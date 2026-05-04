import React from 'react';
import BrandLogo from './BrandLogo';

export default function Brands() {
  // Example with 14 brands to trigger pagination
  const brandsData = Array.from({ length: 28 }, (_, i) => ({
    src: 'https://placehold.co/200x100',
    name: `Brand ${i + 1}`
  }));

  return <BrandLogo title="Brands" logos={brandsData} />;
}