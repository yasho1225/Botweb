"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import type { SVGProps } from "react";
import { Reveal } from "@/components/motion/reveal";
import { BOT_TEAM_EMAILS, MAILTO_RECIPIENTS } from "@/lib/contact";
import { EASE } from "@/lib/motion";

const footerLinks = [
  { label: "Why BotWeb", href: "#why" },
  { label: "How it works", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/botweb.development/",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/botweb/",
    icon: LinkedInIcon,
  },
] as const;

export function SiteFooter() {
  const reduced = useReducedMotion();

  return (
    <footer className="relative border-t border-[rgba(148,163,184,0.08)] bg-black pb-[env(safe-area-inset-bottom,0px)]">
      <div className="container py-14 sm:py-16">
        <Reveal variant="blurUp">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            <div className="space-y-4">
              <Link
                href="/"
                className="font-display text-xl tracking-tight text-foreground transition-opacity hover:opacity-90"
              >
                BotWeb
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Free websites and AI chatbots for local nonprofits, school clubs,
                and community organizations.
              </p>
              <div className="flex items-center gap-2 pt-1">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[rgba(148,163,184,0.14)] text-muted transition-colors duration-200 hover:border-[rgba(129,140,248,0.35)] hover:bg-[rgba(129,140,248,0.08)] hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                On this page
              </h3>
              <nav className="mt-4 flex flex-col gap-1" aria-label="Footer">
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
                <Mail className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" />
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
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[rgba(148,163,184,0.08)] pt-8 text-center md:flex-row md:text-left"
        >
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BotWeb
          </p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Student volunteers · Serving local nonprofits
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
