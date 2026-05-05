# Mistake 5: Overly Permissive File & Folder Exposure

## What This Demo Shows

This folder is intentionally messy to show what **not** to commit to GitHub. It demonstrates the most common beginner mistake: committing sensitive files and folders to version control.

## The Problem

You start building an app and organize it like this:

```
project/
├── app.js           # Your main app
├── uploads/         # User uploads (image files, documents)
├── logs/            # Application logs
├── test_data/       # Test data for development
├── routes/          # API routes
├── config/          # Configuration files
└── .gitignore
```

Then you run:

```bash
git add .
git commit -m "Initial commit"
git push
```

Without checking what's inside each folder. Now all these folders are public, and they might contain:

- **uploads/** - Real user files, PDFs, images with metadata.
- **logs/** - Requests with user IPs, error messages, stack traces.
- **test_data/** - Fake user credentials, test API keys, sample emails.
- **config/** - Database connection strings, feature flags, internal URLs.

Anyone who clones your repo sees everything. This is a **data leak**.

## What's In This Folder

Let me show you what's wrong here:

### 📁 uploads/

```
uploads/
├── user_profile_123.jpg
├── invoice_2024.pdf
└── confidential_report.docx
```

**Problem:** Real user files are committed. If these are actual uploads, they shouldn't be in version control at all. They should be in cloud storage (AWS S3, Google Cloud Storage, etc.).

**Fix:** Add to `.gitignore`:
```bash
echo "uploads/" >> .gitignore
```

### 📁 logs/

```
logs/
├── app.log
├── error.log
└── access.log
```

Contains lines like:
```
2024-05-05 10:23:45 - User login from IP 192.168.1.100
2024-05-05 10:24:12 - Database query took 500ms
2024-05-05 10:25:00 - ERROR: Connection refused to db.internal.company.com
```

**Problem:** Logs reveal internal infrastructure, IP addresses, and errors that help attackers find vulnerabilities.

**Fix:** 
```bash
echo "logs/" >> .gitignore
echo "*.log" >> .gitignore
```

### 📁 test_data/

```
test_data/
├── users.json
├── products.json
└── config.json
```

**users.json:**
```json
[
  { "id": 1, "email": "admin@company.com", "password": "test123" },
  { "id": 2, "email": "user@test.com", "password": "password" }
]
```

**Problem:** This looks like test data, but it might contain real credentials, real user emails, or production data used for testing.

**Fix:**
```bash
echo "test_data/" >> .gitignore
```

Or better: keep test data separate from the repo entirely.

### 📁 routes/

```
routes/
├── api.js
├── admin.js
└── internal.js
```

**internal.js might contain:**
```javascript
app.get("/admin/internal-stats", (req, res) => {
  // Returns detailed server stats, user counts, internal metrics
});
```

**Problem:** You exposed an internal endpoint. Now attackers know it exists.

**Fix:** Don't commit internal/debug endpoints to production code at all.

### 📁 config/

```
config/
├── database.json
├── secrets.json
└── api-keys.json
```

**database.json:**
```json
{
  "host": "db.internal.company.com",
  "port": 5432,
  "user": "postgres",
  "password": "SuperSecret123!"
}
```

**Problem:** Database credentials are exposed. Anyone can now log into your database.

**Fix:**
```bash
echo "config/database.json" >> .gitignore
echo "config/*.json" >> .gitignore
# Or use environment variables instead
```

## The _fixes Folder

There's a `_fixes/` folder that shows how the above should be structured:

```
_fixes/
├── .gitignore          # Proper ignore rules
├── config/             # Empty or with templates only
├── uploads/            # Empty (real files go to cloud storage)
└── logs/               # Empty (logs go to logging service)
```

**Key files in _fixes:**

**.gitignore (best practices):**
```text
# Logs
logs/
*.log
npm-debug.log*
lerna-debug.log*

# User uploads (go to cloud storage instead)
uploads/

# Test data
test_data/
fixtures/

# Configuration with secrets
config/database.json
config/secrets.json
config/api-keys.json
.env

# Dependency and build artifacts
node_modules/
dist/
build/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

## How To Avoid This Mistake

### Rule 1: Always Run `git status` First

Before every commit, run:

```bash
git status
```

Read every file name. If you see a folder you didn't intend to add, stop.

### Rule 2: Never Use `git add .`

This adds everything. Instead, be specific:

```bash
# Good
git add src/ package.json README.md

# Bad
git add .
```

### Rule 3: Create `.gitignore` Early

Add a `.gitignore` file at the start of your project:

```bash
# Copy from _fixes/.gitignore
cp _fixes/.gitignore .gitignore
```

### Rule 4: Use Environment Variables For Configuration

**Bad:**
```javascript
const db = require("./config/database.json");
```

**Good:**
```javascript
const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};
```

### Rule 5: Store Files In Cloud, Not Git

For uploads, logs, and temporary files:

- **Uploads** → AWS S3, Google Cloud Storage, Azure Blob
- **Logs** → Datadog, LogRocket, Papertrail
- **Temp files** → /tmp directory (ignored by .gitignore)

## Real-World Example

A startup committed `config/stripe-keys.json` to GitHub. Bots found it within 6 hours. Attackers used the keys to charge $50,000 to random customers before the keys were revoked.

This is not hypothetical. This happens every day.

## What You Should Do Tonight

1. Open one of your projects.
2. Run `git status`.
3. Look at every file that would be committed.
4. Ask: "Should this be public?"
5. If not, add it to `.gitignore`.
6. Run `git status` again to confirm it's ignored.

```bash
# Example
git status
# Shows: logs/, uploads/, test_data/, config/

echo "logs/" >> .gitignore
echo "uploads/" >> .gitignore
echo "test_data/" >> .gitignore
echo "config/*.json" >> .gitignore

git add .gitignore
git commit -m "add comprehensive gitignore rules"
```

## Key Takeaway

**Always ask before committing: "Is this something I want the world to see?"**

If the answer is no, add it to `.gitignore`.

---

## See Also

- [.gitignore best practices](https://git-scm.com/docs/gitignore)
- [GitHub's .gitignore templates](https://github.com/github/gitignore)
- [OWASP: Sensitive Data Exposure](https://owasp.org/www-project-top-ten/)
