import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const frontendDir = path.join(rootDir, 'frontend');
dotenv.config({ path: path.join(rootDir, '.env') });

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(isProduction ? process.env.PORT || 5173 : process.env.API_PORT || 3001);
app.disable('x-powered-by');
app.use(express.json({ limit: '4kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    marks: { type: Number, required: true, min: 0 },
    maxMarks: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    rollNumber: { type: String, required: true, trim: true, uppercase: true, index: true },
    dateOfBirth: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    studentName: { type: String, required: true, trim: true, maxlength: 120 },
    className: { type: String, required: true, trim: true, maxlength: 30 },
    academicYear: { type: String, required: true, trim: true, maxlength: 20 },
    examName: { type: String, required: true, trim: true, maxlength: 80 },
    subjects: { type: [subjectSchema], required: true },
    remarks: { type: String, default: '', maxlength: 500 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'results' }
);

const Result = mongoose.models.StudentResult || mongoose.model('StudentResult', resultSchema);
const lookupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many lookup attempts. Please wait a little while and try again.' },
});

app.post('/api/results/lookup', lookupLimiter, async (req, res) => {
  const rollNumber =
    typeof req.body?.rollNumber === 'string' ? req.body.rollNumber.trim().toUpperCase() : '';
  const dateOfBirth = typeof req.body?.dateOfBirth === 'string' ? req.body.dateOfBirth.trim() : '';
  const validDate =
    /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) &&
    !Number.isNaN(Date.parse(`${dateOfBirth}T00:00:00Z`)) &&
    new Date(`${dateOfBirth}T00:00:00Z`).toISOString().slice(0, 10) === dateOfBirth;

  if (!/^[A-Z0-9/-]{2,32}$/.test(rollNumber) || !validDate) {
    return res.status(400).json({ error: 'Enter a valid roll number and date of birth.' });
  }
  if (mongoose.connection.readyState !== 1) {
    return res
      .status(503)
      .json({ error: 'The result service is temporarily unavailable. Please try again shortly.' });
  }

  try {
    const record = await Result.findOne({ rollNumber, dateOfBirth, published: true })
      .sort({ academicYear: -1, createdAt: -1 })
      .select('studentName className academicYear examName subjects remarks')
      .lean();

    if (!record)
      return res.status(404).json({
        error: 'We could not find a published result with those details. Check them and try again.',
      });

    const total = record.subjects.reduce((sum, subject) => sum + subject.marks, 0);
    const maximum = record.subjects.reduce((sum, subject) => sum + subject.maxMarks, 0);
    return res.json({
      studentName: record.studentName,
      className: record.className,
      academicYear: record.academicYear,
      examName: record.examName,
      subjects: record.subjects.map(({ name, marks, maxMarks }) => ({ name, marks, maxMarks })),
      total,
      maximum,
      percentage: maximum > 0 ? Number(((total / maximum) * 100).toFixed(1)) : 0,
      remarks: record.remarks || '',
    });
  } catch {
    return res
      .status(500)
      .json({ error: 'We could not retrieve the result right now. Please try again later.' });
  }
});

app.get('/api/health', (_req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;
  return res.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? 'ok' : 'degraded',
  });
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found.' }));

app.use((error, _req, res, next) => {
  if (res.headersSent) return next(error);
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Request body must contain valid JSON.' });
  }
  console.error('Unhandled API error.');
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
});

if (isProduction) {
  app.use(express.static(path.join(frontendDir, 'dist'), { index: false }));
  app.get(['/gallery.html', '/about.html', '/contact.html', '/results.html'], (req, res) => {
    const page = path.basename(req.path, '.html');
    res.redirect(302, page === 'index' ? '/' : `/?page=${page}`);
  });
  app.get(/.*/, (_req, res) => res.sendFile(path.join(frontendDir, 'dist', 'index.html')));
}

function atlasUri() {
  let uri = process.env.MONGODB_URI?.trim();
  const username = encodeURIComponent(process.env.MONGODB_USERNAME || '');
  const password = encodeURIComponent(process.env.MONGODB_PASSWORD || '');
  if (!uri) throw new Error('MONGODB_URI is missing');
  return uri
    .replaceAll('<username>', username)
    .replaceAll('<password>', password)
    .replaceAll('<db_username>', username)
    .replaceAll('<db_password>', password)
    .replaceAll('${MONGODB_USERNAME}', username)
    .replaceAll('${MONGODB_PASSWORD}', password);
}

async function connectToAtlas() {
  try {
    await mongoose.connect(atlasUri(), {
      dbName: process.env.MONGODB_DATABASE || 'school',
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 8,
      autoIndex: false,
    });
    console.log('MongoDB connected.');
  } catch {
    console.error(
      'MongoDB connection failed. Check the local Atlas env values and Atlas network access. Retrying shortly.'
    );
    setTimeout(connectToAtlas, 10000).unref();
  }
}

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`School site and results API running on http://localhost:${port}`);
  void connectToAtlas();
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  });
}
