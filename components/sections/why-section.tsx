"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Bot, KeyRound, type LucideIcon } from "lucide-react";
import { EASE } from "@/lib/motion";

const cards: {
  n: string;
  title: string;
  text: string;
  icon: LucideIcon;
  spotlight: string;
}[] = [
  {
    n: "01",
    title: "Professional quality, zero cost",
    text: "Design and code built like a real product — not a class project. Your org gets something it could never afford, completely free.",
    icon: BadgeCheck,
    spotlight: "rgba(129,140,248,0.11)",
  },
  {
    n: "02",
    title: "AI chatbot included",
    text: "Every site ships with a custom AI assistant that answers questions and guides visitors 24/7 — no extra staff needed.",
    icon: Bot,
    spotlight: "rgba(167,139,250,0.11)",
  },
  {
    n: "03",
    title: "Yours to keep",
    text: "Full ownership at launch — all assets, accounts, and training handed over so your team can run it independently.",
    icon: KeyRound,
    spotlight: "rgba(129,140,248,0.09)",
  },
];

const viewport = { once: true, amount: 0.35, margin: "0px 0px -8% 0px" } as const;

function BentoCard({
  card,
  delay,
}: {
  card: (typeof cards)[number];
  delay: number;
}) {
  const reduced = !!useReducedMotion();
  const Icon = card.icon;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewport}
      transition={{ duration: 0.55, delay, ease: EASE.out }}
      whileHover={reduced ? undefined : { y: -3 }}
      className="group relative h-full cursor-default overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.08)] bg-[rgba(12,12,18,0.85)] p-7 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-[rgba(129,140,248,0.22)] hover:shadow-[0_0_0_1px_rgba(129,140,248,0.1),0_20px_48px_-12px_rgba(0,0,0,0.55)] sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at 30% 50%, ${card.spotlight}, transparent 70%)`,
        }}
        aria-hidden
      />

      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] text-[rgba(129,140,248,0.5)]">
            {card.n}
          </span>
          <div className="h-px w-10 bg-gradient-to-r from-[rgba(129,140,248,0.25)] to-transparent sm:w-14" />
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(129,140,248,0.18)] bg-accent-soft text-accent transition-colors duration-300 group-hover:border-[rgba(129,140,248,0.35)] group-hover:bg-[rgba(129,140,248,0.16)]"
          aria-hidden
        >
          <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
        </span>
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
  const reduced = !!useReducedMotion();

  return (
    <section
      id="why"
      className="relative w-full scroll-mt-[5.25rem] py-12 sm:scroll-mt-24 sm:py-14 md:py-20"
    >
      <div id="what" className="pointer-events-none absolute -top-24" aria-hidden />

      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.45, ease: EASE.out }}
          >
            <span className="section-label">Why BotWeb</span>
          </motion.div>

          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={
              reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.06, ease: EASE.out }}
            className="mt-4 font-display text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
          >
            Built differently,
            <br />
            <span className="text-accent">by design.</span>
          </motion.h2>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={
              reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            viewport={viewport}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE.out }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Real collaboration and real craft — the kind that usually costs tens of
            thousands.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <BentoCard card={cards[0]} delay={0.05} />
          </div>
          <div className="sm:col-span-1 sm:row-span-2 lg:col-span-1">
            <BentoCard card={cards[1]} delay={0.12} />
          </div>
          <div className="sm:col-span-1 lg:col-span-2">
            <BentoCard card={cards[2]} delay={0.2} />
          </div>
        </div>
      </div>
    </section>
  );
}
