const express = require("express");
const multer  = require("multer");
const path    = require("path");
const fs      = require("fs");

const app = express();
app.use(express.json());

// ⚠️  MISTAKE 5: Serving the ENTIRE project root as static files.
// This exposes logs/, uploads/, test_data/, and every other file
// in the directory — anyone can read them via a direct URL.
// Fix: app.use(express.static("./public"))
app.use(express.static("./"));

const PORT = 3000;

// File upload — saves into uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Routes
const chatRoutes   = require("./routes/chat");
const uploadRoutes = require("./routes/upload");

app.use("/api/chat",   chatRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`StudyBot running on http://localhost:${PORT}`);
});
