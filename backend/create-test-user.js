const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createTestUser() {
  // Delete old user if exists
  await prisma.user.deleteMany({ where: { email: 'test@shop.com' } });
  
  // Create a simple password: 'test123'
  const hash = await bcrypt.hash('test123', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'test@shop.com',
      name: 'Test User',
      passwordHash: hash,
      role: 'ADMIN'
    }
  });
  
  console.log('? Test user created:');
  console.log('   Email: test@shop.com');
  console.log('   Password: test123');
  console.log('   Hash:', hash);
  
  await prisma.\();
}

createTestUser();
