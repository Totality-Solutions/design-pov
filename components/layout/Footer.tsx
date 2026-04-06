// import Link from "next/link";
// import Container from "@/components/ui/Container";
// import Divider from "@/components/ui/Divider";

// const FOOTER_LINKS = {
//   "2026 Edition": [
//     { label: "Theme: Sense & Sensibility", href: "/2026/theme" },
//     { label: "Core Collective",            href: "/2026/core" },
//     { label: "Design Partners",            href: "/2026/design-partners" },
//     { label: "The Circle",                 href: "/2026/circle" },
//     { label: "Art & Installations",        href: "/2026/art-installations" },
//     { label: "Visit / Waitlist",           href: "/2026/visit" },
//   ],
//   Ecosystem: [
//     { label: "POV Originals",  href: "/ecosystem/originals" },
//     { label: "POV Elevate",    href: "/ecosystem/elevate" },
//     { label: "POV Edits",      href: "/ecosystem/edits" },
//     { label: "POV Objects",    href: "/ecosystem/objects" },
//   ],
//   Publication: [
//     { label: "Journal",        href: "/journal" },
//     { label: "Installations",  href: "/journal?cat=installations" },
//     { label: "Conversations",  href: "/journal?cat=conversations" },
//     { label: "Materials",      href: "/journal?cat=materials" },
//   ],
//   "Get Involved": [
//     { label: "Apply to Exhibit",  href: "/apply?type=exhibit" },
//     { label: "Sponsor",           href: "/apply?type=sponsor" },
//     { label: "Speak",             href: "/apply?type=speak" },
//     { label: "Media Partnership", href: "/apply?type=media" },
//     { label: "Contact",           href: "/contact" },
//   ],
// };

// export default function Footer() {
//   return (
//     <footer className="bg-pov-black border-t border-white/5">
//       {/* Marquee ticker */}
//       <div className="overflow-hidden border-b border-white/5 py-3.5">
//         <div className="flex animate-marquee whitespace-nowrap select-none" aria-hidden>
//           {Array(10).fill("DESIGN POV · SENSE & SENSIBILITY · MUMBAI 2026 · ").map((t, i) => (
//             <span key={i} className="text-label text-white/20 px-6">{t}</span>
//           ))}
//         </div>
//       </div>

//       <Container className="py-16 md:py-20">
//         <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-8">
//           {/* Brand column */}
//           <div className="md:col-span-2 flex flex-col gap-6">
//             <Link href="/" className="text-label text-pov-white tracking-[0.3em] hover:text-pov-clay transition-colors duration-300 block">
//               DESIGN POV
//             </Link>
//             <p className="text-sm text-pov-mist font-light leading-relaxed max-w-xs">
//               A platform for design beyond sight. Where architects, brands, and builders co-create culture.
//             </p>
//             <p className="text-label text-pov-mist/50">Mumbai, India</p>
//             <div className="flex gap-5 mt-2">
//               {[{ label: "Instagram", href: "https://instagram.com" }, { label: "LinkedIn", href: "https://linkedin.com" }].map((s) => (
//                 <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
//                   className="text-label text-pov-mist hover:text-pov-clay transition-colors duration-300 link-pov">
//                   {s.label}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {Object.entries(FOOTER_LINKS).map(([group, links]) => (
//             <div key={group}>
//               <p className="text-label text-pov-clay mb-5">{group}</p>
//               <ul className="flex flex-col gap-3.5">
//                 {links.map((link) => (
//                   <li key={link.href}>
//                     <Link href={link.href} className="text-label text-pov-mist hover:text-pov-white transition-colors duration-300 link-pov">
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <Divider variant="subtle" spacing="lg" />

//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <p className="text-label text-pov-mist/40">© {new Date().getFullYear()} Design POV. All rights reserved.</p>
//           <div className="flex gap-6">
//             {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Use", href: "/terms" }, { label: "Media Kit", href: "/media-kit" }].map((l) => (
//               <Link key={l.href} href={l.href} className="text-label text-pov-mist/40 hover:text-pov-white transition-colors duration-300">{l.label}</Link>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </footer>
//   );
// }





