// Enhanced Schedule Data with Images and Categories
// Place this in src/data/scheduleData.ts

interface Speaker {
  name: string;
  role?: "moderator" | "speaker";
}

interface ScheduleEvent {
  id: string;
  title: string;
  speakers: Speaker[];
  venue: "Circle" | "Show floor"; // Category: Circle or Workshop
  startTime: string;
  endTime: string;
  day: 1 | 2 | 3;
  isInviteOnly?: boolean;
  description?: string;
  image?: string; // Image path
}

interface DaySchedule {
  day: 1 | 2 | 3;
  date: string;
  events: ScheduleEvent[];
}

const scheduleData: DaySchedule[] = [
  {
    day: 1,
    date: "15 May 2026",
    events: [
      {
        id: "day1-event1",
        title: "Inaugural Design POV",
        speakers: [],
        venue: "Circle",
        startTime: "12:00 pm",
        endTime: "1:00 pm",
        day: 1,
        isInviteOnly: false,
        description: "Opening panel discussion on design perspectives.",
        image: "/temp/about/1.png"
      },
      {
        id: "day1-event2",
        title: "Design Pataki - The Art Of Sourcing",
        speakers: [
          { name: "Jasmine Jhaveri", role: "speaker" },
          { name: "Mita Mehta", role: "speaker" },
          { name: "Riddhika Jesrani", role: "speaker" },
          { name: "Saniya Tadha", role: "speaker" },
          { name: "Maitri Shah", role: "speaker" },
          { name: "Esha", role: "moderator" }
        ],
        venue: "Circle",
        startTime: "3:00 pm",
        endTime: "4:00 pm",
        day: 1,
        isInviteOnly: false,
        description: "Exploring the art and craft of sourcing materials and designs.",
        image: "/temp/about/2.png"
      },
      {
        id: "day1-event3",
        title: "Riddhi Jalan Khosla Fireside Chat",
        speakers: [
          { name: "Riddhi Jalan Khosla", role: "speaker" }
        ],
        venue: "Circle",
        startTime: "4:00 pm",
        endTime: "5:00 pm",
        day: 1,
        isInviteOnly: false,
        description: "An insight into contemporary design thinking.",
        image: "/temp/about/3.png"
      },
      {
        id: "day1-event4",
        title: "The Macallan Experience",
        speakers: [],
        venue: "Circle",
        startTime: "6:30 pm",
        endTime: "8:30 pm",
        day: 1,
        isInviteOnly: true,
        description: "Exclusive tasting experience (Invite Only).",
        image: "/temp/about/4.png"
      },
      {
        id: "day1-event5",
        title: "All Home Networking Night",
        speakers: [],
        venue: "Show floor",
        startTime: "8:00 pm",
        endTime: "10:30 pm",
        day: 1,
        isInviteOnly: true,
        description: "Evening networking with industry professionals.",
        image: "/temp/about/5.png"
      }
    ]
  },
  {
    day: 2,
    date: "16 May 2026",
    events: [
      {
        id: "day2-event1",
        title: "Epistle Session 1 - The Body as Instrument",
        speakers: [
          { name: "Rahul Mistri", role: "speaker" },
          { name: "Hardesh Chawla", role: "speaker" },
          { name: "Saurabh Suryan", role: "speaker" }
        ],
        venue: "Circle",
        startTime: "12:30 pm",
        endTime: "1:30 pm",
        day: 2,
        isInviteOnly: false,
        description: "Experiencing Through Touch & Perception.",
        image: "/temp/about/1.png"
      },
      {
        id: "day2-event2",
        title: "Epistle Session 2 - What We Take With Us",
        speakers: [
          { name: "Raghav Priyadarshi", role: "speaker" },
          { name: "Zahabiya Gabajiwala", role: "speaker" },
          { name: "Pankaj Sethi", role: "speaker" },
          { name: "Naiyya Saggi", role: "speaker" },
          { name: "Devika Khosla", role: "moderator" }
        ],
        venue: "Circle",
        startTime: "3:30 pm",
        endTime: "4:30 pm",
        day: 2,
        isInviteOnly: false,
        description: "Panel continuation with diverse perspectives.",
        image: "/temp/about/2.png"
      },
      {
        id: "day2-event3",
        title: "Afterhours",
        speakers: [],
        venue: "Show floor",
        startTime: "5:30 pm",
        endTime: "6:30 pm",
        day: 2,
        isInviteOnly: false,
        description: "Casual networking and evening interactions.",
        image: "/temp/about/3.png"
      }
    ]
  },
  {
    day: 3,
    date: "17 May 2026",
    events: [
      {
        id: "day3-event1",
        title: "Epistle Session 3 - Culture In Conversation",
        speakers: [
          { name: "Aman Nath", role: "speaker" },
          { name: "Rahul Bhushan", role: "speaker" },
          { name: "Vandana Saxena", role: "speaker" },
          { name: "Asha Sairam", role: "speaker" },
          { name: "Gaurav Jai Gupta", role: "speaker" },
          { name: "Mariyam", role: "moderator" }
        ],
        venue: "Circle",
        startTime: "2:00 pm",
        endTime: "3:00 pm",
        day: 3,
        isInviteOnly: false,
        description: "Exploring cultural narratives in design.",
        image: "/temp/about/1.png"
      },
      {
        id: "day3-event2",
        title: "Epistle Session 4 - Radical Futures",
        speakers: [
          { name: "Manish Gulati", role: "speaker" },
          { name: "Arjun Bahl", role: "speaker" },
          { name: "George Ramapuram", role: "speaker" }
        ],
        venue: "Circle",
        startTime: "3:00 pm",
        endTime: "4:00 pm",
        day: 3,
        isInviteOnly: false,
        description: "Envisioning the future of design and innovation.",
        image: "/temp/about/2.png"
      }
    ]
  }
];

export default scheduleData;
export type { ScheduleEvent, DaySchedule, Speaker };