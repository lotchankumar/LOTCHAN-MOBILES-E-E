const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'lotchansm1612@gmail.com' }
  });
  
  if (!user) {
    console.log('User not found');
    return;
  }
  
  console.log('User found:', {
    email: user.email,
    name: user.name,
    role: user.role,
    hasPasswordHash: !!user.passwordHash,
    passwordHashLength: user.passwordHash?.length
  });
  
  // Test password comparison
  const bcrypt = require('bcryptjs');
  
  // Test with seed password (without $)
  const testPassword1 = 'MSLMlk2402';
  const result1 = await bcrypt.compare(testPassword1, user.passwordHash);
  console.log(`Password "${testPassword1}":`, result1);
  
  // Test with login password (with $ stripped)
  const testPassword2 = 'MSLMlk2402';
  const result2 = await bcrypt.compare(testPassword2, user.passwordHash);
  console.log(`Password "${testPassword2}" (stripped):`, result2);
  
  // Original test password
  const testPassword3 = 'MSLMlk$2402';
  const stripped3 = testPassword3.replace(/\$/g, '');
  const result3 = await bcrypt.compare(stripped3, user.passwordHash);
  console.log(`Password "${testPassword3}" (stripped to "${stripped3}"):`, result3);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());