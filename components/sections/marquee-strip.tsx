"use client";

import { useReducedMotion } from "framer-motion";

const WORDS = [
  "Custom websites",
  "AI chatbot included",
  "1–2 week launch",
  "No fees, ever",
  "Full ownership at launch",
  "Student volunteers",
  "Mobile-first design",
  "Real support after launch",
];

function Track() {
  return (
    <div className="flex shrink-0 items-center whitespace-nowrap">
      {WORDS.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-flex items-center">
          <span className="cursor-pointer px-7 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(154,166,189,0.8)] transition-colors duration-200 hover:text-accent-bright sm:text-xs">
            {word}
          </span>
          <span
            className="h-[3px] w-[3px] shrink-0 rounded-full bg-[rgba(129,140,248,0.4)]"
            aria-hidden
          />
        </span>
      ))}
    </div>
  );
}

export function MarqueeStrip() {
  const reduced = !!useReducedMotion();

  return (
    <div className="-mt-1 border-y border-[rgba(148,163,184,0.12)] bg-black">
      <div className="relative overflow-hidden py-3.5 sm:py-4">
        {reduced ? (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-4">
            {WORDS.slice(0, 4).map((word) => (
              <span
                key={word}
                className="cursor-pointer font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(154,166,189,0.8)] transition-colors duration-200 hover:text-accent-bright sm:text-xs"
              >
                {word}
              </span>
            ))}
          </div>
        ) : (
          <>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent sm:w-24"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent sm:w-24"
              aria-hidden
            />
            {/* Duplicate tracks = seamless infinite loop */}
            <div className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused]">
              <Track />
              <Track />
            </div>
            <span className="sr-only">{WORDS.join(". ")}</span>
          </>
        )}
      </div>
    </div>
  );
}
