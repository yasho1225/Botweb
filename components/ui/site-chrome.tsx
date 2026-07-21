"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Soft ambient backdrop — matches production (`#07070c` + grain elsewhere). */
export function SiteBackground() {
  return null;
}

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
};

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const reduced = !!useReducedMotion();
  const viewport = { once: true, amount: 0.4 } as const;

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {label && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.45, ease: EASE.out }}
        >
          <span className="section-label">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
            {label}
          </span>
        </motion.div>
      )}
      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={
          reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        viewport={viewport}
        transition={{ duration: 0.55, delay: 0.06, ease: EASE.out }}
        className="font-display text-balance text-3xl tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={
            reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE.out }}
          className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
