# 📱 LOTCHAN MOBILES E-E: Integrated Shop Management System

Welcome to the LOTCHAN MOBILES E-E repository. This system provides a 360-degree, centralized platform for managing a modern mobile retail and repair business.

## ☁️ Multi-Developer Cloud Workflow

This project is configured for a team of developers using a cloud-ready architecture with PostgreSQL.

### Branch-Based Workflow
We follow a standard feature-branch workflow:
1. **`main` branch:** Represents the production-ready state.
2. **`staging` branch (optional):** Used for testing features before production.
3. **Feature branches:** Always create a new branch for your work (e.g., `feature/add-payment-gateway` or `bugfix/fix-login-flow`).
4. **Pull Requests (PRs):** Submit a PR to merge your feature branch into `main` or `staging`. Ensure your code passes all tests and linting before requesting a review.

---

## 🚀 Getting Started (Local Development)

**Prerequisites:** 
- Node.js (v18+)
- Git
- PostgreSQL (Local or Cloud instance)

### 1. Database Setup
This project uses **PostgreSQL**. You can run a local Postgres instance using Docker or connect to a shared cloud database (e.g., Neon, Supabase, Render).

If using Docker locally (assuming you have Docker installed):
```bash
docker-compose up -d
```
*(Check `docker-compose.yml` for DB port and credentials).*

### 2. Backend Setup
The backend is an Express API using Prisma ORM.

```bash
cd backend
# Install dependencies
npm install

# Setup Environment Variables
cp .env.example .env
# Edit .env and ensure DATABASE_URL and JWT_SECRET are correctly set.

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

### 3. POS Dashboard (Frontend) Setup
The frontend is a React application built with Vite.

```bash
cd pos-dashboard
# Install dependencies
npm install

# Setup Environment Variables
cp .env.example .env
# Edit .env and verify VITE_API_URL points to your backend (default: http://localhost:5000/api)

# Start the development server
npm run dev
```

*Default Admin Login (If seeded):* `lotchansm1612@gmail.com` / `MSLMlk$2402`

---

## 🚢 Deployment Guide

The architecture is designed to be deployed to modern cloud platforms easily.

### Backend Deployment (Render, Railway, Heroku)
1. Set the root directory to `backend`.
2. Set the build command to `npm install && npm run build && npx prisma generate`.
3. Set the start command to `npm start` (which runs `node dist/server.js`).
4. **Environment Variables Required:**
   - `DATABASE_URL`: The production PostgreSQL connection string.
   - `JWT_SECRET`: A strong random string for signing tokens.
   - `PORT`: (Usually provided automatically by the platform).
   - `NODE_ENV`: `production`.
   - `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://pos.lotchanmobiles.com`), used for CORS security.
5. Make sure to run `npx prisma migrate deploy` in your build/release phase to update the production database schema.

### Frontend Deployment (Vercel, Netlify)
1. Set the root directory to `pos-dashboard`.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. **Environment Variables Required:**
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://api.lotchanmobiles.com/api`).

---

## 🏗️ Technical Architecture
*   **Core API (Backend):** Node.js and Express framework, strengthened by Prisma ORM.
*   **Web Frontends (POS, Customer App):** Built with modern React and Vite.
*   **Database:** PostgreSQL manages all structured data safely.