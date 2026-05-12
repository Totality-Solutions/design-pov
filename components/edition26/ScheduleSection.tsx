"use client";
import { cdn } from "@/lib/cdn";

import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import Image from 'next/image';
import SectionHeading from '../common/SectionHeading';
import Link from 'next/link';

// IMPORT YOUR REAL DATA
import scheduleData from './schedule/Scheduledata';

/* ---------------- CONVERT YOUR DATA ---------------- */

const SCHEDULE_DATA = {

  "15": {
    digit: "1",

    dayDigit: "01",

    atCircle: scheduleData[0].events
      .filter(
        (event) =>
          event.venue === "Circle"
      )
      .map((event) => ({
        title: event.title,

        status: event.isInviteOnly
          ? "Invite only"
          : "Book Now",
      })),

    atWorkshop: scheduleData[0].events
      .filter(
        (event) =>
          event.venue === "Show floor"
      )
      .map((event) => ({
        title: event.title,

        status: event.isInviteOnly
          ? "Invite only"
          : "Book Now",
      })),
  },

  "16": {
    digit: "2",

    dayDigit: "02",

    atCircle: scheduleData[1].events
      .filter(
        (event) =>
          event.venue === "Circle"
      )
      .map((event) => ({
        title: event.title,

        status: event.isInviteOnly
          ? "Invite only"
          : "Book Now",
      })),

    atWorkshop: scheduleData[1].events
      .filter(
        (event) =>
          event.venue === "Show floor"
      )
      .map((event) => ({
        title: event.title,

        status: event.isInviteOnly
          ? "Invite only"
          : "Book Now",
      })),
  },

  "17": {
    digit: "3",

    dayDigit: "03",

    atCircle: scheduleData[2].events
      .filter(
        (event) =>
          event.venue === "Circle"
      )
      .map((event) => ({
        title: event.title,

        status: event.isInviteOnly
          ? "Invite only"
          : "Book Now",
      })),

    atWorkshop: scheduleData[2].events
      .filter(
        (event) =>
          event.venue === "Show floor"
      )
      .map((event) => ({
        title: event.title,

        status: event.isInviteOnly
          ? "Invite only"
          : "Book Now",
      })),
  },
};

type DateKey =
  | "15"
  | "16"
  | "17";

const DATES: DateKey[] = [
  "15",
  "16",
  "17",
];

/* ---------------- COMPONENT ---------------- */

