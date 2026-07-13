"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard, MagneticButton } from "@/components/ui/premium-primitives";
import { Textarea } from "@/components/ui/textarea";
import { BOT_TEAM_EMAILS, MAILTO_RECIPIENTS, ORG_TYPE_OPTIONS } from "@/lib/contact";
import { EASE } from "@/lib/motion";

const NEXT_STEPS = [
  { n: "01", text: "We review your application (1–2 business days)" },
  { n: "02", text: "A quick intro call to align on your goals and scope" },
  { n: "03", text: "Design, build, and launch in 6–8 weeks" },
] as const;

export function ContactSection() {
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
      setFormStatus("idle");
      setFormError(
        "This form is temporarily unavailable. Please email us using the address listed below.",
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
        setFormStatus("idle");
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
            "We couldn't send that just now. Try again in a moment, or email us directly.",
        );
        return;
      }
      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("idle");
      setFormError(
        "We couldn't connect just now. Please try again, or email us directly.",
      );
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-[calc(5.5rem+env(safe-area-inset-top,0px))] border-t border-[rgba(148,163,184,0.05)] py-20 sm:py-28"
    >
      <div className="container">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="blurUp">
            <span className="section-label mb-4">Apply</span>
            <h2 className="font-display text-balance text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Apply for your free site
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Tell us about your organization. We review every request and reply within 2 business
              days.{" "}
              <span className="font-medium text-foreground">No pitch. No fees. Ever.</span>
            </p>

            {/* What happens next */}
            <div className="mt-8 space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                What happens next
              </p>
              {NEXT_STEPS.map(({ n, text }) => (
                <div key={n} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent">
                    {n}
                  </span>
                  <p className="text-sm leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>

            {/* Email fallback */}
            <div className="mt-8 border-t border-[rgba(148,163,184,0.06)] pt-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                Prefer email?
              </p>
              <a
                href={`mailto:${MAILTO_RECIPIENTS}`}
                className="inline-flex max-w-full cursor-pointer items-start gap-2 text-sm font-medium text-accent transition hover:text-accent-bright sm:items-center"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" />
                <span className="flex min-w-0 flex-col gap-1 break-all">
                  {BOT_TEAM_EMAILS.map((address) => (
                    <span key={address}>{address}</span>
                  ))}
                </span>
              </a>
              <p className="mt-2 text-xs text-muted-foreground">
                We respond to every inquiry — usually within 2 business days.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} variant="blurUp">
            <GlassCard hover={false} className="gradient-ring overflow-hidden p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE.out }}
                    className="space-y-4 py-4 text-center"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(74,222,128,0.1)] text-[rgba(74,222,128,0.85)]">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-display text-xl font-semibold text-foreground">
                      Application received!
                    </p>
                    <p className="text-sm text-muted">
                      We&apos;ll review your request and get back to you within 2 business days. Check your inbox.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer rounded-xl"
                      onClick={() => setFormStatus("idle")}
                    >
                      Submit another request
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative space-y-4"
                    onSubmit={handleContactSubmit}
                  >
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
                      aria-hidden
                    />
                    {[
                      { id: "org", label: "Organization name", name: "org" },
                      { id: "contact", label: "Your name", name: "contact" },
                      { id: "email", label: "Email address", name: "email", type: "email" },
                    ].map((field) => (
                      <div key={field.id} className="relative">
                        <Input
                          id={field.id}
                          name={field.name}
                          type={field.type ?? "text"}
                          required
                          placeholder=" "
                          className="peer h-14 rounded-xl border-border bg-[rgba(3,3,6,0.5)] px-3.5 pb-2 pt-6 text-base transition focus:border-border-bright focus-visible:ring-[rgba(129,140,248,0.4)] sm:text-sm"
                        />
                        <label
                          htmlFor={field.id}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted transition-all duration-200 peer-focus:top-4 peer-focus:text-[11px] peer-focus:font-medium peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-accent-bright peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider"
                        >
                          {field.label}
                        </label>
                      </div>
                    ))}
                    <div className="space-y-2">
                      <label
                        htmlFor="orgType"
                        className="text-[11px] font-medium uppercase tracking-wider text-muted"
                      >
                        Organization type
                      </label>
                      <select
                        id="orgType"
                        name="orgType"
                        required
                        defaultValue=""
                        className="flex h-12 w-full cursor-pointer rounded-xl border border-input bg-[rgba(3,3,6,0.5)] px-3.5 py-2 text-base text-foreground transition focus:border-border-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(129,140,248,0.4)] focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-11 sm:text-sm"
                      >
                        <option value="" disabled>
                          Select one…
                        </option>
                        {ORG_TYPE_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder=" "
                        className="peer min-h-[120px] rounded-xl border-border bg-[rgba(3,3,6,0.5)] px-3.5 pb-3 pt-7 text-base transition focus:border-border-bright focus-visible:ring-[rgba(129,140,248,0.4)] sm:text-sm"
                      />
                      <label
                        htmlFor="message"
                        className="pointer-events-none absolute left-3.5 top-5 text-sm text-muted transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-accent-bright peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider"
                      >
                        Tell us about your org and what you need
                      </label>
                    </div>
                    {formError ? <p className="text-sm text-red-400">{formError}</p> : null}
                    <MagneticButton
                      type="submit"
                      variant="gradient"
                      fullWidth
                      disabled={formStatus === "sending"}
                      className="h-12 sm:h-11"
                    >
                      {formStatus === "sending" ? "Sending…" : "Submit application"}
                      {formStatus !== "sending" ? <ArrowRight className="h-4 w-4" /> : null}
                    </MagneticButton>
                    <p className="text-center text-[11px] text-[rgba(148,163,184,0.4)]">
                      Free · No commitment · We respond within 2 business days
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
