# DevSprint '26 - Session 4

Build Fast, Ship Secure

Open Source & Security | GDG RVCE | 1.5 hrs

This repository is the full session pack for the talk. Use this README as the master guide and the topic-specific READMEs for live demos:

- [api/README.md](api/README.md)
- [docker/README.md](docker/README.md)
- [Prompt-injection-simulation/README.md](Prompt-injection-simulation/README.md)

## Session Roles

YOU is the main host. Drive the technical demos, the explanations, and the live coding.

CO-HOST keeps the room engaged, runs crowd checks, handles questions, and bridges transitions.

## Session Goals

- Show students where security mistakes appear in real GitHub workflows.
- Give them concrete commands they can run tonight.
- Connect GitHub hygiene, Docker, and AI security to open source contribution.
- Leave them with a plan they can follow in the next 30 days.

## Full Timeline At A Glance

| Time | Duration | Segment | Owner |
| --- | --- | --- | --- |
| 0:00-0:07 | 7 min | Opening hook - live API key leak demo | YOU |
| 0:07-0:22 | 15 min | Dockerisation + OSS framing | YOU + CO-HOST |
| 0:22-1:08 | 46 min | The 5 mistakes - live demos + student tries | YOU leads, CO-HOST supports |
| 1:08-1:13 | 5 min | AI/LLM security teaser | YOU |
| 1:13-1:23 | 10 min | Action plan + 30-day checklist | YOU + CO-HOST |
| 1:23-1:30 | 7 min | Q&A + closing hype | CO-HOST opens, YOU closes |

## Phase 1 - Opening Hook

Use this to create the emotional hook in the first three minutes.

### Live API Key Leak Demo

0:00-0:03 - YOU

- Open a real GitHub repo live.
- Run `git log --all --full-history -- "*.env"` on screen.
- Let the output sit for 3 seconds.
- Say: If this were your project, that key is already burned.

0:03-0:05 - CO-HOST

- Ask: Honest question - how many of you have pushed a `.env` file before?
- Keep it light and non-shaming.
- Bridge back: That's exactly why we're here tonight.

0:05-0:07 - YOU

- Briefly walk through what is coming: 5 mistakes, Dockerisation, AI/LLM teaser, action plan.
- Say: By the end of this, your GitHub will be something you're proud to share.

## Phase 2 - Dockerisation And Open Source Context

This section introduces Docker and shows why open source visibility matters.

### 0:07-0:14 - YOU

- Open with the classic problem: it works on my machine.
- Explain Docker in one line: it packages your app and its environment into a container that runs identically everywhere.
- Cover the 3 core concepts fast:
	- Image: the blueprint.
	- Container: the running instance.
	- Dockerfile: the recipe.
- Show a minimal Dockerfile for a Node or Python app.
- Run `docker build -t myapp .` and `docker run myapp` live.
- Key line: Every company you interview at uses Docker. Every GSoC project uses Docker. This is not optional.

Minimal example for the live demo:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
```

### 0:14-0:17 - CO-HOST

- Ask who has heard of Docker but never used it.
- Reassure the room that this is the gap being closed tonight.
- Ask who has already used Docker and use those students as helpers.

### 0:17-0:22 - CO-HOST

- Frame open source as a career move, not just a contribution.
- Say GSoC orgs look at GitHub history, not resumes.
- Show a good first issue label like good-first-issue or help-wanted.
- Say: The session you're in right now is literally a GSoC prep session in disguise.

Key takeaway: A repo without a Dockerfile in 2025 is a repo that no one else can run.

## Phase 3 - The 5 Mistakes

This is the core of the session. YOU leads every technical demo. CO-HOST manages the room.

### Mistake 1 - API Key Leak

0:22-0:28 - YOU

- Show a project with a hardcoded API key.
- Explain that bots scrape GitHub within minutes of a push.
- Move the key into `.env`.
- Add `.env` to `.gitignore` with `echo '.env' >> .gitignore`.
- If already tracked, run `git rm --cached .env`.

0:28-0:32 - CO-HOST

- Ask students to check their last project for a `.env` file.
- Help anyone stuck.
- Call out the first student who fixes it.

Recommended cleanup commands:

```bash
git rm --cached .env
echo ".env" >> .gitignore
git commit -m "remove secrets from tracking"
git push
```

If a key was ever pushed, rotate it immediately.

### Mistake 2 - Dependency Vulnerabilities

0:32-0:38 - CO-HOST

- Open a project with outdated packages.
- Run `npm audit` live.
- Explain CVE in one sentence: a publicly known security hole in a package.
- Run `npm audit fix` and show the diff.
- Mention the Python equivalent: `pip check` and upgrading packages.

0:38-0:42 - YOU

- Ask students to run `npm audit` on their own project.
- Keep reactions light and energetic.

Useful commands:

```bash
npm audit
npm audit fix
pip check
pip install --upgrade <package>
```

### Mistake 3 - Public Repo Risks And Git History

0:42-0:48 - CO-HOST

- Run `git log --all --full-history -- "*.env"`.
- Show that deleting a file does not remove it from history.
- Mention BFG Repo Cleaner or git filter-repo as cleanup paths.
- Say: Assume anything you ever committed is public forever. Act accordingly.

0:48-0:52 - YOU

- Ask who found something in their history.
- Explain that reporting a secret leak is a valid contribution.
- Connect the finding to open source security work.

History cleanup options:

```bash
# BFG Repo Cleaner
git clone --mirror <repo-url>
cd repo.git
java -jar bfg.jar --delete-files .env
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force

