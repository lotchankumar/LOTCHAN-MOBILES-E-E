/*
  Warnings:

  - You are about to drop the column `display_order` on the `banners` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `banners` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `banners` table. All the data in the column will be lost.
  - You are about to drop the column `link_url` on the `banners` table. All the data in the column will be lost.
  - You are about to drop the column `is_user` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `community_comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `community_comments` table. All the data in the column will be lost.
  - You are about to drop the column `image_urls` on the `community_posts` table. All the data in the column will be lost.
  - You are about to drop the column `likes_count` on the `community_posts` table. All the data in the column will be lost.
  - You are about to drop the column `post_type` on the `community_posts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `community_posts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `referral_code` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `referred_by_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_balance` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `display_order` on the `product_categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `is_available` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `base_price` on the `repair_categories` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_time` on the `repair_categories` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `reference_id` on the `wallet_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `reference_type` on the `wallet_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_type` on the `wallet_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `wallet_transactions` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `banners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `chat_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `community_comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `community_comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `community_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralCode` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `wallet_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `wallet_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "branches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_banners" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "linkUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_banners" ("createdAt", "id", "title") SELECT "createdAt", "id", "title" FROM "banners";
DROP TABLE "banners";
ALTER TABLE "new_banners" RENAME TO "banners";
CREATE TABLE "new_chat_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isUser" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "chat_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_chat_messages" ("createdAt", "id", "message") SELECT "createdAt", "id", "message" FROM "chat_messages";
DROP TABLE "chat_messages";
ALTER TABLE "new_chat_messages" RENAME TO "chat_messages";
CREATE TABLE "new_community_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "community_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "community_posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "community_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_community_comments" ("content", "createdAt", "id") SELECT "content", "createdAt", "id" FROM "community_comments";
DROP TABLE "community_comments";
ALTER TABLE "new_community_comments" RENAME TO "community_comments";
CREATE TABLE "new_community_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrls" TEXT,
    "postType" TEXT,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "community_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_community_posts" ("content", "createdAt", "id", "title", "updatedAt") SELECT "content", "createdAt", "id", "title", "updatedAt" FROM "community_posts";
DROP TABLE "community_posts";
ALTER TABLE "new_community_posts" RENAME TO "community_posts";
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "passwordHash" TEXT,
    "walletBalance" REAL NOT NULL DEFAULT 0,
    "referralCode" TEXT NOT NULL,
    "referredById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "customers_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "customers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_customers" ("address", "email", "id", "name", "phone") SELECT "address", "email", "id", "name", "phone" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
CREATE UNIQUE INDEX "customers_phone_key" ON "customers"("phone");
CREATE UNIQUE INDEX "customers_referralCode_key" ON "customers"("referralCode");
CREATE TABLE "new_product_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_product_categories" ("createdAt", "description", "icon", "id", "name") SELECT "createdAt", "description", "icon", "id", "name" FROM "product_categories";
DROP TABLE "product_categories";
ALTER TABLE "new_product_categories" RENAME TO "product_categories";
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "categoryId" TEXT,
    "brand" TEXT NOT NULL,
    "model" TEXT,
    "price" REAL NOT NULL,
    "cost" REAL NOT NULL,
    "stockQty" INTEGER NOT NULL DEFAULT 0,
    "minStock" INTEGER NOT NULL DEFAULT 5,
    "imageUrl" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "product_categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_products" ("brand", "cost", "createdAt", "description", "id", "minStock", "model", "name", "price", "sku", "stockQty", "updatedAt") SELECT "brand", "cost", "createdAt", "description", "id", "minStock", "model", "name", "price", "sku", "stockQty", "updatedAt" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");
CREATE TABLE "new_repair_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "basePrice" REAL,
    "estimatedTime" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_repair_categories" ("createdAt", "description", "icon", "id", "name") SELECT "createdAt", "description", "icon", "id", "name" FROM "repair_categories";
DROP TABLE "repair_categories";
ALTER TABLE "new_repair_categories" RENAME TO "repair_categories";
CREATE TABLE "new_repair_jobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticketNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "repairCategoryId" TEXT,
    "deviceModel" TEXT NOT NULL,
    "imeiSerial" TEXT,
    "issueDescription" TEXT NOT NULL,
    "diagnosis" TEXT,
    "location" TEXT,
    "scheduledDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'RECEIVED',
    "estimatedCost" REAL,
    "finalCost" REAL,
    "advancePaid" REAL NOT NULL DEFAULT 0,
    "assignedToId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    CONSTRAINT "repair_jobs_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "repair_jobs_repairCategoryId_fkey" FOREIGN KEY ("repairCategoryId") REFERENCES "repair_categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "repair_jobs_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_repair_jobs" ("advancePaid", "assignedToId", "completedAt", "createdAt", "customerId", "deviceModel", "diagnosis", "estimatedCost", "finalCost", "id", "imeiSerial", "issueDescription", "location", "repairCategoryId", "scheduledDate", "status", "ticketNumber", "updatedAt") SELECT coalesce("advancePaid", 0) AS "advancePaid", "assignedToId", "completedAt", "createdAt", "customerId", "deviceModel", "diagnosis", "estimatedCost", "finalCost", "id", "imeiSerial", "issueDescription", "location", "repairCategoryId", "scheduledDate", "status", "ticketNumber", "updatedAt" FROM "repair_jobs";
DROP TABLE "repair_jobs";
ALTER TABLE "new_repair_jobs" RENAME TO "repair_jobs";
CREATE UNIQUE INDEX "repair_jobs_ticketNumber_key" ON "repair_jobs"("ticketNumber");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STAFF',
    "branchId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("email", "id", "name", "role") SELECT "email", "id", "name", "role" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_wallet_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "transactionType" TEXT NOT NULL,
    "description" TEXT,
    "referenceId" TEXT,
    "referenceType" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wallet_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_wallet_transactions" ("amount", "createdAt", "description", "id") SELECT "amount", "createdAt", "description", "id" FROM "wallet_transactions";
DROP TABLE "wallet_transactions";
ALTER TABLE "new_wallet_transactions" RENAME TO "wallet_transactions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "branches_name_key" ON "branches"("name");
