/**
 * Plain-text hardening for contact payloads before HTML escaping and email headers.
 */

/** Strip HTML-like tags (defense in depth before escapeHtml). */
export function stripHtmlTags(s: string): string {
  return s.replace(/<[^>]*>/g, "");
}

/** Remove ASCII control chars (Unicode-safe; does not split surrogate pairs). */
export function stripControlChars(s: string, opts?: { allowNewlines?: boolean }): string {
  if (opts?.allowNewlines) {
    return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  }
  return s.replace(/[\x00-\x1F\x7F]/g, "");
}

/** Single-line fragment safe for email Subject / headers (no SMTP injection). */
export function sanitizeSubjectFragment(s: string, maxLen: number): string {
  const flat = stripControlChars(s, { allowNewlines: false })
    .replace(/[\r\n\u2028\u2029]/g, " ")
    .trim();
  return flat.length > maxLen ? flat.slice(0, maxLen) : flat;
}

export function sanitizeShortPlainField(s: string): string {
  return stripHtmlTags(stripControlChars(s, { allowNewlines: false })).trim();
}

export function sanitizeMessageBody(s: string): string {
  return stripHtmlTags(stripControlChars(s, { allowNewlines: true })).trim();
}
