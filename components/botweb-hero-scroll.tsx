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
      <div className="flex flex-col overflow-x-hidden pb-1 pt-0 sm:pb-0">
        <ContainerScroll
          titleComponent={
            <>
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mb-2 inline-flex max-w-[95vw] items-center justify-center rounded-full border border-border bg-card/95 px-3 py-1.5 text-[10px] font-semibold uppercase leading-snug tracking-wider text-accent shadow-sm sm:px-4 sm:py-1 sm:text-xs"
              >
                Free for nonprofits & clubs
              </motion.span>
              <h1 className="font-display text-balance text-[1.65rem] font-normal leading-[1.15] tracking-tight text-foreground min-[400px]:text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[3.35rem]">
                We Build Websites.
                <br />
                <span className="mt-1.5 block text-[1.9rem] font-normal leading-[1.08] text-accent min-[400px]:text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl">
                  You Build Impact.
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-pretty px-1 text-[0.9375rem] leading-relaxed text-muted sm:mt-5 sm:px-2 sm:text-base md:text-lg">
                Student volunteers build professional websites and AI chatbots for nonprofits and school clubs —
                completely free.
              </p>
              <div className="mx-auto mt-7 flex w-full max-w-md flex-col items-stretch gap-3 px-1 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:px-0">
                <Link
                  href="#what"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-5 py-3 text-sm font-semibold text-foreground shadow-card backdrop-blur-sm transition active:scale-[0.98] hover:border-accent/40 hover:bg-card sm:min-h-0 sm:py-2.5"
                >
                  What we build
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-glow transition active:scale-[0.98] hover:brightness-110 sm:min-h-0 sm:py-2.5"
                >
                  Request a Site
                </Link>
              </div>
              <div className="mx-auto mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
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
