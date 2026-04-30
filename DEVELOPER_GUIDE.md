# 🚀 The Ultimate Beginner's Guide to Working on LOTCHAN MOBILES

Welcome to the team! If you are new to coding, don't worry! This guide is written so that anyone can understand it. We will go step-by-step to get the project running on your computer.

---

## 📦 Part 1: Downloading the Code & Setup

First, you need to get the code onto your computer and install the extra files the code needs to run.

### Step 1: Download the Code
1. Open your **Terminal** or **Command Prompt** (this is the black screen where you type commands).
2. Type this command and press Enter:
   ```bash
   git clone <your-repository-url>
   cd "LOTCHAN MOBILES E-E"
   ```
   *(This downloads the code from the internet and moves you into the project folder).*

### Step 2: Install Backend Tools (The "Brain" of the App)
The backend does all the thinking and talks to the database. We need to install its tools:
```bash
cd backend
npm install
```

### Step 3: Install Frontend Tools (The "Face" of the App)
The frontend is what the user sees on their screen. Open a *new* Terminal window, go to the project folder, and run:
```bash
cd pos-dashboard
npm install
```

---

## 🗄️ Part 2: Setting up a Safe Local Database

The "Database" is where we store all our app's information (like users, products, and sales). 

> 🚨 **SUPER IMPORTANT WARNING:**
> We have a "Live" database on the internet. **NEVER** connect your local computer to the live database to test things. If you delete a product by accident, it deletes it for real customers!
>
> Always use your own **Local Database** on your computer. It’s like a safe sandbox where you can build and break things without hurting the real app.

### How to set up your Sandbox (Local Database):
1. Download and install a program called **PostgreSQL** on your computer. Create a new database in it and name it `lotchan_mobiles`.
2. Go into the `backend` folder. You will see a file named `.env.example`. 
3. Copy that file and rename the copy to just `.env`.
4. Open the new `.env` file in your code editor and find the line that says `DATABASE_URL`. Change it to look like this:
   ```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/lotchan_mobiles?schema=public"
   ```
   *(Change `yourpassword` to whatever password you set when you installed PostgreSQL).*

5. Tell the code to create the tables in your database:
   ```bash
   npx prisma migrate dev
   ```
6. Start up the backend:
   ```bash
   npm run dev
   ```

---

## 🔑 Part 3: Creating Fake Users for Testing

To test the app, you need accounts to log into! Since your sandbox database is empty, we made a command to create some fake accounts for you.

Open your Terminal in the `backend` folder and run:
```bash
npx prisma db seed
```

Now you can log into your local app using any of these fake accounts!
- **Admin Boss:** `admin@test.com` (Password: `password123`)
- **Manager:** `manager@test.com` (Password: `password123`)
- **Staff Member:** `staff@test.com` (Password: `password123`)
- **Technician:** `technician@test.com` (Password: `password123`)

---

## 🛠️ Part 4: How to Add New Code (The "Git" Workflow)

When multiple people work on the same code, we don't want to step on each other's toes or break the main working code (which we call the `main` branch).

Here is the safe way to add your work:

### Step 1: Make a "Copy" of the Code
Never work directly on the `main` code. Create your own safe branch (copy) to work on:
```bash
git checkout main
git pull origin main
git checkout -b feature/my-cool-new-thing
```

### Step 2: Write Your Code and Test It
Make your changes! Start the backend and the frontend to make sure everything looks good and doesn't crash.

### Step 3: Save Your Work
Once you are happy, "save" (commit) your work with a message explaining what you did:
```bash
git add .
git commit -m "added a cool new button on the home page"
```

### Step 4: Send Your Code to the Internet
Push your saved work up to GitHub/GitLab:
```bash
git push origin feature/my-cool-new-thing
```

### Step 5: Ask for a Review (Pull Request)
1. Go to GitHub or GitLab in your web browser.
2. Click the button that says **"Compare & pull request"**.
3. This is like asking the team: *"Hey, can someone check my work before we add it to the real app?"*
4. Once your team says it looks great, they will "Merge" it into the main code! 🎉



### 🧰 Fixing “Authentication failed against database server” (Prisma P1000)

If you run:

```bash
npx prisma migrate dev
```

and see this error:

> `Error: P1000: Authentication failed against database server at 'localhost', the provided database credentials for 'user' are not valid.`

it means Prisma cannot log into your local PostgreSQL database because the username or password in your `.env` file is wrong. [github](https://github.com/lotchankumar/LOTCHAN-MOBILES-E-E/blob/main/DEVELOPER_GUIDE.md)

Follow these steps to fix it:

1. **Check your PostgreSQL user in pgAdmin**

   - Open **pgAdmin**.  
   - In the left side panel, expand:  
     `Servers → PostgreSQL 18 → Databases → lotchan_mobiles`.  
   - Right‑click **PostgreSQL 18** and click **Properties → Connection**.  
   - Confirm these values:  
     - Host: `localhost`  
     - Port: `5432`  
     - Username: `postgres` (this is the login user you must use in `.env`). [prisma](https://www.prisma.io/docs/postgres/database/connecting-to-your-database)

2. **Set a password for the `postgres` user (if it has none)**

   - In pgAdmin, expand `PostgreSQL 18 → Login/Group Roles`.  
   - Right‑click **postgres → Properties → Definition**.  
   - In the **Password** field, enter a strong password (example: `Lotchan_123!`) and save. [atlassian](https://www.atlassian.com/data/admin/how-to-set-the-default-user-password-in-postgresql)
   - Leave “Account expires” empty and “Connection limit” as `-1` (no change needed).

3. **Update your `.env` `DATABASE_URL`**

   - Open the `backend/.env` file.  
   - Find the line that starts with `DATABASE_URL`.  
   - Change it to this format (all in one line):

     ```env
     DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/lotchan_mobiles?schema=public"
     ```

   - Replace `YOUR_PASSWORD` with the exact password you set for the `postgres` user in pgAdmin. [prisma](https://www.prisma.io/docs/orm/reference/connection-urls)
   - Make sure:
     - `postgres` = **username**  
     - `lotchan_mobiles` = **database name**  
     - Host = `localhost`, Port = `5432`.

4. **Apply the Prisma migrations**

   In a terminal inside the `backend` folder, run:

   ```bash
   npx prisma migrate dev
   ```

   If the username, password, and database name are correct, the P1000 error will disappear and Prisma will successfully create/update your local tables. [stackoverflow](https://stackoverflow.com/questions/63684133/prisma-cant-connect-to-postgresql)

> ✅ **Quick recap:**  
> - Username is `postgres` (from pgAdmin Connection tab), **not** `lotchan_mobiles`.  
> - `lotchan_mobiles` is the database name.  
> - You must set a password for `postgres` and reuse it in `DATABASE_URL`.