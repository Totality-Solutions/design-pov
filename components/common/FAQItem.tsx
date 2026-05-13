"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import faqData from "@/components/common/faqData";

import InteractiveText, {TextAction} from "@/components/common/InteractiveText";

interface FAQItem {
  question: string;
  answer: string;
  actions?: TextAction[];
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

interface FAQItemComponentProps {
  question: string;
  answer: string;
  actions?: TextAction[];
}

const FAQItemComponent = ({
  question,
  answer,
  actions,
}: FAQItemComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-gray-100 flex flex-col transition-all duration-200">
      {/* Question Row */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-0 py-6 flex items-center justify-between gap-6 text-left"
      >
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
              scaleY: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="w-0.5 h-5 bg-gray-800 absolute"
          />
        </motion.div>
      </button>

      {/* Answer Area */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-700 text-base font-normal font-['Segoe UI', system-ui] leading-7 whitespace-pre-line">
              <InteractiveText
                text={answer}
                actions={actions}
              />
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
            actions={item.actions}
          />
        ))}
      </div>
    </motion.div>
  );
};

const FAQPageWithSidebar = () => {
  const [activeCategory, setActiveCategory] = useState(
    faqData[0]?.category || "General"
  );

  // =========================================
  // FORM STATES
  // =========================================

  const [coreFormOpen, setCoreFormOpen] = useState(false);

  const [circleFormOpen, setCircleFormOpen] =
    useState(false);

  const [magazineFormOpen, setMagazineFormOpen] =
    useState(false);

  const [participateFormOpen, setParticipateFormOpen] =
    useState(false);

  const [sponsorshipFormOpen, setSponsorshipFormOpen] =
    useState(false);

  // =========================================
  // FORM OPEN HANDLERS
  // =========================================

  const openCoreForm = () => {
    setCoreFormOpen(true);
  };

  const openCircleForm = () => {
    setCircleFormOpen(true);
  };

  const openMagazineForm = () => {
    setMagazineFormOpen(true);
  };

  const openParticipateForm = () => {
    setParticipateFormOpen(true);
  };

  const openSponsorshipForm = () => {
    setSponsorshipFormOpen(true);
  };

  // =========================================
  // PROCESS FAQ DATA
  // =========================================

  const processedFaqData: FAQCategory[] = faqData.map((category) => ({
    ...category,

    items: category.items.map((item) => {
      // =========================================
      // THE CORE
      // =========================================

      if (
        item.question ===
        "Can I apply to be part of The Core?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "Collaborate page",
              type: "internal-link",
              href: "/collaborate",
            },

            {
              text: "website",
              type: "external-link",
              href: "https://designpov.com",
            },

            {
              text: "click here",
              type: "modal",
              onClick: openCoreForm,
            },
          ],
        };
      }

      // =========================================
      // PARTICIPATE FORM
      // =========================================

      if (
        item.question ===
        "How can my brand participate in Design POV?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "POV Objects",
              type: "modal",
              onClick: openParticipateForm,
            },
          ],
        };
      }

      // =========================================
      // SPONSORSHIP FORM
      // =========================================

      if (
        item.question ===
        "How can I become a sponsor?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "Collaborate page",
              type: "modal",
              onClick: openSponsorshipForm,
            },
          ],
        };
      }

      // =========================================
      // ELEVATE REDIRECT
      // =========================================

      if (
        item.question ===
        "What is POV Elevate?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "POV Elevate",
              type: "internal-link",
              href: "/elevate",
            },
          ],
        };
      }

      // =========================================
      // COLLABORATE REDIRECT
      // =========================================

      if (
        item.question ===
        "How can media publications partner with Design POV?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "Collaborate page",
              type: "internal-link",
              href: "/collaborate",
            },
          ],
        };
      }

      // =========================================
      // ALL ENQUIRIES
      // =========================================

      if (
        item.question ===
        "Who do I contact for collaborations or enquiries?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "Collaborate page",
              type: "internal-link",
              href: "/collaborate",
            },

            {
              text: "website",
              type: "external-link",
              href: "https://designpov.com",
            },
          ],
        };
      }

      // =========================================
      // CIRCLE REDIRECT
      // =========================================

      if (
        item.question ===
        "What is The Circle?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "The Circle",
              type: "internal-link",
              href: "/circle",
            },
          ],
        };
      }

      // =========================================
      // CIRCLE FORM
      // =========================================

      if (
        item.question ===
        "Can I apply to speak at Circle?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "Click here",
              type: "modal",
              onClick: openCircleForm,
            },
          ],
        };
      }

      // =========================================
      // OBJECTS REDIRECT
      // =========================================

      if (
        item.question ===
        "What are POV Objects?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "POV Objects",
              type: "internal-link",
              href: "/objects",
            },
          ],
        };
      }

      // =========================================
      // MAGAZINE FORM
      // =========================================

      if (
        item.question ===
        "What is the Design POV Magazine?"
      ) {
        return {
          ...item,

          actions: [
            {
              text: "Click here",
              type: "modal",
              onClick: openMagazineForm,
            },
          ],
        };
      }

      return item;
    }),
  }));

  const activeData = processedFaqData.find(
    (cat) => cat.category === activeCategory
  );

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

        {/* Sidebar */}
        <div className="md:w-56 md:sticky md:top-8 md:h-fit">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-6 font-['Segoe UI', system-ui]">
              Categories
            </h3>

            {processedFaqData.map((item) => (
              <button
                key={item.category}
                onClick={() =>
                  setActiveCategory(item.category)
                }
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

      {/* ========================================= */}
      {/* MODALS */}
      {/* ========================================= */}

      {coreFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-10">
            Core Form
          </div>
        </div>
      )}

      {circleFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-10">
            Circle Form
          </div>
        </div>
      )}

      {magazineFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-10">
            Magazine Form
          </div>
        </div>
      )}

      {participateFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-10">
            Participate Form
          </div>
        </div>
      )}

      {sponsorshipFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-10">
            Sponsorship Form
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQPageWithSidebar;
