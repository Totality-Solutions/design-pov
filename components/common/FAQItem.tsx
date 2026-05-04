"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="w-full  overflow-hidden flex flex-col cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Question Row */}
      <div className="w-full px-8 md:px-[60px] py-6 flex items-center justify-between gap-10">
        <div className="flex-1 text-black text-xl font-medium font-['Montserrat'] leading-7">
          {question}
        </div>
        
        {/* Toggle Icon */}
        <motion.div 
          // Rotates the entire container to create the cross effect
          animate={{ rotate: isOpen ? -45 : 0 }} 
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-[30px] h-[30px] relative flex items-center justify-center"
        >
          {/* Horizontal Line (Base for Minus and Cross) */}
          <div className="w-[16px] h-[1.5px] bg-black absolute" />

          {/* Vertical Line (Hidden for Minus, Visible for Cross) */}
          <motion.div 
            initial={false}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              // We keep it slightly rotated or scaled to ensure a smooth transition
              scaleY: isOpen ? 1 : 0 
            }}
            transition={{ duration: 0.2 }}
            className="w-[1.5px] h-[16px] bg-black absolute" 
          />
        </motion.div>
      </div>

      {/* Answer Area */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="bg-white overflow-hidden"
            style={{ boxShadow: "inset 0px 4px 8.7px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="px-8 md:px-[60px] py-10 opacity-70 text-justify text-black text-base font-normal font-['Montserrat'] leading-7 whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;