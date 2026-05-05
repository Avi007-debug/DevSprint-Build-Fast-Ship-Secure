const express = require("express");
const _       = require("lodash");   // ⚠️  MISTAKE 2: lodash@4.17.4 — HIGH severity CVE
                                     //    Prototype Pollution: CVE-2019-10744
                                     //    Command Injection:   CVE-2021-23337

const router = express.Router();

// In-memory chat history — shared across ALL users, no auth
let chatHistory = [];

router.post("/", async (req, res) => {
  const { message } = req.body;

  // ⚠️  MISTAKE 2: lodash.merge used on user-controlled input — prototype pollution
  //    attack surface. A payload of {"__proto__":{"isAdmin":true}} poisons
  //    Object.prototype for every object in the process.
  const payload = _.merge({}, { role: "user", content: message });
  chatHistory.push(payload);

  try {
    // Placeholder — swap in your actual AI call here
    const reply = `Echo: ${message}`;
    chatHistory.push({ role: "model", content: reply });
    res.json({ reply });
  } catch (err) {
    // ⚠️  MISTAKE 5: Full internal stack trace returned to the client.
    //    Exposes file paths, module names, and internal architecture to anyone
    //    who triggers an error.
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// ⚠️  MISTAKE 5: Dumps full chat history with no authentication.
router.get("/history", (req, res) => {
  res.json(chatHistory);
});

module.exports = router;
