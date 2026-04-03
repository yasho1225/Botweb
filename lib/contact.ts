/** Inbound project-request notifications (Resend `to` list). */
export const BOT_TEAM_EMAILS = [
  "developmentbotweb@gmail.com",
  "yashoin1225@gmail.com",
  "anishbkumar16@gmail.com",
  "aarush.agarwal4679@gmail.com",
  "dasari.tarunp16@gmail.com",
] as const;

/** Comma-separated for `mailto:?to=` (reaches everyone in one draft). */
export const MAILTO_RECIPIENTS = BOT_TEAM_EMAILS.join(",");

export const PRIMARY_CONTACT_EMAIL = BOT_TEAM_EMAILS[0];

export const ORG_TYPE_OPTIONS = [
  "Registered Nonprofit (501c3)",
  "School Club / Student Org",
  "Charity",
  "Community Organization",
  "Other",
] as const;

export type OrgType = (typeof ORG_TYPE_OPTIONS)[number];
