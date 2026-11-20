// Bounded in-memory sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const MAX_TRACKED_IPS = 5000;
const ipMap = new Map<string, RateLimitRecord>();

export function isRateLimited(ip: string, limit: number = 15, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = ipMap.get(ip);

  // Evict expired entries or bound size
  if (ipMap.size > MAX_TRACKED_IPS) {
    let evicted = 0;
    for (const key of Array.from(ipMap.keys())) {
      const val = ipMap.get(key);
      if (!val || val.resetAt < now) {
        ipMap.delete(key);
        evicted++;
      }
      if (evicted > 500) break;
    }
  }

  if (!record || record.resetAt < now) {
    ipMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return false;
  }

  if (record.count >= limit) {
    return true;
  }

  record.count += 1;
  return false;
}
