import React from 'react';
import BrandLogo from './BrandLogo';

export default function BuildPartner() {
  const sponsorData = [
    { src: '/temp/edition/sponsors/2.png', name: 'Muse Create' },
    { src: '/temp/edition/sponsors/4.png', name: 'Adobe' },
    { src: '/temp/edition/sponsors/1.png', name: 'Chanel' },
    { src: '/temp/edition/sponsors/3.png', name: 'Amazon' },
  ];

  const partners = [
    // Partners
    { name: "Partners", src: "/temp/edition/sponsors/2.png" },
    { name: "Partners", src: "/temp/edition/sponsors/4.png" },
    { name: "Partners", src: "/temp/edition/sponsors/1.png" },
    { name: "Partners", src: "/temp/edition/sponsors/3.png" },
    // Brand Collaborators
    { name: "Brand Collaborators", src: "/temp/edition/brand-collaborate/1.png" },
    { name: "Brand Collaborators", src: "/temp/edition/brand-collaborate/2.png" },
    { name: "Brand Collaborators", src: "/temp/edition/brand-collaborate/3.png" },
    { name: "Brand Collaborators", src: "/temp/edition/brand-collaborate/4.png" },
    // Build Partners
    { name: "Build Partners", src: "/temp/edition/build-partners/1.png" },
    { name: "Build Partners", src: "/temp/edition/build-partners/2.png" },
    { name: "Build Partners", src: "/temp/edition/build-partners/3.png" },
    { name: "Build Partners", src: "/temp/edition/build-partners/4.png" },
    { name: "Build Partners", src: "/temp/edition/build-partners/5.png" },
    { name: "Build Partners", src: "/temp/edition/build-partners/6.png" },
    { name: "Build Partners", src: "/temp/edition/build-partners/7.png" },
    { name: "Build Partners", src: "/temp/edition/build-partners/8.png" },
    { name: "Build Partners", src: "/temp/edition/build-partners/9.png" },
    // Gifting Partners
    { name: "Gifting Partners", src: "/temp/edition/gifting-partners/1.png" },
    { name: "Gifting Partners", src: "/temp/edition/gifting-partners/2.png" },
    { name: "Gifting Partners", src: "/temp/edition/gifting-partners/3.png" },
    { name: "Gifting Partners", src: "/temp/edition/gifting-partners/4.png" },
    // Media Partners
    { name: "Media Partners", src: "/temp/edition/media-partners/1.png" },
    { name: "Media Partners", src: "/temp/edition/media-partners/2.png" },
    { name: "Media Partners", src: "/temp/edition/media-partners/3.png" },
    // Digital Media Partners
    { name: "Digital Media Partners", src: "/temp/edition/media-partners/4.png" },
    // Ticketing Partners
    { name: "Ticketing Partners", src: "/temp/edition/ticketing-partners/1.png" },
    { name: "Ticketing Partners", src: "/temp/edition/ticketing-partners/2.png" },
    // Sensory Collaborator
    { name: "Sensory Collaborator", src: "/temp/edition/sensory/12.png" },
    // Key execution Partner
    { name: "Key execution Partner", src: "/temp/edition/key-execution/1.jpg" },

    //operation partner
    { name: "Operation Partner", src: "/temp/edition/operation-partner/1.png" },
  ];
  
const BransCollaborators = partners.filter(p => p.name === "Brand Collaborators");
const BuildPartners = partners.filter(p => p.name === "Build Partners");
const GiftingPartners = partners.filter(p => p.name === "Gifting Partners");
const MediaPartners = partners.filter(p => p.name === "Media Partners");
const DigitalMediaPartners = partners.filter(p => p.name === "Degital Media Partners");
const TicketingPartners = partners.filter(p => p.name === "Ticketing Partners");
const SensoryCollaborator = partners.filter(p => p.name === "Sensory Collaborator");
const KeyExecutionPartner = partners.filter(p => p.name === "Key execution Partner");
const OperationPartner = partners.filter(p => p.name === "Operation Partner");

  return (
    <div className="py-12 space-y-12">
      <BrandLogo title="BRAND COLLABORATORS" logos={BransCollaborators} />
      <BrandLogo title="BUILD PARTNERS" logos={BuildPartners} />
      <BrandLogo title="MEDIA PARTNERS" logos={MediaPartners} />
      <BrandLogo title="DIGITAL MEDIA PARTNERS" logos={DigitalMediaPartners} />
      <BrandLogo title="GIFTING PARTNERS" logos={GiftingPartners} />
      <BrandLogo title="TICKETING PARTNERS" logos={TicketingPartners} />
      <BrandLogo title="SENSORY COLLABORATOR" logos={SensoryCollaborator} />
      <BrandLogo title="OPERATION PARTNER" logos={OperationPartner} />
    </div>
  );
}