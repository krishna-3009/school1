# Student results lookup

The results page is available from the main navigation and at `/?page=results` (also `results.html`). It sends a roll/admission number and date of birth to the server. MongoDB credentials stay in the server's local `.env` file and are never sent to the browser.

## Add results from the admin page

The admin entry page is available at **`/admin/upload-result`** from the main-site navigation. Saving requires the server-only `ADMIN_UPLOAD_TOKEN`; entering the token in the form does not store it in the browser. Set this variable in `backend/.env` for local development and in the Render environment settings for deployment. Use a unique random value of at least 32 characters. For example, generate one locally with:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

The form supports one student result at a time, with one or more subjects, optional remarks, and a publish checkbox. Only published records appear in student lookup. An optional PDF can be attached to the result; PDFs are stored in MongoDB with the result document and are limited to 8 MB. Students can download the PDF only after looking up the published result with its roll number and date of birth.

If the admin token is not configured on the server, the upload endpoints stay disabled and return an error. Never put the token in frontend source, commit it, or share it publicly.

## Add a result directly in Atlas

The app reads from the **`school`** database by default and the **`results`** collection. Set `MONGODB_DATABASE` if the collection is in another database.

In Atlas, open your project’s **Data Explorer**, select `school` → `results`, then choose **Add Data → Insert Document**. Paste a test record in JSON mode:

```json
{
  "rollNumber": "SNPS-TEST-001",
  "dateOfBirth": "2012-08-16",
  "studentName": "Demo Student",
  "className": "Class 8",
  "academicYear": "2025-2026",
  "examName": "Annual Examination",
  "subjects": [
    { "name": "English", "marks": 82, "maxMarks": 100 },
    { "name": "Mathematics", "marks": 91, "maxMarks": 100 },
    { "name": "Science", "marks": 88, "maxMarks": 100 }
  ],
  "remarks": "Demo record for testing. Replace or remove before launch.",
  "published": true
}
```

Click **Insert**, then on the website enter `SNPS-TEST-001` and `2012-08-16`. This is dummy data for testing only; replace it with authorized school records before launch, and remove the demo record afterward.

Each real result document needs these exact field names: `rollNumber`, `dateOfBirth`, `studentName`, `className`, `academicYear`, `examName`, `subjects`, `remarks`, and `published`. Store `dateOfBirth` as a `YYYY-MM-DD` string. The lookup matches the roll/admission number (case-insensitive), date of birth (exact), and `published: true`. Set `published` to true only when the school approves the result for release. The API returns the student's name, class, exam, marks, percentage, and remarks; it does not return date of birth or database identifiers.

## Run locally

1. Put `MONGODB_URI`, optional `MONGODB_DATABASE`, and `ADMIN_UPLOAD_TOKEN` in `backend/.env`. The URI is read by the server only. Keep this file private and uncommitted.
2. Allow the machine's IP address in Atlas Network Access and ensure the database user can read and write the target database.
3. In one terminal run `cd backend && npm install && npm run dev`.
4. In a second terminal run `cd frontend && npm install && npm run dev`.
5. Open `http://127.0.0.1:5174/?page=results` for student lookup or `http://127.0.0.1:5174/admin/upload-result` for admin entry.

The frontend uses the Vite `/api` proxy locally. If deploying the frontend and API on separate origins, set `VITE_API_BASE_URL` to the backend origin when building the frontend, and set `FRONTEND_ORIGIN` on the backend to the exact frontend origin. Multiple allowed origins can be comma-separated. When Express serves `frontend/dist` from the same Render service, leave `VITE_API_BASE_URL` unset; same-origin API requests work directly.

For Render, set `NODE_ENV=production`, `MONGODB_URI`, `MONGODB_DATABASE` if needed, and `ADMIN_UPLOAD_TOKEN` in the service environment settings. Build the frontend and start the backend as described in the project deployment instructions. Never commit `.env` or put Atlas credentials or the admin token in frontend code.
