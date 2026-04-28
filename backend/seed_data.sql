-- Seed categories (Prisma schema requires slug)
INSERT OR IGNORE INTO product_categories (id, name, slug, description, displayOrder) VALUES
('cat-mobile', 'MOBILE', 'mobile', 'Mobile phones and smartphones', 1),
('cat-accessory', 'ACCESSORY', 'accessory', 'Phone accessories', 2),
('cat-sim', 'SIM_CARD', 'sim-card', 'SIM cards and recharge', 3);

-- Seed suppliers
INSERT OR IGNORE INTO suppliers (id, name, contactName, email, phone, address, isActive) VALUES
('sup-samsung', 'Samsung India', 'Rajesh Kumar', 'rajesh@samsung.com', '9876543210', 'Mumbai, Maharashtra', 1),
('sup-apple', 'Apple India', 'Priya Singh', 'priya@apple.com', '9876543211', 'Bangalore, Karnataka', 1),
('sup-xiaomi', 'Xiaomi India', 'Amit Patel', 'amit@xiaomi.com', '9876543212', 'Delhi, India', 1),
('sup-oneplus', 'OnePlus India', 'Vikram Reddy', 'vikram@oneplus.com', '9876543213', 'Hyderabad, Telangana', 1);

-- Seed products with some low stock
INSERT OR IGNORE INTO products (id, sku, name, description, category, categoryId, supplierId, brand, model, price, cost, stockQty, minStock, isAvailable, updatedAt) VALUES
-- Samsung phones (plenty stock)
('prod-1', 'S24U-001', 'Samsung Galaxy S24 Ultra', 'Latest flagship', 'MOBILE', 'cat-mobile', 'sup-samsung', 'Samsung', 'Galaxy S24 Ultra', 129999, 105000, 15, 5, 1, CURRENT_TIMESTAMP),
('prod-2', 'S24-001', 'Samsung Galaxy S24', 'Standard flagship', 'MOBILE', 'cat-mobile', 'sup-samsung', 'Samsung', 'Galaxy S24', 79999, 65000, 10, 5, 1, CURRENT_TIMESTAMP),
('prod-3', 'A55-001', 'Samsung Galaxy A55', 'Mid-range phone', 'MOBILE', 'cat-mobile', 'sup-samsung', 'Samsung', 'Galaxy A55', 39999, 32000, 8, 5, 1, CURRENT_TIMESTAMP),
-- Apple phones (some low stock - below minStock of 5)
('prod-4', 'IP15PM-001', 'Apple iPhone 15 Pro Max', 'Latest Apple flagship', 'MOBILE', 'cat-mobile', 'sup-apple', 'Apple', 'iPhone 15 Pro Max', 159999, 125000, 3, 5, 1, CURRENT_TIMESTAMP),
('prod-5', 'IP15-001', 'Apple iPhone 15', 'Standard model', 'MOBILE', 'cat-mobile', 'sup-apple', 'Apple', 'iPhone 15', 79999, 62000, 2, 5, 1, CURRENT_TIMESTAMP),
-- Xiaomi (plenty)
('prod-6', 'RN13P-001', 'Xiaomi Redmi Note 13 Pro', 'Xiaomi mid-ranger', 'MOBILE', 'cat-mobile', 'sup-xiaomi', 'Xiaomi', 'Redmi Note 13 Pro', 25999, 21000, 25, 5, 1, CURRENT_TIMESTAMP),
-- OnePlus (low stock)
('prod-7', 'OP12-001', 'OnePlus 12', 'OnePlus flagship', 'MOBILE', 'cat-mobile', 'sup-oneplus', 'OnePlus', '12', 69999, 55000, 1, 5, 1, CURRENT_TIMESTAMP),
('prod-8', 'OP12R-001', 'OnePlus 12R', 'OnePlus value flagship', 'MOBILE', 'cat-mobile', 'sup-oneplus', 'OnePlus', '12R', 45999, 36000, 4, 5, 1, CURRENT_TIMESTAMP),
-- Accessories
('prod-9', 'TEMPGLASS-001', 'Tempered Glass Screen Protector', 'Universal screen guard', 'ACCESSORY', 'cat-accessory', 'sup-samsung', 'Generic', 'Tempered Glass', 299, 100, 100, 20, 1, CURRENT_TIMESTAMP),
('prod-10', 'CASE-001', 'Silicone Phone Case', 'Protective case', 'ACCESSORY', 'cat-accessory', 'sup-xiaomi', 'Generic', 'Silicone Case', 499, 200, 50, 20, 1, CURRENT_TIMESTAMP);
