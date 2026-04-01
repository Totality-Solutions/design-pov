"use client";

import React, { useState, useEffect } from "react";

type Slide = {
  bgText: string;
  label: string;
};

const SLIDES: Slide[] = [
  { bgText: "DESIGN POV", label: "" },
  { bgText: "THE PHILOSOPHY", label: "The Philosophy" },
  { bgText: "WHY WE EXIST", label: "Why We Exist" },
  { bgText: "WHAT MAKES US DIFFERENT", label: "What Makes Us Different" },
];

const typingSpeed = 80;
const deletingSpeed = 40;
const pauseTime = 1200;

const DesignHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentText = SLIDES[currentIndex].bgText;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <section className="relative w-full min-h-[550px] bg-white px-6 py-10 md:px-8 md:py-20 flex flex-col justify-between items-start overflow-hidden font-['Montserrat',sans-serif]">
      
      {/* Background Typewriter Text */}
      <div className="relative h-[70px] w-full select-none">
        <h1 className="absolute top-0 left-0 text-black/10 text-6xl md:text-[65px] font-bold uppercase leading-none tracking-tighter whitespace-nowrap">
          {displayText}
          <span className="ml-1 inline-block w-[2px] h-[80%] bg-black animate-pulse" />
        </h1>
      </div>

      <div className="w-full mt-12 flex flex-col gap-3">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          
          {/* Interactive List */}
          <div className="flex flex-col gap-3">
            {SLIDES.slice(1).map((item, index) => {
              const itemIndex = index + 1;
              const isActive = currentIndex === itemIndex;

              return (
                <div
                  key={item.label}
                  onMouseEnter={() => {
                    setCurrentIndex(itemIndex);
                    setDisplayText("");
                    setIsDeleting(false);
                  }}
                  className={`cursor-pointer transition-all duration-500 flex items-center ${
                    isActive
                      ? "opacity-100 "
                      : "opacity-50 hover:opacity-90"
                  }`}
                >
                  <span className="font-medium mr-2">-</span>
                  <p className="text-black text-base md:text-[14px] font-medium uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mission Statement */}
          <div className="max-w-full md:max-w-[700px]">
            <p className="text-left md:text-right text-black text-2xl md:text-[26px] font-medium leading-[1.2] tracking-tight">
              This is the moment Design POV stops being{" "}
              <span className="italic font-light">“a show”</span> and becomes{" "}
              <span className="font-bold border-b-2 border-black/10">
                “a design institution.”
              </span>
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full mt-2 h-[250px] md:h-[350px] overflow-hidden bg-gray-100 relative group">
          <img
            src="https://placehold.co/1320x350"
            alt="Design POV"
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default DesignHero;