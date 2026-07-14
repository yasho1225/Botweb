"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { EASE } from "@/lib/motion";

// Same workspace photograph the original site shipped with — carried into v2
const HERO_PHOTO =
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1400&q=80";

const SPECS = [
  { label: "Nonprofits served", value: "8+" },
  { label: "Cost to you", value: "$0" },
  { label: "Typical launch", value: "6–8 weeks" },
  { label: "Built by", value: "Student volunteers" },
] as const;

function up(delay: number, reduced: boolean) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: EASE.out },
  };
}

function Line({
  children,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  delay: number;
  reduced: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={reduced ? false : { y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroSection() {
  const reduced = !!useReducedMotion();

  return (
    <section
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* Asymmetric glow — top-left, barely there */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 18% 8%, rgba(99,102,241,0.11), transparent 62%)",
        }}
        aria-hidden
      />

      {/* Film grain */}
      <div className="noise-overlay pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:px-6">
        {/* ── Main block: copy left, photograph right ── */}
        <div className="grid flex-1 content-center gap-12 pb-14 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-16">
          <div>
            {/* Kicker: rule + status */}
            <motion.div
              {...up(0.05, reduced)}
              className="mb-8 flex items-center gap-4 sm:mb-10"
            >
              <span className="h-px w-10 bg-white/25 sm:w-14" aria-hidden />
              <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[rgba(148,163,184,0.6)]">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(74,222,128,0.85)]"
                  aria-hidden
                />
                Now accepting applications
              </span>
            </motion.div>

            {/* Headline — serif italic accent on one word */}
            <h1
              className="font-display font-bold tracking-[-0.045em] text-foreground"
              style={{ fontSize: "clamp(2.8rem,6vw,5.1rem)", lineHeight: 1.03 }}
            >
              <Line delay={0.12} reduced={reduced}>
                You build impact.
              </Line>
              <Line delay={0.24} reduced={reduced}>
                <span className="text-[rgba(148,163,184,0.55)]">We build </span>
                <span className="serif-accent font-normal tracking-[-0.01em] text-foreground">
                  websites.
                </span>
              </Line>
            </h1>

            {/* Subhead */}
            <motion.p
              {...up(0.5, reduced)}
              className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg"
            >
              BotWeb is a student volunteer team. We design, build, and launch
              professional websites for nonprofits — AI chatbot included,{" "}
              <span className="font-medium text-[rgba(248,250,252,0.78)]">
                completely free.
              </span>
            </motion.p>

            {/* CTAs — labels carried from the original site */}
            <motion.div
              {...up(0.64, reduced)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
            >
              <a
                href="#contact"
                className="btn-sheen inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#030306] transition-all duration-200 hover:brightness-95 active:scale-[0.98] sm:min-h-0"
              >
                Request a free site
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#why"
                className="group inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground sm:min-h-0"
              >
                What we build
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </motion.div>
          </div>

          {/* ── Photograph — editorial panel with archival caption ── */}
          <motion.figure
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE.out }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[16/10] lg:aspect-[4/4.6]">
              <Image
                src={HERO_PHOTO}
                alt="A laptop workspace where websites are built"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover"
                style={{ filter: "saturate(0.72) contrast(1.05)" }}
              />
              {/* Indigo-tinted wash so the photo sits inside the palette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(3,3,6,0.12) 0%, rgba(3,3,6,0.5) 100%), rgba(99,102,241,0.1)",
                }}
                aria-hidden
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(148,163,184,0.4)]">
              <span>Fig. 01</span>
              <span>Hand-built, not templated</span>
            </figcaption>
          </motion.figure>
        </div>

        {/* ── Spec sheet — pinned to the bottom of the hero ── */}
        <motion.dl
          {...up(0.85, reduced)}
          className="grid grid-cols-2 border-t border-white/10 md:grid-cols-4"
          aria-label="Key facts"
        >
          {SPECS.map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex flex-col gap-1.5 py-6 pr-4 ${
                i % 2 === 1 ? "border-l border-white/10 pl-5" : ""
              } ${
                i === 2 ? "border-t border-white/10 md:border-t-0 md:border-l md:pl-5" : ""
              } ${i === 3 ? "border-t border-white/10 md:border-t-0" : ""}`}
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(148,163,184,0.4)]">
                {label}
              </dt>
              <dd className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030306] to-transparent"
        aria-hidden
      />
    </section>
  );
}
