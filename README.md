# My-folio

Modern portfolio project built with React + Vite, now configured with an Express backend that stores contact messages in MongoDB and sends inbox notifications via Gmail.

## Tech Stack

- Frontend: React, Vite, CSS
- Backend: Express, MongoDB (Mongoose), Nodemailer, CORS, dotenv
- Tooling: ESLint, nodemon, concurrently

## Project Structure

- `src/`: Frontend React app
- `server/`: Backend API (`/api/health`, `/api/contact`)
- `.env.example`: Environment variable template

## Quick Start

1. Install frontend dependencies:

	```bash
	npm install
	```

2. Install backend dependencies:

	```bash
	cd server
	npm install
	cd ..
	```

3. Create your env file:

	```bash
	cp .env.example .env
	```

4. Run frontend + backend together:

	```bash
	npm run dev:full
	```

Frontend runs on `http://localhost:5173` and backend runs on `http://localhost:5000`.

## Available Scripts

- `npm run dev`: Start frontend only
- `npm run dev:full`: Start frontend and backend together
- `npm run build`: Create production frontend build
- `npm run preview`: Preview production frontend build
- `npm run lint`: Run ESLint

Backend scripts (run inside `server/`):

- `npm run dev`: Start backend with auto-reload
- `npm start`: Start backend

## API Endpoints

- `GET /api/health`: Health check + MongoDB/email readiness
- `POST /api/contact`: Accepts `{ name, email, message }`, stores it in MongoDB, and sends it to your Gmail inbox

## Environment Variables

- `PORT`: Backend port (default `5000`)
- `CLIENT_ORIGIN`: Allowed CORS origin (default `http://localhost:5173`)
- `VITE_API_BASE_URL`: Optional frontend API base URL for production deployments
- `MONGODB_URI`: MongoDB connection string
- `GMAIL_USER`: Gmail sender account (for example `you@gmail.com`)
- `GMAIL_APP_PASSWORD`: Gmail App Password (required when 2FA is enabled)
- `CONTACT_RECEIVER_EMAIL`: Inbox that should receive contact notifications

## Gmail Setup Notes

- Enable 2-Step Verification on your Google account.
- Generate an App Password from Google Account > Security > App passwords.
- Put that generated password into `GMAIL_APP_PASSWORD`.

## Deploy To Render

This repo is configured to deploy as a single Render web service using [render.yaml](render.yaml).

### What gets deployed

- Render builds the Vite frontend into `dist/`
- The Express backend serves that built frontend and handles `/api/*`
- Contact form submissions continue to use MongoDB + Gmail

### Render setup

1. Push this repository to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Render will detect [render.yaml](render.yaml).
4. Provide these required secret environment variables during setup:
	- `MONGODB_URI`
	- `GMAIL_USER`
	- `GMAIL_APP_PASSWORD`
	- `CONTACT_RECEIVER_EMAIL`

### Render commands

- Build command: `npm install && npm --prefix server install && npm run build`
- Start command: `npm --prefix server start`
- Health check path: `/api/health`
