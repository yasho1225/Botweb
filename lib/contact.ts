/** Inbox for mailto links + Formspree notification CC. */
export const BOT_TEAM_EMAILS = ["yashoin1225@gmail.com"] as const;

/** Comma-separated for `mailto:?to=` (reaches everyone in one draft). */
export const MAILTO_RECIPIENTS = BOT_TEAM_EMAILS.join(",");

export const PRIMARY_CONTACT_EMAIL = BOT_TEAM_EMAILS[0];

/** Formspree CC so submissions always copy this inbox (must be allowed in Formspree). */
export const FORMSPREE_NOTIFY_EMAIL = PRIMARY_CONTACT_EMAIL;

export const ORG_TYPE_OPTIONS = [
  "Registered Nonprofit (501c3)",
  "School Club / Student Org",
  "Charity",
  "Community Organization",
  "Other",
] as const;

export type OrgType = (typeof ORG_TYPE_OPTIONS)[number];
