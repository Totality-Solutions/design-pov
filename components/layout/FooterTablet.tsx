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
      className="w-full bg-[#000000] py-16 px-6 sm:px-10 flex flex-col font-['Montserrat'] text-white"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-[36px] font-black tracking-tighter leading-none">
            DESIGN <span className="font-light">POV</span>
          </h1>
          <div className="text-[13px] opacity-70 space-y-2">
            <p>designpovindia.com</p>
            <p>hello@designpovindia.com</p>
          </div>
          <div className="flex gap-3">
            {["IG", "BI", "IN"].map((id) => (
              <span key={id} className="border border-white/20 w-9 h-9 flex items-center justify-center text-[11px] font-bold">
                {id}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 w-full lg:w-auto">
          {Object.entries(navLinks).map(([key, value]: [string, any]) => (
            <div key={key} className="flex flex-col gap-5">
              <h3 className="text-[13px] uppercase tracking-widest font-medium opacity-50">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <ul className="flex flex-col gap-3">
                {value.items.map((item: string) => (
                  <li key={item} className="text-[15px] opacity-80 font-light">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-40 text-[11px] uppercase tracking-[0.2em]">
        <p>© 2026 Design POV India.</p>
        <div className="flex gap-8">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Use</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterTablet;