"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

const STATS = [
  {
    prefix: "$",
    value: 0,
    suffix: "",
    label: "Cost to you",
    sub: "Completely free — no fees, ever.",
  },
  {
    prefix: "",
    value: 100,
    suffix: "%",
    label: "Custom-designed",
    sub: "Built from scratch for your story.",
  },
  {
    prefix: "",
    value: 8,
    suffix: " wks",
    label: "Avg. to launch",
    sub: "Kickoff to live in 6–8 weeks.",
  },
  {
    prefix: "",
    value: 24,
    suffix: "/7",
    label: "Chatbot uptime",
    sub: "Your AI answers around the clock.",
  },
];

function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView || value === 0) return;
    const duration = 1800;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setDisplayed(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    }

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayed}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-[rgba(148,163,184,0.04)] py-16 sm:py-20">
      {/* Glow wash */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(129,140,248,0.06)] blur-[80px]"
        aria-hidden
      />

      <div className="container">
        <div className="mx-auto grid max-w-5xl grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE.out }}
              className="group relative flex flex-col items-center border-[rgba(148,163,184,0.04)] px-4 py-8 text-center odd:border-r sm:px-6 lg:border-r lg:last:border-r-0"
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-transparent transition-colors duration-500 group-hover:bg-[rgba(129,140,248,0.04)]" />
              <p className="gradient-text font-display text-[3.2rem] font-bold leading-none tracking-tight sm:text-[3.8rem]">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-display text-base font-semibold text-[rgba(248,250,252,0.9)]">
                {stat.label}
              </p>
              <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
