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
        "This form is temporarily unavailable. Please email us using the address listed in the contact section.",
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
            "We couldn't send that just now. Try again in a moment, or email us using the address in the contact section.",
        );
        return;
      }
      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("idle");
      setFormError(
        "We couldn't connect just now. Please try again, or email us using the address in the contact section.",
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
            <span className="section-label mb-4">Contact</span>
            <h2 className="font-display text-balance text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Work with us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Tell us about your organization. We typically reply within a few business days.{" "}
              <span className="font-medium text-foreground">Always free.</span>
            </p>
            <a
              href={`mailto:${MAILTO_RECIPIENTS}`}
              className="mt-6 inline-flex max-w-full cursor-pointer items-start gap-2 text-sm font-medium text-accent transition hover:text-accent-bright sm:items-center"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" />
              <span className="flex min-w-0 flex-col gap-1 break-all">
                {BOT_TEAM_EMAILS.map((address) => (
                  <span key={address}>{address}</span>
                ))}
              </span>
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Prefer email? The address above reaches our team directly, and we respond to every inquiry.
            </p>
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
                    <p className="font-display text-xl font-semibold text-foreground">
                      Thanks — we got your request.
                    </p>
                    <p className="text-sm text-muted">
                      The team was notified by email. We typically reply within a few business days.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer rounded-xl"
                      onClick={() => setFormStatus("idle")}
                    >
                      Send another request
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
                      { id: "org", label: "Organization", name: "org" },
                      { id: "contact", label: "Your name", name: "contact" },
                      { id: "email", label: "Email", name: "email", type: "email" },
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
                          Select…
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
                        Project details
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
                      {formStatus === "sending" ? "Sending…" : "Send request"}
                      {formStatus !== "sending" ? <ArrowRight className="h-4 w-4" /> : null}
                    </MagneticButton>
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
