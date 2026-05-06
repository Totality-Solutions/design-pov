// --- Types ---
export type SubLink = { 
  label: string; 
  href: string 
};

export type SubmenuContent = {
  mainHref: string; // Added: The link for the main header item itself
  video?: string;
  image?: string;
  filetype?: string;
  col1Title?: string;
  col1Links?: SubLink[];
  col2Title?: string;
  col2Links?: SubLink[];
};

// --- Navigation Data ---
export const NAV_DATA: Record<string, SubmenuContent> = {
  About: {
    mainHref: "/about",
    col1Title: "",
    col1Links: [],
    col2Title: "Impact",
    col2Links: [
      { label: "Sustainability", href: "/impact/sustainability" }, 
      { label: "Community", href: "/impact/community" }, 
      { label: "Report", href: "/impact/report" }
    ],
  },
  Ecosystem: {
    mainHref: "/ecosystem",
    image: "/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg",
    filetype: "image",
    col1Links: [
      { label: "Circle", href: "/ecosystem/hub" }, 
      { label: "Elevate", href: "/ecosystem/blogs" }, 
      { label: "Objects", href: "/ecosystem/directory" },
      { label: "Afterhours", href: "/ecosystem/directory" }
    ],
  },
  "2026 Edition": {
    mainHref: "/edition",
    image: "/qr/ticket-qr.svg",
    filetype: "image",
    col1Title: "",
    col1Links: [
      { label: "Theme", href: "/edition/theme" }, 
      { label: "Brands", href: "/edition/brands" }, 
      { label: "Core", href: "/edition/core" },
      { label: "Schedule", href: "/edition/schedule" },
      // { label: "Art", href: "/edition/art" },
    ],
  },
  Collaborate: {
    mainHref: "/collaborate",
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