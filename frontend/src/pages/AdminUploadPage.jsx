import { useState } from 'react';
import { ArrowRight, FileText, Plus, Trash2, Upload } from 'lucide-react';
import { apiFetch, readApiJson } from '../lib/api.js';

const emptySubject = () => ({ name: '', marks: '', maxMarks: '100' });
const initialForm = () => ({
  rollNumber: '',
  dateOfBirth: '',
  studentName: '',
  className: '',
  academicYear: '',
  examName: '',
  remarks: '',
  published: true,
  subjects: [emptySubject()],
});

export default function AdminUploadPage() {
  const [password, setPassword] = useState('');
  const [passwordEditable, setPasswordEditable] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [pdfFile, setPdfFile] = useState(null);
  const [createdResult, setCreatedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  function updateSubject(index, field, value) {
    setForm((current) => ({
      ...current,
      subjects: current.subjects.map((subject, subjectIndex) =>
        subjectIndex === index ? { ...subject, [field]: value } : subject
      ),
    }));
  }

  function selectPdf(event) {
    const file = event.target.files?.[0] || null;
    setError('');
    if (!file) return setPdfFile(null);
    if (!file.name.toLowerCase().endsWith('.pdf') || (file.type && file.type !== 'application/pdf')) {
      event.target.value = '';
      setPdfFile(null);
      return setError('Choose a PDF file.');
    }
    if (file.size > 8 * 1024 * 1024) {
      event.target.value = '';
      setPdfFile(null);
      return setError('The PDF must be 8 MB or smaller.');
    }
    setPdfFile(file);
  }

  async function attachPdf(resultId, file = pdfFile) {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const response = await apiFetch(`/api/admin/results/${resultId}/pdf`, {
        method: 'POST',
        headers: {
          'X-Admin-Password': password,
          'Content-Type': 'application/pdf',
        },
        body: file,
      });
      const data = await readApiJson(response);
      if (!response.ok) throw new Error(data.error || 'The PDF could not be uploaded.');
      setMessage('Result and PDF saved successfully.');
      setPdfFile(null);
    } catch (uploadError) {
      setError(`${uploadError.message} The result itself was saved; you can retry the PDF upload.`);
    } finally {
      setLoading(false);
    }
  }

  async function saveResult(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await apiFetch('/api/admin/results', {
        method: 'POST',
        headers: {
          'X-Admin-Password': password,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          subjects: form.subjects.map((subject) => ({
            ...subject,
            marks: Number(subject.marks),
            maxMarks: Number(subject.maxMarks),
          })),
        }),
      });
      const data = await readApiJson(response);
      if (!response.ok) throw new Error(data.error || 'The result could not be saved.');
      setCreatedResult(data);
      setMessage('Result saved successfully.');
      if (pdfFile) await attachPdf(data.id, pdfFile);
    } catch (saveError) {
      setError(saveError.message || 'The result could not be saved.');
    } finally {
      setLoading(false);
    }
  }

  function startAnother() {
    setForm(initialForm());
    setPdfFile(null);
    setCreatedResult(null);
    setError('');
    setMessage('');
  }

  return (
    <main className="results-page section admin-page">
      <div className="section-kicker">
        SCHOOL ADMIN <span>PRIVATE RESULT ENTRY</span>
      </div>
      <div className="results-heading">
        <div>
          <h1 className="page-title">
            Add a student
            <br />
            <em>result securely.</em>
          </h1>
          <p className="page-lead">
            Enter the result details and optionally attach a PDF report for the student to download.
          </p>
        </div>
        <div className="results-mark">
          <Upload size={34} />
          <span>ADMIN ENTRY</span>
        </div>
      </div>

      <form className="results-form admin-form" onSubmit={saveResult}>
        <div className="results-form-title">
          <span><FileText size={18} /></span>
          <div>
            <h2>Result details</h2>
            <p>The upload password is checked by the server and is not saved in the browser.</p>
          </div>
        </div>

        <label htmlFor="adminPassword">Admin upload password</label>
        <input
          id="adminPassword"
          name="admin-upload-secret"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onFocus={() => setPasswordEditable(true)}
          readOnly={!passwordEditable}
          autoComplete="new-password"
          required
        />

        <div className="admin-field-grid">
          <label>
            Roll / admission number
            <input name="rollNumber" value={form.rollNumber} onChange={updateField} required maxLength={32} />
          </label>
          <label>
            Date of birth
            <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={updateField} required max={today} />
          </label>
          <label>
            Student name
            <input name="studentName" value={form.studentName} onChange={updateField} required maxLength={120} />
          </label>
          <label>
            Class
            <input name="className" value={form.className} onChange={updateField} required maxLength={30} />
          </label>
          <label>
            Academic year
            <input name="academicYear" value={form.academicYear} onChange={updateField} required maxLength={20} placeholder="2025-2026" />
          </label>
          <label>
            Exam name
            <input name="examName" value={form.examName} onChange={updateField} required maxLength={80} />
          </label>
        </div>

        <div className="admin-subject-heading">
          <div><strong>Subjects and marks</strong><small>Add between 1 and 30 subjects.</small></div>
          <button type="button" className="admin-add-subject" onClick={() => setForm((current) => ({ ...current, subjects: [...current.subjects, emptySubject()] }))} disabled={form.subjects.length >= 30}>
            <Plus size={15} /> Add subject
          </button>
        </div>
        <div className="admin-subject-list">
          {form.subjects.map((subject, index) => (
            <div className="admin-subject-row" key={index}>
              <label>
                Subject
                <input value={subject.name} onChange={(event) => updateSubject(index, 'name', event.target.value)} required maxLength={80} />
              </label>
              <label>
                Marks
                <input type="number" min="0" step="0.01" value={subject.marks} onChange={(event) => updateSubject(index, 'marks', event.target.value)} required />
              </label>
              <label>
                Maximum
                <input type="number" min="1" step="0.01" value={subject.maxMarks} onChange={(event) => updateSubject(index, 'maxMarks', event.target.value)} required />
              </label>
              <button type="button" aria-label={`Remove subject ${index + 1}`} onClick={() => setForm((current) => ({ ...current, subjects: current.subjects.filter((_, subjectIndex) => subjectIndex !== index) }))} disabled={form.subjects.length <= 1}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <label htmlFor="remarks">Remarks (optional)</label>
        <textarea id="remarks" name="remarks" value={form.remarks} onChange={updateField} rows="3" maxLength={500} />

        <label className="admin-pdf-label" htmlFor="resultPdf">Attach result PDF (optional, max 8 MB)</label>
        <input id="resultPdf" key={createdResult?.id || 'new-result'} type="file" accept="application/pdf,.pdf" onChange={selectPdf} />
        {pdfFile && <p className="admin-file-name">Selected: {pdfFile.name}</p>}

        <label className="admin-publish-toggle">
          <input type="checkbox" name="published" checked={form.published} onChange={updateField} />
          Publish this result for student lookup
        </label>

        {!createdResult ? (
          <button className="button dark" type="submit" disabled={loading || !password}>
            {loading ? 'Saving…' : 'Save result'} {!loading && <ArrowRight size={17} />}
          </button>
        ) : (
          <div className="admin-saved-actions">
            <p>Saved {createdResult.studentName} · {createdResult.rollNumber} · {createdResult.academicYear}</p>
            {pdfFile && <button className="button dark" type="button" onClick={() => attachPdf(createdResult.id)} disabled={loading}>{loading ? 'Uploading PDF…' : 'Upload PDF'} <Upload size={16} /></button>}
            <button className="admin-add-subject" type="button" onClick={startAnother}>Add another result</button>
          </div>
        )}

        {message && <p className="admin-message" role="status">{message}</p>}
        {error && <p className="results-error" role="alert">{error}</p>}
      </form>
    </main>
  );
}
