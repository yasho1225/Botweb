/**
 * Mitigate CSRF on cookie-less JSON POSTs: reject cross-site browser requests
 * when Origin is present and does not match the request host.
 */
export function isAllowedContactOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) {
    return process.env.CONTACT_REQUIRE_ORIGIN !== "1";
  }

  const host =
    req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    req.headers.get("host")?.trim();
  if (!host) return false;

  const hostName = host.split(":")[0]?.toLowerCase() ?? "";
  try {
    const u = new URL(origin);
    return u.hostname.toLowerCase() === hostName;
  } catch {
    return false;
  }
}
