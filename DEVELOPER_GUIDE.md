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

When multiple people work on the same code, we don't want to step on each other's toes or break the working code.

> **⚠️ IMPORTANT RULE:**
> **Always open Pull Requests against the `dev` branch.**
> The `main` branch is protected and used strictly for production-ready releases. Please ensure your changes are targeted at `dev` to be reviewed and merged.

Here is the safe way to add your work:

### Step 1: Make a "Copy" of the Code
Never work directly on the `dev` or `main` code. Create your own safe branch (copy) to work on:
```bash
git checkout dev
git pull origin dev
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

## Git Identity and Branch Publishing (VS Code)

### Fixing "Author identity unknown"

The `Author identity unknown` error occurs when Git does not know who is making the commit. This happens because `user.name` and `user.email` are not configured on your local machine—it is not caused by branch protection rules.

To fix this, you must configure your Git identity. **Ensure that the email you configure matches your GitHub email** so that your commits are correctly attributed to your GitHub profile.

**Global identity** (Applies to all repositories on your machine):
```bash
git config --global user.name "Your Real Name"
git config --global user.email "your-email@example.com"
```

**Repo-only identity** (Applies only to the current repository):
```bash
git config user.name "Your Real Name"
git config user.email "your-email@example.com"
```

> **Note:** A commit will fail with "Author identity unknown" until `user.name` and `user.email` are set. Publishing a branch should only be done after your local commits are working successfully.

### Publishing Branches from VS Code

When you create a new feature branch locally, it does not automatically exist on GitHub. 

* **Publish:** Used when the branch exists only locally. Clicking "Publish Branch" pushes the new local branch to GitHub for the first time and sets up the upstream tracking branch.
* **Push:** Used after a branch has already been published. It simply sends your new commits to the existing remote branch.

### Step-by-step flow for contributors:

* Pull the latest changes from `origin/main` (or the default branch) and create a new feature branch (e.g., `feature/db-guide-fix`) in VS Code.
* Make your changes and save the files.
* Stage your changes (Source Control → **+** or run `git add .` in the terminal).
* Commit your changes with a clear commit message.
* If this is the first time for that branch, click **Publish Branch** in the VS Code Source Control panel to push it to GitHub.
* After that, just use **Push** / `git push` for future commits on the same branch.

## Common Git Issues & Solutions

### 1. `git pull` fails because the local branch is tracking the wrong remote branch
**Problem:** You try to run `git pull` on the `dev` branch, but you get an error or it says it's tracking someone else's branch (like `origin/lotchan`).
**Solution:** Tell Git exactly which remote branch your local branch should sync with by running:
```bash
git branch --set-upstream-to=origin/dev dev
```
Then, try your `git pull` again.

### 2. Stuck in Vim with a `.MERGE_MSG.swp` swap file warning during a `git pull`
**Problem:** You run `git pull` to fetch team members' code, and it opens a text editor with a warning about a `.MERGE_MSG.swp` file ("Swap file already exists!"). This happens if a previous merge crashed or the terminal was closed abruptly while creating a commit.
**Solution:**
1. At the prompt, type **`D`** and press **Enter** to delete the old, unneeded swap file.
2. The editor will now open normally showing a default merge message.
3. *If you accidentally typed things and see `recording @q` or `-- INSERT --` at the bottom, press `Escape` (Esc) a few times to return to Normal mode.*
4. To accept the message and exit, type **`:wq`** and press **Enter** to save and quit. Your `git pull` will finish!