# git filter-repo
git filter-repo --path .env --invert-paths
```

Always revoke the exposed key first, generate a new one, and then clean history.

### Mistake 4 - No Dockerfile / Inconsistent Environments

0:52-0:57 - YOU

- Show a project with no Docker setup.
- Ask what happens when someone is on a different Node or Python version.
- Write the minimal Dockerfile together.
- Run `docker build` and `docker run` to show consistent output.
- Add a `.dockerignore` file and explain that it works like `.gitignore`.

0:57-1:00 - CO-HOST

- Ask students whether their own projects have a Dockerfile.
- Keep it low-pressure.

`.dockerignore` starter content:

```text
node_modules
.env
*.log
.git
```

### Mistake 5 - Overly Permissive File / Folder Exposure

1:00-1:05 - CO-HOST

- Show a project with uploads, logs, or config folders committed with real data.
- Show a `config.json` or `test_data` folder with sensitive contents.
- Explain that serving too much from a directory exposes everything in it.
- Emphasize explicit control over what is served, committed, and ignored.
- Show `git status` before committing.

1:05-1:08 - YOU

- Ask how many people have done `git add .` without checking what was staged.
- Reinforce that `git status` first avoids half the mistakes in the session.

Key line: `git add .` is one of the most dangerous commands a beginner can run without thinking.

## Phase 3.5 - AI / LLM Security Teaser

1:08-1:13 - YOU only.

Use this immediately after Mistake 5 so it lands as a real risk in the project they just built.

Opening line:

```text
You've just secured your keys, your dependencies, your history, and your Docker setup. Here's what comes next - and it's specific to the project you just built.
```

What to say:

- Prompt injection is like SQL injection, but for AI instructions.
- A user can type a malicious prompt and override your system instructions.
- Show a 30-second example where a chatbot restricted to cooking reveals a secret when instructed to ignore prior rules.
- Do not go deep. Plant the seed.
- Drop the OWASP LLM Top 10 link in chat: https://owasp.org/www-project-llm-ai-security-top-10

Closing line:

```text
The OWASP Top 10 has a sister list specifically for LLM apps. That's your weekend reading.
```

## Phase 4 - Action Plan And Roadmap

1:13-1:23 - this is the bridge from demos to action.

### 1:13-1:18 - YOU

- Say: GSoC is built on what you've already done, not what you plan to do.
- Walk through the four steps:
	1. Find a repo.
	2. Find an issue.
	3. Leave a comment.
	4. Star the repo.
- Reinforce that a thoughtful comment is a contribution.

### 1:18-1:21 - CO-HOST

- Walk through a 30-day checklist.
- Week 1: start a small repo and comment on 3 issues.
- Week 2: get a first PR merged.
- Week 3: get 3 PRs merged total and publish your own project.
- Month 1: have one live project and visible GitHub activity.

### 1:21-1:23 - CO-HOST

- Ask who will find one issue tonight.
- Get visible buy-in.
- Name a few students who raise their hands.

Golden line: GSoC is built on what you've already done, not what you plan to do.

## Phase 5 - Closing

1:23-1:30 - Q&A and wrap-up.

### 1:23-1:26 - CO-HOST

- Open the floor for questions.
- Route technical deep-dives to YOU.
- Keep energy up.

### 1:26-1:28 - YOU

- Recap the 5 mistakes and the fixes in about 90 seconds.
- Remind students that the security angle in a project demo gives them an edge.
- Share the starter repo, checklist, and post-session resources.

### 1:28-1:30 - CO-HOST

- Close with energy.
- Ask students to share what they fixed on LinkedIn with #DevSprint26.
- Plug the next session in the series.

Closing line:

```text
Build fast, build smart, and build secure - that's how real developers stand out.
```

## Pre-Session Requirements For Students

Send this at least 2 days before the session.

Students should have:

| Requirement | How to verify |
| --- | --- |
| Laptop with internet and a working terminal | Open a terminal and run `ls` |
| GitHub account with at least one repo | Log into github.com |
| Node.js installed | Run `node -v` |
| Or Python installed | Run `python --version` |
| Git configured with GitHub account | Run `git config --global user.email` |
| VS Code or another editor | Create and save a test file |
| One existing project folder | Any assignment project works |

Optional but useful for the Docker demo:

- Docker Desktop installed.
- Students without Docker can still follow the live demo.

## Git Commands Students Should Know

Cover these briefly near the start of Phase 2.

| Command | What it does |
| --- | --- |
| `git init` | Initialize a new repository |
| `git clone <url>` | Download a repo from GitHub |
| `git status` | Show changed and staged files |
| `git add <file>` | Stage a file carefully |
| `git commit -m ''` | Save a snapshot with a message |
| `git push` | Upload commits to GitHub |
| `git log` | Show commit history |
| `git diff` | Show exact changes since the last commit |
| `git rm --cached <file>` | Untrack a file without deleting it |
| `echo '.env' >> .gitignore` | Add `.env` to `.gitignore` |

## Facilitator Prep

What YOU and CO-HOST should prepare before the session:

- A sample GitHub repo with a dummy API key in commit history, not a live key.
- A project with outdated npm packages for `npm audit`.
- Live verification of `git log --all --full-history -- "*.env"`, `npm audit`, and `npm audit fix`.
- A minimal Dockerfile that builds and runs successfully.
- A sample project with a committed uploads or config folder for Mistake 5.
- The prompt injection demo with a restrictive system prompt that can be hijacked.
- A fallback notebook link ready to drop in chat.
- Starter repo link, 30-day checklist, and post-session resource list.
- A full dry run the day before.

CO-HOST should also be ready to:

- Explain the five mistakes at a basic level.
- Know Docker concepts: image, container, Dockerfile.
- Have crowd engagement questions ready.
- Monitor chat and Q&A throughout the session.
- Practice the transition lines.
- Agree on a signal if a demo is running long.

## Post-Session Resources

Share these at the end of the session so students can continue independently.

### Secret Scanning And History Cleanup

- Gitleaks - https://github.com/gitleaks/gitleaks
- TruffleHog - https://github.com/trufflesecurity/trufflehog
- BFG Repo Cleaner - https://rtyley.github.io/bfg-repo-cleaner

### Dependency And Vulnerability Scanning

- Snyk - https://snyk.io
- GitHub Dependabot - https://docs.github.com/en/code-security/dependabot
- npm audit - built into npm

Useful commands:

```bash
npm audit
npm audit fix
pip check
pip install --upgrade <package>
```

### Docker Learning

- Play with Docker - https://labs.play-with-docker.com
- Docker getting started - https://docs.docker.com/get-started
- Dockerfile best practices - https://docs.docker.com/develop/develop-images/dockerfile_best-practices

### Security References

- OWASP Top 10 - https://owasp.org/www-project-top-ten
- OWASP LLM Top 10 - https://owasp.org/www-project-llm-ai-security-top-10
- MITRE CVE database - https://cve.mitre.org
- PortSwigger Web Security Academy - https://portswigger.net/web-security

### Open Source Contribution Starting Points

- Good First Issues aggregator - https://goodfirstissues.com
- Up For Grabs - https://up-for-grabs.net
- First Contributions - https://github.com/firstcontributions/first-contributions
- GitHub Explore - https://github.com/explore

### GSoC Prep

- GSoC organisation list - https://summerofcode.withgoogle.com/programs/2025/organizations
- GSoC contributor guide - https://google.github.io/gsocguides/student
- OpenSSF Best Practices - https://bestpractices.coreinfrastructure.org

## The Do This Tonight Reminder

1. Find one open source repo you find interesting.
2. Read the open issues and find one labelled good-first-issue or help-wanted.
3. Leave a thoughtful comment: I'd like to try this, here's my initial approach.
4. Star the repo and follow the maintainer.

No code required. A thoughtful comment is a real contribution.

## Quick Security Command Reference

```bash
git status
git rm --cached .env
echo ".env" >> .gitignore
git log --all --full-history -- "*.env"
git commit -m "remove secrets from tracking"
git push
git filter-repo --path .env --invert-paths
```

## Docker Command Reference

```bash
docker build -t myapp .
docker run -d -p 3000:3000 --name mycontainer myapp
docker stop mycontainer
docker logs mycontainer
docker rm mycontainer
```

## Notes For This Repo

- The `api/` folder contains the larger AirZy travel platform demo.
- The `docker/` folder contains the compact Express demo used for containerization.
- The `Prompt-injection-simulation/` folder contains the terminal chatbot demo for the AI teaser.
- Keep secrets out of git history, and rotate any credential that was ever exposed.
