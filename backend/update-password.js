const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function updatePassword() {
  const email = 'lotchansm1612@gmail.com';
  const plainPassword = 'MSLMlk\';
  
  console.log('?? Generating new password hash...');
  const newHash = await bcrypt.hash(plainPassword, 10);
  console.log('New hash:', newHash);
  
  console.log('\n?? Updating database...');
  const user = await prisma.user.update({
    where: { email },
    data: { passwordHash: newHash }
  });
  
  console.log('? Password updated for:', user.email);
  
  // Verify
  const verify = await bcrypt.compare(plainPassword, newHash);
  console.log('? New password verified:', verify);
  
  await prisma.\();
}

updatePassword().catch(console.error);
