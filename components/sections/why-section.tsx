"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_SPRING = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    n: "01",
    title: "Professional quality",
    text: "Design and code built like a real product — not a class project. We sweat the details so your org looks world-class.",
    spotlight: "rgba(129,140,248,0.11)",
    wide: true,
  },
  {
    n: "02",
    title: "AI chatbot included",
    text: "Help visitors find answers and resources, even when your team is offline. Every site ships with a custom AI assistant.",
    spotlight: "rgba(167,139,250,0.11)",
    wide: false,
  },
  {
    n: "03",
    title: "You're in the loop",
    text: "Real collaboration from kickoff to launch — clear updates, direct communication, no black box.",
    spotlight: "rgba(129,140,248,0.09)",
    wide: false,
  },
  {
    n: "04",
    title: "Focused capacity",
    text: "We take on a limited number of projects at a time so every organization gets genuine attention and care.",
    spotlight: "rgba(99,102,241,0.09)",
    wide: true,
  },
] as const;

function BentoCard({
  card,
  delay,
}: {
  card: (typeof cards)[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE_SPRING }}
      className="group relative h-full overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.08)] bg-[rgba(7,7,15,0.7)] p-7 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-[rgba(129,140,248,0.2)] hover:shadow-[0_0_0_1px_rgba(129,140,248,0.1),0_20px_48px_-12px_rgba(0,0,0,0.55)] sm:p-8"
    >
      {/* Hover spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at 30% 50%, ${card.spotlight}, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Number + rule */}
      <div className="relative mb-6 flex items-center gap-4">
        <span className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] text-[rgba(129,140,248,0.5)]">
          {card.n}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[rgba(129,140,248,0.2)] to-transparent" />
      </div>

      <h3 className="relative font-display text-xl font-bold leading-tight tracking-[-0.01em] text-foreground sm:text-2xl">
        {card.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
        {card.text}
      </p>
    </motion.div>
  );
}

export function WhySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <section
      id="why"
      className="relative scroll-mt-[calc(5.5rem+env(safe-area-inset-top,0px))] py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(148,163,184,0.07)] to-transparent"
        aria-hidden
      />

      <div className="container">
        {/* Header — left-aligned editorial style */}
        <div ref={headerRef} className="mx-auto max-w-5xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <span className="section-label">Why BotWeb</span>
          </motion.div>

          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE_SPRING }}
            className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
          >
            Built differently,
            <br />
            <span className="gradient-text">by design.</span>
          </motion.h2>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Real collaboration and real craft — the kind that usually costs tens of thousands.
          </motion.p>
        </div>

        {/* Bento grid: 1 col → 2 col (sm) → 3 col (lg) with wide cards spanning 2 */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {/* 01 — wide */}
          <div className="sm:col-span-2 lg:col-span-2">
            <BentoCard card={cards[0]} delay={0.05} />
          </div>

          {/* 02 — single */}
          <div className="sm:col-span-1 lg:col-span-1">
            <BentoCard card={cards[1]} delay={0.12} />
          </div>

          {/* 03 — single */}
          <div className="sm:col-span-1 lg:col-span-1">
            <BentoCard card={cards[2]} delay={0.18} />
          </div>

          {/* 04 — wide */}
          <div className="sm:col-span-2 lg:col-span-2">
            <BentoCard card={cards[3]} delay={0.25} />
          </div>
        </div>
      </div>
    </section>
  );
}
