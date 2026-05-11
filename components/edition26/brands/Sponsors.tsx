import React from 'react';
import BrandLogo from './BrandLogo';

export default function Sponsors() {
  const sponsorData = [
    { src: '/temp/edition/sponsors/1.png', name: 'PRESENTING PARTNER' },
    { src: '/temp/edition/sponsors/2.png', name: 'POWERED BY' },
    { src: '/temp/edition/sponsors/3.png', name: 'NETWORK PARTNER' },
    { src: '/temp/edition/sponsors/4.png', name: 'LOUNGE PARTNER' },
    { src: '/temp/edition/sponsors/5.png', name: 'COLOUR PARTNER' },
  ];

  return <BrandLogo title="PARTNERS" logos={sponsorData} />;
}