const buckets = new Map<string, number[]>();

function getNow() {
  return Date.now();
}

export function isRateLimited(key: string, maxAttempts: number, windowMs: number) {
  const now = getNow();
  const list = buckets.get(key) ?? [];
  const filtered = list.filter((t) => now - t <= windowMs);
  if (filtered.length >= maxAttempts) {
    buckets.set(key, filtered);
    return true;
  }
  filtered.push(now);
  buckets.set(key, filtered);
  return false;
}

