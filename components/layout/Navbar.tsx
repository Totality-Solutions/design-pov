

// "use client";

// import { useEffect, useState } from "react";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// 
// import CTABtn from "../common/CTABtn";
// import { Container } from "../common/Container";
// import { NAV_DATA, NAV_LABELS } from "@/app/constants/navigation";

// export default function Navbar() {
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const isLg = window.innerWidth >= 1024;
//       setIsDesktop(isLg);
//       if (isLg) setMobileOpen(false);
//     };

//     const handleScroll = () => {
//       const adSection = document.getElementById("ad-section");
//       if (!adSection) {
//         setIsSticky(window.scrollY > 0);
//         return;
//       }
//       const adBottom = adSection.getBoundingClientRect().bottom;
//       // Fixed logic to prevent navbar shaking
//       setIsSticky(adBottom <= 0);
//     };

//     checkScreenSize();
//     handleScroll();
//     window.addEventListener("resize", checkScreenSize);
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("resize", checkScreenSize);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "";
//   }, [mobileOpen]);

//   return (
//     <nav onMouseLeave={() => setActiveMenu(null)} className="relative w-full z-[1000]">
//       {/* =========================
//           TOP ADVERTISEMENT SECTION
//       ========================== */}
//       <div id="ad-section" className="hidden lg:flex flex-col bg-white">
//         <div className="flex justify-center px-10 py-8">
//           <div className="w-full max-w-[1100px]">
//             <div className="text-[11px] text-gray-400 mb-2 uppercase tracking-wider">
//               Advertisement
//             </div>
//             <div className="w-full h-[280px] border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300">
//               Banner Space
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================
//           MAIN NAVBAR
//       ========================== */}
//       <header
//         id="main-navbar"
//         className={`w-full bg-white border-b border-gray-100 transition-all duration-300 ${
//           isSticky ? "fixed top-0 left-0  z-[2100]" : "relative z-[2100]"
//         }`}
//       >
//         <Container>
//           <div className="flex justify-between items-center px-6 lg:px-10 py-5">
            
//             {/* Logo: Z-index 2101 ensures it is above the menu overlay (2000) */}
//             <div className="flex-shrink-0 relative z-[2101]">
//               <Link href="/" onClick={() => setMobileOpen(false)}>
//                 <Image
//                   src={Logo}
//                   alt="Design POV"
//                   width={220}
//                   height={40}
//                   className="object-contain w-[180px] lg:w-[220px]"
//                 />
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-10">
//               <div className="flex items-center gap-10">
//                 {NAV_LABELS.map((label) => (
//                   <Link
//                     key={label}
//                     href={NAV_DATA[label].mainHref}
//                     onMouseEnter={() => setActiveMenu(label)}
//                     className="text-black text-[16px] font-medium whitespace-nowrap hover:text-primary-blue transition-colors"
//                   >
//                     {label}
//                   </Link>
//                 ))}
//               </div>
//               <CTABtn
//                 label="Buy Tickets"
//                 iconType="arrow"
//                 btnBg="black"
//                 btnHoverBg="var(--primary-blue)"
//                 textColor="white"
//                 href="#tickets"
//               />
//             </div>

//             {/* Hamburger / Cross Button: Z-index 2101 */}
//             <button
//               className="lg:hidden p-2 relative z-[2101] flex flex-col justify-center items-center w-8 h-8 group"
//               onClick={() => setMobileOpen(!mobileOpen)}
//             >
//               <span 
//                 className={`block w-6 h-[2px] bg-black transition-all duration-300 ease-in-out ${
//                   mobileOpen ? "rotate-45 translate-y-[2px]" : "-translate-y-1"
//                 }`} 
//               />
//               <span 
//                 className={`block w-6 h-[2px] bg-black transition-all duration-300 ease-in-out ${
//                   mobileOpen ? "opacity-0" : "opacity-100"
//                 }`} 
//               />
//               <span 
//                 className={`block w-6 h-[2px] bg-black transition-all duration-300 ease-in-out ${
//                   mobileOpen ? "-rotate-45 -translate-y-[2px]" : "translate-y-1"
//                 }`} 
//               />
//             </button>
//           </div>
//         </Container>
//       </header>

//       {/* Spacer to prevent shaking when header becomes fixed */}
//       {isSticky && <div className="h-[80px] lg:h-[88px] w-full" />}

//       {/* =========================
//           DESKTOP SUBMENU
//       ========================== */}
//       <div
//         className={`hidden lg:block bg-white transition-all duration-300 overflow-hidden z-[1100] ${
//           activeMenu ? "h-[450px]" : "h-0"
//         } ${isSticky ? "fixed left-0 right-0" : "absolute left-0 right-0"}`}
//         style={{ top: isSticky ? "80px" : "100%" }}
//       >
//         <Container className="h-full">
//           {activeMenu && (
//             <div className="flex h-full px-10 py-10 gap-16 text-black">
//               <div className="w-[60%] h-[320px] relative overflow-hidden bg-black">
//                 {isDesktop && (
//                   <video
//                     src={NAV_DATA[activeMenu].video}
//                     autoPlay muted loop playsInline
//                     className="w-full h-full object-cover opacity-80"
//                   />
//                 )}
//               </div>
//               <div className="w-[40%] flex flex-col justify-start">
//                 <h3 className="text-lg font-bold mb-6">{NAV_DATA[activeMenu].col1Title}</h3>
//                 <div className="flex flex-col gap-4">
//                   {NAV_DATA[activeMenu].col1Links?.map((link) => (
//                     <Link key={link.label} href={link.href} className="hover:text-blue-500 transition-colors">
//                       {link.label}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </Container>
//       </div>

//       {/* =========================
//           MOBILE MENU OVERLAY
//       ========================== */}
//       <div
//         className={`fixed inset-0 bg-white z-[2000] transition-transform duration-500 ease-in-out lg:hidden ${
//           mobileOpen ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         {/* Added padding top to ensure content doesn't sit under the header */}
//         <div className="pt-24 h-full flex flex-col">
//           <div className="flex-1 overflow-y-auto">
//             {NAV_LABELS.map((label) => (
//               <div key={label} className="border-b border-gray-100">
//                 <div className="flex items-center justify-between pr-4">
//                   <Link
//                     href={NAV_DATA[label].mainHref}
//                     className="flex-1 px-8 py-6 text-left text-lg font-medium text-black"
//                     onClick={() => setMobileOpen(false)}
//                   >
//                     {label}
//                   </Link>
//                   <button
//                     className="p-4"
//                     onClick={() => setActiveMenu(activeMenu === label ? null : label)}
//                   >
//                     <svg
//                       className={`w-6 h-6 transition-transform duration-300 ${activeMenu === label ? "rotate-180" : ""}`}
//                       fill="none" stroke="black" viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className={`bg-gray-50 overflow-hidden transition-all duration-300 ${activeMenu === label ? "max-h-screen" : "max-h-0"}`}>
//                   {NAV_DATA[label].col1Links?.map((link) => (
//                     <Link
//                       key={link.label}
//                       href={link.href}
//                       className="block px-12 py-4 text-sm text-gray-700 border-b border-gray-100"
//                       onClick={() => setMobileOpen(false)}
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="p-10 border-t bg-white">
//             <CTABtn
//               label="Buy Tickets"
//               iconType="arrow"
//               btnBg="black"
//               btnHoverBg="#0000B3"
//               textColor="white"
//               href="#tickets"
//             />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { cdn } from "@/lib/cdn";
import Image from "next/image";
import Link from "next/link";
import {motion, AnimatePresence} from "framer-motion";
// 1. Import usePathname to detect current route
import { usePathname } from "next/navigation"; 
import Menu from "@/components/icons/Menu.svg";
import Close from "@/components/icons/Menu-close.svg";

import CTABtn from "../common/CTABtn";
import { Container } from "../common/Container";
import { NAV_DATA, NAV_LABELS } from "@/app/constants/navigation";

export default function Navbar() {
  const pathname = usePathname(); // 2. Get current path
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsDesktop(isLg);
      if (isLg) setMobileOpen(false);
    };

    const handleScroll = () => {
      const adSection = document.getElementById("ad-section");
      if (!adSection) {
        setIsSticky(window.scrollY > 0);
        return;
      }
      const adBottom = adSection.getBoundingClientRect().bottom;
      setIsSticky(adBottom <= 0);
    };

    checkScreenSize();
    handleScroll();
    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <nav onMouseLeave={() => setActiveMenu(null)} className="relative w-full z-[1000]">
      {/* =========================
          TOP ADVERTISEMENT SECTION
      ========================== */}
      <div id="ad-section" className="hidden lg:flex flex-col bg-neutral-50">
        <div className="flex justify-center px-10 py-8">
          <Link href="https://www.kajariaceramics.com/" target="_blank">
          <div className="w-fit bg-white p-5">
            <div className="text-[10px] text-black/40 uppercase font-bold tracking-widest">
              Advertisement
            </div>
            <div className="w-full h-[280px] flex items-center justify-center text-gray-300">
              <Image src={cdn("/temp/ads/1.png")} alt="Ad" width={1900} height={100} className="w-full h-full object-contain" />
            </div>
          </div>
          </Link>
        </div>
      </div>
      {/* =========================
          MAIN NAVBAR
      ========================== */}
      <header
        id="main-navbar"
        className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 transition-all duration-300 z-[2100]"
      >
        
          <div className="flex justify-between items-center px-6 lg:px-10 py-5">
            
            {/* Logo */}
            <div className="flex-shrink-0 relative z-[2101]">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Image
                  src={cdn("/logo/Logo.svg")}
                  alt="Design POV"
                  width={220}
                  height={40}
                  className="object-contain w-[180px] lg:w-[220px]"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-10">
                {NAV_LABELS.map((label) => {
                  // 3. Check if current link is active
                  const isActive = pathname === NAV_DATA[label].mainHref;
                  
                  return (
                    <Link
                      key={label}
                      href={NAV_DATA[label].mainHref}
                      onMouseEnter={() => setActiveMenu(label === "2026 Edition" || label === "Ecosystem" ? label : null)}
                      className={`relative text-[16px] font-medium whitespace-nowrap transition-colors py-1 group ${
                        isActive ? "text-primary-blue" : "text-black hover:text-primary-blue"
                      }`}
                    >
                      {label}
                      {/* 4. Active Underline Span */}
                      <span className={`absolute bottom-0 left-0 h-[2px] bg-primary-blue transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`} />
                    </Link>
                  );
                })}
              </div>
              <CTABtn
                label="Buy Tickets"
                iconType="arrow"
                btnBg="transparent"
                btnHoverBg="var(--primary-blue)"
                textColor="black"
                href="https://tktplz.events/gjdlb5-design-pov"
              />
            </div>

            {/* Hamburger / Cross Button */}
            <button
              className="lg:hidden p-2 relative z-[2101] flex items-center justify-center w-10 h-10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="relative w-6 h-6">
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 1, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 1, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={cdn("/icons/Menu-close.svg")}
                        alt="close"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 1, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 1, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={cdn("/icons/Menu.svg")}
                        alt="menu"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
       
      </header>

      {/* Spacer — desktop only; mobile uses sticky which doesn't need one */}
      {isSticky && <div className="hidden lg:block h-[88px] w-full" />}

      {/* =========================
          DESKTOP SUBMENU
      ========================== */}
      <div
        className={`hidden lg:block bg-white transition-all duration-300 overflow-hidden z-1100 ${
          activeMenu ? "h-fit" : "h-0"
        } ${isSticky ? "fixed left-0 right-0" : "absolute left-0 right-0"}`}
        style={{ top: isSticky ? "80px" : "100%" }}
      >
        <Container className="h-full">
          {activeMenu && (
            <div className="flex h-fit px-10 py-10 gap-16 text-black">
              <div className="w-[60%] h-[320px] relative overflow-hidden bg-black">
                {isDesktop && NAV_DATA[activeMenu].filetype === "video" ? (
                  <video
                    src={NAV_DATA[activeMenu].video}
                    autoPlay muted loop playsInline
                    preload="none"
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : NAV_DATA[activeMenu].filetype === "image" ? (
                  <img
                    src={NAV_DATA[activeMenu].image}
                    alt={activeMenu}
                    className="w-full h-full object-contain opacity-100"
                  />
                ) : null}
              </div>

              {/* Two-column layout for 2026 Edition and Ecosystem */}
              {(activeMenu === "2026 Edition" || activeMenu === "Ecosystem") ? (
                <div className="w-[40%] flex gap-12 justify-start">
                  <div className="flex flex-col justify-start">
                    {NAV_DATA[activeMenu].col1Title && (
                      <h3 className="text-lg font-bold mb-6">{NAV_DATA[activeMenu].col1Title}</h3>
                    )}
                    <div className="flex flex-col gap-4">
                      {NAV_DATA[activeMenu].col1Links?.map((link) => (
                        <Link key={link.label} href={link.href} className="hover:text-primary-blue font-normal transition-colors">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {NAV_DATA[activeMenu].col2Links && NAV_DATA[activeMenu].col2Links!.length > 0 && (
                    <div className="flex flex-col justify-start">
                      {NAV_DATA[activeMenu].col2Title && (
                        <h3 className="text-lg font-bold mb-6">{NAV_DATA[activeMenu].col2Title}</h3>
                      )}
                      <div className="flex flex-col gap-4">
                        {NAV_DATA[activeMenu].col2Links?.map((link) => (
                          <Link key={link.label} href={link.href} className="hover:text-blue-500 transition-colors">
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[40%] flex flex-col justify-start">
                  <h3 className="text-lg font-bold mb-6">{NAV_DATA[activeMenu].col1Title}</h3>
                  <div className="flex flex-col gap-4">
                    {NAV_DATA[activeMenu].col1Links?.map((link) => (
                      <Link key={link.label} href={link.href} className="hover:text-blue-500 transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </div>

      {/* =========================
          MOBILE MENU OVERLAY
      ========================== */}
      <div
        className={`fixed inset-0 bg-white z-[2000] transition-transform duration-500 ease-in-out lg:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="pt-24 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {NAV_LABELS.map((label) => {
              const isActive = pathname === NAV_DATA[label].mainHref;
              
              return (
                <div key={label} className="border-b border-gray-100">
                  <div className="flex items-center justify-between pr-4">
                    <Link
                      href={NAV_DATA[label].mainHref}
                      className={`flex-1 px-8 py-6 text-left text-lg font-medium transition-colors ${
                        isActive ? "text-primary-blue" : "text-black"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                    {(label === "2026 Edition" || label === "Ecosystem") && (
                      <button
                        className="p-4"
                        onClick={() =>
                          setActiveMenu(activeMenu === label ? null : label)
                        }
                      >
                        <Image
                          src={cdn("/icons/Menu-close.svg")} // your custom icon
                          alt="toggle"
                          width={20}
                          height={20}
                          className={`transition-transform duration-200 ease-in-out ${
                            activeMenu === label ? "scale-75" : "scale-150"
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {(activeMenu === "2026 Edition" || activeMenu === "Ecosystem") && 
                  <div className={` overflow-hidden transition-all duration-300 ${activeMenu === label ? "max-h-screen" : "max-h-0"}`}>
                    {NAV_DATA[label].col1Links?.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="block px-12 py-4 text-sm text-black font-normal border-b border-gray-100"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
            }
                </div>
              );
            })}
            <Link href="https://povindex.designpovindia.com/home" target="_blank" className="flex items-center justify-center  ">
          <Image
                          src={cdn("/qr/Ticket.svg")}
                          alt="toggle"
                          width={1000}
                          height={100}
                          className={`transition-transform duration-200 ease-in-out bg-black `}
                        />
          </Link>
          </div>
          
          <div className="p-10 border-t bg-white">
            <CTABtn
              label="Buy Tickets"
              iconType="arrow"
              btnBg="var(--primary-blue)"
              textColor="white"
              href="https://tktplz.events/gjdlb5-design-pov"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}