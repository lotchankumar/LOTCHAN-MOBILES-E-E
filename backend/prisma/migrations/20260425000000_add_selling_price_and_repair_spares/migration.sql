-- Add selling_price column to PurchaseItem
ALTER TABLE purchase_items ADD COLUMN selling_price REAL NOT NULL DEFAULT 0;

-- Create RepairSpareProduct model for spare parts inventory
CREATE TABLE IF NOT EXISTS "repair_spare_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "categoryId" TEXT,
    "supplierId" TEXT,
    "brand" TEXT NOT NULL DEFAULT 'Generic',
    "model" TEXT,
    "compatibleDevices" TEXT,
    "purchasePrice" REAL NOT NULL DEFAULT 0,
    "sellingPrice" REAL NOT NULL DEFAULT 0,
    "stockQty" INTEGER NOT NULL DEFAULT 0,
    "minStock" INTEGER NOT NULL DEFAULT 5,
    "imageUrl" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "repair_spare_products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "product_categories" ("id") ON DELETE SET NULL,
    CONSTRAINT "repair_spare_products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers" ("id") ON DELETE SET NULL
);

-- Create RepairSparePurchase model
CREATE TABLE IF NOT EXISTS "repair_spare_purchases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "managerId" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL UNIQUE,
    "totalAmount" REAL NOT NULL,
    "notes" TEXT,
    "purchaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "repair_spare_purchases_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "users" ("id") ON DELETE RESTRICT
);

-- Create RepairSparePurchaseItem model
CREATE TABLE IF NOT EXISTS "repair_spare_purchase_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "purchaseId" TEXT NOT NULL,
    "spareProductId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCost" REAL NOT NULL,
    "sellingPrice" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL,
    CONSTRAINT "repair_spare_purchase_items_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "repair_spare_purchases" ("id") ON DELETE RESTRICT,
    CONSTRAINT "repair_spare_purchase_items_spareProductId_fkey" FOREIGN KEY ("spareProductId") REFERENCES "repair_spare_products" ("id") ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS "repair_spare_products_categoryId_idx" ON "repair_spare_products" ("categoryId");
CREATE INDEX IF NOT EXISTS "repair_spare_products_supplierId_idx" ON "repair_spare_products" ("supplierId");
CREATE INDEX IF NOT EXISTS "repair_spare_purchases_managerId_idx" ON "repair_spare_purchases" ("managerId");
