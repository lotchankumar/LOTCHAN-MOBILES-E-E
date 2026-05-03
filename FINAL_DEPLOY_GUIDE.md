# 🚀 Final Deployment & Update Guide

This guide provides step-by-step instructions on how to update and redeploy your production environments after you have made changes to the database, backend, frontends, or mobile app.

---

## 1. 🗄️ Database Updates (Prisma)

Whenever you change `backend/prisma/schema.prisma` (like adding new tables or columns), you must update the production database.

### Redeployment Steps:
1. Connect to your production server or deployment pipeline.
2. Ensure the latest code is pulled from the `main` branch.
3. Run the production migration command from inside the `backend` folder:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```
   > **Note:** Do **NOT** run `migrate dev` in production. `migrate deploy` safely applies pending migrations without wiping or resetting any data.
4. Regenerate the Prisma Client so your code knows about the new tables:
   ```bash
   npx prisma generate
   ```

---

## 2. ⚙️ Backend Updates (Node.js/Express)

When you modify controllers, routes, or business logic.

### Redeployment Steps:
1. Pull the latest code to your production server.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install any new dependencies:
   ```bash
   npm install
   ```
4. Build the TypeScript code into JavaScript:
   ```bash
   npm run build
   ```
5. Restart your server process (using PM2, Docker, or your cloud provider's restart mechanism):
   ```bash
   # Example using PM2
   pm2 restart backend
   ```

---

## 3. 🌐 Frontend Updates (Customer App & POS Dashboard)

When you update the React/Vite code for the Customer App (`customer-app`) or POS Dashboard (`lotchan-pos-web`).

### Redeployment Steps:
If you are using platforms like **Vercel** or **Netlify**, deployments usually happen automatically when you push to the `main` branch. If deploying manually to a VPS (like Nginx):

1. Navigate to the frontend directory:
   ```bash
   cd customer-app # OR cd lotchan-pos-web
   ```
2. Install dependencies and build the optimized production files:
   ```bash
   npm install
   npm run build
   ```
3. Copy the contents of the generated `dist/` folder to your web server's public html folder:
   ```bash
   # Example for Nginx
   cp -r dist/* /var/www/html/customer-app/
   ```

---

## 4. 📱 Mobile App Updates (Lotchan POS Flutter)

When you make changes to the Flutter app for the staff.

### Redeployment Steps:
1. Navigate to the mobile app directory:
   ```bash
   cd lotchan_pos_mobile
   ```
2. Update packages:
   ```bash
   flutter pub get
   ```
3. Build the release APK (for Android distribution):
   ```bash
   flutter build apk --release
   ```
   *The file will be located in `build/app/outputs/flutter-apk/app-release.apk`.*
4. Distribute the new APK to your staff's devices.

---

## ⚠️ 5. What Happens When You Rename Root Folders?

Sometimes, you might rename a project folder (for example, renaming `lotchan_pos` to `lotchan_pos_mobile`, or `frontend` to `lotchan-pos-web`). **This is a critical action that affects deployment.**

Here is what breaks when you rename a root folder, and how to fix it:

### A. Cloud Hosting Platforms (Vercel, Render, Netlify, Railway)
Cloud platforms specifically look for a "Root Directory" to build your project.
* **The Fix:** If you rename a folder, you **MUST** log into your Vercel/Render dashboard, go to the Project Settings, and update the **Root Directory** field to match the new folder name. Otherwise, the deployment will fail because it can't find the `package.json`.

### B. CI/CD Pipelines (GitHub Actions / GitLab CI)
If you have automated scripts (`.yml` files) that run on every push, they usually have `cd folder_name` hardcoded.
* **The Fix:** Search through your `.github/workflows/` or deployment scripts and update any `cd old_folder_name` to `cd new_folder_name`.

### C. Docker Configurations (`docker-compose.yml`)
If you use Docker, your compose file maps to specific directories.
```yaml
# docker-compose.yml
services:
  frontend:
    build:
      context: ./old_folder_name # <-- This will break!
```
* **The Fix:** Open `docker-compose.yml` and update the `context:` path to point to the new folder name.

### D. Local Scripts (`package.json` at the absolute root)
If you have a master `package.json` in the very top folder of the repository (using workspaces or custom run scripts like `test-all.ps1`), it might point to the old name.
* **The Fix:** Open the root `package.json` or `.ps1` shell scripts and update the directory paths.

> **Golden Rule for Renaming:** Try to avoid renaming root folders once a project is in production. If you absolutely must, treat it as a coordinated event: update the code, update the deployment dashboards, and update the Docker/CI scripts all at exactly the same time.
