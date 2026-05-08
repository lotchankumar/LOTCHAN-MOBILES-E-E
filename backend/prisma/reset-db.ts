import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  console.log('🔄 Starting database reset (preserving ADMIN users)...\n');

  // 1. Backup admin users
  const adminUsers = await prisma.user.findMany({ where: { role: 'ADMIN' } });
  console.log(`📋 Found ${adminUsers.length} ADMIN user(s) to preserve:`);
  adminUsers.forEach(u => console.log(`   - ${u.email} (${u.name})`));

  // 2. Delete all data in dependency order (children before parents)
  console.log('\n🗑️  Clearing all tables...');

  // Audit logs
  const auditLogs = await prisma.auditLog.deleteMany({});
  console.log(`   ✓ AuditLog: ${auditLogs.count} deleted`);

  // Device tokens
  const deviceTokens = await prisma.deviceToken.deleteMany({});
  console.log(`   ✓ DeviceToken: ${deviceTokens.count} deleted`);

  // Chat, Community
  const chatMessages = await prisma.chatMessage.deleteMany({});
  console.log(`   ✓ ChatMessage: ${chatMessages.count} deleted`);

  const communityComments = await prisma.communityComment.deleteMany({});
  console.log(`   ✓ CommunityComment: ${communityComments.count} deleted`);

  const communityPosts = await prisma.communityPost.deleteMany({});
  console.log(`   ✓ CommunityPost: ${communityPosts.count} deleted`);

  // Wallet
  const walletTx = await prisma.walletTransaction.deleteMany({});
  console.log(`   ✓ WalletTransaction: ${walletTx.count} deleted`);

  // Orders
  const orderItems = await prisma.orderItem.deleteMany({});
  console.log(`   ✓ OrderItem: ${orderItems.count} deleted`);

  const orders = await prisma.order.deleteMany({});
  console.log(`   ✓ Order: ${orders.count} deleted`);

  // Repairs
  const repairParts = await prisma.repairPart.deleteMany({});
  console.log(`   ✓ RepairPart: ${repairParts.count} deleted`);

  const repairJobs = await prisma.repairJob.deleteMany({});
  console.log(`   ✓ RepairJob: ${repairJobs.count} deleted`);

  const repairCategories = await prisma.repairCategory.deleteMany({});
  console.log(`   ✓ RepairCategory: ${repairCategories.count} deleted`);

  // Repair Spare Purchases
  const repairSparePurchaseItems = await prisma.repairSparePurchaseItem.deleteMany({});
  console.log(`   ✓ RepairSparePurchaseItem: ${repairSparePurchaseItems.count} deleted`);

  const repairSparePurchases = await prisma.repairSparePurchase.deleteMany({});
  console.log(`   ✓ RepairSparePurchase: ${repairSparePurchases.count} deleted`);

  // Repair Spare Products
  const repairSpareProducts = await prisma.repairSpareProduct.deleteMany({});
  console.log(`   ✓ RepairSpareProduct: ${repairSpareProducts.count} deleted`);

  // Purchases
  const purchaseItems = await prisma.purchaseItem.deleteMany({});
  console.log(`   ✓ PurchaseItem: ${purchaseItems.count} deleted`);

  const purchases = await prisma.purchase.deleteMany({});
  console.log(`   ✓ Purchase: ${purchases.count} deleted`);

  // Purchase Orders
  const stockMovements = await prisma.stockMovement.deleteMany({});
  console.log(`   ✓ StockMovement: ${stockMovements.count} deleted`);

  const poItems = await prisma.purchaseOrderItem.deleteMany({});
  console.log(`   ✓ PurchaseOrderItem: ${poItems.count} deleted`);

  const purchaseOrders = await prisma.purchaseOrder.deleteMany({});
  console.log(`   ✓ PurchaseOrder: ${purchaseOrders.count} deleted`);

  // Branch Stocks
  const branchStocks = await prisma.branchStock.deleteMany({});
  console.log(`   ✓ BranchStock: ${branchStocks.count} deleted`);

  // Products
  const products = await prisma.product.deleteMany({});
  console.log(`   ✓ Product: ${products.count} deleted`);

  // Product Categories
  const productCategories = await prisma.productCategory.deleteMany({});
  console.log(`   ✓ ProductCategory: ${productCategories.count} deleted`);

  // Supplier Payments
  const supplierPayments = await prisma.supplierPayment.deleteMany({});
  console.log(`   ✓ SupplierPayment: ${supplierPayments.count} deleted`);

  // Suppliers
  const suppliers = await prisma.supplier.deleteMany({});
  console.log(`   ✓ Supplier: ${suppliers.count} deleted`);

  // Expenses
  const expenses = await prisma.expense.deleteMany({});
  console.log(`   ✓ Expense: ${expenses.count} deleted`);

  // Customers
  const customers = await prisma.customer.deleteMany({});
  console.log(`   ✓ Customer: ${customers.count} deleted`);

  // Password reset tokens
  const passwordResetTokens = await prisma.passwordResetToken.deleteMany({});
  console.log(`   ✓ PasswordResetToken: ${passwordResetTokens.count} deleted`);

  // App settings & Banners
  const appSettings = await prisma.appSetting.deleteMany({});
  console.log(`   ✓ AppSetting: ${appSettings.count} deleted`);

  const banners = await prisma.banner.deleteMany({});
  console.log(`   ✓ Banner: ${banners.count} deleted`);

  // Delete NON-ADMIN users only
  const adminIds = adminUsers.map(u => u.id);
  const deletedUsers = await prisma.user.deleteMany({
    where: { id: { notIn: adminIds } }
  });
  console.log(`   ✓ Non-admin Users: ${deletedUsers.count} deleted`);

  // Delete branches (admin users have branchId set to null via SetNull cascade)
  // First, unlink admin users from branches so branches can be deleted
  await prisma.user.updateMany({
    where: { role: 'ADMIN' },
    data: { branchId: null, managerId: null }
  });

  const branches = await prisma.branch.deleteMany({});
  console.log(`   ✓ Branch: ${branches.count} deleted`);

  console.log('\n✅ Database reset complete!');
  console.log(`\n🔐 Preserved ADMIN user(s):`);
  adminUsers.forEach(u => console.log(`   - ${u.email} / (password unchanged)`));
}

resetDatabase()
  .catch((e) => {
    console.error('❌ Reset failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
