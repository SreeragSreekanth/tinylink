// src/routes/links.js
const express = require('express');
const router = express.Router();

const {
  listLinks,
  createLinkHandler,
  getLinkStats,
  deleteLinkHandler
} = require('../controllers/linkController');

router.get('/', listLinks);            // GET /api/links
router.post('/', createLinkHandler);   // POST /api/links
router.get('/:code', getLinkStats);    // GET /api/links/:code
router.delete('/:code', deleteLinkHandler); // DELETE /api/links/:code

module.exports = router;
