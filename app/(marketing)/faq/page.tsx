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
        <div className="flex-1 text-gray-900 text-lg font-medium  leading-7">
          {question}
        </div>
        
        {/* Plus Icon */}
        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }} 
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-6 h-6 relative flex items-center justify-center flex-shrink-0"
        >
          {/* Horizontal Line */}
          <div className={`w-5 h-0.5 bg-gray-800 absolute ${isOpen ? 'bg-primary-red' : 'opacity-100'}`} />

          {/* Vertical Line */}
          <motion.div 
            initial={false}
            animate={{ 
              opacity: isOpen ? 1 : 1,
              scaleY: isOpen ? 1 : 1 
            }}
            transition={{ duration: 0.2 }}
            className={`w-0.5 h-5 bg-gray-800 absolute ${isOpen ? 'bg-primary-red' : 'opacity-100'}`} 
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
            <div className="pb-6 text-gray-700 text-base font-normal  leading-7 whitespace-pre-line">
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
      className="mb-16"
    >
      {/* Category Title - Sticky */}
      <div className="sticky top-20 bg-white z-10 py-4 mb-8 border-b-2 border-gray-100">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 ">
          {category.category}
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="space-y-0">
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

const FAQPage = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 ">
          FAQs
        </h1>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-full">
          <AnimatePresence mode="wait">
            {faqData.map((faqCategory) => (
              <FAQSection
                key={faqCategory.category}
                category={faqCategory}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;