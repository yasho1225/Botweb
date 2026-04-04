"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, Bot, Globe, Handshake, Mail, Smartphone, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BOT_TEAM_EMAILS, MAILTO_RECIPIENTS, ORG_TYPE_OPTIONS } from "@/lib/contact";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

/** Main + footer below the hero — focused copy, no filler sections. */
export function BotWebMarketingBelowHero() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  async function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setFormError(null);

    const raw = process.env.NEXT_PUBLIC_FORMSPREE_URL?.trim() ?? "";
    const formspreeUrl =
      raw.length >= 2 && ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'")))
        ? raw.slice(1, -1).trim()
        : raw;
    if (!formspreeUrl) {
      setFormStatus("error");
      setFormError(
        "Contact form is not configured. Add NEXT_PUBLIC_FORMSPREE_URL to .env.local (your Formspree form URL) and restart the dev server.",
      );
      return;
    }

    setFormStatus("sending");

    try {
      const fd = new FormData(form);
      const org = String(fd.get("org") ?? "").trim();
      fd.append("_subject", `BotWeb project request: ${org}`);
      fd.append("_replyto", String(fd.get("email") ?? ""));
      const res = await fetch(formspreeUrl, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Record<string, string | string[]>;
      };
      if (!res.ok) {
        setFormStatus("error");
        const fromErrors = data.errors
          ? Object.values(data.errors)
              .flat()
              .map((x) => (Array.isArray(x) ? x.join(" ") : x))
              .filter(Boolean)
              .join(" ")
          : "";
        setFormError(
          data.error ||
            fromErrors ||
            "Formspree rejected the submission. Check your form URL and Formspree dashboard.",
        );
        return;
      }
      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("error");
      setFormError("Network error. Try again or email us directly.");
    }
  }

  return (
    <div className="flex min-h-0 flex-col bg-background">
      <main className="flex-1">
        <section id="why" className="w-full scroll-mt-[5.25rem] py-12 sm:scroll-mt-24 sm:py-14 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Why BotWeb
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base md:text-lg">
                Custom work and real collaboration — not templates dropped in your inbox.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2">
              {[
                {
                  n: "01",
                  title: "Professional quality",
                  text: "Design and code we’re proud to ship — built like a real product, not a class project.",
                },
                {
                  n: "02",
                  title: "AI chatbots",
                  text: "Help visitors get answers and find resources on your site, even when your team is offline.",
                },
                {
                  n: "03",
                  title: "You’re in the loop",
                  text: "We work with you directly from kickoff to launch — clear updates, no black box.",
                },
                {
                  n: "04",
                  title: "Focused capacity",
                  text: "We take a limited number of projects so each org gets real attention.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.n}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemFadeIn}
                  transition={{ delay: 0.04 * i }}
                  className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm sm:p-6"
                >
                  <span className="font-display text-xl text-primary/40 sm:text-2xl">{item.n}</span>
                  <h3 className="mt-1 font-display text-base text-foreground sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="what" className="w-full scroll-mt-[5.25rem] border-t border-border py-12 sm:scroll-mt-24 sm:py-14 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                What we build
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base md:text-lg">
                Websites and chatbots for missions that deserve to look as good as the work they do.
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto mt-8 grid max-w-4xl gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-2"
            >
              {[
                {
                  icon: <Globe className="h-9 w-9 text-primary" />,
                  title: "Custom websites",
                  description: "Built for your story, audience, and goals — fast, clear, and easy to maintain.",
                },
                {
                  icon: <Bot className="h-9 w-9 text-primary" />,
                  title: "AI chatbots",
                  description: "Answer common questions and guide visitors without adding work for a small staff.",
                },
                {
                  icon: <Smartphone className="h-9 w-9 text-primary" />,
                  title: "Mobile-first",
                  description: "Most visitors are on phones. Layouts and type are designed for small screens first.",
                },
                {
                  icon: <Handshake className="h-9 w-9 text-primary" />,
                  title: "After launch",
                  description: "Training, tweaks, and questions as you grow — we don’t disappear once you’re live.",
                },
              ].map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemFadeIn}
                  className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  <div className="mb-3">{service.icon}</div>
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
            <p className="mt-8 flex justify-center px-2 sm:mt-10">
              <Button className="h-12 w-full max-w-sm rounded-full px-8 sm:h-10 sm:w-auto sm:max-w-none" asChild>
                <Link href="#contact" className="touch-manipulation">
                  Request a site
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </p>
          </motion.div>
        </section>

        <section
          id="process"
          className="w-full scroll-mt-[5.25rem] border-t border-border bg-card-muted/30 py-12 sm:scroll-mt-24 sm:py-14 md:py-20"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                How it works
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base md:text-lg">
                Four steps from first email to a live site.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-5xl gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "1", title: "Reach out", text: "Tell us about your org and what you need. No commitment." },
                { n: "2", title: "Plan", text: "We align on scope, timeline, and what success looks like." },
                { n: "3", title: "Build", text: "Design and development with your feedback along the way." },
                { n: "4", title: "Launch", text: "Go live with a handoff so your team can own the site." },
              ].map((step) => (
                <motion.div
                  key={step.n}
                  variants={itemFadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-2xl border border-border bg-background/80 p-4 sm:p-5"
                >
                  <span className="font-display text-lg text-primary sm:text-xl">{step.n}</span>
                  <h3 className="mt-1 font-display text-[0.95rem] font-semibold text-foreground sm:text-base">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="w-full scroll-mt-[5.25rem] border-t border-border py-12 sm:scroll-mt-24 sm:py-14 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="mx-auto grid max-w-5xl gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  Work with us
                </h2>
                <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
                  Tell us about your organization. We typically reply within a few business days.{" "}
                  <span className="font-medium text-foreground">Always free.</span>
                </p>
                <a
                  href={`mailto:${MAILTO_RECIPIENTS}`}
                  className="inline-flex max-w-full items-start gap-2 text-sm font-medium text-primary hover:underline sm:items-center"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" />
                  <span className="flex min-w-0 flex-col gap-1 break-all">
                    {BOT_TEAM_EMAILS.map((address) => (
                      <span key={address}>{address}</span>
                    ))}
                  </span>
                </a>
                <p className="text-xs text-muted-foreground">
                  Prefer email? The link above reaches the full team. This form submits through{" "}
                  <a href="https://formspree.io" className="text-primary underline-offset-2 hover:underline">
                    Formspree
                  </a>
                  . The site needs <span className="font-mono text-[11px] text-foreground/90">NEXT_PUBLIC_FORMSPREE_URL</span>{" "}
                  configured on the host — otherwise the form will show an error until it is set. Add teammates in your
                  Formspree notification list.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card/60 p-4 shadow-sm sm:p-6">
                {formStatus === "success" ? (
                  <div className="space-y-4 py-2 text-center">
                    <p className="font-display text-lg font-semibold text-foreground">Thanks — we got your request.</p>
                    <p className="text-sm text-muted-foreground">
                      The team was notified by email. We typically reply within a few business days.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => setFormStatus("idle")}
                    >
                      Send another request
                    </Button>
                  </div>
                ) : (
                  <form className="relative space-y-4" onSubmit={handleContactSubmit}>
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
                      aria-hidden
                    />
                    <div className="space-y-2">
                      <label htmlFor="org" className="text-sm font-medium text-foreground">
                        Organization
                      </label>
                      <Input
                      id="org"
                      name="org"
                      required
                      placeholder="Organization name"
                      className="rounded-xl text-base sm:text-sm"
                    />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact" className="text-sm font-medium text-foreground">
                        Your name
                      </label>
                      <Input
                      id="contact"
                      name="contact"
                      required
                      placeholder="Name"
                      className="rounded-xl text-base sm:text-sm"
                    />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@organization.org"
                        className="rounded-xl text-base sm:text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="orgType" className="text-sm font-medium text-foreground">
                        Organization type
                      </label>
                      <select
                        id="orgType"
                        name="orgType"
                        required
                        defaultValue=""
                        className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-10 sm:text-sm"
                      >
                        <option value="" disabled>
                          Select…
                        </option>
                        {ORG_TYPE_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Project details
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="What you need, timeline, links…"
                        className="min-h-[100px] rounded-xl text-base sm:text-sm"
                      />
                    </div>
                    {formError ? <p className="text-sm text-red-400">{formError}</p> : null}
                    <Button
                      type="submit"
                      className="h-12 w-full rounded-xl touch-manipulation sm:h-10"
                      disabled={formStatus === "sending"}
                    >
                      {formStatus === "sending" ? "Sending…" : "Send request"}
                      {formStatus !== "sending" ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Replies go to the email you enter above. Formspree emails everyone on your form’s notification list.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-border bg-card-muted/20 pb-[env(safe-area-inset-bottom,0px)]">
        <div className="container grid gap-8 py-10 sm:gap-10 sm:py-12 md:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-bold text-foreground">BotWeb</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free websites and chatbots for nonprofits and student organizations.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">On this page</h3>
            <nav className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
              <Link href="#why" className="rounded-md py-2 hover:text-foreground">
                Why BotWeb
              </Link>
              <Link href="#what" className="rounded-md py-2 hover:text-foreground">
                What we build
              </Link>
              <Link href="#process" className="rounded-md py-2 hover:text-foreground">
                How it works
              </Link>
              <Link href="#contact" className="rounded-md py-2 hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <a
              href={`mailto:${MAILTO_RECIPIENTS}`}
              className="mt-3 inline-flex max-w-full items-start gap-2 text-sm text-primary hover:underline"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="flex min-w-0 flex-col gap-1 break-all">
                {BOT_TEAM_EMAILS.map((address) => (
                  <span key={address}>{address}</span>
                ))}
              </span>
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Know an org that needs a site? Point them here.
            </p>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container flex flex-col items-center justify-between gap-2 py-5 text-center md:flex-row md:text-left">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} BotWeb</p>
            <p className="text-xs text-muted-foreground">Student volunteers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const DesignAgency = BotWebMarketingBelowHero;
