"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
import { Instagram, Linkedin, Globe, ArrowUpRight } from 'lucide-react';

// --- IMPORT SCHEDULE DATA (fallback) ---
import scheduleData from './Scheduledata';
import CTABtn from '@/components/common/CTABtn';

// --- SERVER EVENT TYPE (from Supabase) ---
interface ScheduleEventRow {
  id: string;
  title: string;
  subtitle: string | null;
  speakers: Array<{ name: string; role?: string }> | null;
  venue: string;
  start_time: string;
  end_time: string;
  day: number;
  is_invite_only: boolean;
  invite_only_link: string | null;
  image: string | null;
  partners: string[] | null;
  category_tag: string | null;
}

// --- TYPE DEFINITIONS ---
interface DetailedEvent {
  id: string;
  title: string;
  subtitle: string;
  // image: string;   // IMAGE COLUMN — kept for future use, do not remove
  time: string;
  venue: string;
  categoryTag?: string;
  partners?: string[];
  speakers: string[];
  moderator?: string;
  isInviteOnly: boolean;
  inviteOnlyLink?: string;
  links: { ig?: string; li?: string; web?: string };
}

interface DayData {
  dayDigit: string;
  date: string;
  events: DetailedEvent[];
}

// --- CONVERT SCHEDULE DATA TO COMPONENT FORMAT ---
const convertScheduleData = (): Record<string, DayData> => {
  const dayDateMap: Record<number, string> = { 1: "15", 2: "16", 3: "17" };
  const dayDigitMap: Record<number, string> = { 1: "01", 2: "02", 3: "03" };

  const result: Record<string, DayData> = {};

  scheduleData.forEach((daySchedule) => {
    const dateKey  = dayDateMap[daySchedule.day];
    const dayDigit = dayDigitMap[daySchedule.day];

    const detailedEvents: DetailedEvent[] = daySchedule.events.map((event, index) => ({
      id:          `${String(index + 1).padStart(2, '0')}.`,
      title:       event.title,
      subtitle:    event.subtitle
        ? event.subtitle
        : event.speakers.length > 0
          ? event.speakers.map(s => s.name).join(", ")
          : "",
      // image:    event.image ?? `/temp/about/${index + 1}.png`,   // IMAGE COLUMN — do not remove
      time:        `${event.startTime} - ${event.endTime}`,
      venue:       event.venue,
      categoryTag: event.categoryTag,
      partners:    event.partners,
      speakers:    event.speakers.filter(s => s.role !== "moderator").map(s => s.name),
      moderator:   event.speakers.find(s => s.role === "moderator")?.name,
      isInviteOnly: event.isInviteOnly ?? false,
      inviteOnlyLink: event.inviteOnlyLink,
      links:       { web: "#" }
    }));

    result[dateKey] = {
      dayDigit,
      date: daySchedule.date,
      events: detailedEvents,
    };
  });

  return result;
};

// --- CONVERT SERVER EVENTS TO COMPONENT FORMAT ---
const convertServerEvents = (events: ScheduleEventRow[]): Record<string, DayData> => {
  const dayDateMap: Record<number, string>  = { 1: "15", 2: "16", 3: "17" };
  const dayDigitMap: Record<number, string> = { 1: "01", 2: "02", 3: "03" };
  const dayLabelMap: Record<number, string> = { 1: "15 May 2026", 2: "16 May 2026", 3: "17 May 2026" };

  const result: Record<string, DayData> = {};
  [1, 2, 3].forEach((d) => {
    result[dayDateMap[d]] = { dayDigit: dayDigitMap[d], date: dayLabelMap[d], events: [] };
  });

  events.forEach((event) => {
    const dateKey = dayDateMap[event.day];
    if (!dateKey) return;
    const eventNum = result[dateKey].events.length + 1;
    const speakers  = (event.speakers ?? []).filter(s => s.role !== "moderator").map(s => s.name);
    const moderator = (event.speakers ?? []).find(s => s.role === "moderator")?.name;
    result[dateKey].events.push({
      id:             `${String(eventNum).padStart(2, '0')}.`,
      title:          event.title,
      subtitle:       event.subtitle ?? (speakers.length > 0 ? speakers.join(", ") : ""),
      // image:       event.image ?? undefined,   // IMAGE COLUMN — kept for future use, do not remove
      time:           `${event.start_time} - ${event.end_time}`,
      venue:          event.venue,
      categoryTag:    event.category_tag ?? undefined,
      partners:       event.partners ?? undefined,
      speakers,
      moderator,
      isInviteOnly:   event.is_invite_only ?? false,
      inviteOnlyLink: event.invite_only_link ?? undefined,
      links:          { web: "#" },
    });
  });

  return result;
};

