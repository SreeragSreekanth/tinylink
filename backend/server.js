// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const linksRouter = require('./src/routes/links');
const { redirectHandler } = require('./src/controllers/linkController');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/healthz', (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// API routes
app.use('/api/links', linksRouter);

// Redirect route must be last
app.get('/:code', redirectHandler);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
