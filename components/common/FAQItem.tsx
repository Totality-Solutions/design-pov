"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import faqData from "@/components/common/faqData";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const FAQItemComponent = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="w-full border-b border-gray-100 flex flex-col cursor-pointer transition-all duration-200"
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Question Row */}
      <div className="w-full px-0 py-6 flex items-center justify-between gap-6">
        <div className="flex-1 text-gray-900 text-lg font-medium font-['Segoe UI', system-ui] leading-7">
          {question}
        </div>
        
        {/* Plus Icon */}
        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }} 
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-6 h-6 relative flex items-center justify-center flex-shrink-0"
        >
          {/* Horizontal Line */}
          <div className="w-5 h-0.5 bg-gray-800 absolute" />

          {/* Vertical Line */}
          <motion.div 
            initial={false}
            animate={{ 
              opacity: isOpen ? 0 : 1,
              scaleY: isOpen ? 0 : 1 
            }}
            transition={{ duration: 0.2 }}
            className="w-0.5 h-5 bg-gray-800 absolute" 
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
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-700 text-base font-normal font-['Segoe UI', system-ui] leading-7 whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FAQSectionProps {
  category: FAQCategory;
}

const FAQSection = ({ category }: FAQSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Category Title */}
      <h2 className="text-xl md:text-xl font-bold text-gray-900 mb-10 font-['Segoe UI', system-ui]">
        {category.category}
      </h2>

      {/* FAQ Items */}
      <div className="space-y-0 mb-16">
        {category.items.map((item, index) => (
          <FAQItemComponent 
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </motion.div>
  );
};

const FAQPageWithSidebar = () => {
  const [activeCategory, setActiveCategory] = useState(faqData[0]?.category || "General");

  const activeData = faqData.find(cat => cat.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-['Segoe UI', system-ui]">
          FAQs
        </h1>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 px-6 md:px-12 lg:px-20 pb-20">
        {/* Sidebar Navigation - Sticky */}
        <div className="md:w-56 md:sticky md:top-8 md:h-fit">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-6 font-['Segoe UI', system-ui]">
              Categories
            </h3>
            
            {faqData.map((item) => (
              <button
                key={item.category}
                onClick={() => setActiveCategory(item.category)}
                className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200 font-['Segoe UI', system-ui] ${
                  activeCategory === item.category
                    ? "bg-gray-900 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100 font-medium"
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-3xl">
          <AnimatePresence mode="wait">
            {activeData && (
              <FAQSection
                key={activeData.category}
                category={activeData}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FAQPageWithSidebar;