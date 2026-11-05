import mongoose from 'mongoose';
import Result from '../models/Result.js';

export async function createResult(req, res) {
  if (!req.is('application/json') || !req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Send the result details as a JSON object.' });
  }
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'The result database is currently unavailable.' });
  }

  const { rollNumber, dateOfBirth } = req.body;
  const validDate =
    typeof dateOfBirth === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) &&
    !Number.isNaN(Date.parse(`${dateOfBirth}T00:00:00Z`)) &&
    new Date(`${dateOfBirth}T00:00:00Z`).toISOString().slice(0, 10) === dateOfBirth;
  if (typeof rollNumber !== 'string' || !/^[A-Z0-9/-]{2,32}$/i.test(rollNumber.trim()) || !validDate) {
    return res.status(400).json({ error: 'Enter a valid roll number and date of birth.' });
  }

  try {
    const result = await Result.create(req.body);
    return res.status(201).json({
      id: result.id,
      rollNumber: result.rollNumber,
      studentName: result.studentName,
      academicYear: result.academicYear,
      examName: result.examName,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ error: 'Check the result fields and subject marks, then try again.' });
    }
    console.error('Result creation failed.');
    return res.status(500).json({ error: 'The result could not be saved.' });
  }
}

export async function uploadResultPdf(req, res) {
  if (!Buffer.isBuffer(req.body) || req.body.length < 5 || req.body.subarray(0, 5).toString() !== '%PDF-') {
    return res.status(400).json({ error: 'Choose a valid PDF file.' });
  }
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'The result database is currently unavailable.' });
  }

  try {
    const result = await Result.findByIdAndUpdate(
      req.params.resultId,
      { $set: { pdfData: req.body, pdfFilename: 'result.pdf' } },
      { new: true, runValidators: true }
    ).select('_id');

    if (!result) return res.status(404).json({ error: 'Result record was not found.' });
    return res.json({ pdfAvailable: true });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(404).json({ error: 'Result record was not found.' });
    }
    console.error('Result PDF upload failed.');
    return res.status(500).json({ error: 'The PDF could not be saved.' });
  }
}
