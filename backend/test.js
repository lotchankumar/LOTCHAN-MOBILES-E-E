const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const users = await prisma.user.findMany({
    where: { role: 'MANAGER' },
    include: { branch: true }
  });

  for (const u of users) {
    console.log(`\nManager: ${u.email}, Branch: ${u.branch?.name}`);
    const branchStockRows = await prisma.branchRepairSpareStock.findMany({
      where: { branchId: u.branchId }
    });
    console.log(`  Stock Rows:`, branchStockRows);

    if (branchStockRows.length === 0) {
      console.log(`  getAllSpareProducts returns: []`);
    } else {
      const branchProductIds = branchStockRows.map(r => r.spareProductId);
      const products = await prisma.repairSpareProduct.findMany({
        where: { id: { in: branchProductIds } }
      });
      console.log(`  Products count:`, products.length);
    }
  }
}
test().finally(() => prisma.$disconnect());
