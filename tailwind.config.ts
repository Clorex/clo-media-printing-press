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
          white: "#FFFFFF",
          gray: {
            dark: "#111827",
            medium: "#1F2937",
            subtle: "#6B7280",
            light: "#F9FAFB",
            border: "#E5E7EB",
          },
        },
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        brand: "0.75rem",
        "brand-lg": "1.25rem",
      },
      boxShadow: {
        brand: "0 4px 16px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
