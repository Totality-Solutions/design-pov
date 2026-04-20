import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
//     extend: {
//       colors: {
//         "pov-black": "var(--color-black)",
//         "pov-white": "var(--color-white)",
//         "pov-cream": "#ffffff",
//         "pov-clay": "#ffffff",
//         "pov-rust": "#B85C38",
//         "pov-slate": "#2C2C2C",
//         "pov-mist": "#8A8A8A",
//         "primary-blue": "var(--primary-blue)",
//         "primary-red": "var(--primary-red)",
//       },
//       fontFamily: {
//         display: ["var(--font-family)"],
//       },
//       fontSize: {
//         // Static Clamp Sizes
//         "display-2xl": ["clamp(4rem, 10vw, 9rem)", { lineHeight: "0.9" }],
//         "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "0.95" }],
//         "display-lg": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1" }],
//         h7: '40px',

// // --- DESKTOP ---
//   "hero": "var(--text-hero)",
//   "h1": "var(--text-h1)",
//   "h2": "var(--text-h2)",
//   "h3": "var(--text-h3)",
//   "body": "var(--text-body)",
//   "small": "var(--text-small)",

//   // --- TABLET ---
//   // Ensure the variable name inside var() matches the @theme inline exactly
//   "hero-tab": "var(--text-hero-tab)",
//   "h1-tab": "var(--text-h1-tab)",
//   "h2-tab": "var(--text-h2-tab)",
//   "h3-tab": "var(--text-h3-tab)",
//   "body-tab": "var(--text-body-tab)",
//   "small-tab": "var(--text-small-tab)",

//   // --- MOBILE ---
//   "hero-mobile": "var(--text-hero-mobile)",
//   "h1-mobile": "var(--text-h1-mobile)",
//   "h2-mobile": "var(--text-h2-mobile)",
//   "h3-mobile": "var(--text-h3-mobile)",
//   "body-mobile": "var(--text-body-mobile)",
//   "small-mobile": "var(--text-small-mobile)",
//       },
//       letterSpacing: {
//         "h1": "var(--tracking-h1)",
//         "h2": "var(--tracking-h2)",
//         "cta": "var(--tracking-cta)",
//       },
//       spacing: {
//         "section": "clamp(4rem, 8vw, 8rem)",
//         "container": "clamp(1.5rem, 5vw, 5rem)",
//         // Footer & Flare Layout Variables
//         "footer-col": "var(--footer-col-width)",
//         "flare-base": "var(--base-flare-width)",
//         "footer-px": "var(--footer-px)",
//         "footer-py-l": "var(--footer-py-left)",
//         "footer-py-r": "var(--footer-py-right)",
//         "footer-gap": "var(--footer-gap-links)",
//       },
//       transitionTimingFunction: {
//         "pov": "var(--transition-default)",
//         "pov-slow": "var(--transition-slow)",
//       },
//       animation: {
//         "fade-up": "fadeUp 0.8s ease forwards",
//         "fade-in": "fadeIn 0.6s ease forwards",
//         "slide-in": "slideIn 0.7s ease forwards",
//         "marquee": "marquee 25s linear infinite",
//       },
//       keyframes: {
//         fadeUp: {
//           "0%": { opacity: "0", transform: "translateY(30px)" },
//           "100%": { opacity: "1", transform: "translateY(0)" },
//         },
//         fadeIn: {
//           "0%": { opacity: "0" },
//           "100%": { opacity: "1" },
//         },
//         slideIn: {
//           "0%": { opacity: "0", transform: "translateX(-20px)" },
//           "100%": { opacity: "1", transform: "translateX(0)" },
//         },
//         marquee: {
//           "0%": { transform: "translateX(0)" },
//           "100%": { transform: "translateX(-50%)" },
//         },
//       },
//     },
  },
  plugins: [],
};

export default config;