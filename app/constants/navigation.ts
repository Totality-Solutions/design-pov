// --- Types ---
export type SubLink = { 
  label: string; 
  href: string 
};

export type SubmenuContent = {
  mainHref: string; // Added: The link for the main header item itself
  video: string;
  col1Title?: string;
  col1Links?: SubLink[];
  col2Title?: string;
  col2Links?: SubLink[];
};

// --- Navigation Data ---
export const NAV_DATA: Record<string, SubmenuContent> = {
  About: {
    mainHref: "/about",
    video: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_30MB.mp4",
    col1Title: "Company",
    col1Links: [
      { label: "Our Story", href: "/about/story" }, 
      { label: "Mission", href: "/about/mission" }, 
      { label: "Team", href: "/about/team" }
    ],
    col2Title: "Impact",
    col2Links: [
      { label: "Sustainability", href: "/impact/sustainability" }, 
      { label: "Community", href: "/impact/community" }, 
      { label: "Report", href: "/impact/report" }
    ],
  },
  Ecosystem: {
    mainHref: "/ecosystem",
    video: "/video4.mp4",
    col1Links: [
      { label: "Circle", href: "/ecosystem/hub" }, 
      { label: "Elevate", href: "/ecosystem/blogs" }, 
      { label: "Objects", href: "/ecosystem/directory" },
      { label: "Afterhours", href: "/ecosystem/directory" }
    ],
  },
  "2026 Edition": {
    mainHref: "/edition",
    video: "/video1.mp4",
    col1Title: "Theme",
    col1Links: [
      { label: "Theme", href: "/edition-26/theme" }, 
      { label: "Brands", href: "/edition-26/brands" }, 
      { label: "Core", href: "/edition-26/core" }
    ],
    col2Title: "Details",
    col2Links: [
      { label: "Schedule", href: "/edition-26/schedule" }, 
      { label: "Art", href: "/edition-26/art" }, 
      { label: "Speakers", href: "/edition-26/speakers" }
    ],
  },
  Collaborate: {
    mainHref: "/collaborate",
    video: "/video2.mp4",
    col1Title: "Partnerships",
    col1Links: [
      { label: "Brands", href: "/collaborate/brands" }, 
      { label: "Agencies", href: "/collaborate/agencies" }, 
      { label: "Creators", href: "/collaborate/creators" }
    ],
    col2Title: "Opportunities",
    col2Links: [
      { label: "Sponsorship", href: "/collaborate/sponsorship" }, 
      { label: "Exhibit", href: "/collaborate/exhibit" }, 
      { label: "Press Kit", href: "/collaborate/press" }
    ],
  },
  Magazine: {
    mainHref: "/magazine",
    video: "/video3.mp4",
    col1Title: "Content",
    col1Links: [
      { label: "Latest Issue", href: "/magazine/latest" }, 
      { label: "Interviews", href: "/magazine/interviews" }, 
      { label: "Archive", href: "/magazine/archive" }
    ],
    col2Title: "Contribute",
    col2Links: [
      { label: "Submissions", href: "/magazine/submissions" }, 
      { label: "Guidelines", href: "/magazine/guidelines" }, 
      { label: "Work With Us", href: "/magazine/jobs" }
    ],
  },
  
};

export const NAV_LABELS = Object.keys(NAV_DATA);