"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(820);
  const [isPastHalfway, setIsPastHalfway] = useState(false);

  const COL_WIDTH = 260;
  const CONTAINER_WIDTH = 1640;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    mouseX.set(currentX);
    setIsPastHalfway(currentX > CONTAINER_WIDTH / 2);
  };

  const navLinks = {
    Partners: { items: ["Tickets", "Ecosystem"], img: "/image1.svg" },
    AboutUs: { items: ["Program", "Designers"], img: "/image2.svg" },
    Originals: { items: ["Objects", "Elevate", "Edits"], img: "/image3.svg" },
  };

  return (
    <motion.footer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      animate={{ backgroundColor: isPastHalfway ? "#000000" : "#ffffff" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto overflow-hidden flex items-center justify-between"
      style={{ width: `${CONTAINER_WIDTH}px`, height: "654px", isolation: "isolate" }}
    >
      {/* LAYER 1: FLARES */}
      <div className="absolute inset-0 z-10 flex flex-row justify-end px-[64px] items-center pointer-events-none">
        <div className="flex gap-0 h-full pr-20">
          {[0, 1, 2, 3].map((i) => {
            const img = i < 2 ? navLinks.Partners.img : i === 2 ? navLinks.AboutUs.img : navLinks.Originals.img;
            return (
              <div key={i} className="relative h-full overflow-hidden" style={{ width: COL_WIDTH }}>
                <MagneticFollowFlare
                  mouseX={mouseX}
                  imageSrc={img}
                  colWidth={COL_WIDTH}
                  isPastHalfway={isPastHalfway}
                  containerWidth={CONTAINER_WIDTH}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* LAYER 2: CONTENT */}
      <div className="relative z-20 w-full h-full flex flex-row justify-between px-[64px] items-center mix-blend-difference pointer-events-none">
        <div className="flex flex-col justify-between h-full py-[70px] w-[302px]">
          <div className="flex flex-col gap-[47px]">
            <h1 className="text-[44px] font-black tracking-tighter text-white leading-none font-['Montserrat']">
              DESIGN <span className="font-light">POV</span>
            </h1>
            <div className="text-white font-['Montserrat'] text-[12px] opacity-80 space-y-6">
              <p>designpovindia.com / hello@designpovindia.com</p>
              <div className="flex gap-4 pointer-events-auto">
                {["IG", "BI", "IN"].map((id) => (
                  <span key={id} className="border border-white/20 w-[28px] h-[28px] flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-white hover:text-black transition-colors">{id}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-white text-[12px] font-['Montserrat'] uppercase tracking-[0.1em]">© 2026 Design POV India.</p>
        </div>

        <div className="flex gap-0 h-full py-[84px] pr-20 pointer-events-auto">
          <FooterTextColumn title="Partners" items={navLinks.Partners.items} subText="Privacy policy" width={COL_WIDTH} />
          <FooterTextColumn title="About us" items={navLinks.AboutUs.items} subText="Terms of User" width={COL_WIDTH} />
          <FooterTextColumn title="Originals" items={navLinks.Originals.items} subText="Made by Design POV" width={COL_WIDTH} />
        </div>
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://res.cloudinary.com/dn7noog99/image/upload/v1711281898/noise_vms8cy.png')]" />
    </motion.footer>
  );
};

const MagneticFollowFlare = ({ mouseX, imageSrc, colWidth, containerWidth, isPastHalfway }: any) => {
  const FLARE_WIDTH = 717;
  const baseCenter = (colWidth / 2) - (FLARE_WIDTH / 2);

  // SAME-DIRECTION REPULSION LOGIC:
  // Instead of a smooth line, we create a "Dead Zone" in the middle.
  // 0 -> 700: Image stays on the left (baseCenter - 150)
  // 700 -> 940: Image RAPIDLY jumps from left to right (Refusing to stay in center)
  // 940 -> 1640: Image stays on the right (baseCenter + 150)
  const rawX = useTransform(
    mouseX,
    [0, 700, 820, 940, 1640],
    [baseCenter - 110, baseCenter - 110, baseCenter, baseCenter + 111, baseCenter + 110]
  );

  // We use a "bouncy" spring to make the jump feel physical
  const smoothFlareX = useSpring(rawX, { stiffness: 80, damping: 15 });

  return (
    <motion.div
      className="absolute"
      style={{
        width: `${FLARE_WIDTH}px`,
        height: "678px",
        left: smoothFlareX,
        top: "26px",
      }}
    >
      <motion.img
        src={imageSrc}
        alt="flare"
        animate={{
          mixBlendMode: isPastHalfway ? "screen" : "darken",
          opacity: isPastHalfway ? 0.7 : 0.4,
          filter: isPastHalfway ? "blur(0px)" : "blur(2px)",
        }}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

const FooterTextColumn = ({ title, items, subText, width }: any) => (
  <div className="flex flex-col justify-between h-full px-4" style={{ width: `${width}px` }}>
    <div className="flex flex-col gap-[24px]">
      <h3 className="text-white text-[14px] font-['Montserrat'] uppercase tracking-[0.15em] font-medium">{title}</h3>
      <ul className="flex flex-col gap-5">
        {items.map((item: string) => (
          <li key={item} className="text-white/60 text-[14px] font-['Montserrat'] hover:text-white cursor-pointer transition-colors font-light">{item}</li>
        ))}
      </ul>
    </div>
    <p className="text-white/40 text-[14px] font-['Montserrat'] uppercase cursor-pointer hover:text-white transition-colors tracking-wide">{subText}</p>
  </div>
);

export default Footer;