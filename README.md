TinyLink

TinyLink is a lightweight, full-stack URL shortener. It enables users to create short links for long URLs and track usage statistics. The project is organized with separate backend and frontend folders for clarity and scalability.

Project Structure
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

Overview
Backend

Node.js + Express server

PostgreSQL schema and models

REST API for CRUD operations on links

Frontend

React client with routing

UI components for link creation, listing, search, and stats

Features

Shorten new URLs and generate codes (auto or custom, 6–8 characters, alphanumeric)

Dashboard to list, search, and manage links

Copy short URLs to clipboard with one click

View usage statistics:

Total clicks

Last clicked

Created date

Delete links when no longer needed

Setup Instructions
Backend
1. Install dependencies
cd backend
npm install

2. Set up PostgreSQL and create schema

Create a .env file with:

DATABASE_URL=your_postgres_url
DB_SSL=true_or_false


Run the migration:

migrations/001_create_links.sql

3. Start the server
node server.js

Frontend
1. Install dependencies
cd frontend
npm install

2. Start development server
npm run dev

Deployment

Update vercel.json to point API routes to backend server

Configure VITE_API_BASE in environment variables

Environment Variables
Backend (.env)
DATABASE_URL=postgres_connection_string
DB_SSL=true_or_false

Frontend (.env)
VITE_API_BASE=https://your-backend-url.com

Technologies Used
Backend

Node.js

Express

PostgreSQL

Frontend

React

Vite

Tailwind CSS

Deployment

Vercel (frontend)

Render (backend)
