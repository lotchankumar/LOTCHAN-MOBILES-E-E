import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create/Update Admin user
  console.log('Seeding Admin user...');
  const adminEmail = 'admin@test.com';
  const adminPassword = 'password123';
  const adminHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash: adminHash, role: 'ADMIN', name: 'Test Admin' },
    create: { email: adminEmail, passwordHash: adminHash, name: 'Test Admin', role: 'ADMIN' },
  });

  // 2. Create/Update Manager user
  console.log('Seeding Manager user...');
  const managerEmail = 'manager@test.com';
  const managerPassword = 'password123';
  const managerHash = await bcrypt.hash(managerPassword, 10);

  await prisma.user.upsert({
    where: { email: managerEmail },
    update: { passwordHash: managerHash, role: 'MANAGER', name: 'Test Manager' },
    create: { email: managerEmail, passwordHash: managerHash, name: 'Test Manager', role: 'MANAGER' },
  });

  // 3. Create/Update Staff user
  console.log('Seeding Staff user...');
  const staffEmail = 'staff@test.com';
  const staffPassword = 'password123';
  const staffHash = await bcrypt.hash(staffPassword, 10);

  await prisma.user.upsert({
    where: { email: staffEmail },
    update: { passwordHash: staffHash, role: 'STAFF', name: 'Test Staff' },
    create: { email: staffEmail, passwordHash: staffHash, name: 'Test Staff', role: 'STAFF' },
  });

  // 4. Create/Update Technician user
  console.log('Seeding Technician user...');
  const technicianEmail = 'technician@test.com';
  const technicianPassword = 'password123';
  const technicianHash = await bcrypt.hash(technicianPassword, 10);

  await prisma.user.upsert({
    where: { email: technicianEmail },
    update: { passwordHash: technicianHash, role: 'TECHNICIAN', name: 'Test Technician' },
    create: { email: technicianEmail, passwordHash: technicianHash, name: 'Test Technician', role: 'TECHNICIAN' },
  });

  console.log('Seeding completed successfully!');
  console.log('--- TEST CREDENTIALS ---');
  console.log('Admin: admin@test.com / password123');
  console.log('Manager: manager@test.com / password123');
  console.log('Staff: staff@test.com / password123');
  console.log('Technician: technician@test.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });