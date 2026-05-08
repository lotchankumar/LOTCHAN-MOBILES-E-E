import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({ where: { email: 'cellcorner123@gmail.com' } });
  if (!user) return console.log('User not found');
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' }
  );

  console.log('Fetching with token for mathu...', user.id, user.role, user.branchId);
  try {
    const res = await fetch('http://localhost:5000/api/admin/repair-spare-products', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    console.log('Response data items:', data.data?.length);
    data.data?.forEach((d: any) => console.log(d.name, d.branchId));
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main().finally(() => prisma.$disconnect());
