"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ClipboardList, Code2, MessageSquare, Rocket } from "lucide-react";
import { useRef } from "react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/premium-primitives";
import { SectionHeader } from "@/components/ui/site-chrome";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const steps: {
  n: string;
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    n: "01",
    icon: MessageSquare,
    title: "Reach out",
    text: "Tell us about your org and what you need. No commitment.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Plan",
    text: "We align on scope, timeline, and what success looks like.",
  },
  {
    n: "03",
    icon: Code2,
    title: "Build",
    text: "Design and development with your feedback along the way.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Launch",
    text: "Go live with a handoff so your team can own the site.",
  },
];

function TimelineNode({
  index,
  reduced,
}: {
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.08 * index, ease: EASE.out }}
      className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background shadow-glow"
      aria-hidden
    >
      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
    </motion.div>
  );
}

export function ProcessSection() {
  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const railProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section
      id="process"
      className="scroll-mt-[calc(5.5rem+env(safe-area-inset-top,0px))] border-t border-[rgba(148,163,184,0.05)] py-20 sm:py-28"
    >
      <div className="container">
        <Reveal variant="blurUp">
          <SectionHeader
            label="How it works"
            title="Four steps from first email to live site"
            description="A clear, collaborative process designed for busy nonprofit teams."
          />
        </Reveal>

        <div ref={timelineRef} className="relative mx-auto mt-14 max-w-4xl sm:mt-16">
          {/* Desktop center rail: faint track + scroll-drawn fill */}
          <div
            className="pointer-events-none absolute bottom-6 left-1/2 top-6 hidden w-px -translate-x-1/2 bg-border lg:block"
            aria-hidden
          />
          <motion.div
            style={reduced ? undefined : { scaleY: railProgress }}
            className={cn(
              "pointer-events-none absolute bottom-6 left-1/2 top-6 hidden w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent via-violet to-[rgba(129,140,248,0.4)] lg:block",
              reduced && "scale-y-100",
            )}
            aria-hidden
          />

          {/* Mobile left rail: same treatment */}
          <div
            className="pointer-events-none absolute bottom-6 left-[1.125rem] top-6 w-px bg-border lg:hidden"
            aria-hidden
          />
          <motion.div
            style={reduced ? undefined : { scaleY: railProgress }}
            className={cn(
              "pointer-events-none absolute bottom-6 left-[1.125rem] top-6 w-px origin-top bg-gradient-to-b from-accent via-violet to-[rgba(129,140,248,0.4)] lg:hidden",
              reduced && "scale-y-100",
            )}
            aria-hidden
          />

          <RevealStagger className="relative flex flex-col gap-8 sm:gap-10 lg:gap-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const Icon = step.icon;

              return (
                <RevealItem key={step.n} variant="blurUp">
                  <div className="relative">
                    {/* Mobile: node on left rail */}
                    <div className="absolute left-0 top-7 z-10 lg:hidden">
                      <TimelineNode index={i} reduced={!!reduced} />
                    </div>

                    {/* Desktop: node centered on rail */}
                    <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                      <TimelineNode index={i} reduced={!!reduced} />
                    </div>

                    {/* Card */}
                    <div
                      className={cn(
                        "pl-12 lg:w-[calc(50%-2rem)] lg:pl-0",
                        isLeft
                          ? "lg:mr-[calc(50%+2rem)] lg:text-right"
                          : "lg:ml-[calc(50%+2rem)]",
                      )}
                    >
                      <GlassCard className="p-6 sm:p-7">
                        <div
                          className={cn(
                            "mb-4 flex items-center gap-3",
                            isLeft ? "lg:flex-row-reverse" : "",
                          )}
                        >
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-bright bg-accent-soft">
                            <Icon className="h-5 w-5 text-accent" />
                          </span>
                          <span className="font-mono text-sm font-medium text-accent">
                            {step.n}
                          </span>
                        </div>
                        <h3 className="font-display text-xl text-foreground">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                          {step.text}
                        </p>
                      </GlassCard>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
