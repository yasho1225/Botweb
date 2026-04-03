"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const HERO_IMG =
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1400&q=80";

/** 21st.dev / Aceternity scroll hero + BotWeb copy. */
export function BotWebHeroScroll() {
  return (
    <section className="relative mesh-hero grain pt-2 sm:pt-3 md:pt-4">
      <div className="flex flex-col overflow-x-hidden pb-0 pt-0">
        <ContainerScroll
          titleComponent={
            <>
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mb-2 inline-flex items-center rounded-full border border-border bg-card/95 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent shadow-sm"
              >
                Free for nonprofits & clubs
              </motion.span>
              <h1 className="font-display text-balance text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.35rem]">
                We Build Websites.
                <br />
                <span className="mt-1 block text-4xl font-normal leading-[1.05] text-accent sm:text-5xl md:text-6xl lg:text-7xl">
                  You Build Impact.
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty px-2 text-sm leading-relaxed text-muted sm:text-base md:text-lg">
                BotWeb is a student-run initiative that designs and builds free, professional websites for nonprofits,
                school clubs, and community organizations — no cost, no strings attached.
              </p>
              <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#what"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-5 py-2.5 text-sm font-semibold text-foreground shadow-card backdrop-blur-sm transition hover:border-accent/40 hover:bg-card"
                >
                  What we build
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
                >
                  Request a Site
                </Link>
              </div>
              <div className="mx-auto mt-8 flex flex-wrap justify-center gap-2">
                {["100% free", "Student-run"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card/90 px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-sm sm:px-4 sm:text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          }
        >
          <Image
            src={HERO_IMG}
            alt="Laptop on a workspace — free web design for nonprofits"
            height={720}
            width={1400}
            className="mx-auto h-full rounded-2xl object-cover object-left-top"
            draggable={false}
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </ContainerScroll>
      </div>
    </section>
  );
}
