"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Calendar,
  Globe,
  HandHeart,
  Leaf,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { EASE } from "@/lib/motion";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=85&auto=format&fit=crop";

const features = [
  { icon: Globe, label: "Custom websites" },
  { icon: Bot, label: "AI chatbots" },
  { icon: Zap, label: "Always free" },
];

const navLinks = ["Programs", "About", "Volunteer", "Contact"];

const programs = [
  {
    icon: HandHeart,
    title: "Food pantry",
    desc: "Weekly groceries for families in need.",
    tint: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Users,
    title: "Youth mentors",
    desc: "Pairing students with caring adults.",
    tint: "bg-sky-50 text-sky-700",
  },
  {
    icon: Calendar,
    title: "Community events",
    desc: "Workshops, drives, and family nights.",
    tint: "bg-amber-50 text-amber-700",
  },
];

const stats = [
  { value: "1,200+", label: "Families served" },
  { value: "300+", label: "Volunteers" },
  { value: "12", label: "Active programs" },
];

export function HeroPreviewMockup() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-x-8 bottom-0 top-1/4 rounded-full bg-indigo-500/10 blur-[90px]"
        aria-hidden
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: EASE.out }}
        className="relative"
      >
        {/* Built by badge */}
        <div className="absolute -top-2.5 left-3 z-20 sm:-top-3 sm:left-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-bright bg-[#0c0c14] px-2.5 py-1 text-[10px] font-medium text-white shadow-glow sm:text-[11px]">
            <Sparkles className="h-3 w-3 text-accent-bright" />
            Built by BotWeb
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#14141c] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] sm:rounded-2xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-2.5 border-b border-white/[0.06] bg-[#0e0e14] px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5">
            <div className="flex shrink-0 gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex min-w-0 flex-1 justify-center">
              <div className="flex w-full max-w-xs items-center gap-2 rounded-md border border-white/[0.06] bg-black/40 px-2.5 py-0.5 sm:max-w-sm sm:px-3 sm:py-1">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500/80" aria-hidden />
                <span className="truncate font-mono text-[10px] text-white/50 sm:text-[11px]">
                  greenvalley.org
                </span>
              </div>
            </div>
          </div>

          {/* Sample nonprofit site */}
          <div className="relative flex aspect-[4/3] w-full flex-col overflow-hidden bg-[#f8faf9] sm:aspect-[16/10]">
            {/* Site header */}
            <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/95 px-3 py-2 backdrop-blur-sm sm:px-5 sm:py-2.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm sm:h-7 sm:w-7">
                  <Leaf className="h-3.5 w-3.5 text-white" />
                </span>
                <div className="leading-none">
                  <span className="block text-[11px] font-bold tracking-tight text-slate-900 sm:text-sm">
                    Green Valley
                  </span>
                  <span className="hidden text-[8px] font-medium uppercase tracking-wider text-emerald-600 sm:block">
                    Community nonprofit
                  </span>
                </div>
              </div>

              <nav className="hidden items-center gap-3.5 md:flex" aria-hidden>
                {navLinks.map((item, i) => (
                  <span
                    key={item}
                    className={
                      i === 0
                        ? "text-[10px] font-semibold text-emerald-600"
                        : "text-[10px] font-medium text-slate-500"
                    }
                  >
                    {item}
                  </span>
                ))}
              </nav>

              <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[9px] font-semibold text-white shadow-[0_2px_8px_-2px_rgba(5,150,105,0.5)] sm:px-3.5 sm:text-[10px]">
                Donate
              </span>
            </header>

            {/* Photo hero */}
            <div className="relative min-h-0 flex-1">
              <Image
                src={HERO_PHOTO}
                alt="Volunteers at a community event — example nonprofit site built by BotWeb"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 1024px"
                className="object-cover object-[center_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#052e1f]/92 via-[#052e1f]/55 to-[#052e1f]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#052e1f]/80 via-transparent to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-center px-3 py-3 sm:px-6 sm:py-4">
                <span className="mb-1.5 inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-emerald-200 sm:mb-2 sm:px-2.5 sm:text-[9px]">
                  Serving our community since 2012
                </span>

                <h3 className="max-w-[85%] text-base font-bold leading-[1.15] tracking-tight text-white sm:max-w-md sm:text-2xl md:text-[1.65rem]">
                  Helping families thrive,{" "}
                  <span className="text-emerald-300">together.</span>
                </h3>

                <p className="mt-1.5 hidden max-w-sm text-[10px] leading-relaxed text-white/70 sm:block sm:text-[11px]">
                  Programs, resources, and volunteer sign-ups — one site for your whole
                  community.
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 sm:mt-3.5 sm:gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[8px] font-semibold text-white shadow-lg sm:px-3.5 sm:py-1.5 sm:text-[10px]">
                    Volunteer with us
                    <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </span>
                  <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[8px] font-semibold text-white backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-[10px]">
                    Our programs
                  </span>
                </div>
              </div>

              {/* Event pill */}
              <div className="absolute bottom-2 left-3 z-10 sm:bottom-3 sm:left-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2 py-1 text-[8px] font-medium text-white/90 backdrop-blur-md sm:px-2.5 sm:text-[9px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Next event · Sat 10am · Food drive
                </span>
              </div>
            </div>

            {/* Programs + stats strip */}
            <div className="relative z-10 shrink-0 border-t border-slate-200/80 bg-white">
              <div className="grid grid-cols-3 gap-1 border-b border-slate-100 px-2 py-2 sm:gap-1.5 sm:px-4 sm:py-2.5">
                {programs.map(({ icon: Icon, title, desc, tint }) => (
                  <div
                    key={title}
                    className="rounded-lg border border-slate-100 bg-slate-50/80 p-1.5 sm:rounded-xl sm:p-2"
                  >
                    <span
                      className={`mb-1 inline-flex h-5 w-5 items-center justify-center rounded-md sm:h-6 sm:w-6 sm:rounded-lg ${tint}`}
                    >
                      <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </span>
                    <p className="text-[8px] font-semibold leading-tight text-slate-900 sm:text-[9px]">
                      {title}
                    </p>
                    <p className="mt-0.5 hidden line-clamp-2 text-[7px] leading-snug text-slate-500 sm:block sm:text-[8px]">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-100 px-1 py-1.5 sm:px-3 sm:py-2">
                {stats.map(({ value, label }) => (
                  <div key={label} className="px-1 text-center sm:px-2">
                    <p className="text-[10px] font-bold text-emerald-700 sm:text-xs">{value}</p>
                    <p className="truncate text-[7px] text-slate-500 sm:text-[8px]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chatbot widget */}
            <div className="absolute bottom-[4.2rem] right-2 z-20 flex items-end gap-1.5 sm:bottom-[5.4rem] sm:right-3 sm:gap-2">
              <div className="hidden max-w-[145px] rounded-xl rounded-br-sm border border-white/20 bg-white/95 px-2.5 py-2 shadow-xl backdrop-blur-md sm:block sm:max-w-[165px]">
                <p className="text-[9px] leading-snug text-slate-600 sm:text-[10px]">
                  Hi! Ask about programs, hours, or volunteering.
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-violet shadow-lg ring-2 ring-white sm:h-9 sm:w-9">
                <Bot className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45, ease: EASE.out }}
        className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3"
      >
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-card-solid/30 px-3 py-2.5 sm:rounded-xl sm:py-3"
          >
            <Icon className="h-4 w-4 shrink-0 text-accent" />
            <span className="text-sm font-medium text-foreground">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
