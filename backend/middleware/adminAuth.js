import { createHash, timingSafeEqual } from 'node:crypto';

const failedAttempts = new Map();
const windowMs = 15 * 60 * 1000;
const attemptLimit = 10;

export default function adminAuth(req, res, next) {
  const configuredToken = process.env.ADMIN_UPLOAD_TOKEN;
  if (!configuredToken || configuredToken.length < 32) {
    return res.status(503).json({ error: 'Admin upload is not configured on the server.' });
  }

  const authorization = req.get('authorization') || '';
  const providedToken = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : '';
  const expectedHash = createHash('sha256').update(configuredToken).digest();
  const providedHash = createHash('sha256').update(providedToken).digest();

  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const previous = failedAttempts.get(key);
  if (previous && now - previous.startedAt < windowMs && previous.count >= attemptLimit) {
    return res.status(429).json({ error: 'Too many admin login attempts. Please try again later.' });
  }

  if (!timingSafeEqual(expectedHash, providedHash)) {
    const bucket =
      !previous || now - previous.startedAt >= windowMs ? { startedAt: now, count: 0 } : previous;
    bucket.count += 1;
    failedAttempts.set(key, bucket);
    if (failedAttempts.size > 10_000) {
      for (const [ip, attempt] of failedAttempts) {
        if (now - attempt.startedAt >= windowMs) failedAttempts.delete(ip);
      }
    }
    return res.status(401).json({ error: 'Admin token is invalid.' });
  }

  failedAttempts.delete(key);
  return next();
}
