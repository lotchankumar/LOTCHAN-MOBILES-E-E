const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function fixExistingUser() {
  try {
    const email = 'lotchansm1612@gmail.com';
    const password = 'MSLMlk$2402';

    console.log('🔍 Checking user:', email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('❌ User not found. Run seed-admin first.');
      return;
    }

    console.log('✅ User found');
    console.log('📊 User fields:', Object.keys(user));

    const newHash = await bcrypt.hash(password, 10);
    console.log('🔄 Generated new hash');

    const updated = await prisma.user.update({
      where: { email },
      data: { passwordHash: newHash },
    });

    console.log('✅ Password updated for:', updated.email);
    const verify = await bcrypt.compare(password, newHash);
    console.log('✅ Password verification:', verify);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixExistingUser();
