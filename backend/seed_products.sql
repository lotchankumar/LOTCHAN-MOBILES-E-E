INSERT OR IGNORE INTO products (id, sku, name, description, category, categoryId, supplierId, brand, model, price, cost, stockQty, minStock, isAvailable, updatedAt) VALUES
('prod-1', 'S24U-001', 'Samsung Galaxy S24 Ultra', 'Latest flagship', 'MOBILE', 'cat-mobile', 'sup-samsung', 'Samsung', 'Galaxy S24 Ultra', 129999, 105000, 15, 5, 1, CURRENT_TIMESTAMP),
('prod-2', 'S24-001', 'Samsung Galaxy S24', 'Standard flagship', 'MOBILE', 'cat-mobile', 'sup-samsung', 'Samsung', 'Galaxy S24', 79999, 65000, 10, 5, 1, CURRENT_TIMESTAMP),
('prod-3', 'A55-001', 'Samsung Galaxy A55', 'Mid-range phone', 'MOBILE', 'cat-mobile', 'sup-samsung', 'Samsung', 'Galaxy A55', 39999, 32000, 8, 5, 1, CURRENT_TIMESTAMP),
('prod-4', 'IP15PM-001', 'Apple iPhone 15 Pro Max', 'Latest Apple flagship', 'MOBILE', 'cat-mobile', 'sup-apple', 'Apple', 'iPhone 15 Pro Max', 159999, 125000, 3, 5, 1, CURRENT_TIMESTAMP),
('prod-5', 'IP15-001', 'Apple iPhone 15', 'Standard model', 'MOBILE', 'cat-mobile', 'sup-apple', 'Apple', 'iPhone 15', 79999, 62000, 2, 5, 1, CURRENT_TIMESTAMP),
('prod-6', 'RN13P-001', 'Xiaomi Redmi Note 13 Pro', 'Xiaomi mid-ranger', 'MOBILE', 'cat-mobile', 'sup-xiaomi', 'Xiaomi', 'Redmi Note 13 Pro', 25999, 21000, 25, 5, 1, CURRENT_TIMESTAMP),
('prod-7', 'OP12-001', 'OnePlus 12', 'OnePlus flagship', 'MOBILE', 'cat-mobile', 'sup-oneplus', 'OnePlus', '12', 69999, 55000, 1, 5, 1, CURRENT_TIMESTAMP),
('prod-8', 'OP12R-001', 'OnePlus 12R', 'OnePlus value flagship', 'MOBILE', 'cat-mobile', 'sup-oneplus', 'OnePlus', '12R', 45999, 36000, 4, 5, 1, CURRENT_TIMESTAMP),
('prod-9', 'TEMPGLASS-001', 'Tempered Glass Screen Protector', 'Universal screen guard', 'ACCESSORY', 'cat-accessory', 'sup-samsung', 'Generic', 'Tempered Glass', 299, 100, 100, 20, 1, CURRENT_TIMESTAMP),
('prod-10', 'CASE-001', 'Silicone Phone Case', 'Protective case', 'ACCESSORY', 'cat-accessory', 'sup-xiaomi', 'Generic', 'Silicone Case', 499, 200, 50, 20, 1, CURRENT_TIMESTAMP);