const STATIC_STORE = convertScheduleData();
const DATES = ["15", "16", "17"];

const DynamicScheduleGrid = ({ serverEvents }: { serverEvents?: ScheduleEventRow[] | null }) => {
  const [activeDate, setActiveDate] = useState("15");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeDate]);

  const SCHEDULE_STORE = serverEvents && serverEvents.length > 0
    ? convertServerEvents(serverEvents)
    : STATIC_STORE;

  const currentData = SCHEDULE_STORE[activeDate];

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
                <span className="text-[16px] lg:text-h2 font-bold uppercase">
                  Day 0{index + 1}
                </span>

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
                  className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_0.6fr_180px] min-w-[full] lg:min-w-[900px] lg:py-0 py-10 border-b border-black/20 lg:border lg:border-gray-100 group"
                >
                  {/* Col 1 — Event number + Title + Subtitle */}
                  <div className="px-6 py-3 lg:p-12 flex flex-col gap-6 lg:border-r lg:border-gray-100">
                    <span className="text-5xl font-semibold tracking-tighter">{event.id}</span>
                    <div>
                      <h3 className="text-2xl font-semibold text-black mb-2">{event.title}</h3>
                     <div className="flex flex-col justify-center gap-4 lg:border-r lg:border-gray-100">
                    <div>
                      <span className="text-[14px] font-medium text-zinc-400 block mb-1 font-['Montserrat']">Venue</span>
                      <p className="text-sm font-medium text-primary-blue">{event.venue}</p>
                    </div>
                    {event.categoryTag && (
                      <div>
                        <span className="text-[14px] font-medium text-zinc-400 block mb-1 font-['Montserrat']">Category</span>
                        <p className="text-sm font-medium">{event.categoryTag}</p>
                      </div>
                    )}
                    {event.partners && event.partners.length > 0 && (
                      <div>
                        <span className="text-[14px] font-medium text-zinc-400 block mb-1 font-['Montserrat']">Partner</span>
                        <p className="text-sm font-medium">{event.partners.join(", ")}</p>
                      </div>
                    )}
                  </div>
                    </div>
                  </div>

                  {/* Col 2 — Time + Speakers + Moderator */}
                  <div className="px-6 py-3 lg:p-12 flex flex-col justify-between lg:border-r lg:border-gray-100">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold tracking-tight">{event.time}</span>
                    </div>

                    <div className="">
                      {event.speakers.length > 0 && (
                        <div className="">
                          <span className="text-[14px] font-medium text-zinc-400 block mb-1 font-['Montserrat']">
                            Speaker{event.speakers.length > 1 ? 's' : ''}
                          </span>
                          <p className="text-sm font-medium">
                            {event.speakers.join("  |  ")}
                          </p>
                        </div>
                      )}
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

                  {/* Col 3 — Venue + Category + Partners */}
                  

                  {/* Col 4 — Image (commented) + Invite Only button */}
                    {!event.isInviteOnly && (
                  <div className="px-6 py-3 lg:p-12 flex flex-col items-start lg:items-center justify-center gap-4">

                    {/* IMAGE COLUMN — commented out, do not remove
                    <div className="relative w-full h-28 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    */}

                      <CTABtn
                        label="Invite Only"
                        iconType="arrow"
                        btnBg="var(--color-white)"
                        btnHoverBg="var(--primary-blue)"
                        textColor="var(--color-black)"
                        borderColor="var(--color-black)"
                        borderHoverColor="transparent"
                        lineColor="var(--color-white)"
                        lineHoverColor="var(--primary-blue)"
                        bottomKey1Width="40px"
                        bottomKey2Width="12px"
                        bottomKey1Right="50px"
                        bottomKey2Right="15px"
                        href={event.inviteOnlyLink}
                      />
                  </div>
                    )}

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
