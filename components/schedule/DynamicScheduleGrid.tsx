"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Linkedin, Globe, ArrowUpRight } from 'lucide-react';

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
  atCircle: QuickEvent[];
  atWorkshop: QuickEvent[];
  events: DetailedEvent[];
}

// --- DYNAMIC DATA ---
export const SCHEDULE_STORE: Record<string, DayData> = {
  "15": {
    dayDigit: "01",
    atCircle: [
      { title: "Inaugural Design POV", status: "Book Now" },
      { title: "Design Pataki", status: "Book Now" },
      { title: "Riddhi Jalan Khosla", status: "Book Now" },
      { title: "Macallan Tasting", status: "Invite only" },
      { title: "All Home Networking Night", status: "Invite only" }
    ],
    atWorkshop: [
      { title: "POV Quest", status: "Book Now" }
    ],
    events: [
      {
        id: "01.",
        title: "Inaugural Design POV",
        subtitle: "Opening panel discussion on design perspectives.",
        image: "/temp/about/1.png",
        time: "12:00 PM - 01:00 PM",
        speakers: [],
        links: { web: "#" }
      },
      {
        id: "02.",
        title: "Design Pataki",
        subtitle: "The Art Of Sourcing",
        image: "/temp/about/2.png",
        time: "03:00 PM - 04:00 PM",
        speakers: [
          "Sam Wadekar",
          "Mita Mehta",
          "Janavi Javeri",
          "Saniya Tadha",
          "Isla Van Damme"
        ],
        moderator: "Esha",
        links: { ig: "#", li: "#", web: "#" }
      },
      {
        id: "03.",
        title: "Riddhi Jalan Khosla",
        subtitle: "An insight into contemporary design thinking.",
        image: "/temp/about/3.png",
        time: "04:00 PM - 05:00 PM",
        speakers: ["Riddhi Jalan Khosla"],
        links: { web: "#" }
      },
      {
        id: "04.",
        title: "Macallan Tasting",
        subtitle: "Exclusive tasting experience (Invite Only).",
        image: "/temp/about/4.png",
        time: "05:00 PM - 07:00 PM",
        speakers: [],
        links: { web: "#" }
      },
      {
        id: "05.",
        title: "All Home Networking Night",
        subtitle: "Evening networking with industry professionals.",
        image: "/temp/about/5.png",
        time: "08:00 PM - 10:30 PM",
        speakers: [],
        links: { web: "#" }
      }
    ]
  },
  "16": {
    dayDigit: "02",
    atCircle: [
      { title: "Epistle Session 1", status: "Book Now" },
      { title: "Epistle Session 2", status: "Book Now" },
      { title: "The Ideal Homes and Garden", status: "Book Now" },
      { title: "Afterhours", status: "Invite only" }
    ],
    atWorkshop: [
      { title: "Happy Hickup", status: "Book Now" },
      { title: "Happy Hickup", status: "Book Now" }
    ],
    events: [
      {
        id: "01.",
        title: "Epistle Session 1",
        subtitle: "Panel discussion with leading voices.",
        image: "/temp/about/1.png",
        time: "12:30 PM - 01:30 PM",
        speakers: ["Speaker 1", "Speaker 2", "Speaker 3", "Speaker 4", "Speaker 5"],
        moderator: "Moderator",
        links: { web: "#" }
      },
      {
        id: "02.",
        title: "Happy Hickup Workshop",
        subtitle: "Interactive workshop experience.",
        image: "/temp/about/2.png",
        time: "02:00 PM - 03:00 PM",
        speakers: [],
        links: { web: "#" }
      },
      {
        id: "03.",
        title: "Epistle Session 2",
        subtitle: "Panel continuation with diverse perspectives.",
        image: "/temp/about/3.png",
        time: "03:30 PM - 04:30 PM",
        speakers: ["Speaker 1", "Speaker 2", "Speaker 3", "Speaker 4", "Speaker 5"],
        moderator: "Moderator",
        links: { web: "#" }
      },
      {
        id: "04.",
        title: "The Ideal Homes and Garden",
        subtitle: "Exploring modern residential design trends.",
        image: "/temp/about/4.png",
        time: "04:30 PM - 05:30 PM",
        speakers: [],
        links: { web: "#" }
      },
      {
        id: "05.",
        title: "Afterhours",
        subtitle: "Casual networking and evening interactions.",
        image: "/temp/about/5.png",
        time: "05:30 PM - 06:30 PM",
        speakers: [],
        links: { web: "#" }
      },
      {
        id: "06.",
        title: "Happy Hickup Workshop",
        subtitle: "Second workshop session.",
        image: "/temp/about/6.png",
        time: "05:00 PM - 06:00 PM",
        speakers: [],
        links: { web: "#" }
      }
    ]
  },
  "17": {
    dayDigit: "03",
    atCircle: [
      { title: "Epistle Session 1", status: "Book Now" },
      { title: "Epistle Session 2", status: "Book Now" }
    ],
    atWorkshop: [
      { title: "Happy Hickup", status: "Book Now" },
      { title: "Happy Hickup", status: "Book Now" }
    ],
    events: [
      {
        id: "01.",
        title: "Happy Hickup Workshop",
        subtitle: "Interactive design workshop.",
        image: "/temp/about/1.png",
        time: "01:30 PM - 02:30 PM",
        speakers: [],
        links: { web: "#" }
      },
      {
        id: "02.",
        title: "Epistle Session 1",
        subtitle: "Panel with multiple speakers.",
        image: "/temp/about/2.png",
        time: "02:00 PM - 03:00 PM",
        speakers: ["Speaker 1", "Speaker 2", "Speaker 3", "Speaker 4", "Speaker 5"],
        moderator: "Moderator",
        links: { web: "#" }
      },
      {
        id: "03.",
        title: "Epistle Session 2",
        subtitle: "Second panel discussion.",
        image: "/temp/about/3.png",
        time: "03:00 PM - 04:00 PM",
        speakers: ["Speaker 1", "Speaker 2", "Speaker 3", "Speaker 4", "Speaker 5"],
        moderator: "Moderator",
        links: { web: "#" }
      },
      {
        id: "04.",
        title: "Happy Hickup Workshop",
        subtitle: "Closing workshop session.",
        image: "/temp/about/4.png",
        time: "04:30 PM - 05:00 PM",
        speakers: [],
        links: { web: "#" }
      }
    ]
  }
};


