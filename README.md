# TinyLink

TinyLink is a lightweight, full-stack URL shortener that allows users to generate short links for long URLs and view usage statistics.  
The project is organized into separate **backend** and **frontend** folders for clarity and scalability.

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
```
2. Configure PostgreSQL
Create a .env file inside backend:
```bash
DATABASE_URL=your_postgres_url
DB_SSL=true_or_false
```
3. Start Backend Server
```bash
node server.js
```
Frontend Setup
1. Install Dependencies
```bash
cd frontend
npm install
```
2. Start Dev Server
```bash
npm run dev
```
🌐 Deployment
Frontend → Vercel
Backend → Render

Make sure to set these environment variables:

Backend .env
```bash
DATABASE_URL=postgres_connection_string
DB_SSL=true_or_false
```
Frontend .env
```bash
VITE_API_BASE=https://your-backend-url.com
```
Update vercel.json to point API routes to the backend.
Ensure VITE_API_BASE is set correctly in Vercel environment settings.

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


