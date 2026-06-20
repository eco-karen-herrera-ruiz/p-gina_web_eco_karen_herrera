/**
 * Simple in-memory rate limiter for API routes.
 * Uses a sliding window approach per IP.
 */
const requestCounts = new Map<string, { count: number; resetAt: number }>();

interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
    maxRequests: 30,
    windowMs: 60_000, // 1 minute
};

export function rateLimit(
    ip: string,
    config: Partial<RateLimitConfig> = {}
): { allowed: boolean; remaining: number; resetAt: number } {
    const { maxRequests, windowMs } = { ...DEFAULT_CONFIG, ...config };
    const now = Date.now();
    const key = ip;

    const entry = requestCounts.get(key);

    // Clean up expired entries periodically
    if (entry && now > entry.resetAt) {
        requestCounts.delete(key);
    }

    const current = requestCounts.get(key);

    if (!current) {
        requestCounts.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
    }

    current.count++;

    if (current.count > maxRequests) {
        return { allowed: false, remaining: 0, resetAt: current.resetAt };
    }

    return { allowed: true, remaining: maxRequests - current.count, resetAt: current.resetAt };
}

// Cleanup stale entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    requestCounts.forEach((entry, key) => {
        if (now > entry.resetAt + 60_000) {
            requestCounts.delete(key);
        }
    });
}, 300_000).unref();
