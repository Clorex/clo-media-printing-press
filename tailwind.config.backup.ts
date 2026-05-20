import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F97316",
          orangeDark: "#EA580C",
          orangeLight: "#FED7AA",
          white: "#FFFFFF",
          gray: {
            dark: "#111827",
            medium: "#1F2937",
            subtle: "#6B7280",
            light: "#F3F4F6",
            border: "#E5E7EB",
          },
        },
      },
      fontFamily: {
        delight: ["Delight", "Georgia", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4rem", { lineHeight: "1.1", fontWeight: "700" }],
        "display-lg": ["3rem", { lineHeight: "1.1", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
        "display-sm": ["1.875rem", { lineHeight: "1.2", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
      },
      spacing: {
        section: "5rem",
        "section-sm": "3rem",
        "section-lg": "8rem",
      },
      borderRadius: {
        brand: "0.75rem",
        "brand-lg": "1.25rem",
        "brand-xl": "2rem",
      },
      boxShadow: {
        "brand-sm": "0 2px 8px rgba(0,0,0,0.08)",
        brand: "0 4px 16px rgba(0,0,0,0.10)",
        "brand-lg": "0 8px 32px rgba(0,0,0,0.12)",
        "brand-orange": "0 4px 16px rgba(249,115,22,0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
