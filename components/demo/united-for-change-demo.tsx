"use client";

import { Bot, Calendar, Heart, Megaphone, Users } from "lucide-react";
import Image from "next/image";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1523240795612-07048c364148?w=1400&q=85&auto=format&fit=crop";

const initiatives = [
  {
    icon: Megaphone,
    title: "Awareness drives",
    desc: "Campus campaigns on issues students care about.",
  },
  {
    icon: Users,
    title: "Community service",
    desc: "Volunteer days with local partners.",
  },
  {
    icon: Calendar,
    title: "Club meetings",
    desc: "Thursdays · Room 214 · All welcome.",
  },
];

/** Demo site — United for Change AHS, shown inside the scroll hero browser card */
export function UnitedForChangeDemo() {
  return (
    <div className="relative flex h-full min-h-[260px] w-full flex-col overflow-hidden rounded-xl bg-[#0f1419] sm:min-h-[300px]">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={HERO_PHOTO}
          alt=""
          fill
          className="object-cover object-center opacity-35"
          sizes="1024px"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1419]/95 via-[#15202b]/90 to-[#1a2332]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(249,115,22,0.14),transparent_50%)]" />
      </div>

      <header className="relative z-10 flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-white">United for Change</p>
            <p className="truncate text-[10px] font-medium uppercase tracking-wider text-orange-300/90">
              AHS Student Club
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-4 sm:flex" aria-hidden>
          {["Events", "Get involved", "About"].map((item) => (
            <span key={item} className="text-xs font-medium text-white/50">
              {item}
            </span>
          ))}
        </nav>
      </header>

      <div className="relative z-10 flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <span className="mb-3 inline-flex w-fit rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-200">
          Student-led · Service & advocacy
        </span>

        <h2 className="max-w-md font-display text-xl leading-tight text-white sm:text-2xl md:text-[1.65rem]">
          Leading change
          <span className="text-orange-300"> at AHS.</span>
        </h2>

        <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/60 sm:text-sm">
          Organizing drives, fundraisers, and community projects that make a real difference in our
          school and town.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white">
            Join the club
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            Upcoming events
          </span>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2 pt-5 sm:gap-2.5 sm:pt-6">
          {initiatives.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2.5 backdrop-blur-sm sm:rounded-xl sm:p-3"
            >
              <Icon className="mb-1.5 h-3.5 w-3.5 text-orange-300" />
              <p className="text-[10px] font-semibold leading-tight text-white sm:text-[11px]">
                {title}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-white/45">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-14 right-4 z-20 hidden items-end gap-2 sm:flex">
        <div className="max-w-[180px] rounded-xl rounded-br-sm border border-white/10 bg-[#151c26]/95 px-3 py-2.5 shadow-xl backdrop-blur-md">
          <p className="text-[11px] leading-snug text-white/75">
            Questions about meetings or how to join? Ask our club bot.
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
          <Bot className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>

      <div className="absolute bottom-3 left-4 z-20 sm:bottom-4 sm:left-5">
        <span className="rounded-md border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white/60 backdrop-blur-sm">
          unitedforchangeahs.org · Built by BotWeb
        </span>
      </div>
    </div>
  );
}
