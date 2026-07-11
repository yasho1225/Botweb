"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/premium-primitives";
import { EASE } from "@/lib/motion";

const orgs = ["nonprofits", "food banks", "school clubs", "shelters", "arts orgs"];

export function HeroSection() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % orgs.length), 2200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-[calc(6rem+env(safe-area-inset-top,0px))] text-center"
      aria-label="Hero"
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(148,163,184,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
        }}
        aria-hidden
      />

      {/* Subtle top glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[55vh] w-[60vw] -translate-x-1/2 rounded-full bg-[rgba(99,102,241,0.07)] blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-4xl">
        {/* Label */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE.out }}
          className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(148,163,184,0.5)]"
        >
          By students · For communities
        </motion.p>

        {/* Headline */}
        <h1 className="font-display font-bold leading-[1.06] tracking-[-0.035em]">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[clamp(2.6rem,5.8vw,5.25rem)] text-foreground"
          >
            We build free websites
          </motion.span>

          <motion.span
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[clamp(2.6rem,5.8vw,5.25rem)] text-foreground"
          >
            for{" "}
            {/* Fixed-width container so the page doesn't shift as words swap */}
            <span className="relative inline-block min-w-[5ch] align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={orgs[index]}
                  initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-text inline-block"
                >
                  {orgs[index]}
                </motion.span>
              </AnimatePresence>
            </span>
            .
          </motion.span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: EASE.out }}
          className="mx-auto mt-6 max-w-[30rem] text-pretty text-base leading-relaxed text-muted"
        >
          BotWeb is a student-run nonprofit. We design, build, and launch
          custom websites with AI chatbots — at zero cost.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44, ease: EASE.out }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton
            as="a"
            href="#contact"
            variant="gradient"
            strength={0.28}
            className="min-h-[50px] px-8 py-3 text-sm sm:min-h-0"
          >
            Apply for a free site
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#what"
            strength={0.2}
            className="min-h-[50px] border border-[rgba(148,163,184,0.13)] bg-[rgba(7,7,15,0.4)] px-6 py-3 text-sm text-foreground backdrop-blur-sm hover:border-[rgba(148,163,184,0.24)] sm:min-h-0"
          >
            See what we build
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030306] to-transparent"
        aria-hidden
      />
    </section>
  );
}
