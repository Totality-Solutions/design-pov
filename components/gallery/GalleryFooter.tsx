"use client";

import { motion } from "framer-motion";

export default function GalleryFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full border-t border-black/10 py-[40px] px-6 text-center"
    >
      <p className="text-[14px] font-[family-name:var(--font-family)] text-black/40 leading-[20px]">
        &copy; {new Date().getFullYear()} Design POV
      </p>
    </motion.div>
  );
}
