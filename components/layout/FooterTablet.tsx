"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  navLinks: any;
}

const FooterTablet = ({ navLinks }: Props) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-[#000000] py-20 flex flex-col font-['Montserrat'] text-white border-t border-white/5"
    >
      {/* Main Content Wrapper: No horizontal padding here */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-y-20">
        
        {/* Left Side: Branding - Anchored Left */}
        <div className="flex flex-col gap-10 min-w-[280px] max-w-[320px]">
          <div className="space-y-4">
            <h1 className="text-[40px] font-black tracking-tighter leading-none">
              DESIGN <span className="font-light text-white/60">POV</span>
            </h1>
            <div className="text-[13px] leading-relaxed opacity-60 font-light tracking-wide">
              <p>designpovindia.com</p>
              <p>hello@designpovindia.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            {["IG", "BI", "IN"].map((id) => (
              <motion.span
                key={id}
                whileTap={{ scale: 0.9 }}
                className="border border-white/10 w-10 h-10 flex items-center justify-center text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                {id}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Right Side: Navigation Links Grid - Anchored Right and Small Width */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10 w-fit ml-auto">
          {Object.entries(navLinks).map(([key, value]: [string, any]) => (
            <div key={key} className="flex flex-col gap-5 min-w-[140px]">
              <h3 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-white/40">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <ul className="flex flex-col gap-3">
                {value.items.map((item: string) => (
                  <li 
                    key={item} 
                    className="text-[14px] text-white/70 hover:text-white transition-colors cursor-pointer font-light whitespace-nowrap"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="mt-32 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-medium">
          © 2026 Design POV India.
        </p>
        
        <div className="flex gap-10">
          {["Privacy Policy", "Terms of Use"].map((text) => (
            <p 
              key={text}
              className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors cursor-pointer font-medium"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterTablet;