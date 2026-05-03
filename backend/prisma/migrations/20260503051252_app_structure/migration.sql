-- CreateEnum
CREATE TYPE "AppType" AS ENUM ('POS', 'CUSTOMER', 'BOTH');

-- AlterTable
ALTER TABLE "banners" ADD COLUMN     "appType" "AppType" NOT NULL DEFAULT 'BOTH';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "showInCustomerApp" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showInPosApp" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "app_settings" (
    "id" TEXT NOT NULL,
    "appType" "AppType" NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "appType" "AppType" NOT NULL,
    "userId" TEXT,
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_settings_appType_key_key" ON "app_settings"("appType", "key");

-- CreateIndex
CREATE UNIQUE INDEX "device_tokens_token_key" ON "device_tokens"("token");

-- CreateIndex
CREATE INDEX "device_tokens_userId_idx" ON "device_tokens"("userId");

-- CreateIndex
CREATE INDEX "device_tokens_customerId_idx" ON "device_tokens"("customerId");

-- AddForeignKey
ALTER TABLE "device_tokens" ADD CONSTRAINT "device_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_tokens" ADD CONSTRAINT "device_tokens_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
