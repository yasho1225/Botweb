"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BotWebHeroScroll } from "@/components/botweb-hero-scroll";
import { BotWebMarketingBelowHero } from "@/components/ui/landing-page";

const nav = [
  { label: "Why", href: "#why" },
  { label: "What we build", href: "#what" },
  { label: "How it works", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function BotWebHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-4 md:gap-8">
          <Link href="/" className="shrink-0 font-display text-xl tracking-tight text-foreground">
            BotWeb
          </Link>
          <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition hover:text-accent-bright"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 sm:inline-flex"
            >
              Request a Site
            </Link>
            <button
              type="button"
              className="inline-flex rounded-xl border border-border bg-card p-2.5 text-foreground md:hidden"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-border bg-card px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-2 rounded-full bg-accent py-3 text-center text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Request a Site
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <BotWebHeroScroll />

      <BotWebMarketingBelowHero />
    </div>
  );
}
