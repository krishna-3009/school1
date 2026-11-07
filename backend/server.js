import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { connectToDatabase, disconnectFromDatabase } from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import resultRoutes from './routes/resultRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const backendDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(backendDir, '..');
const frontendDistDir = path.join(projectDir, 'frontend', 'dist');

// Render injects environment variables directly. Local development supports both .env locations.
dotenv.config({ path: path.join(projectDir, '.env') });
dotenv.config({ path: path.join(backendDir, '.env') });

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(isProduction ? process.env.PORT || 5173 : process.env.API_PORT || 3001);

// Render runs Express behind one trusted proxy. This lets req.ip (used by the
// lookup limiter) identify the visitor instead of grouping every visitor as
// the proxy's address. Keep proxy headers untrusted during local development.
app.set('trust proxy', isProduction ? 1 : false);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT/API_PORT must be a valid TCP port.');
}

app.disable('x-powered-by');
app.set('query parser', 'simple');
app.use(express.json({ limit: '4kb' }));
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

const allowedFrontendOrigins = new Set(
  (process.env.FRONTEND_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);
app.use('/api', (req, res, next) => {
  const origin = req.get('origin');
  if (origin && allowedFrontendOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'X-Admin-Password, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.vary('Origin');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
  }
  return next();
});

app.use('/api/results', resultRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (_req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;
  return res.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? 'ok' : 'degraded',
  });
});

app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found.' }));

if (isProduction) {
  app.use(express.static(frontendDistDir, { index: false }));
  app.get(['/gallery.html', '/about.html', '/contact.html', '/results.html'], (req, res) => {
    const page = path.basename(req.path, '.html');
    return res.redirect(302, `/?page=${page}`);
  });
  app.get(/.*/, (_req, res) => res.sendFile(path.join(frontendDistDir, 'index.html')));
}

app.use(errorHandler);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`School site and results API running on http://localhost:${port}`);
  void connectToDatabase();
});

let isShuttingDown = false;
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    server.close(async () => {
      await disconnectFromDatabase();
      process.exit(0);
    });

    setTimeout(() => process.exit(1), 10_000).unref();
  });
}
