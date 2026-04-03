import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { BOT_TEAM_EMAILS, ORG_TYPE_OPTIONS, type OrgType } from "@/lib/contact";
import { checkRateLimit, clientIpFromRequest } from "@/lib/rate-limit";
import { isAllowedContactOrigin } from "@/lib/request-origin";
import {
  sanitizeMessageBody,
  sanitizeShortPlainField,
  sanitizeSubjectFragment,
} from "@/lib/sanitize";

export const runtime = "nodejs";

const orgTypeValues = ORG_TYPE_OPTIONS as readonly string[];

const contactBodySchema = z.object({
  org: z.string().trim().min(1).max(200),
  contact: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  orgType: z
    .string()
    .max(120)
    .refine((v): v is OrgType => orgTypeValues.includes(v)),
  message: z.string().trim().min(1).max(8000),
  /** Honeypot — must be empty; bots often fill hidden fields. */
  website: z.string().max(200).optional(),
});

const MAX_SUBJECT_ORG = 120;
const MAX_JSON_BYTES = 48_000;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** `BOT_TEAM_EMAILS` plus optional server-only `CONTACT_EXTRA_EMAILS` (comma-separated). */
function notificationRecipients(): string[] {
  const extra =
    process.env.CONTACT_EXTRA_EMAILS
      ?.split(",")
      .map((e) => e.trim().toLowerCase())
      .filter((e) => EMAIL_RE.test(e)) ?? [];
  return Array.from(new Set<string>([...BOT_TEAM_EMAILS, ...extra]));
}

function parseRateLimit(): { max: number; windowMs: number } {
  const max = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? "5");
  const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? String(15 * 60 * 1000));
  const safeMax = Number.isFinite(max) && max >= 1 ? Math.min(Math.floor(max), 100) : 5;
  const safeWindow =
    Number.isFinite(windowMs) && windowMs >= 10_000 ? Math.min(Math.floor(windowMs), 86_400_000) : 900_000;
  return { max: safeMax, windowMs: safeWindow };
}

export async function POST(req: Request) {
  if (!isAllowedContactOrigin(req)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  const contentLength = req.headers.get("content-length");
  if (contentLength != null) {
    const n = Number(contentLength);
    if (Number.isFinite(n) && n > MAX_JSON_BYTES) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }
  }

  const { max, windowMs } = parseRateLimit();
  const ip = clientIpFromRequest(req);
  if (!checkRateLimit(`contact:${ip}`, max, windowMs)) {
    const retryAfterSec = Math.ceil(windowMs / 1000);
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "Contact form is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL on the server." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_JSON_BYTES) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }
    json = JSON.parse(text) as unknown;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const raw = parsed.data;
  if (raw.website != null && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const org = sanitizeShortPlainField(raw.org);
  const contact = sanitizeShortPlainField(raw.contact);
  const email = sanitizeShortPlainField(raw.email).toLowerCase();
  const orgType = sanitizeShortPlainField(raw.orgType);
  const message = sanitizeMessageBody(raw.message);

  if (!org || !contact || !email || !orgType || !message) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const subjectOrg = sanitizeSubjectFragment(org, MAX_SUBJECT_ORG);
  const subject = `BotWeb project request: ${subjectOrg}`;
  const html = `
    <p><strong>Organization:</strong> ${escapeHtml(org)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Organization type:</strong> ${escapeHtml(orgType)}</p>
    <p><strong>Project details:</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;">${escapeHtml(message)}</pre>
  `;

  const { error } = await resend.emails.send({
    from,
    to: notificationRecipients(),
    replyTo: email,
    subject,
    html,
  });

  if (error) {
    console.error("[api/contact] Resend:", error);
    return NextResponse.json({ error: "Could not send right now. Try again or use the email link." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