const DATES = ["15", "16", "17"];

const DynamicScheduleGrid = () => {
  const [activeDate, setActiveDate] = useState("15");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeDate]);

  const currentData = SCHEDULE_STORE[activeDate];

  return (
    <section className="w-full bg-white flex flex-col font-display overflow-hidden">
      
      {/* --- UPPER BLACK HEADER SECTION --- */}
      <div className="bg-black text-white w-full flex flex-col lg:flex-row border-b border-white/10 min-h-[400px]">

        {/* DAY INDICATOR & MOBILE DATE SELECTOR */}
        <div className="w-full lg:w-[20%] p-6 lg:p-10 flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-start border-b lg:border-b-0 lg:border-r border-white/20 lg:border-white/50 relative overflow-hidden">
          <div className="text-left z-10">
            <h2 className="text-[30px] lg:text-h2 font-bold leading-[1] lg:leading-[0.8] tracking-tighter flex items-baseline font-['Montserrat']">
              <span>DAY&nbsp;0</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeDate}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {currentData.dayDigit.slice(-1)} 
                </motion.span>
              </AnimatePresence>
            </h2>
            <p className="text-[18px] lg:text-xl uppercase font-medium lg:font-light lg:mt-2 font-['Montserrat']">
              Schedule
            </p>
          </div>

          {/* MOBILE/TAB DATE SELECTOR (Synced with Desktop style) */}
          <div className="flex lg:hidden items-center gap-6 z-10">
            <div className="flex items-center gap-2">
              {DATES.map((date) => (
                <div key={date} className="relative flex items-center justify-center w-6 h-6">
                  <AnimatePresence>
                    {activeDate === date && (
                      <>
                        {/* The "White Line" following the active date vertically */}
                        <motion.div 
                          layoutId="vLineMobile" 
                          className="absolute w-[2px] bg-white/60 h-[100vh] pointer-events-none" 
                          style={{ top: '-100vh' }} 
                        />
                        {/* The Active Square */}
                        <motion.div 
                          layoutId="activeBoxMobile" 
                          className="absolute inset-0 bg-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => setActiveDate(date)}
                    className={`relative z-10 text-lg font-bold transition-colors ${activeDate === date ? "text-black" : "text-white/40"}`}
                  >
                    {date}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col leading-none border-l border-white/20 pl-4">
              <span className="text-[14px] font-bold uppercase font-['Montserrat'] tracking-widest">May</span>
              <span className="text-[14px] font-medium uppercase font-['Montserrat'] text-white/40">2026</span>
            </div>
          </div>
        </div>
            
        {/* QUICK LISTS */}
        <div className="flex-1 p-6 lg:p-10 flex flex-col gap-10">
          <AnimatePresence mode="wait">
            <motion.div key={activeDate} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 lg:space-y-12">
              {/* At Circle */}
              <div className='mb-6 lg:mb-12'>
                <h4 className="text-[18px] lg:text-xl font-bold mb-4 lg:mb-2 text-white/90 font-['Montserrat']">At Circle :</h4>
                <ul className="space-y-4 max-w-2xl">
                  {currentData.atCircle.map((item, i) => (
                    <li key={i} className="flex justify-between items-center group">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-1.5 h-1.5 bg-white rounded-full transition-transform group-hover:scale-150" />
                        <span className="text-[16px] lg:text-lg font-regular opacity-80 group-hover:opacity-100 font-['Montserrat']">{item.title}</span>
                      </div>
                      <span className="text-[14px] lg:text-body-tab font-regular opacity-70 group-hover:opacity-100 hover:border-b hover:border-white transition-colors cursor-pointer font-['Montserrat']">
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
                
              <div className="w-full h-[1px] bg-white/20 lg:hidden " />
                
              {/* At Workshop */}
              <div className="mt-6 lg:mt-12">
                <h4 className="text-[18px] lg:text-xl font-bold mb-4 lg:mb-2 text-white/90 font-['Montserrat']">At G15 - Workshop :</h4>
                <ul className="space-y-4 max-w-2xl">
                  {currentData.atWorkshop.map((item, i) => (
                    <li key={i} className="flex justify-between items-center group">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        <span className="text-[16px] lg:text-lg font-regular opacity-80 group-hover:opacity-100 font-['Montserrat']">{item.title}</span>
                      </div>
                      <span className="text-[14px] lg:text-body-tab font-regular opacity-70 group-hover:opacity-100 hover:border-b hover:border-white transition-colors cursor-pointer font-['Montserrat']">
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
                
        {/* DESKTOP DATE SELECTOR (Hidden on Mobile/Tab) - UNTOUCHED */}
        <div className="hidden lg:flex w-full lg:w-[25%] p-10 items-center justify-end gap-6 relative">
          <div className="flex items-center gap-3">
            {DATES.map((date) => (
              <div key={date} className="relative group flex items-center justify-center w-10 h-10" onMouseEnter={() => setActiveDate(date)}>
                {activeDate === date && (
                  <>
                    <motion.div layoutId="vLine" className="absolute w-[1px] bg-white h-[200vh] pointer-events-none" style={{ top: '-100vh' }} />
                    <motion.div layoutId="activeBox" className="absolute inset-0 bg-white" />
                  </>
                )}
                <button className={`relative z-10 text-lg font-bold transition-colors ${activeDate === date ? "text-black" : "text-white/40 hover:text-white"}`}>
                  {date}
                </button>
              </div>
            ))}
          </div>
          <span className="text-lg font-bold tracking-tighter self-center ml-2 font-['Montserrat']">MAY-26</span>
        </div>
      </div>

      {/* --- LOWER WHITE DETAIL GRID (Untouched) --- */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-row lg:grid-cols-[0.6fr_0.6fr_1.2fr] min-w-[full] lg:min-w-[900px] border border-gray-100 bg-gray-50/30">
          <div className="p-6 px-12 text-body font-medium text-black border border-gray-100">Event Name</div>
          <div className="hidden lg:flex p-6 px-12 text-body font-medium text-black border border-gray-100">Image</div>
          <div className="hidden lg:flex p-6 px-12 text-body font-medium text-black border border-gray-100">Information</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeDate} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {currentData.events.map((event) => (
              <div key={event.id} className="grid grid-row lg:grid-cols-[0.6fr_0.6fr_1.2fr] min-w-[full] lg:min-w-[900px] lg:border lg:border-gray-100 group">
                <div className="px-6 py-3 lg:p-12 flex flex-col gap-6 lg:border lg:border-gray-100">
                  <span className="text-5xl font-semibold tracking-tighter">{event.id}</span>
                  <div>
                    <h3 className="text-2xl font-semibold text-black mb-2">{event.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px]">{event.subtitle}</p>
                  </div>
                </div>
                <div className="px-6 py-3 lg:p-12 flex items-center justify-center lg:border lg:border-gray-100">
                  <div className="relative w-full max-h-[250px] aspect-video lg:aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-red-600/20 z-10 mix-blend-overlay" />
                    <Image src={event.image} alt={event.title} fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                  </div>
                </div>
                <div className="px-6 py-3 lg:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold tracking-tight">{event.time}</span>
                    <div className="flex gap-4 pointer-events-auto">
                      {["IG", "BI", "IN"].map((id) => (
                        <span
                          key={id}
                          className="border border-black/20 w-[28px] h-[28px] flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-white hover:text-black transition-colors"
                        >
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-0 lg:mt-8 mb-4 lg:mb-0">
                    <div className='mb-2'>
                      <span className="text-[14px] font-medium tracking-widest text-zinc-400 block mb-1 font-['Montserrat']">Speaker</span>
                      <p className="text-sm font-medium">{event.speakers.join("  |  ")}</p>
                    </div>
                    {event.moderator && (
                      <div>
                        <span className="text-[14px] font-medium tracking-widest text-zinc-400 block mb-1 font-['Montserrat']">Moderator</span>
                        <p className="text-sm font-medium">{event.moderator}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DynamicScheduleGrid;