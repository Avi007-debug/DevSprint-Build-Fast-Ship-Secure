# Fix: Mistake 2 — Dependency Vulnerabilities

## Run the audit first

```bash
npm audit
```

Expected output from this project:

```
lodash  <4.17.21
  Severity: HIGH
  Command Injection — CVE-2021-23337
  Prototype Pollution — CVE-2019-10744

axios  <0.21.2
  Severity: HIGH
  SSRF — Server-Side Request Forgery — CVE-2020-28168

minimist  <1.2.6
  Severity: CRITICAL
  Prototype Pollution — CVE-2021-44906

node-fetch  <2.6.7
  Severity: HIGH
  Exposure of Sensitive Information — CVE-2022-0235

multer  <=1.4.4
  Severity: HIGH
  Path traversal — CVE-2022-24434

jsonwebtoken  <9.0.0
  Severity: HIGH
  Authentication bypass — CVE-2022-23529

6 vulnerabilities (1 critical, 5 high)
```

## The fix

```bash
# Auto-fix compatible updates
npm audit fix

# Check what's left
npm audit

# Force-update if breaking changes are acceptable
npm audit fix --force

# Or update specific packages manually
npm install lodash@latest axios@latest minimist@latest
```

## Fixed package.json versions

```json
{
  "dependencies": {
    "express":      "4.18.2",
    "axios":        "1.6.2",
    "lodash":       "4.17.21",
    "multer":       "1.4.5-lts.1",
    "node-fetch":   "2.7.0",
    "minimist":     "1.2.8",
    "jsonwebtoken": "9.0.2",
    "mongoose":     "8.0.3"
  }
}
```

## Enable Dependabot (do this tonight)

Add `.github/dependabot.yml` to your repo:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

Dependabot will automatically open PRs whenever a dependency has a known CVE.
