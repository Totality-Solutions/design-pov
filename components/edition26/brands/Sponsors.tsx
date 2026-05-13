import React from 'react';
import { cdn } from '@/lib/cdn';
import BrandLogo from './BrandLogo';

export default function Sponsors() {
  const sponsorData = [
    { src: cdn('/temp/edition/sponsors/1.png'), name: 'PRESENTING PARTNER' },
    { src: cdn('/temp/edition/sponsors/2.png'), name: 'POWERED BY' },
    { src: cdn('/temp/edition/sponsors/3.png'), name: 'NETWORK PARTNER' },
    { src: cdn('/temp/edition/sponsors/4.png'), name: 'LOUNGE PARTNER' },
    { src: cdn('/temp/edition/sponsors/5.png'), name: 'COLOUR PARTNER' },
  ];

  return <BrandLogo title="PARTNERS" logos={sponsorData} />;
}