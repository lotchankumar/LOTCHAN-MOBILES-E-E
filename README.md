# 📱 LOTCHAN MOBILES E-E: Integrated Shop Management System

Welcome to the LOTCHAN MOBILES E-E repository! Think of this as the digital brain and tools for running a modern mobile phone store and repair shop. We have a website for customers, a dashboard for the shop staff, and a brand new mobile app!

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

**What you need to have installed first:** 
- Node.js (v18 or higher) - This lets us run JavaScript outside the browser.
- Git - This is our time machine for code.
- PostgreSQL - This is our database (where we store information).
- Flutter (Optional, only if you want to run the mobile app)

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
cd lotchan-pos-web
# Install dependencies
npm install

# Setup Environment Variables
cp .env.example .env
# Edit .env and verify VITE_API_URL points to your backend (default: http://localhost:5000/api)

# Start the development server
npm run dev
```

### 4. Lotchan POS (Mobile App) Setup
We have a new mobile app built for the staff, managers, and technicians using Flutter!

```bash
cd lotchan_pos_mobile
# Install Flutter packages
flutter pub get

# Important: Open lib/core/config.dart and change the IP address to your computer's local IP!
# Then run the app on your phone or emulator
flutter run
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
1. Set the root directory to `lotchan-pos-web`.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
4. **Environment Variables Required:**
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://api.lotchanmobiles.com/api`).

---

## 🏗️ Technical Architecture (What it's made of)
*   **The Brain (Backend):** Node.js and Express, talking to the database using Prisma.
*   **The Websites (POS Dashboard, Customer App):** Built with React and Vite (using a beautiful glassmorphism design!).
*   **The Mobile App (Lotchan POS):** Built with Flutter, for our staff on the go.
*   **The Memory (Database):** PostgreSQL safely stores all our data.