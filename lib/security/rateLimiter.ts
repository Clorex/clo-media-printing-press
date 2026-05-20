type RateLimitEntry = {
  count: number;
  firstRequest: number;
};

const store = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, firstRequest: now });
    return true;
  }

  if (now - entry.firstRequest > windowMs) {
    store.set(key, { count: 1, firstRequest: now });
    return true;
  }

  if (entry.count >= maxRequests) return false;

  entry.count += 1;
  return true;
}
