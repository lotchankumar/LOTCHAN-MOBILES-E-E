import prisma from './src/prisma/client';
import jwt from 'jsonwebtoken';

async function test() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!admin) {
    console.log("No admin found");
    return;
  }
  console.log("Admin email:", admin.email);
  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  );
  console.log("Token generated.");
  
  const branch = await prisma.branch.findFirst();
  if (!branch) {
    console.log("No branch found");
    return;
  }
  
  const url = `http://localhost:5000/api/admin/manager/profit?startDate=2026-03-26&endDate=2026-04-25&branchId=${branch.id}`;
  console.log("Requesting:", url);
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Data:", JSON.stringify(data, null, 2));
  } catch (err: any) {
    console.log("Error:", err.message);
  }
}

test().catch(console.error).finally(() => prisma.$disconnect());
