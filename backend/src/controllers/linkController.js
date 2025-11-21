// src/controllers/linkController.js
const {
  getAllLinks,
  getLink,
  createLink,
  incrementClick,
  deleteLink
} = require('../models/linkModel');

const { isValidUrl } = require('../utils/validateUrl');

const CODE_RE = /^[A-Za-z0-9]{6,8}$/;

async function listLinks(req, res) {
  const links = await getAllLinks();
  res.json(links);
}

async function createLinkHandler(req, res) {
  const { target, code } = req.body;

  if (!target || !isValidUrl(target)) {
    return res.status(400).json({ error: "Invalid target URL" });
  }

  let shortCode = code;

  // Validate custom code if provided
  if (shortCode) {
    if (!CODE_RE.test(shortCode)) {
      return res
        .status(400)
        .json({ error: "Code must match [A-Za-z0-9]{6,8}" });
    }
  } else {
    // Auto-generate random 6 characters
    shortCode = generateCode(6);
  }

  const exists = await getLink(shortCode);
  if (exists) {
    return res.status(409).json({ error: "Code already exists" });
  }

  const created = await createLink({ code: shortCode, target });
  return res.status(201).json(created);
}

function generateCode(len) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let output = "";
  for (let i = 0; i < len; i++) {
    output += chars[Math.floor(Math.random() * chars.length)];
  }
  return output;
}

async function getLinkStats(req, res) {
  const { code } = req.params;
  const link = await getLink(code);
  if (!link) return res.status(404).json({ error: "Not found" });
  res.json(link);
}

async function deleteLinkHandler(req, res) {
  const { code } = req.params;
  const removed = await deleteLink(code);
  if (!removed) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
}

async function redirectHandler(req, res) {
  const { code } = req.params;

  const link = await getLink(code);
  if (!link) return res.status(404).send("Not found");

  await incrementClick(code);
  return res.redirect(302, link.target);
}

module.exports = {
  listLinks,
  createLinkHandler,
  getLinkStats,
  deleteLinkHandler,
  redirectHandler
};
