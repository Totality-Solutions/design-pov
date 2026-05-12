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
    { name: "Brand Collaborators", src: "/temp/edition/brand-collaborate/5.jpeg" },
    { name: "Brand Collaborators", src: "/temp/edition/brand-collaborate/6.jpeg" },
    { name: "Brand Collaborators", src: "/temp/edition/brand-collaborate/7.png" },
    // Build Partners
    { name: "Build Partners", src: "/temp/edition/build-partners/1.png" },
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
    { name: "Gifting Partners", src: "/temp/edition/gifting-partners/5.png" },
    { name: "Gifting Partners", src: "/temp/edition/sensory/12.png" },
    // Media Partners
    { name: "Media Partners", src: "/temp/edition/media-partners/1.png" },
    { name: "Media Partners", src: "/temp/edition/media-partners/2.png" },
    { name: "Media Partners", src: "/temp/edition/media-partners/3.png" },
    { name: "Media Partners", src: "/temp/edition/media-partners/5.png" },

    { name: "Red Room Partner", src: "/temp/edition/red-room-partner/1.png" },
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

    //curatorial partner 
    { name: "Curatorial Partner", src: "/temp/edition/curatorial-partner/1.png" },
    { name: "Experience Partner", src: "/temp/edition/experience-partner/1.png" },
    { name: "Learning Partner", src: "/temp/edition/learning-partner/1.png" },
    { name: "Knowledge Partner", src: "/temp/edition/knowledge-partner/1.png" },
    { name: "Visual Experience Partner", src: "/temp/edition/visual-experience-partner/1.png" },
    { name: "Workshop Partner", src: "/temp/edition/workshop-partner/1.png" },
    { name: "Community Partner", src: "/temp/edition/community-partner/1.png" },
    { name: "Community Partner", src: "/temp/edition/community-partner/2.png" },
  ];
  
const BransCollaborators = partners.filter(p => p.name === "Brand Collaborators");
const BuildPartners = partners.filter(p => p.name === "Build Partners");
const GiftingPartners = partners.filter(p => p.name === "Gifting Partners");
const MediaPartners = partners.filter(p => p.name === "Media Partners");
const DigitalMediaPartners = partners.filter(p => p.name === "Digital Media Partners");
const TicketingPartners = partners.filter(p => p.name === "Ticketing Partners");
const SensoryCollaborator = partners.filter(p => p.name === "Sensory Collaborator");
const KeyExecutionPartner = partners.filter(p => p.name === "Key execution Partner");
const OperationPartner = partners.filter(p => p.name === "Operation Partner");
const CuratorialPartner = partners.filter(p => p.name === "Curatorial Partner");
const CommunityPartner = partners.filter(p => p.name === "Community Partner");
const ExperiencePartner = partners.filter(p => p.name === "Experience Partner");
const RedRoomPartner = partners.filter(p => p.name === "Red Room Partner");
const LearningPartner = partners.filter(p => p.name === "Learning Partner");
const KnowledgePartner = partners.filter(p => p.name === "Knowledge Partner");
const VisualExperiencePartner = partners.filter(p => p.name === "Visual Experience Partner");
const WorkshopPartner = partners.filter(p => p.name === "Workshop Partner");

  return (
    <div className="py-12 space-y-12">
      <BrandLogo title="BRAND COLLABORATORS" logos={BransCollaborators} />
      <BrandLogo title="BUILD PARTNERS" logos={BuildPartners} />
      <BrandLogo title="KEY EXECUTION PARTNER" logos={KeyExecutionPartner} />
      <BrandLogo title="MEDIA PARTNERS" logos={MediaPartners} />
      <BrandLogo title="DIGITAL MEDIA PARTNERS" logos={DigitalMediaPartners} />
      <BrandLogo title="GIFTING PARTNERS" logos={GiftingPartners} />
      <BrandLogo title="TICKETING PARTNERS" logos={TicketingPartners} />
      <BrandLogo title="SENSORY COLLABORATOR" logos={SensoryCollaborator} />
      <BrandLogo title="OPERATION PARTNER" logos={OperationPartner} />
      <BrandLogo title="CURATORIAL PARTNER" logos={CuratorialPartner} />
      <BrandLogo title="COMMUNITY PARTNER" logos={CommunityPartner} />
      <BrandLogo title="EXPERIENCE PARTNER" logos={ExperiencePartner} />
      <BrandLogo title="RED ROOM PARTNER" logos={RedRoomPartner} />
      <BrandLogo title="LEARNING PARTNER" logos={LearningPartner} />
      <BrandLogo title="KNOWLEDGE PARTNER" logos={KnowledgePartner} />
      <BrandLogo title="VISUAL EXPERIENCE PARTNER" logos={VisualExperiencePartner} />
      <BrandLogo title="WORKSHOP PARTNER" logos={WorkshopPartner} />
    </div>
  );
}