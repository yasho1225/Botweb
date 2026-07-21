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
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "1.5rem",
      },
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
        violet: "var(--violet)",
        cyan: "var(--cyan)",
        card: "var(--card)",
        "card-solid": "var(--card-solid)",
        "card-muted": "var(--card-muted)",
        border: "var(--border)",
        "border-bright": "var(--border-bright)",
        glass: "var(--glass)",
        "glass-border": "var(--glass-border)",
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
        card: "0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 16px 40px -12px rgba(0, 0, 0, 0.55)",
        "glow-sm": "0 0 0 1px rgba(129, 140, 248, 0.16), 0 4px 20px -4px rgba(99, 102, 241, 0.35)",
        glow: "0 0 0 1px rgba(129, 140, 248, 0.22), 0 12px 40px -8px var(--accent-glow)",
        "glow-lg":
          "0 0 0 1px rgba(129, 140, 248, 0.3), 0 0 24px -2px rgba(99, 102, 241, 0.5), 0 20px 60px -12px var(--accent-glow)",
        "glow-violet": "0 0 0 1px rgba(167, 139, 250, 0.22), 0 12px 40px -8px rgba(139, 92, 246, 0.4)",
        highlight: "0 1px 0 rgba(255, 255, 255, 0.08) inset",
      },
      borderRadius: {
        "4xl": "1.75rem",
      },
      keyframes: {
        "aurora-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, -3%) scale(1.06)" },
          "66%": { transform: "translate(-3%, 2%) scale(0.97)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.82)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "aurora-drift": "aurora-drift 18s ease-in-out infinite",
        "aurora-drift-slow": "aurora-drift 26s ease-in-out infinite reverse",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-dot": "pulse-dot 2.2s ease-in-out infinite",
        "float-y": "float-y 5s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
