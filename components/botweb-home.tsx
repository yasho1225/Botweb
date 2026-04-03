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
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/75 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex min-h-14 items-center justify-between gap-3 sm:min-h-16 sm:gap-4 md:gap-8">
          <Link
            href="/"
            className="shrink-0 py-2 font-display text-lg tracking-tight text-foreground min-[400px]:text-xl"
          >
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
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-border bg-card p-2 text-foreground touch-manipulation md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="max-h-[min(70vh,28rem)] overflow-y-auto border-t border-border bg-card px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 md:hidden">
            <div className="flex flex-col gap-0.5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-[48px] items-center rounded-lg px-3 py-3 text-base font-medium text-foreground active:bg-card-muted"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-3 flex min-h-[48px] items-center justify-center rounded-full bg-accent py-3 text-center text-base font-semibold text-white touch-manipulation"
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
