# Fix: Mistake 5 — File & Folder Exposure

## What's exposed in this repo

| Path | What's in it | Risk |
|---|---|---|
| `uploads/` | Actual user files (resume, personal notes) | Personal data leak |
| `logs/server.log` | API keys, emails, passwords in plain text | Full credential exposure |
| `test_data/users.json` | Names, emails, phone numbers, MD5 passwords | PII / GDPR violation |
| `app.js` line 19 | `app.use(express.static("./"))` | Serves ENTIRE codebase as public files |

Visiting `http://your-server/logs/server.log` returns the full log file.
Visiting `http://your-server/config.js` returns every credential.

## Fix 1 — add a proper .gitignore

Create `.gitignore` **before** your first commit:

```gitignore
# Dependencies
node_modules/

# Environment & secrets — the most important ones
.env
.env.*
config.local.js

# User-generated content — not source code
uploads/
logs/

# Test data with real-looking info
test_data/

# Build artifacts
dist/
build/

# OS junk
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
```

If already tracked:
```bash
git rm -r --cached uploads/ logs/ test_data/
echo "uploads/" >> .gitignore
echo "logs/"    >> .gitignore
echo "test_data/" >> .gitignore
git commit -m "stop tracking sensitive directories"
```

## Fix 2 — serve ONLY the public folder

```js
// app.js — BEFORE (wrong)
app.use(express.static("./"));          // exposes everything

// app.js — AFTER (correct)
app.use(express.static("./public"));    // only serves public/
```

## Fix 3 — validate uploads properly

```js
// routes/upload.js — FIXED
const ALLOWED_TYPES = ["application/pdf", "text/plain", "image/jpeg", "image/png"];
const MAX_SIZE_MB   = 5;

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    // ✅ Use a generated name, never the original filename
    filename: (req, file, cb) => {
      const ext  = path.extname(file.originalname);
      const name = crypto.randomUUID();
      cb(null, name + ext);
    },
  }),
  limits:  { fileSize: MAX_SIZE_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error("File type not allowed"), false);
  },
});
```

## Fix 4 — delete the /debug endpoint

```js
// Remove this entirely from app.js
app.get("/debug", (req, res) => {
  res.json({ env: process.env, apiKey: GEMINI_API_KEY, ... });
});
```

## Golden rule

```bash
# Always check what you're about to commit
git status
git diff --staged

# Never blindly run:
git add .
```
