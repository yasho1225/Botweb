"use client";

import { Heart, HandHeart, Users } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/premium-primitives";

const items = [
  {
    icon: Heart,
    label: "100% free",
    desc: "No fees, ever — we're students giving back.",
  },
  {
    icon: Users,
    label: "Student-run",
    desc: "Built by volunteers who care about your mission.",
  },
  {
    icon: HandHeart,
    label: "Local nonprofits",
    desc: "Designed for orgs doing real community work.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-[rgba(148,163,184,0.06)] bg-[rgba(7,7,15,0.4)] py-10 sm:py-12">
      <div className="container">
        <RevealStagger className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-5">
          {items.map(({ icon: Icon, label, desc }) => (
            <RevealItem key={label} variant="blurUp">
              <GlassCard className="flex h-full flex-col items-center p-5 text-center sm:items-start sm:text-left">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-border-bright bg-accent-soft text-accent transition-shadow duration-300 group-hover/card:shadow-glow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-display text-lg text-foreground">{label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
