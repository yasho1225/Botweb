/**
 * In-memory sliding-window rate limiter (per Node process).
 * For serverless / multi-instance production, use a shared store (e.g. Upstash Redis).
 */

type Entry = { times: number[] };

const buckets = new Map<string, Entry>();
const PRUNE_EVERY = 100;
let pruneCounter = 0;

function pruneStale(now: number, windowMs: number) {
  const cutoff = now - windowMs;
  buckets.forEach((entry, key) => {
    entry.times = entry.times.filter((t) => t > cutoff);
    if (entry.times.length === 0) buckets.delete(key);
  });
}

/**
 * @returns true if the request is allowed, false if the limit was exceeded.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (++pruneCounter >= PRUNE_EVERY) {
    pruneCounter = 0;
    pruneStale(now, windowMs);
  }

  let entry = buckets.get(key);
  if (!entry) {
    entry = { times: [] };
    buckets.set(key, entry);
  }

  const cutoff = now - windowMs;
  entry.times = entry.times.filter((t) => t > cutoff);

  if (entry.times.length >= limit) {
    return false;
  }

  entry.times.push(now);
  return true;
}

export function clientIpFromRequest(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}
