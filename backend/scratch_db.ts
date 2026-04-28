import prisma from './src/prisma/client';

async function test() {
  const orders = await prisma.order.findMany({ include: { staff: true } });
  console.log("Orders count:", orders.length);
  if (orders.length > 0) {
    console.log("First order staffId:", orders[0].staffId, "Staff branch:", orders[0].staff?.branchId);
  }
  
  const repairs = await prisma.repairJob.findMany({ include: { assignedTo: true } });
  console.log("Repairs count:", repairs.length);
  
  const mtDeposits = await prisma.mTDeposit.findMany({ include: { manager: true } });
  console.log("MT deposits count:", mtDeposits.length);
  
  const purchases = await prisma.purchase.findMany({ include: { manager: true } });
  console.log("Purchases count:", purchases.length);

  const branches = await prisma.branch.findMany();
  console.log("Branches:", branches.map(b => ({ id: b.id, name: b.name })));
}

test().catch(console.error).finally(() => prisma.$disconnect());
