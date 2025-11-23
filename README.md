TinyLink
TinyLink is a lightweight, full-stack URL shortener. It enables users to create short links for long URLs and track usage statistics. The project is organized with separate backend and frontend folders for clarity and scalability.

Project Structure
text
sreeragsreekanth-tinylink/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── migrations/
│   │   └── 001_create_links.sql
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── utils/
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.js
    ├── vercel.json
    ├── README.md
    ├── public/
    └── src/
        ├── api.js
        ├── components/
        ├── pages/
        └── assets/
backend/: Node.js + Express server, PostgreSQL schema and models, REST API for CRUD operations on links.

frontend/: React client with routing, UI components for link creation, listing, search, and stats.

Features
Shorten new URLs and generate codes (auto or custom, 6–8 characters, alphanumeric).

Dashboard to list, search, and manage your links.

Copy short URLs to clipboard with one click.

View usage statistics for each short link: clicks, last clicked, created date.

Delete links when no longer needed.

Setup Instructions
Backend
Install dependencies:

text
cd backend
npm install
Set up PostgreSQL and create schema:

Update your .env with DATABASE_URL.

Run migration in migrations/001_create_links.sql.

Start the server:

text
node server.js
Frontend
Install dependencies:

text
cd frontend
npm install
Start the development server:

text
npm run dev
For deployment, adjust vercel.json (rewrites API to backend).

Environment Variables
Backend: Use .env for database connection and SSL settings (DATABASE_URL, DB_SSL).

Frontend: Uses VITE_API_BASE for API endpoint configuration.

Technologies Used
Backend: Node.js, Express, PostgreSQL

Frontend: React, Vite, Tailwind CSS

Deployment: Vercel, Render (backend)
