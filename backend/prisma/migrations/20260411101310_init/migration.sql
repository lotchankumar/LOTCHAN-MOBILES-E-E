-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STAFF',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT,
    "sku" TEXT NOT NULL,
    "cost_price" REAL NOT NULL,
    "selling_price" REAL NOT NULL,
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "reorder_level" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staff_id" TEXT NOT NULL,
    "sale_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_amount" REAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sales_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sale_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sale_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL,
    CONSTRAINT "sale_items_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sale_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "repairs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staff_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "device_model" TEXT NOT NULL,
    "complaint" TEXT NOT NULL,
    "estimated_cost" REAL,
    "final_amount" REAL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "received_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivered_date" DATETIME,
    "parts_used" JSONB,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "repairs_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "recharge_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staff_id" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "commission" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "recharge_transactions_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "money_transfer_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staff_id" TEXT NOT NULL,
    "service_provider" TEXT NOT NULL,
    "sender_name" TEXT NOT NULL,
    "receiver_name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "commission" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "money_transfer_transactions_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cash_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "staff_id" TEXT NOT NULL,
    "session_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opening_balance" REAL NOT NULL,
    "closing_balance" REAL,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cash_sessions_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "manager_id" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "invoice_no" TEXT,
    "purchase_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_amount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "purchases_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "purchase_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "purchase_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_cost" REAL NOT NULL,
    "total" REAL NOT NULL,
    CONSTRAINT "purchase_items_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "purchase_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "mt_deposits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "manager_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "reference" TEXT,
    "deposit_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "mt_deposits_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "manager_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "expense_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "expenses_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE INDEX "products_sku_idx" ON "products"("sku");

-- CreateIndex
CREATE INDEX "products_category_idx" ON "products"("category");

-- CreateIndex
CREATE INDEX "products_brand_idx" ON "products"("brand");

-- CreateIndex
CREATE INDEX "sales_staff_id_idx" ON "sales"("staff_id");

-- CreateIndex
CREATE INDEX "sales_sale_date_idx" ON "sales"("sale_date");

-- CreateIndex
CREATE INDEX "sales_status_idx" ON "sales"("status");

-- CreateIndex
CREATE INDEX "sale_items_sale_id_idx" ON "sale_items"("sale_id");

-- CreateIndex
CREATE INDEX "sale_items_product_id_idx" ON "sale_items"("product_id");

-- CreateIndex
CREATE INDEX "repairs_staff_id_idx" ON "repairs"("staff_id");

-- CreateIndex
CREATE INDEX "repairs_status_idx" ON "repairs"("status");

-- CreateIndex
CREATE INDEX "repairs_received_date_idx" ON "repairs"("received_date");

-- CreateIndex
CREATE INDEX "recharge_transactions_staff_id_idx" ON "recharge_transactions"("staff_id");

-- CreateIndex
CREATE INDEX "recharge_transactions_operator_idx" ON "recharge_transactions"("operator");

-- CreateIndex
CREATE INDEX "recharge_transactions_created_at_idx" ON "recharge_transactions"("created_at");

-- CreateIndex
CREATE INDEX "money_transfer_transactions_staff_id_idx" ON "money_transfer_transactions"("staff_id");

-- CreateIndex
CREATE INDEX "money_transfer_transactions_service_provider_idx" ON "money_transfer_transactions"("service_provider");

-- CreateIndex
CREATE INDEX "money_transfer_transactions_created_at_idx" ON "money_transfer_transactions"("created_at");

-- CreateIndex
CREATE INDEX "cash_sessions_staff_id_idx" ON "cash_sessions"("staff_id");

-- CreateIndex
CREATE INDEX "cash_sessions_session_date_idx" ON "cash_sessions"("session_date");

-- CreateIndex
CREATE INDEX "purchases_manager_id_idx" ON "purchases"("manager_id");

-- CreateIndex
CREATE INDEX "purchases_purchase_date_idx" ON "purchases"("purchase_date");

-- CreateIndex
CREATE INDEX "purchase_items_purchase_id_idx" ON "purchase_items"("purchase_id");

-- CreateIndex
CREATE INDEX "purchase_items_product_id_idx" ON "purchase_items"("product_id");

-- CreateIndex
CREATE INDEX "mt_deposits_manager_id_idx" ON "mt_deposits"("manager_id");

-- CreateIndex
CREATE INDEX "mt_deposits_provider_idx" ON "mt_deposits"("provider");

-- CreateIndex
CREATE INDEX "mt_deposits_deposit_date_idx" ON "mt_deposits"("deposit_date");

-- CreateIndex
CREATE INDEX "expenses_manager_id_idx" ON "expenses"("manager_id");

-- CreateIndex
CREATE INDEX "expenses_expense_date_idx" ON "expenses"("expense_date");
