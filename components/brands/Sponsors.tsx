import React from 'react';
import BrandLogo from './BrandLogo';

export default function Sponsors() {
  const sponsorData = [
    { src: 'https://placehold.co/200x100', name: 'Muse Create' },
    { src: 'https://placehold.co/200x100', name: 'Adobe' },
    { src: 'https://placehold.co/200x100', name: 'Chanel' },
    { src: 'https://placehold.co/200x100', name: 'Amazon' },
  ];

  return <BrandLogo title="Sponsors" logos={sponsorData} />;
}