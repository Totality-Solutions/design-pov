"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // If using Next.js

interface LinkData {
  word: string;
  href?: string;
  action?: () => void;
}

interface FAQItemProps {
  question: string;
  answer: string;
  links?: LinkData[];
}

const FAQItemComponent = ({ question, answer, links }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to inject links into the text string
  const renderAnswer = (text: string, linkMap?: LinkData[]) => {
    if (!linkMap || linkMap.length === 0) return text;

    // Create a regex pattern from all the words we want to link
    const pattern = new RegExp(`(${linkMap.map(l => l.word).join('|')})`, 'g');
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      const linkMatch = linkMap.find(l => l.word === part);
      
      if (linkMatch) {
        // If it's a Link
        if (linkMatch.href) {
          return (
            <Link 
              key={index} 
              href={linkMatch.href} 
              className="text-primary-red font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
              onClick={(e) => e.stopPropagation()} // Prevent accordion from closing
            >
              {part}
            </Link>
          );
        }
        // If it's an OnClick Event
        if (linkMatch.action) {
          return (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation(); // Prevent accordion from closing
                linkMatch.action?.();
              }}
              className="text-primary-red font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              {part}
            </button>
          );
        }
      }
      return part;
    });
  };

  return (
    <div className="w-full border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between gap-6 text-left group"
      >
        <span className="flex-1 text-gray-900 text-lg font-medium leading-7 group-hover:text-black">
          {question}
        </span>
        
        <div className="relative w-6 h-6 flex items-center justify-center">
          <motion.div className="absolute w-5 h-0.5 bg-gray-800" animate={{ rotate: isOpen ? 45 : 0 }} />
          <motion.div className="absolute w-0.5 h-5 bg-gray-800" animate={{ rotate: isOpen ? 45 : 0 }} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-gray-600 text-base font-normal leading-7">
              {renderAnswer(answer, links)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};