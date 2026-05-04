# AirZy: Flight Booking Platform

## What This Project Is

AirZy is a full-stack travel platform for discovering and booking flights. It combines a React frontend with a FastAPI backend and uses Supabase for authentication and data storage.

Think of it as a learning project that demonstrates:
- Full-stack development (frontend + backend).
- Integration with third-party services (Supabase).
- API design and consumption.
- User authentication and profiles.
- Real-world database schema design.

## Architecture

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend** | React + Vite | User-facing interface for searching, booking, and discovering flights |
| **Backend** | FastAPI + Python | API endpoints for authentication, flights, bookings, chat, and itineraries |
| **Database** | Supabase (PostgreSQL) | User accounts, flight data, bookings, preferences |

## Key Features

- **Authentication** - Sign up and login with Supabase Auth.
- **Flight Search** - Filter flights by source, destination, and date.
- **Booking System** - Reserve flights with passenger information.
- **AI Travel Chatbot** - Backend endpoint powered by an LLM.
- **Itinerary Generation** - AI creates day-by-day travel plans.
- **Price Alerts** - Notify users about price drops on watched routes.
- **Squad Trips** - Create group trips and split expenses.
- **Buddy Finder** - Find travel companions with matching interests.
- **Carbon Tracker** - Compare eco-friendly flight options.
- **Destination Swipes** - Swipe through destinations Tinder-style.

## Project Structure

```
api/
├── frontend/          # React + Vite (port 5173)
│   ├── src/
│   │   ├── pages/    # Page components (Auth, Booking, etc)
│   │   ├── components/
│   │   ├── lib/      # API client, auth helpers
│   │   └── utils/
│   └── package.json
│
├── backend/           # FastAPI + Supabase (port 8000)
│   ├── app/
│   │   ├── main.py   # API routes
│   │   ├── config.py # Settings
│   │   ├── schemas.py # Data models
│   │   └── supabase_client.py # Supabase integration
│   ├── supabase/
│   │   └── schema.sql # Database schema
│   └── requirements.txt
│
└── guidelines/
    └── Guidelines.md  # Project documentation
```

## Security Considerations

This is where things get important for this session. AirZy demonstrates **real security practices**:

### 1. Environment Variables

Both frontend and backend use `.env` files to store sensitive configuration:

**Frontend .env:**
```bash
VITE_API_BASE_URL=http://localhost:8000
```

**Backend .env:**
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Critical:** These `.env` files are in `.gitignore` and are **never** committed to git. If they are, all your keys are exposed.

### 2. Supabase Keys

Three types of Supabase credentials:
- **ANON_KEY** - Used by the frontend (public, but scoped).
- **SERVICE_ROLE_KEY** - Used by the backend (private, full access).
- **URL** - The Supabase project endpoint (public).

The service role key is sensitive. It controls the entire database. **Never expose it in frontend code or client-side requests.**

### 3. AI Integration

If AirZy calls an LLM API (Gemini, OpenAI, etc.), the API key goes in backend `.env`:
```bash
GEMINI_API_KEY=sk-...
```

**Not** in the frontend or in prompt context.

## Setup: Step By Step

### Prerequisites

- Node.js 18+ (verify with `node -v`)
- Python 3.9+ (verify with `python --version`)
- A Supabase account (free at supabase.com)

### Step 1: Supabase Project

1. Go to https://app.supabase.com
2. Create a new project.
3. Copy the project URL and keys (you'll need them in step 2).

### Step 2: Database Schema

1. Open the SQL editor in Supabase.
2. Copy-paste the contents of `backend/supabase/schema.sql`.
3. Run it. This creates all your tables and sample data.

### Step 3: Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv .venv

# Activate it
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "API_HOST=0.0.0.0" > .env
echo "API_PORT=8000" >> .env
echo "FRONTEND_URL=http://localhost:5173" >> .env
echo "SUPABASE_URL=<your-supabase-url>" >> .env
echo "SUPABASE_ANON_KEY=<your-anon-key>" >> .env
echo "SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>" >> .env
```

**Important:** Never commit `.env`. It's already in `.gitignore`.

### Step 4: Run the Backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API is now at http://localhost:8000

Health check: http://localhost:8000/health (should return `{"status": "ok"}`)

### Step 5: Frontend Setup

In a new terminal:

```bash
cd frontend

npm install

# Create .env
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
```

### Step 6: Run the Frontend

```bash
npm run dev:frontend
```

The app is now at http://localhost:5173

## Watching For Security Issues

When you review AirZy code, look for:

1. **Hardcoded secrets** - Any API key, password, or URL in code files.
2. **Leaky commits** - Was `.env` ever committed before being added to `.gitignore`?
3. **Public keys in private places** - Is the service role key in the frontend?
4. **Unvalidated user input** - Does the backend trust user input without checking?
5. **Exposed database URLs** - Can someone query your database directly?

## Making It Your Own

If you fork or adapt this project:

1. **Create your own Supabase project** - Don't reuse credentials.
2. **Regenerate all secrets** - Change the sample keys to your own.
3. **Test the .gitignore** - Run `git status` and confirm `.env` doesn't appear.
4. **Enable CORS properly** - Don't allow `*` in production.
5. **Audit dependencies** - Run `npm audit` and `pip check` regularly.

## Troubleshooting

**Frontend can't reach backend:**
- Make sure backend is running (`http://localhost:8000/health`).
- Check that `VITE_API_BASE_URL` is correct in frontend `.env`.

**Supabase connection fails:**
- Verify URL and keys in backend `.env`.
- Make sure your Supabase project is active.
- Check that the schema was imported successfully.

**npm install fails:**
- Delete `node_modules` and `package-lock.json`.
- Run `npm cache clean --force`.
- Try again: `npm install`.

## Next Steps

- Explore the backend code in `app/main.py` to see how FastAPI routes work.
- Look at `app/supabase_client.py` to understand database queries.
- Check `frontend/src/lib/api.ts` to see how the frontend calls the backend.
- Try adding a new feature (a new endpoint or a new page).
- Deploy it to the cloud (Vercel for frontend, Railway or Render for backend).

---

**Key Takeaway:** Real projects use environment variables for secrets, never commit them, and always validate what comes from users and external APIs.

