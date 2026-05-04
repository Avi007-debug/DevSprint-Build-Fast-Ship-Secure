# Docker Demo

This folder contains the small Express app used to demonstrate why Docker solves environment mismatch problems.

## What Runs Here

- `index.js` starts a simple server on port 3000.
- `Dockerfile` builds the app on `node:18-alpine`.
- `.dockerignore` keeps local files such as `node_modules` and `.env` out of the image.

## Build And Run

From this folder:

```bash
npm install
docker build -t docker-demo .
docker run -d -p 3000:3000 --name docker-demo docker-demo
```

Then open:

```text
http://localhost:3000/
```

## Stop And Clean Up

```bash
docker stop docker-demo
docker logs docker-demo
docker rm docker-demo
```

If you want to run it in the foreground instead of detached mode:

```bash
docker run -p 3000:3000 docker-demo
```

## Why `.dockerignore` Matters

Keep these out of the image at minimum:

```text
node_modules
.env
*.log
.git
```

Anything copied into the image can end up in the final artifact or a published registry image.