CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'STAFF',
    isActive INTEGER NOT NULL DEFAULT 1,
    branchId TEXT,
    managerId TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS branches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    address TEXT,
    phone TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS suppliers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    contactName TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    notes TEXT,
    isActive INTEGER NOT NULL DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS product_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    displayOrder INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    categoryId TEXT,
    supplierId TEXT,
    brand TEXT NOT NULL,
    model TEXT,
    price REAL NOT NULL,
    cost REAL NOT NULL,
    stockQty INTEGER NOT NULL DEFAULT 0,
    minStock INTEGER NOT NULL DEFAULT 5,
    imageUrl TEXT,
    isAvailable INTEGER NOT NULL DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL UNIQUE,
    address TEXT,
    passwordHash TEXT,
    walletBalance REAL NOT NULL DEFAULT 0,
    referralCode TEXT NOT NULL UNIQUE,
    referredById TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    orderNumber TEXT NOT NULL UNIQUE,
    customerId TEXT NOT NULL,
    orderType TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    totalAmount REAL NOT NULL,
    paymentMethod TEXT NOT NULL,
    paymentStatus TEXT NOT NULL DEFAULT 'PENDING',
    staffId TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unitPrice REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS repair_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    basePrice REAL,
    estimatedTime TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS repair_jobs (
    id TEXT PRIMARY KEY,
    ticketNumber TEXT NOT NULL UNIQUE,
    customerId TEXT NOT NULL,
    repairCategoryId TEXT,
    deviceModel TEXT NOT NULL,
    imeiSerial TEXT,
    issueDescription TEXT NOT NULL,
    diagnosis TEXT,
    location TEXT,
    scheduledDate DATETIME,
    status TEXT NOT NULL DEFAULT 'RECEIVED',
    estimatedCost REAL,
    finalCost REAL,
    advancePaid REAL DEFAULT 0,
    assignedToId TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    completedAt DATETIME
);
CREATE TABLE IF NOT EXISTS repair_parts (
    id TEXT PRIMARY KEY,
    repairJobId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unitPrice REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS purchase_orders (
    id TEXT PRIMARY KEY,
    orderNumber TEXT NOT NULL UNIQUE,
    requestedById TEXT,
    supplierId TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING',
    totalAmount REAL NOT NULL DEFAULT 0,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS purchase_order_items (
    id TEXT PRIMARY KEY,
    purchaseOrderId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unitCost REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS stock_movements (
    id TEXT PRIMARY KEY,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    type TEXT NOT NULL,
    referenceType TEXT,
    referenceId TEXT,
    userId TEXT,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    otp TEXT NOT NULL,
    isUsed INTEGER NOT NULL DEFAULT 0,
    expiresAt DATETIME NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS sales (
    id TEXT PRIMARY KEY,
    staffId TEXT NOT NULL,
    saleDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    totalAmount REAL NOT NULL,
    paymentMethod TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'COMPLETED',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS sale_items (
    id TEXT PRIMARY KEY,
    saleId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unitPrice REAL NOT NULL,
    discount REAL NOT NULL DEFAULT 0,
    total REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS banners (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    linkUrl TEXT,
    isActive INTEGER NOT NULL DEFAULT 1,
    displayOrder INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS wallet_transactions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    amount REAL NOT NULL,
    transactionType TEXT NOT NULL,
    description TEXT,
    referenceId TEXT,
    referenceType TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS community_posts (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    imageUrls TEXT,
    postType TEXT,
    likesCount INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS community_comments (
    id TEXT PRIMARY KEY,
    postId TEXT NOT NULL,
    userId TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS chat_messages (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    message TEXT NOT NULL,
    isUser INTEGER NOT NULL DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
