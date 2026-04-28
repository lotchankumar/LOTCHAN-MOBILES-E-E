const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function diagnose() {
  console.log('🔍 Diagnosing Admin Credentials...\n');

  // Check if admin exists
  const admin = await prisma.user.findUnique({
    where: { email: 'lotchansm1612@gmail.com' }
  });

  if (!admin) {
    console.log('❌ Admin user NOT found in database');
    console.log('\n✅ Seeding admin with correct password...');
    
    const password = 'MSLMlk$2402';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newAdmin = await prisma.user.create({
      data: {
        email: 'lotchansm1612@gmail.com',
        name: 'Lotchan Mobiles',
        role: 'ADMIN',
        passwordHash: hashedPassword
      }
    });
    
    console.log('✅ Admin created successfully');
    console.log(`   Email: ${newAdmin.email}`);
    console.log(`   Role: ${newAdmin.role}`);
    console.log(`   Password Hash Length: ${newAdmin.passwordHash.length}`);
  } else {
    console.log('✅ Admin user found!');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Hash Length: ${admin.passwordHash.length}\n`);

    // Test password comparison
    console.log('🔐 Testing password matches:\n');
    
    const testPasswords = [
      'MSLMlk$2402',       // With dollar sign
      'MSLMlk2402',        // Without dollar sign
      'MSLMlk\$2402',      // With escaped dollar
    ];

    for (const testPass of testPasswords) {
      try {
        const matches = await bcrypt.compare(testPass, admin.passwordHash);
        console.log(`   "${testPass}": ${matches ? '✅ MATCH' : '❌ NO MATCH'}`);
      } catch (e) {
        console.log(`   "${testPass}": ❌ ERROR - ${e.message}`);
      }
    }

    // If no match found, rehash with correct password
    const correctPassword = 'MSLMlk$2402';
    const correctMatch = await bcrypt.compare(correctPassword, admin.passwordHash);
    
    if (!correctMatch) {
      console.log('\n⚠️  Password mismatch detected! Reseeding admin...');
      const hashedPassword = await bcrypt.hash(correctPassword, 10);
      const updated = await prisma.user.update({
        where: { email: 'lotchansm1612@gmail.com' },
        data: { passwordHash: hashedPassword }
      });
      console.log('✅ Admin password updated successfully');
      
      // Verify the fix
      const verify = await bcrypt.compare(correctPassword, updated.passwordHash);
      console.log(`   Verification: ${verify ? '✅ FIXED' : '❌ STILL BROKEN'}`);
    }
  }

  console.log('\n✅ Diagnosis complete!');
  console.log('\nAdmin Login Credentials:');
  console.log('  Email: lotchansm1612@gmail.com');
  console.log('  Password: MSLMlk$2402');
  console.log('  Endpoint: POST /api/auth/staff/login');
  
  await prisma.$disconnect();
}

diagnose().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
