# Student results lookup

The results page is available from the main navigation and at `/?page=results` (also `results.html`). It sends a roll/admission number and date of birth to the server. MongoDB credentials stay in the server's local `.env` file and are never sent to the browser.

## Add a result in Atlas

The app reads from the **`school`** database and **`results`** collection. I checked the collection count; it currently has no documents.

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

1. Install dependencies with `npm install`.
2. The provided Atlas variables are in the ignored local `.env` file. If setting up on another machine, copy `.env.example` to `.env` and add that machine's Atlas values. Set `MONGODB_DATABASE` to the Atlas database that contains the `results` collection.
3. Allow the machine's IP address in Atlas Network Access and ensure the database user has read access to the target database.
4. Run `npm run dev` and open `http://127.0.0.1:5174/?page=results`.

For deployment, set `NODE_ENV=production`, run `npm run build`, then `npm start`. Deploy the Node server and set the Atlas variables in the hosting provider's secret environment settings. Never commit `.env` or place Atlas credentials in frontend code.
