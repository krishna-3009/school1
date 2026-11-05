import { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Download, FileText, Phone, Search } from 'lucide-react';
import { apiFetch, readApiJson } from '../lib/api.js';

export default function ResultsPage() {
  const [form, setForm] = useState({ rollNumber: '', dateOfBirth: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  async function lookup(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await apiFetch('/api/results/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await readApiJson(response);
      if (!response.ok) throw new Error(data.error || 'Could not retrieve the result.');
      setResult(data);
      setPdfError('');
    } catch (err) {
      setError(err.message || 'Could not reach the result service. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function downloadPdf() {
    setPdfLoading(true);
    setPdfError('');
    try {
      const response = await apiFetch('/api/results/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await readApiJson(response);
        throw new Error(data.error || 'Could not download the PDF.');
      }
      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `${form.rollNumber.trim().toUpperCase()}-result.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (downloadError) {
      setPdfError(downloadError.message || 'Could not download the PDF.');
    } finally {
      setPdfLoading(false);
    }
  }
  return (
    <main className="results-page section">
      <div className="section-kicker">
        STUDENT SERVICES <span>07 / RESULTS</span>
      </div>
      <div className="results-heading">
        <div>
          <h1 className="page-title">
            Your hard work,
            <br />
            <em>all in one place.</em>
          </h1>
          <p className="page-lead">
            Enter your school roll number and date of birth to view your published result.
          </p>
        </div>
        <div className="results-mark">
          <FileText size={36} />
          <span>LEARN · GROW · SHINE</span>
        </div>
      </div>
      <div className="results-layout">
        <form className="results-form" onSubmit={lookup}>
          <div className="results-form-title">
            <span>
              <Search size={18} />
            </span>
            <div>
              <h2>Find your result</h2>
              <p>Your details are used only to look up a published result.</p>
            </div>
          </div>
          <label htmlFor="rollNumber">Roll / admission number</label>
          <input
            id="rollNumber"
            name="rollNumber"
            value={form.rollNumber}
            onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
            placeholder="e.g. SNPS-2026-014"
            autoComplete="off"
            required
            maxLength={32}
          />
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
            required
            max={today}
          />
          <button className="button dark" type="submit" disabled={loading}>
            {loading ? 'Looking up…' : 'View my result'} {!loading && <ArrowRight size={17} />}
          </button>
          <p className="results-privacy">
            For your privacy, only published results can be viewed with both details.
          </p>
          {error && (
            <p className="results-error" role="alert">
              <AlertCircle size={16} />
              {error}
            </p>
          )}
        </form>
        <div className="result-display">
          {result ? (
            <article className="result-card">
              <div className="result-success">
                <CheckCircle2 size={19} /> RESULT FOUND
              </div>
              <div className="result-student">
                <div>
                  <small>STUDENT</small>
                  <h2>{result.studentName}</h2>
                </div>
                <span>{result.className}</span>
              </div>
              <p className="result-exam">
                {result.examName} <b>·</b> {result.academicYear}
              </p>
              <div className="result-summary">
                <div>
                  <small>TOTAL</small>
                  <strong>
                    {result.total}
                    <span> / {result.maximum}</span>
                  </strong>
                </div>
                <div>
                  <small>PERCENTAGE</small>
                  <strong>
                    {result.percentage}
                    <span>%</span>
                  </strong>
                </div>
              </div>
              <div className="result-subjects">
                <div className="subject-row subject-head">
                  <span>SUBJECT</span>
                  <span>MARKS</span>
                </div>
                {result.subjects.map((subject) => (
                  <div className="subject-row" key={subject.name}>
                    <span>{subject.name}</span>
                    <b>
                      {subject.marks} <small>/ {subject.maxMarks}</small>
                    </b>
                  </div>
                ))}
              </div>
              {result.remarks && <p className="result-remarks">{result.remarks}</p>}
              {result.pdfAvailable && (
                <div className="result-pdf-section">
                  <div>
                    <FileText size={20} />
                    <span><b>PDF result copy</b><small>Private download using your lookup details</small></span>
                  </div>
                  <button type="button" className="button dark" onClick={downloadPdf} disabled={pdfLoading}>
                    {pdfLoading ? 'Preparing…' : 'Download PDF'} <Download size={16} />
                  </button>
                  {pdfError && <p className="results-error" role="alert">{pdfError}</p>}
                </div>
              )}
            </article>
          ) : (
            <div className="result-empty">
              <div>
                <FileText size={29} />
              </div>
              <h3>Your result will appear here</h3>
              <p>Use the details provided by your school to look up a published result.</p>
              <span>SHANTI NIKETAN PUBLIC SCHOOL</span>
            </div>
          )}
        </div>
      </div>
      <div className="results-help">
        <span>NEED A HAND?</span>
        <p>If your result isn’t available or your details don’t work, contact the school office.</p>
        <a href="tel:+918340482585">
          <Phone size={15} /> +91 83404 82585
        </a>
      </div>
    </main>
  );
}
