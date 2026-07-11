"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/site-chrome";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes — completely. BotWeb is a student volunteer organization. There are no setup fees, hosting fees, domain fees, or any other costs to your organization, ever. We cover everything.",
  },
  {
    q: "What's the catch?",
    a: "There is no catch. Our student volunteers give their time because they genuinely want to create community impact. The only thing we ask is your commitment to communicating throughout the project so we can build something that truly fits your needs.",
  },
  {
    q: "How long does the process take?",
    a: "Most projects go from first contact to a live site in 6–8 weeks. We'll give you a specific timeline estimate after our intro call, based on your project's scope and our current capacity.",
  },
  {
    q: "Who owns the website after it's built?",
    a: "You do — completely. At launch we hand over all assets, accounts, and documentation so your team has full ownership and control going forward. There are no strings attached.",
  },
  {
    q: "What if we need changes after launch?",
    a: "We include a support period after launch and provide training so your team can make routine updates. For bigger changes, reach out and we'll do our best to help based on our current availability.",
  },
  {
    q: "What kinds of organizations do you work with?",
    a: "We primarily serve registered nonprofits (501c3), school clubs, shelters, food banks, and other local community organizations. We take a limited number of projects each semester to make sure every organization gets genuine attention and care.",
  },
] as const;

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE.out }}
      className="border-b border-[rgba(148,163,184,0.07)] last:border-0"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left"
      >
        <span
          className={cn(
            "font-display text-base font-semibold leading-snug transition-colors duration-200 sm:text-lg",
            isOpen ? "text-foreground" : "text-[rgba(248,250,252,0.75)]",
          )}
        >
          {item.q}
        </span>
        <span
          className={cn(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isOpen
              ? "border-[rgba(129,140,248,0.4)] bg-accent-soft text-accent"
              : "border-[rgba(148,163,184,0.15)] text-muted",
          )}
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.28, ease: EASE.out }}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE.out }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-sm leading-relaxed text-muted sm:text-base">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section
      id="faq"
      className="scroll-mt-[calc(5.5rem+env(safe-area-inset-top,0px))] border-t border-[rgba(148,163,184,0.05)] py-20 sm:py-28"
    >
      <div className="container">
        <Reveal variant="blurUp">
          <SectionHeader
            label="FAQ"
            title="Questions we always get"
            description="Everything you want to know before reaching out."
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
