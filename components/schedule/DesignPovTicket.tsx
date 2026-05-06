import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const DesignPovTicket = () => {
  // Common data - make these props for a reusable component
  const eventData = {
    title: 'DESIGN POV LIVE',
    tagline: 'Sense & Sensibility',
    date: '15 - 17 May, 2026',
    location: 'Mumbai',
    qrCodeImage: '/qr/ticket-qr.svg', 
  };

  const navLinks = [
    { label: 'My Schedule', href: '/edition/schedule' },
    { label: 'Venue Map', href: 'https://povindex.designpovindia.com/map' },
  ];

  return (
    <section className="bg-white py-12 px-4 font-montserrat">
      <div >
        
        {/* ========================================= */}
        {/* MOBILE & TABLET VIEW (Up to 1023px)       */}
        {/* Replicates image_1.png                    */}
        {/* ========================================= */}
        <div className="block lg:hidden">
          <div className="bg-black text-white py-16 relative flex flex-col items-center">
            
            {/* Header: Title and Date/Location */}
            <div className="w-full text-center mb-10">
              <h2 className="text-h2-mobile md:text-h2-tab font-semibold  mb-2">
                {eventData.title}
              </h2>
              <div className="text-sm md:text-base opacity-90 font-medium space-y-1">
                <p>{eventData.tagline}</p>
                <p>{eventData.date}</p>
                <p>{eventData.location}</p>
              </div>
            </div>

            {/* QR Code Section */}
            <div 
              className="relative p-6 md:p-8 mb-12 border-y border-white"
              style={{
                // Creates the side bracket corners [ ]
                // Each gradient draws a 1px wide line for 20px from the corner
                backgroundImage: `
                  linear-gradient(to bottom, rgba(255,255,255,1) 20px, transparent 20px),
                  linear-gradient(to top, rgba(255,255,255,1) 20px, transparent 20px),
                  linear-gradient(to bottom, rgba(255,255,255,1) 20px, transparent 20px),
                  linear-gradient(to top, rgba(255,255,255,1) 20px, transparent 20px)
                `,
                backgroundPosition: '0 0, 0 100%, 100% 0, 100% 100%',
                backgroundSize: '1px 100%', 
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Image
                src={eventData.qrCodeImage}
                alt="Event QR Code"
                width={200}
                height={200}
                className="block md:w-[250px] md:h-[250px]"
              />
            </div>

            {/* Bottom Navigation Links */}
            <div className="w-full flex justify-center items-center gap-6 border-t border-white/20 pt-8 mt-auto">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-base md:text-lg font-semibold tracking-tight hover:text-primary-blue transition-colors"
                  >
                    {link.label}
                  </a>
                  {index < navLinks.length - 1 && (
                    <div className="h-6 w-px bg-white/40" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Ticket Notches (Left & Right) */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full z-10" />
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full z-10" />
          </div>
        </div>

        {/* ========================================= */}
        {/* DESKTOP VIEW (1024px and up)              */}
        {/* ========================================= */}
        <div className="hidden lg:block">
          <div className="bg-black text-white p-12 relative flex items-center gap-12 h-[300px]">
                
            {/* Left Section: QR Code (Fixed Shrink) */}
            <div 
              className="shrink-0 p-5 border-y border-white"
              style={{
                // We create the side "brackets" using a gradient that 
                // only shows color at the top-left, top-right, bottom-left, and bottom-right.
                backgroundImage: `
                  linear-gradient(to bottom, white 20px, transparent 20px),
                  linear-gradient(to top, white 20px, transparent 20px),
                  linear-gradient(to bottom, white 20px, transparent 20px),
                  linear-gradient(to top, white 20px, transparent 20px)
                `,
                backgroundPosition: '0 0, 0 100%, 100% 0, 100% 100%',
                backgroundSize: '1px 100%', // 1px wide lines on the sides
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Image
                src={eventData.qrCodeImage}
                alt="Event QR Code"
                width={180}
                height={180}
                className="block"
              />
            </div>
                
            {/* Main Content Grid: 2 Columns */}
            <div className="flex-grow grid grid-cols-[1fr_auto] items-center gap-12">
                
              {/* LEFT COLUMN: 2 Rows (Title and Info) */}
              <div className="flex flex-col justify-center">
                {/* Row 1: Title */}
                <h2 className="text-h2 font-bold tracking-tight mb-4">
                  {eventData.title}
                </h2>
                
                {/* Row 2: Tagline | Date | Location */}
                <div className="text-body opacity-90 font-medium tracking-tight">
                  <p>
                    {eventData.tagline} 
                    <span className="mx-3 opacity-40">|</span> 
                    {eventData.date} 
                    <span className="mx-3 opacity-40">|</span> 
                    {eventData.location}
                  </p>
                </div>
              </div>
                
              {/* RIGHT COLUMN: Vertically Centered Links */}
              <div className="flex items-center gap-8 pl-12 h-fit">
                {navLinks.map((link, index) => (
                  <React.Fragment key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-lg font-semibold tracking-tight flex items-center gap-2 group hover:text-primary-blue transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    
                    </a>
                    {index < navLinks.length - 1 && (
                      <div className="h-10 w-[1px] bg-white" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            {/* Ticket Notches */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-white rounded-full z-10" />
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-white rounded-full z-10" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesignPovTicket;