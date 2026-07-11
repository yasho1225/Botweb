"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Mail } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { BOT_TEAM_EMAILS, MAILTO_RECIPIENTS } from "@/lib/contact";
import { EASE } from "@/lib/motion";

const footerLinks = [
  { label: "Why BotWeb", href: "#why" },
  { label: "What we build", href: "#what" },
  { label: "How it works", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  const reduced = useReducedMotion();

  return (
    <footer className="relative border-t border-[rgba(148,163,184,0.05)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(129,140,248,0.35)] to-transparent" />

      <div className="container py-14 sm:py-16">
        <Reveal variant="blurUp">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            <div className="space-y-4">
              <Link href="/" className="group inline-flex items-center gap-2.5">
                <motion.span
                  whileHover={reduced ? undefined : { rotate: [-3, 3, 0] }}
                  transition={{ duration: 0.35 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-violet shadow-glow"
                >
                  <Heart className="h-4 w-4 text-white" />
                </motion.span>
                <span className="font-display text-xl text-foreground">BotWeb</span>
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Free websites and AI chatbots for local nonprofits, school clubs, and community
                organizations.
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                On this page
              </h3>
              <nav className="mt-4 flex flex-col gap-1">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-1.5 text-sm text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                Contact
              </h3>
              <a
                href={`mailto:${MAILTO_RECIPIENTS}`}
                className="group mt-4 inline-flex max-w-full items-start gap-2 text-sm text-accent transition hover:text-accent-bright sm:items-center"
              >
                <motion.span
                  whileHover={reduced ? undefined : { rotate: 12 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" />
                </motion.span>
                <span className="flex min-w-0 flex-col gap-1 break-all">
                  {BOT_TEAM_EMAILS.map((address) => (
                    <span key={address}>{address}</span>
                  ))}
                </span>
              </a>
              <p className="mt-4 text-xs text-muted-foreground">
                Know a local org that needs a site? Point them here.
              </p>
            </div>
          </div>
        </Reveal>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE.out }}
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[rgba(148,163,184,0.05)] pt-8 text-center md:flex-row md:text-left"
        >
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} BotWeb</p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Student volunteers · Serving local nonprofits
          </p>
        </motion.div>
      </div>

      {/* Oversized watermark wordmark, clipped at the page edge */}
      <div
        className="pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <p className="translate-y-[28%] bg-gradient-to-b from-[rgba(248,250,252,0.05)] to-transparent bg-clip-text text-center font-display text-[clamp(5rem,18vw,14rem)] font-bold leading-none tracking-tight text-transparent">
          BotWeb
        </p>
      </div>
    </footer>
  );
}
