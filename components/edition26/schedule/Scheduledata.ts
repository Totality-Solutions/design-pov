import { cdn } from "@/lib/cdn";
interface Speaker {
  name: string;
  role?: "moderator" | "speaker";
}

interface ScheduleEvent {
  id: string;
  title: string;
  subtitle?: string; // NEW (for Epistle themes etc.)
  speakers: Speaker[];
  venue: "Circle" | "Show floor" | "Workshop Zone";
  startTime: string;
  endTime: string;
  day: 1 | 2 | 3;
  isInviteOnly?: boolean;
  inviteOnlyLink?: string;
  description?: string;
  image?: string;
  partners?: string[]; // NEW (Design Pataki, Epistle, etc.)
  categoryTag?: string; // NEW (Epistle / Workshop / Elevate)
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
        id: "day1-event0",
        title: "Show Opening",
        speakers: [],
        venue: "Show floor",
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        day: 1,
        description: "Opening of the exhibition floor.",
        image: cdn("/temp/about/1.png")
      },
      {
        id: "day1-event1",
        title: "Welcome Note",
        speakers: [],
        venue: "Circle",
        startTime: "12:00 PM",
        endTime: "1:00 PM",
        day: 1,
        description: "Opening address for Design POV.",
        image: cdn("/temp/about/1.png")
      },
      {
        id: "day1-event2",
        title: "The Art Of Sourcing",
        speakers: [
          { name: "Jasmine Jhaveri" },
          { name: "Mita Mehta" },
          { name: "Riddhika Jesrani" },
          { name: "Saniya Tadha" },
          { name: "Maitri Shah" },
          { name: "Esha Gupta", role: "moderator" }
        ],
        venue: "Circle",
        startTime: "3:00 PM",
        endTime: "4:00 PM",
        day: 1,
        partners: ["Design Pataki"], // ADDED
        description: "A conversation on sourcing, curation and material storytelling in design.",
        image: cdn("/temp/about/2.png")
      },
      {
        id: "day1-event3",
        title: "Fireside Chat and Walkthrough",
        speakers: [
          { name: "Ridhi Khosla Jalan" },
          { name: "Tanmay Bhat" }
        ],
        venue: "Circle",
        startTime: "5:00 PM",
        endTime: "6:30 PM",
        day: 1,
        description: "An intimate walkthrough of ideas, journeys and perspectives.",
        image: cdn("/temp/about/3.png")
      },
      {
        id: "day1-event4",
        title: "The Macallan Experience",
        speakers: [],
        venue: "Circle",
        startTime: "6:30 PM",
        endTime: "8:30 PM",
        day: 1,
        isInviteOnly: true,
        inviteOnlyLink: "https://povindex.designpovindia.com/events/the-macallan-experience",
        description: "An exclusive curated experience.",
        image: cdn("/temp/about/4.png")
      },
      {
        id: "day1-event5",
        title: "All Home Networking Night",
        speakers: [],
        venue: "Show floor",
        startTime: "8:00 PM",
        endTime: "10:30 PM",
        day: 1,
        isInviteOnly: true,
        inviteOnlyLink: "https://povindex.designpovindia.com/events/all-home-networking-night",
        description: "An evening of networking with the design community.",
        image: cdn("/temp/about/5.png")
      }
    ]
  },
  {
    day: 2,
    date: "16 May 2026",
    events: [
      {
        id: "day2-event1",
        title: "The Body as Instrument",
        subtitle: "Experiencing Through Touch & Perception",
        speakers: [
          { name: "Rahul Mistri" },
          { name: "Hardesh Chawla" },
          { name: "Saurabh Suryan" }
        ],
        venue: "Circle",
        startTime: "12:30 PM",
        endTime: "1:00 PM",
        day: 2,
        partners: ["Epistle"], // ADDED
        categoryTag: "Epistle",
        description: "A sensory exploration of how the body interacts with space and material.",
        image: cdn("/temp/about/1.png")
      },
      {
        id: "day2-event2",
        title: "Art Workshop - Focus in Repetition",
        speakers: [],
        venue: "Workshop Zone",
        startTime: "2:30 PM",
        endTime: "3:30 PM",
        day: 2,
        partners: ["Happy Hikkups"], // ADDED
        categoryTag: "Workshop",
        description: "Exploring rhythm and repetition as a creative process.",
        image: cdn("/temp/about/2.png")
      },
      {
        id: "day2-event3",
        title: "What We Take With Us",
        speakers: [
          { name: "Raghav Priyadarshi" },
          { name: "Zahabiya Gabajiwala" },
          { name: "Pankaj Sethi" },
          { name: "Naiyya Saggi" },
          { name: "Devika Khosla", role: "moderator" }
        ],
        venue: "Circle",
        startTime: "3:30 PM",
        endTime: "4:30 PM",
        day: 2,
        partners: ["Epistle"],
        categoryTag: "Epistle",
        description: "A dialogue on memory, identity and what we carry forward in design.",
        image: cdn("/temp/about/3.png")
      },
      {
        id: "day2-event4",
        title: "Art Workshop - Touch as Design Language",
        speakers: [],
        venue: "Workshop Zone",
        startTime: "3:30 PM",
        endTime: "4:30 PM",
        day: 2,
        partners: ["Happy Hikkups"],
        categoryTag: "Workshop",
        description: "Understanding touch as a medium of expression in design.",
        image: cdn("/temp/about/4.png")
      },
      {
        id: "day2-event5",
        title: "Afterparty - Essentia x DesignPOV",
        speakers: [],
        venue: "Show floor",
        startTime: "8:00 PM",
        endTime: "11:59 PM",
        day: 2,
        isInviteOnly: true,
        inviteOnlyLink: "https://povindex.designpovindia.com/events/essentia-x-designpov-afterparty",
        categoryTag: "POV Elevate", // ADDED
        description: "An invite-only closing celebration with music and community.",
        image: cdn("/temp/about/5.png")
      }
    ]
  },
  {
    day: 3,
    date: "17 May 2026",
    events: [
      {
        id: "day3-event1",
        title: "Art Workshop - Urban Pop Canvas",
        speakers: [],
        venue: "Workshop Zone",
        startTime: "12:30 PM",
        endTime: "1:30 PM",
        day: 3,
        partners: ["Happy Hikkups"],
        categoryTag: "Workshop",
        description: "A bold exploration of contemporary visual expression.",
        image: cdn("/temp/about/1.png")
      },
      {
        id: "day3-event2",
        title: "Art Workshop - Design What You Don’t See",
        speakers: [],
        venue: "Workshop Zone",
        startTime: "1:30 PM",
        endTime: "2:30 PM",
        day: 3,
        partners: ["Happy Hikkups"],
        categoryTag: "Workshop",
        description: "Designing through intuition and the unseen.",
        image: cdn("/temp/about/2.png")
      },
      {
        id: "day3-event3",
        title: "Culture In Conversation",
        speakers: [
          { name: "Aman Nath" },
          { name: "Rahul Bhushan" },
          { name: "Vandana Saxena" },
          { name: "Asha Sairam" },
          { name: "Gaurav Jai Gupta" },
          { name: "Mariyam", role: "moderator" }
        ],
        venue: "Circle",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
        day: 3,
        partners: ["Epistle"],
        categoryTag: "Epistle",
        description: "Exploring how culture shapes contemporary design narratives.",
        image: cdn("/temp/about/3.png")
      },
      {
        id: "day3-event4",
        title: "Solo Talk - Radical Futures",
        speakers: [
          { name: "Manish Gulati" },
          { name: "Arjun Bahl" }
        ],
        venue: "Circle",
        startTime: "3:00 PM",
        endTime: "3:45 PM",
        day: 3,
        partners: ["Epistle"],
        categoryTag: "Epistle",
        description: "Speculating the future of design, architecture and innovation.",
        image: cdn("/temp/about/4.png")
      }
    ]
  }
];

export default scheduleData;
export type { ScheduleEvent, DaySchedule, Speaker };