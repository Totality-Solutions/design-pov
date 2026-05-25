"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import faqData, { Trigger, FAQItem, FAQCategory } from "@/components/common/faqData";

// IMPORT THE NEW POPUP (Update path if needed)
import FAQPopup from "@/components/common/FAQPopup";

interface FAQItemProps extends FAQItem {
  onOpenForm: (formId: string) => void;
}

const FAQItemComponent = ({ question, answer, triggers, onOpenForm }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to inject interactive links/buttons into the answer text
  const formatAnswer = (text: string, triggerList?: Trigger[]) => {
    if (!triggerList || triggerList.length === 0) return text;

    // Sort phrases longest first to prevent partial matches
    const sortedTriggers = [...triggerList].sort((a, b) => b.phrase.length - a.phrase.length);
    const pattern = new RegExp(`(${sortedTriggers.map(t => t.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|")})`, "g");
    
    const parts = text.split(pattern);

    return parts.map((part, i) => {
      const trigger = triggerList.find(t => t.phrase === part);

      if (trigger) {
        if (trigger.type === "redirect" && trigger.url) {
          return (
            <Link
              key={i}
              href={trigger.url}
              className="text-black font-bold underline underline-offset-4 hover:opacity-60 transition-opacity"
              onClick={(e) => e.stopPropagation()} // Stop accordion from toggling
            >
              {part}
            </Link>
          );
        }
        if (trigger.type === "form" && trigger.formId) {
          return (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenForm(trigger.formId!); // Trigger the modal to open
              }}
              className="text-black font-bold underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer"
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
    <div 
      className="w-full border-b border-gray-100 flex flex-col cursor-pointer transition-all duration-200"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="w-full px-0 py-6 flex items-center justify-between gap-6">
        <div className="flex-1 text-gray-900 text-lg font-medium leading-7">
          {question}
        </div>
        
        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }} 
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-6 h-6 relative flex items-center justify-center flex-shrink-0"
        >
          <div className={`w-5 h-0.5 bg-gray-800 absolute ${isOpen ? 'bg-primary-red' : 'opacity-100'}`} />
          <motion.div 
            initial={false}
            animate={{ opacity: isOpen ? 1 : 1, scaleY: isOpen ? 1 : 1 }}
            transition={{ duration: 0.2 }}
            className={`w-0.5 h-5 bg-gray-800 absolute ${isOpen ? 'bg-primary-red' : 'opacity-100'}`} 
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-700 text-base font-normal leading-7 whitespace-pre-line">
              {formatAnswer(answer, triggers)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = ({ category, onOpenForm }: { category: FAQCategory, onOpenForm: (id: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-16"
    >
      <div className="sticky top-20 bg-white z-10 py-4 mb-8 border-b-2 border-gray-100">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 ">
          {category.category}
        </h2>
      </div>

      <div className="space-y-0">
        {category.items.map((item, index) => (
          <FAQItemComponent 
            key={index}
            {...item}
            onOpenForm={onOpenForm}
          />
        ))}
      </div>
    </motion.div>
  );
};

const FAQPage = () => {
  // State to track which form is active in the modal
  const [activeFormId, setActiveFormId] = useState<string | null>(null);

  const handleOpenForm = (formId: string) => {
    setActiveFormId(formId);
  };

  const handleCloseModal = () => {
    setActiveFormId(null);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 ">
          FAQs
        </h1>
      </div>

      <div className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-full">
          <AnimatePresence mode="wait">
            {faqData.map((faqCategory) => (
              <FAQSection
                key={faqCategory.category}
                category={faqCategory}
                onOpenForm={handleOpenForm}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* RENDER THE POPUP HERE */}
      <FAQPopup 
        isOpen={activeFormId !== null} 
        onClose={handleCloseModal} 
        formId={activeFormId} 
      />
    </div>
  );
};

export default FAQPage;