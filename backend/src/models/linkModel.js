// src/models/linkModel.js
const { pool } = require('../config/db');

async function getAllLinks() {
  const result = await pool.query(`
    SELECT code, target, clicks, last_clicked, created_at
    FROM links
    ORDER BY created_at DESC
  `);
  return result.rows;
}

async function getLink(code) {
  const result = await pool.query(
    `SELECT code, target, clicks, last_clicked, created_at FROM links WHERE code = $1`,
    [code]
  );
  return result.rows[0];
}

async function createLink({ code, target }) {
  const result = await pool.query(
    `INSERT INTO links (code, target)
     VALUES ($1, $2)
     RETURNING code, target, clicks, last_clicked, created_at`,
    [code, target]
  );
  return result.rows[0];
}

async function incrementClick(code) {
  const result = await pool.query(
    `UPDATE links
     SET clicks = clicks + 1,
         last_clicked = now()
     WHERE code = $1
     RETURNING clicks, last_clicked`,
    [code]
  );
  return result.rows[0];
}

async function deleteLink(code) {
  const result = await pool.query(
    `DELETE FROM links WHERE code = $1 RETURNING code`,
    [code]
  );
  return result.rows[0];
}

module.exports = { getAllLinks, getLink, createLink, incrementClick, deleteLink };
