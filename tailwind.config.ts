import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { lg: "1024px", xl: "1140px" },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-bright": "var(--accent-bright)",
        "accent-soft": "var(--accent-soft)",
        card: "var(--card)",
        "card-muted": "var(--card-muted)",
        border: "var(--border)",
        surface: "var(--surface)",
        "surface-deep": "var(--surface-deep)",
        elevated: "var(--elevated)",
        ink: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        ring: "var(--ring)",
        input: "var(--input)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-dm)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 20px 50px -12px rgba(0, 0, 0, 0.45)",
        card: "0 1px 0 rgba(255, 255, 255, 0.04), 0 16px 40px -12px rgba(0, 0, 0, 0.55)",
        glow: "0 0 0 1px rgba(129, 140, 248, 0.22), 0 12px 40px -8px var(--accent-glow)",
      },
      borderRadius: {
        "4xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
