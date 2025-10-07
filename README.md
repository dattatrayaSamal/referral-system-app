# referral-system-app

![Dashboard](frontend/project/public/WorkoAI.png)

## Features
- Refer new candidates with name, email, phone, job title, and resume upload (PDF only).
- View list of all referred candidates.
- Update candidate status (Pending, Reviewed, Hired).
- Form validations on frontend and backend.
- Resume files uploaded and stored on server.
- Error handling and user feedback on invalid data.

## Running Locally

### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
2. Install dependencies:
   npm install   

3. Create .env file (if needed) for any environment variables.

4. Start the server:
   nodemon server.js
   
Backend will run on http://localhost:8000.

Frontend

1. Navigate to the frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Start the React development server:
   npm start
Frontend will run on http://localhost:5173.

Assumptions & Limitations

Phone number must be exactly 10 digits.

Email must be in valid format.

Resume upload is restricted to PDF files only.

Files are stored locally on server (no cloud storage).

No user authentication implemented.

Status values are limited to "Pending", "Reviewed", and "Hired".

The app currently runs locally; no live deployment included.
