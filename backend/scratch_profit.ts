import { managerService } from './src/services/manager.service';
import prisma from './src/prisma/client';

async function test() {
  const branch = await prisma.branch.findFirst();
  if (!branch) {
    console.log("No branch found");
    return;
  }
  console.log("Testing profit for branch:", branch.id);
  const result = await managerService.getProfit(branch.id, '2024-01-01', '2026-12-31');
  console.log(JSON.stringify(result, null, 2));
}

test().catch(console.error).finally(() => prisma.$disconnect());
