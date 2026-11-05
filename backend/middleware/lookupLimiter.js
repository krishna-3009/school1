const attempts = new Map();
const windowMs = 15 * 60 * 1000;
const limit = 10;

function lookupLimiter(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const previous = attempts.get(key);
  const bucket =
    !previous || now - previous.startedAt >= windowMs ? { startedAt: now, count: 0 } : previous;

  bucket.count += 1;
  attempts.set(key, bucket);

  if (attempts.size > 10_000) {
    for (const [ip, attempt] of attempts) {
      if (now - attempt.startedAt >= windowMs) attempts.delete(ip);
    }
  }

  res.setHeader('RateLimit-Limit', limit);
  res.setHeader('RateLimit-Remaining', Math.max(0, limit - bucket.count));

  if (bucket.count > limit) {
    return res
      .status(429)
      .json({ error: 'Too many lookup attempts. Please wait a little while and try again.' });
  }

  return next();
}

export default lookupLimiter;
