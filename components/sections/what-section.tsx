"use client";

import { ArrowRight, Bot, Globe, Handshake, Smartphone } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { GlassCard, MagneticButton } from "@/components/ui/premium-primitives";
import { SectionHeader } from "@/components/ui/site-chrome";
import type { LucideIcon } from "lucide-react";

const services: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Globe,
    title: "Custom websites",
    description: "Built for your story, audience, and goals — fast, clear, and easy to maintain.",
  },
  {
    icon: Bot,
    title: "AI chatbots",
    description: "Answer common questions and guide visitors without adding work for a small staff.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description: "Most visitors are on phones. Layouts and type are designed for small screens first.",
  },
  {
    icon: Handshake,
    title: "After launch",
    description: "Training, tweaks, and questions as you grow — we don't disappear once you're live.",
  },
];

export function WhatSection() {
  return (
    <section
      id="what"
      className="scroll-mt-[calc(5.5rem+env(safe-area-inset-top,0px))] border-t border-[rgba(148,163,184,0.05)] py-20 sm:py-28"
    >
      <div className="container">
        <Reveal variant="blurUp">
          <SectionHeader
            label="What we build"
            title="Websites and chatbots for missions that matter"
            description="Professional digital presence for local nonprofits and clubs that deserve to look as good as the work they do."
          />
        </Reveal>

        <RevealStagger className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem key={service.title} variant="blurUp">
                <GlassCard className="group h-full p-6 sm:p-7">
                  <span className="mb-5 inline-flex rounded-xl border border-border-bright bg-gradient-to-br from-accent-soft to-[rgba(167,139,250,0.1)] p-3 transition-all duration-300 group-hover:shadow-glow-sm motion-safe:group-hover:scale-105">
                    <Icon className="h-6 w-6 text-accent transition-transform duration-300 motion-safe:group-hover:-rotate-6" />
                  </span>
                  <h3 className="font-display text-xl text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {service.description}
                  </p>
                </GlassCard>
              </RevealItem>
            );
          })}
        </RevealStagger>

        <Reveal delay={2} className="mt-12 flex justify-center">
          <MagneticButton
            as="a"
            href="#contact"
            variant="gradient"
            strength={0.25}
            className="px-7 py-3 text-sm"
          >
            Request a site
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
