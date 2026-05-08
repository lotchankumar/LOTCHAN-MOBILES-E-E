import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- Users ---');
  const users = await prisma.user.findMany({
    include: { branch: true }
  });
  users.forEach(u => console.log(`Email: ${u.email}, Name: ${u.name}, Role: ${u.role}, Branch: ${u.branch?.name} (${u.branchId})`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
