const express = require("express");
const multer  = require("multer");    // ⚠️  MISTAKE 2: multer@1.3.0 — path traversal CVE
const path    = require("path");
const fs      = require("fs");

const router = express.Router();

// ⚠️  MISTAKE 5: No file type or size validation whatsoever
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  // ⚠️  MISTAKE 5: Uses original filename — path traversal possible (../../etc/passwd)
  filename:    (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({
    message:  "File uploaded successfully",
    filename: req.file.originalname,
    // ⚠️  MISTAKE 5: Returns full server path to the client
    savedAt:  path.resolve("uploads/" + req.file.originalname),
  });
});

// ⚠️  MISTAKE 5: Lists every file in uploads/ — no auth required
router.get("/list", (req, res) => {
  const files = fs.readdirSync("uploads/");
  res.json({ files });
});

// ⚠️  MISTAKE 5: Serves any file in uploads/ publicly — no auth required
router.get("/:filename", (req, res) => {
  const filePath = path.join("uploads", req.params.filename);
  res.sendFile(path.resolve(filePath));
});

module.exports = router;
