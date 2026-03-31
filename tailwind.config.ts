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
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        background: "#ffffff",
        foreground: "#0f172a",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        muted: {
          DEFAULT: "#f8f7ff",
          foreground: "#475569",
        },
        accent: {
          DEFAULT: "#f8f7ff",
          foreground: "#0f172a",
        },
        input: "#e2e8f0",
        ring: "#6366f1",
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        success: "#22c55e",
      },
    },
  },
  plugins: [],
};
export default config;
