# Docker Demo: Understanding Containers

## What This Is

A simple Express server that demonstrates why Docker matters for real development. You'll see how Docker packages an app and its environment so it runs identically on any machine.

## The Problem Docker Solves

Imagine you build an app on your laptop using Node 18. You send it to a friend. They have Node 16 installed. The code breaks. Now try deploying to a cloud server that uses Node 20. More breakage.

This isn't a code problem—it's an **environment problem**.

Docker wraps your app *and its environment* into a container. That container runs the same on your laptop, your friend's computer, and a cloud server.

## Key Concepts

- **Image** - The blueprint. A snapshot of your app + all its dependencies.
- **Container** - The running instance. Like starting a virtual machine from that blueprint.
- **Dockerfile** - The recipe. A text file that tells Docker how to build the image.

## What's In This Folder

- `index.js` - Simple Express server (says "Running inside Docker 🚀").
- `Dockerfile` - Recipe to build a Docker image from Node 18-Alpine.
- `.dockerignore` - Tells Docker which files not to copy into the image.
- `package.json` - Lists dependencies (just Express).

## Try It Yourself

### Step 1: Install Docker

Download Docker Desktop from https://docker.com/products/docker-desktop (free).

### Step 2: Build The Image

```bash
cd docker
npm install
docker build -t docker-demo .
```

This creates an image called `docker-demo` using the Dockerfile recipe.

### Step 3: Run The Container

```bash
docker run -d -p 3000:3000 --name docker-demo docker-demo
```

This starts a container from the image:
- `-d` = run in the background (detached mode).
- `-p 3000:3000` = map port 3000 on your machine to port 3000 in the container.
- `--name docker-demo` = give the container a name so you can reference it later.

### Step 4: Check It Works

```bash
curl http://localhost:3000
```

You should see: `Running inside Docker 🚀`

### Step 5: Inspect It

```bash
docker logs docker-demo    # See what the container printed
docker inspect docker-demo # See detailed container info
```

### Step 6: Stop It

```bash
docker stop docker-demo
docker rm docker-demo
```

## Why `.dockerignore` Matters

The `.dockerignore` file prevents certain files from being copied into the Docker image. This matters for security and size.

**Never copy into a Docker image:**
```text
node_modules       # Too big; npm install will get these fresh
.env               # Secrets belong in environment variables, not images
*.log              # Logs aren't needed
.git               # Version control isn't needed in the image
```

Images can be pushed to Docker Hub (which is public). You don't want secrets in them.

## Run It In Foreground Mode

If you want to see live logs instead of running in the background:

```bash
docker run -p 3000:3000 docker-demo
```

Press `Ctrl+C` to stop.

## What You Learned

- Docker packages apps and their environments into reproducible containers.
- A Dockerfile is just 5-6 lines for a simple app.
- `docker build` creates an image, `docker run` starts a container.
- `.dockerignore` keeps secrets and clutter out of your image.
- The same image runs identically everywhere.

## Next Steps

- Try adding a feature to `index.js`, rebuild the image, and run it again.
- Explore the official Docker guides: https://docs.docker.com/get-started
- Check out "Play with Docker" for a browser-based sandbox: https://labs.play-with-docker.com

---

**Key Takeaway:** A repo without a Dockerfile is a repo no one else can run. Docker is now expected in every real project.