# TinyLink

TinyLink is a lightweight, full-stack URL shortener that allows users to generate short links for long URLs and view usage statistics.  
The project is organized into separate **backend** and **frontend** folders for clarity and scalability.

---

## 📁 Project Structure

sreeragsreekanth-tinylink/
├── backend/
│ ├── package.json
│ ├── package-lock.json
│ ├── server.js
│ ├── migrations/
│ │ └── 001_create_links.sql
│ └── src/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── utils/
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

yaml
Copy code

---

## 🚀 Overview

### 🔧 Backend
- Node.js + Express server  
- PostgreSQL schema + models  
- REST API for CRUD operations on links  

### 🎨 Frontend
- React with Vite  
- Routing for pages and dashboard  
- UI components for link creation, listing, search, and analytics  

---

## ✨ Features

- Shorten URLs (auto-generated or custom codes)  
- Alphanumeric short codes (6–8 characters)  
- Dashboard to view and manage all links  
- One-click copy to clipboard  
- View link statistics:
  - Total clicks  
  - Last clicked  
  - Created date  
- Delete links when not needed  

---

## 🛠️ Setup Instructions

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
2. Configure PostgreSQL
Create a .env file inside backend/:

ini
Copy code
DATABASE_URL=your_postgres_url
DB_SSL=true_or_false
Run database migration:

pgsql
Copy code
migrations/001_create_links.sql
3. Start Backend Server
bash
Copy code
node server.js
Frontend Setup
1. Install Dependencies
bash
Copy code
cd frontend
npm install
2. Start Dev Server
bash
Copy code
npm run dev
🌐 Deployment
Frontend → Vercel
Backend → Render
Make sure to set these environment variables:

Backend .env
ini
Copy code
DATABASE_URL=postgres_connection_string
DB_SSL=true_or_false
Frontend .env
ini
Copy code
VITE_API_BASE=https://your-backend-url.com
Update vercel.json to point API routes to the backend.
Ensure VITE_API_BASE is correctly configured in Vercel environment settings.

🧰 Technologies Used
Backend
Node.js

Express

PostgreSQL

Frontend
React

Vite

Tailwind CSS

Deployment
Vercel (Frontend)

Render (Backend)

