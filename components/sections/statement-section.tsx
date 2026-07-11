"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/premium-primitives";
import { EASE } from "@/lib/motion";

const STATEMENT = "Great work deserves to be seen.";
const words = STATEMENT.split(" ");

export function StatementSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      {/* Full-bleed gradient wash */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(129,140,248,0.04)] to-transparent"
        aria-hidden
      />
      {/* Horizontal rules */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(129,140,248,0.3)] to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(167,139,250,0.25)] to-transparent" aria-hidden />

      {/* Key light */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(129,140,248,0.06)] blur-[130px]"
        aria-hidden
      />

      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          {/* Section marker */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE.out }}
            className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.25em] text-[rgba(129,140,248,0.7)]"
          >
            Our belief
          </motion.p>

          {/* Word-by-word reveal */}
          <h2
            className="font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-bold leading-[1.05] tracking-tight"
            aria-label={STATEMENT}
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  initial={{ y: "105%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${
                    i >= 3 ? "gradient-text" : "text-foreground"
                  } mr-[0.28em]`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE.out }}
            className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            The organizations doing the most important work in your community
            often have the least resources to represent it. We're here to
            close that gap — one site at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9, ease: EASE.out }}
            className="mt-10"
          >
            <MagneticButton
              as="a"
              href="#contact"
              variant="gradient"
              strength={0.28}
              className="px-8 py-3.5 text-sm"
            >
              Get started — it's free
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
