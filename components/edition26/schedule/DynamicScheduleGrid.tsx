"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Linkedin, Globe, ArrowUpRight } from 'lucide-react';

// --- IMPORT SCHEDULE DATA ---
import scheduleData from './Scheduledata'; // Adjust path based on your project structure

// --- TYPE DEFINITIONS ---
interface QuickEvent {
  title: string;
  status: "Book Now" | "Invite only" | "Coming Soon";
}

interface DetailedEvent {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  time: string;
  speakers: string[];
  moderator?: string;
  links: { ig?: string; li?: string; web?: string };
}

interface DayData {
  dayDigit: string;
  date: string;
  atCircle: QuickEvent[];
  atWorkshop: QuickEvent[];
  events: DetailedEvent[];
}

// --- CONVERT SCHEDULE DATA TO COMPONENT FORMAT ---
const convertScheduleData = (): Record<string, DayData> => {
  const dayDateMap: Record<number, string> = {
    1: "15",
    2: "16",
    3: "17"
  };

  const dayDigitMap: Record<number, string> = {
    1: "01",
    2: "02",
    3: "03"
  };

  const result: Record<string, DayData> = {};

  scheduleData.forEach((daySchedule) => {
    const dateKey = dayDateMap[daySchedule.day];
    const dayDigit = dayDigitMap[daySchedule.day];

    // Convert ScheduleEvent to DetailedEvent
    const detailedEvents: DetailedEvent[] = daySchedule.events.map((event, index) => ({
      id: `${String(index + 1).padStart(2, '0')}.`,
      title: event.title,
      subtitle: event.speakers.length > 0 
        ? event.speakers.map(s => s.name).join(", ")
        : "Design discussion and presentation",
      image: `/temp/about/${index + 1}.png`, // Placeholder image path
      time: `${event.startTime} - ${event.endTime}`,
      speakers: event.speakers
        .filter(s => s.role === "speaker")
        .map(s => s.name),
      moderator: event.speakers.find(s => s.role === "moderator")?.name,
      links: { web: "#" }
    }));

    // Categorize events by venue
    const circleEvents: QuickEvent[] = daySchedule.events
      .filter(e => e.venue === "Circle")
      .map(e => ({
        title: e.title,
        status: e.isInviteOnly ? "Invite only" : "Book Now"
      }));

    const workshopEvents: QuickEvent[] = daySchedule.events
      .filter(e => e.venue === "Show floor")
      .map(e => ({
        title: e.title,
        status: e.isInviteOnly ? "Invite only" : "Book Now"
      }));

    result[dateKey] = {
      dayDigit,
      date: daySchedule.date,
      atCircle: circleEvents,
      atWorkshop: workshopEvents,
      events: detailedEvents
    };
  });

  return result;
};

const SCHEDULE_STORE = convertScheduleData();
const DATES = ["15", "16", "17"];

const DynamicScheduleGrid = () => {
  const [activeDate, setActiveDate] = useState("15");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeDate]);

  const currentData = SCHEDULE_STORE[activeDate];

  // Fallback if no data exists for that date
  if (!currentData) {
    return <div className="w-full bg-white p-8 text-center">No schedule data available</div>;
  }

  return (
    <section className="w-full bg-white flex flex-col font-display overflow-hidden">
      
      {/* --- UPPER BLACK HEADER SECTION --- */}
      <div className="w-full bg-black">
        <div className="grid grid-cols-3 w-full border-b border-white/20">
          {DATES.map((date, index) => {
            const isActive = activeDate === date;
            const dateData = SCHEDULE_STORE[date];
            
            return (
              <button
                key={date}
                onClick={() => setActiveDate(date)}
                className={`relative flex flex-col items-center justify-center py-4 lg:py-8 transition-all duration-300 font-['Montserrat'] ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {/* Day Label */}
                <span className="text-[16px] lg:text-h2 font-bold uppercase">
                  Day 0{index + 1}
                </span>
              
                {/* Subtitle Date - Visible only when active */}
                <div className="h-[20px] lg:h-[24px]">
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 0.5, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[12px] lg:text-[16px] font-medium block"
                      >
                        {dateData?.date ? `May ${date}, 2026` : ""}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                  
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] lg:h-[2px] bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- LOWER WHITE DETAIL GRID --- */}
      <div className="w-full overflow-x-auto" ref={scrollRef}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeDate} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentData.events.length > 0 ? (
              currentData.events.map((event, idx) => (
                <div 
                  key={event.id} 
                  className="grid grid-row lg:grid-cols-[1fr_1.2fr] min-w-[full] lg:min-w-[900px] lg:py-0 py-10 border-b border-black/20 lg:border lg:border-gray-100 group"
                >
                  {/* Left Column - Event Info */}
                  <div className="px-6 py-3 lg:p-12 flex flex-col gap-6 lg:border lg:border-gray-100">
                    <span className="text-5xl font-semibold tracking-tighter">{event.id}</span>
                    <div>
                      <h3 className="text-2xl font-semibold text-black mb-2">{event.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px]">
                        {event.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Time & Details */}
                  <div className="px-6 py-3 lg:p-12 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold tracking-tight">{event.time}</span>
                    </div>
                    
                    <div className="mt-0 lg:mt-8 mb-4 lg:mb-0">
                      {/* Speakers */}
                      {event.speakers.length > 0 && (
                        <div className='mb-4'>
                          <span className="text-[14px] font-medium text-zinc-400 block mb-1 font-['Montserrat']">
                            Speaker{event.speakers.length > 1 ? 's' : ''}
                          </span>
                          <p className="text-sm font-medium">
                            {event.speakers.join("  |  ")}
                          </p>
                        </div>
                      )}
                      
                      {/* Moderator */}
                      {event.moderator && (
                        <div>
                          <span className="text-[14px] font-medium text-zinc-400 block mb-1 font-['Montserrat']">
                            Moderator
                          </span>
                          <p className="text-sm font-medium">{event.moderator}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No events scheduled for this day
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DynamicScheduleGrid;