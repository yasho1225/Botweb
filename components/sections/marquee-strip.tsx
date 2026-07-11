"use client";

import { motion } from "framer-motion";

const WORDS = [
  "Free for nonprofits",
  "Student-built",
  "AI-powered",
  "Professional quality",
  "Community-first",
  "No templates",
  "Real collaboration",
  "Zero cost",
];

function InnerTrack({ speed = 35 }: { speed?: number }) {
  const items = [...WORDS, ...WORDS];
  return (
    <motion.div
      className="flex shrink-0 items-center gap-0 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: speed, ease: "linear", repeat: Infinity }}
    >
      {items.map((word, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="px-7 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(154,166,189,0.8)] transition-colors hover:text-accent">
            {word}
          </span>
          <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[rgba(129,140,248,0.4)]" aria-hidden />
        </span>
      ))}
    </motion.div>
  );
}

export function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-[rgba(148,163,184,0.12)] py-3.5 bg-[rgba(3,3,6,0.6)]">
      {/* Left fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[rgb(3,3,6)] to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[rgb(3,3,6)] to-transparent" />

      <div className="flex overflow-hidden">
        <InnerTrack speed={40} />
        <InnerTrack speed={40} />
      </div>
    </div>
  );
}
