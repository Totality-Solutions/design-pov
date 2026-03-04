import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design POV Brand Colors
        "pov-black": "#0A0A0A",
        "pov-white": "#F5F2ED",
        "pov-cream": "#EDE8E0",
        "pov-clay": "#C4A882",
        "pov-rust": "#B85C38",
        "pov-slate": "#2C2C2C",
        "pov-mist": "#8A8A8A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 10vw, 9rem)", { lineHeight: "0.9" }],
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "0.95" }],
        "display-lg": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1" }],
      },
      spacing: {
        "section": "clamp(4rem, 8vw, 8rem)",
        "container": "clamp(1.5rem, 5vw, 5rem)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-in": "slideIn 0.7s ease forwards",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionTimingFunction: {
        "pov": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
