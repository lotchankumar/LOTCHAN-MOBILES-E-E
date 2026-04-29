const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanup() {
  console.log('Starting database cleanup...');

  try {
    // 1. Delete dependent records first (to respect foreign key constraints)
    console.log('Deleting Order Items...');
    await prisma.orderItem.deleteMany();
    
    console.log('Deleting Orders...');
    await prisma.order.deleteMany();
    
    console.log('Deleting Repair Parts...');
    await prisma.repairPart.deleteMany();
    
    console.log('Deleting Repair Jobs...');
    await prisma.repairJob.deleteMany();

    // 2. Delete main entities
    console.log('Deleting Products...');
    await prisma.product.deleteMany();
    
    console.log('Deleting Customers...');
    await prisma.customer.deleteMany();
    
    console.log('Deleting Suppliers...');
    await prisma.supplier.deleteMany();
    
    console.log('Deleting Branches...');
    await prisma.branch.deleteMany();

    // 3. Delete all users EXCEPT the Admin
    console.log('Deleting all Staff/Manager users...');
    await prisma.user.deleteMany({
      where: {
        role: {
          not: 'ADMIN'
        }
      }
    });

    console.log('\n✅ Successfully removed all sample data! Only the Admin user remains.');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
