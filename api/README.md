# AirZy Flight Platform

AI-powered travel platform with a React frontend and FastAPI backend using Supabase.

## Project Structure

- `frontend/` - React + Vite client.
- `backend/` - FastAPI service and Supabase integration.
- `backend/supabase/schema.sql` - SQL schema and seed data.

## Features

- User authentication with Supabase Auth.
- User profile fetch and display.
- Flight search and listing.
- Flight booking with passenger details.
- AI travel chatbot endpoint.
- Price alerts and itinerary generation.
- Carbon tracker, squad split, vibe mode, swipe discovery, and buddy matching.

## Environment Variables

Create `frontend/.env`:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

Create `backend/.env`:

```bash
API_HOST=0.0.0.0
API_PORT=8000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Setup

1. Create a Supabase project.
2. Run `backend/supabase/schema.sql` in the Supabase SQL editor.
3. Copy the Supabase URL and keys into `backend/.env`.
4. Make sure `backend/.env` stays out of git history.

## Run The App

Frontend:

```bash
cd frontend
npm install
npm run dev:frontend
```

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check:

```bash
GET http://localhost:8000/health
```

## Secret Leak Cleanup

If `backend/.env` was ever committed, stop tracking it first:

```bash
git rm --cached backend/.env
git commit -m "remove backend env from tracking"
```

Then add or confirm the ignore rule:

```bash
echo "backend/.env" >> .gitignore
```

To check whether the secret appears in history:

```bash
git log --all --full-history -- "*.env"
```

If a secret was pushed, rotate the credential after cleanup. History cleanup does not protect old clones or forks.

