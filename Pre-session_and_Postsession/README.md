# Pre-Session & Post-Session Resources

This folder contains materials to help you prepare before the session and continue learning afterward.

## Before The Session (presession_student.pdf)

**Read this 2 days before the session.**

This PDF covers:
- What you need to install and have ready
- Basic git commands you should know
- Quick security overview so you're not totally new to the concepts
- What to expect in the 1.5-hour session
- FAQ about Docker and security

### Pre-Session Checklist

Make sure you have:

- [ ] **Laptop with terminal** (PowerShell on Windows, Terminal on Mac/Linux)
- [ ] **GitHub account** with at least one repo
- [ ] **Node.js installed** (`node -v` should show a version)
- [ ] **OR Python installed** (`python --version` should show a version)
- [ ] **Git configured** (`git config --global user.email` should show your email)
- [ ] **One project folder** ready (any assignment or practice project)
- [ ] **VS Code or a code editor** open and working

Optional but helpful:
- [ ] **Docker Desktop** installed (if you want to follow along with the Docker demo)

## During The Session

You'll see live demos of:
1. **API Key Leak** - Hardcoded secrets in code
2. **Dependency Vulnerabilities** - Outdated packages
3. **Git History Leaks** - Secrets in commit history
4. **No Dockerfile** - "Works on my machine" problems
5. **File Exposure** - Committing sensitive folders

For each mistake, you'll get:
- The problem explained
- The exact commands to fix it
- A hands-on exercise to try on your own project

## After The Session (postsession_resources.pdf)

**Read this right after the session while everything is fresh.**

This PDF contains:
- **30-day action plan** - Week by week steps to contribute to open source
- **Tool recommendations** - Secret scanning, dependency checkers, Docker resources
- **Security learning paths** - Where to read more about each topic
- **Open source starting points** - Good first issues, contribution guides, communities
- **GSoC prep** - Organizations, how to stand out, timeline

### Your 30-Day Plan Overview

**Week 1:**
- Find 3 open source repos that interest you
- Read through the good-first-issue and help-wanted labels
- Leave thoughtful comments on 3 issues

**Week 2:**
- Submit your first pull request
- It can be: documentation fix, bug fix, or small feature
- Get feedback and iterate

**Week 3:**
- Aim for 2-3 PRs merged
- Start a small project of your own
- Push it to GitHub

**Month 1:**
- 3+ PRs merged total
- Your own project is live on GitHub
- Your profile shows consistent green squares (proof of work)
- You're ready to apply for GSoC or internships

## Git Cheat Sheet (git-cheat-sheet-education.pdf)

Quick reference for all the git commands you'll use:

**Essential:**
```bash
git status              # Always check this first
git add <file>         # Stage specific files
git commit -m "msg"    # Save your work
git push               # Upload to GitHub
```

**Security:**
```bash
git rm --cached .env   # Untrack a secret file
git log --oneline      # See commit history
git diff               # See what changed
```

**Cleanup:**
```bash
git filter-repo        # Remove secrets from history
git reflog             # See deleted commits
```

Use this as a quick lookup during the session.

## What To Do Right Now

1. **Download presession_student.pdf** and skim it (takes 10 minutes).
2. **Check your setup** - run the commands in the checklist above.
3. **Come to the session** ready to follow along and try the demos.
4. **After the session**, read postsession_resources.pdf and pick one thing to do tonight.

## Key Resources In These PDFs

All the links you'll need:
- Docker learning: Play with Docker, Docker official docs
- Security: OWASP Top 10, MITRE CVE, PortSwigger Academy
- Open source: Good First Issues, Up For Grabs, GitHub Explore
- GSoC: Official organizations list, contributor guide

## Questions Before The Session?

Check presession_student.pdf FAQ section or ask in the session chat.

## After The Session: Your First Commit

```bash
# 1. Fix one mistake in your project (e.g., add .env to .gitignore)
git status
git add .gitignore
git commit -m "add gitignore rules for secrets and uploads"
git push

# 2. Find an open source issue
# Go to goodfirstissues.com or github.com/explore

# 3. Leave a thoughtful comment
# "I'd like to try this. Here's my approach: ..."

# 4. Star the repo and follow the maintainer

# That's it. You've started contributing.
```

---

**Remember:** Open source is built one contribution at a time. You don't need to be an expert. You just need to show up.

Good luck! 🚀
