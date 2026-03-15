import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8D48B",
          dark: "#8B6914",
        },
        cream: "#FFF8EE",
        parchment: "#F5EDDA",
        ink: {
          DEFAULT: "#1A1410",
          light: "#3D3529",
        },
        "warm-white": "#FFFCF5",
        burgundy: "#6B1D2A",
        sage: "#5A7247",
        navy: "#1B2A4A",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3rem, 8vw, 7rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 5vw, 4.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        "display-md": [
          "clamp(1.75rem, 3.5vw, 3rem)",
          { lineHeight: "1.15" },
        ],
        "display-sm": [
          "clamp(1.25rem, 2.5vw, 2rem)",
          { lineHeight: "1.2" },
        ],
      },
      animation: {
        "float-up": "floatUp 8s ease-in-out infinite",
        "bob": "bob 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(100vh)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-10vh)", opacity: "0" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
