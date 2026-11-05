import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    marks: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator(value) {
          return value <= this.maxMarks;
        },
        message: 'Marks cannot exceed maximum marks.',
      },
    },
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
    subjects: {
      type: [subjectSchema],
      required: true,
      validate: {
        validator(subjects) {
          return subjects.length > 0 && subjects.length <= 30;
        },
        message: 'A result must contain between 1 and 30 subjects.',
      },
    },
    remarks: { type: String, default: '', maxlength: 500 },
    published: { type: Boolean, default: false },
    pdfData: { type: Buffer, select: false },
    pdfFilename: { type: String, maxlength: 120, default: '' },
  },
  { timestamps: true, collection: 'results' }
);

const Result =
  mongoose.models.StudentResult || mongoose.model('StudentResult', resultSchema, 'results');

export default Result;
