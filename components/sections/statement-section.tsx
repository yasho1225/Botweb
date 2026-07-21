"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { EASE } from "@/lib/motion";

export function StatementSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = !!useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-[rgba(148,163,184,0.08)] bg-black py-20 sm:py-28 lg:py-32"
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : reduced ? { opacity: 1 } : undefined}
            transition={{ duration: 0.45, ease: EASE.out }}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent sm:mb-8"
          >
            Our belief
          </motion.p>

          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : reduced
                  ? { opacity: 1 }
                  : undefined
            }
            transition={{ duration: 0.65, delay: 0.06, ease: EASE.out }}
            className="font-display text-balance text-[clamp(2.25rem,5.5vw,4.25rem)] font-normal leading-[1.12] tracking-tight text-foreground"
          >
            Great work deserves
            <br />
            to be <span className="text-accent">seen.</span>
          </motion.h2>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : reduced ? { opacity: 1 } : undefined}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE.out }}
            className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted sm:mt-8 sm:text-lg"
          >
            Missions that matter deserve a clear online home. We help nonprofits
            and clubs show up with the same care they bring to their work —
            free, always.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : reduced ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.28, ease: EASE.out }}
            className="mt-9 sm:mt-10"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 active:scale-[0.98]"
            >
              Request a free site
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