const ScheduleSection = () => {

  const [activeDate, setActiveDate] =
    useState<DateKey>("15");

  const [isAutoPlaying, setIsAutoPlaying] =
    useState(true);

  const [isHovered, setIsHovered] =
    useState(false);

  const nextSlide = useCallback(() => {

    setActiveDate((prev) => {

      const currentIndex =
        DATES.indexOf(prev);

      const nextIndex =
        (currentIndex + 1) %
        DATES.length;

      return DATES[nextIndex];
    });

  }, []);

  useEffect(() => {

    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {

      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    return () =>
      clearInterval(interval);

  }, [isAutoPlaying, nextSlide]);

  const handleInteraction = (
    date: DateKey
  ) => {

    setActiveDate(date);

    setIsAutoPlaying(false);
  };

  return (
    <section
      className="w-full relative min-h-[495px] flex flex-col font-display overflow-hidden bg-black"
      onMouseEnter={() => {
        setIsAutoPlaying(false);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsAutoPlaying(true);
        setIsHovered(false);
      }}
    >

      <Link href="/edition/schedule">

        {/* BACKGROUND IMAGE */}

        <div className="absolute inset-0 z-0">

          <Image
            src={cdn("/temp/edition/schedule/Banner.webp")}
            alt="Background"
            fill
            className="object-cover"
            priority
          />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col h-full flex-1">

          <SectionHeading
            titleMain="Circle Schedule "
            titleBold="2026"
            sticky={false}
            bgColor="transparent"
            textColor="text-white"
            isSectionHovered={isHovered}
          >
            <div className="hidden md:flex gap-[100px]" />
          </SectionHeading>

          {/* MAIN SECTION */}

          <div className="relative w-full flex flex-col lg:flex-row items-stretch px-[20px] lg:px-[60px] min-h-[350px] bg-black">

            {/* LEFT COLUMN */}

            <div className="w-full lg:w-[15%] flex flex-row lg:flex-col justify-between lg:justify-center py-6 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/20 z-10">

              <div className="text-white">

                <h3 className="text-h2-mobile md:text-h2-tab lg:text-h2 font-bold leading-[0.8] tracking-tighter flex items-baseline">

                  <span>
                    DAY&nbsp;0
                  </span>

                  <AnimatePresence mode="wait">

                    <motion.span
                      key={activeDate}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                    >
                      {
                        SCHEDULE_DATA[
                          activeDate
                        ].digit
                      }
                    </motion.span>

                  </AnimatePresence>

                </h3>

                <p className="text-[18px] lg:text-[20px] font-medium uppercase lg:normal-case">
                  Schedule
                </p>

              </div>

              {/* MOBILE DATE PICKER */}

              <div className="flex lg:hidden items-center gap-4 pt-2">

                <div className="flex gap-3">

                  {DATES.map((date) => (

                    <div
                      key={date}
                      className="relative flex items-center justify-center w-[32px] h-[32px]"
                    >

                      {activeDate === date && (
                        <>
                          <motion.div
                            layoutId="verticalLineMobile"
                            className="absolute w-[1px] bg-white pointer-events-none"
                            style={{
                              top: '-35px',
                              bottom: '100%',
                              left: '50%',
                            }}
                            transition={{
                              type: "spring",
                              bounce: 0,
                              duration: 0.6,
                            }}
                          />

                          <motion.div
                            layoutId="activeIndicatorMobile"
                            className="absolute inset-0 bg-white"
                            transition={{
                              type: "spring",
                              bounce: 0,
                              duration: 0.6,
                            }}
                          />
                        </>
                      )}

                      <button
                        onClick={() =>
                          handleInteraction(
                            date
                          )
                        }
                        className={`relative z-10 text-[16px] lg:text-[18px] font-bold transition-colors duration-300 ${
                          activeDate === date
                            ? "text-black"
                            : "text-white/40"
                        }`}
                      >
                        {date}
                      </button>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* RIGHT COLUMN */}

            <div className="w-full lg:flex-1 flex flex-col lg:flex-row items-center relative py-8 lg:py-0">

              <div className="flex-1 lg:pl-10 lg:pr-10 z-10">

                <AnimatePresence mode="wait">

                  <motion.div
                    key={
                      activeDate +
                      "grid"
                    }
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    className="grid grid-cols-2 gap-x-10 gap-y-6"
                  >

                    {/* CIRCLE */}

                    {/* CIRCLE */}

                    {SCHEDULE_DATA[activeDate].atCircle.length > 0 && (
                    
                      <div>
                      
                        <p className="text-md md:text-xl font-semibold mb-2 text-white/90">
                          At Circle
                        </p>
                    
                        <ul className="space-y-2">
                    
                          {SCHEDULE_DATA[
                            activeDate
                          ].atCircle.map(
                            (
                              item,
                              i
                            ) => (
                            
                              <li
                                key={i}
                                className="flex items-center justify-between gap-6"
                              >
                              
                                <span className="text-sm lg:text-lg font-regular text-white/60 mt-2">
                                  {item.title}
                                </span>
                            
                              </li>
                            )
                          )}

                        </ul>
                        
                      </div>

                    )}

                    {/* WORKSHOP */}

                    {SCHEDULE_DATA[activeDate].atWorkshop.length > 0 && (
                    
                      <div>
                      
                        <p className="text-md md:text-xl font-semibold mb-2 text-white/90">
                          At Show Floor
                        </p>
                    
                        <ul className="space-y-2">
                    
                          {SCHEDULE_DATA[
                            activeDate
                          ].atWorkshop.map(
                            (
                              item,
                              i
                            ) => (
                            
                              <li
                                key={i}
                                className="flex items-center justify-between gap-6"
                              >
                              
                                <span className="text-sm lg:text-lg font-regular text-white/60 mt-2">
                                  {item.title}
                                </span>
                            
                              </li>
                            )
                          )}

                        </ul>
                        
                      </div>

                    )}

                  </motion.div>

                </AnimatePresence>

              </div>

              {/* DESKTOP DATE */}

              <div className="hidden lg:flex w-[300px] items-start pl-10 justify-end relative h-full">

                <div className="flex items-center gap-8 z-20 h-full">

                  <div className="flex items-center gap-6 h-full">

                    {DATES.map((date) => (

                      <div
                        key={date}
                        className="relative flex items-center justify-center w-[32px] h-[32px]"
                        onMouseEnter={() =>
                          handleInteraction(
                            date
                          )
                        }
                      >

                        {activeDate === date && (
                          <>
                            <motion.div
                              layoutId="verticalLine"
                              className="absolute w-[1px] bg-white"
                              style={{
                                top: '-158px',
                                bottom: '-158px',
                                left: '50%',
                              }}
                              transition={{
                                type: "spring",
                                bounce: 0,
                                duration: 0.6,
                              }}
                            />

                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute inset-0 bg-white"
                              transition={{
                                type: "spring",
                                bounce: 0,
                                duration: 0.6,
                              }}
                            />
                          </>
                        )}

                        <button
                          className={`relative z-10 text-[18px] font-semibold transition-colors ${
                            activeDate === date
                              ? "text-black"
                              : "text-white/40"
                          }`}
                        >
                          {date}
                        </button>

                      </div>

                    ))}

                  </div>

                  <div className="text-white text-[18px] font-semibold uppercase">
                    May-26
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </Link>

    </section>
  );
};

export default ScheduleSection;