import React from 'react';
import BrandLogo from './BrandLogo';

export default function Sponsors() {
  const sponsorData = [
    { src: '/temp/edition/sponsors/2.png', name: 'Muse Create' },
    { src: '/temp/edition/sponsors/4.png', name: 'Adobe' },
    { src: '/temp/edition/sponsors/1.png', name: 'Chanel' },
    { src: '/temp/edition/sponsors/3.png', name: 'Amazon' },
  ];

  return <BrandLogo title="PARTNERS" logos={sponsorData} />;
}