import mongoose from 'mongoose';
import Result from '../models/Result.js';

export async function lookupResult(req, res) {
  if (!req.is('application/json')) {
    return res.status(415).json({ error: 'Send lookup details as JSON.' });
  }

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
      .select('studentName className academicYear examName subjects remarks pdfFilename')
      .lean();

    if (!record) {
      return res.status(404).json({
        error: 'We could not find a published result with those details. Check them and try again.',
      });
    }

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
      pdfAvailable: Boolean(record.pdfFilename),
    });
  } catch (error) {
    console.error('Result lookup failed:', error.message);
    return res
      .status(500)
      .json({ error: 'We could not retrieve the result right now. Please try again later.' });
  }
}

export async function downloadResultPdf(req, res) {
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
      .select('+pdfData pdfFilename')
      .lean();

    if (!record?.pdfData?.length) {
      return res.status(404).json({ error: 'There is no PDF attached to this published result.' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${rollNumber}-result.pdf"`);
    res.setHeader('Cache-Control', 'no-store');
    return res.send(record.pdfData);
  } catch (error) {
    console.error('Result PDF download failed:', error.message);
    return res.status(500).json({ error: 'We could not download the PDF right now.' });
  }
}
