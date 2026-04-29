import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Clear existing data in correct order to respect foreign keys
  console.log('Clearing existing data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.repairPart.deleteMany();
  await prisma.repairJob.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();

  // 2. Create/Update Admin user
  console.log('Seeding admin user...');
  const adminEmail = 'lotchansm1612@gmail.com';
  const adminPassword = 'MSLMlk$2402';
  const adminHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash: adminHash, role: 'ADMIN', name: 'Lotchan Mobiles' },
    create: { email: adminEmail, passwordHash: adminHash, name: 'Lotchan Mobiles', role: 'ADMIN' },
  });
  console.log('Admin user seeded.');

  // 3. Create sample staff user for assignments
  const staffEmail = 'staff@lotchanmobiles.com';
  const staffHash = await bcrypt.hash('staff123', 10);
  let staff = await prisma.user.findUnique({ where: { email: staffEmail } });
  
  if (!staff) {
    staff = await prisma.user.create({
      data: {
        name: 'Rahul Sharma',
        email: staffEmail,
        passwordHash: staffHash,
        role: 'STAFF',
      },
    });
    console.log('Created sample staff user.');
  }

// Create Sample Branches
  console.log('Creating branches...');
  const branchesData = [
    { 
      name: 'Somanur Main Branch', 
      address: 'Somanur Main Road, Coimbatore, Tamil Nadu 641032', 
      phone: '0422-1234567' 
    },
    { 
      name: 'Coimbatore Central', 
      address: 'RS Puram, Coimbatore, Tamil Nadu 641002', 
      phone: '0422-7654321' 
    }
  ];

  await prisma.branch.createMany({
    data: branchesData,
    skipDuplicates: true,
  });

  const branches = await prisma.branch.findMany();

  // Update staff to assign to first branch
  await prisma.user.update({
    where: { id: staff.id },
    data: { branchId: branches[0].id }
  });

  console.log('Created sample branches.');

// Create Sample Suppliers first
  console.log('Creating suppliers...');
  const suppliersData = [
    { name: 'Sundha Agency', contactName: 'Rajesh Sundha', phone: '09876543210', email: 'rajesh@sundhaagency.com', address: 'Gandhipuram, Coimbatore' },
    { name: 'Vijay Mobile Distributors', contactName: 'Vijay Kumar', phone: '07654321098', email: 'vijay@mobiledist.co.in', address: 'RS Puram, Coimbatore' },
    { name: 'Apple Authorised Reseller', contactName: 'Anita Sharma', phone: '08765432109', email: 'anita@apple-reseller.com', address: 'Somanur Road, Coimbatore' },
    { name: 'Generic Accessories Wholesaler', contactName: 'Ramesh', phone: '06543210987', address: 'Peelamedu Market, Coimbatore' },
  ];
  await prisma.supplier.createMany({
    data: suppliersData,
    skipDuplicates: true,
  });
  const suppliers = await prisma.supplier.findMany();

  // 3. Create Sample Products (now with supplierId)
  console.log('Creating products...');
  const productsData: any[] = [
    // Smartphones
    { sku: 'APP-IP15-128', name: 'iPhone 15 128GB - Midnight', category: 'MOBILE', brand: 'Apple', model: 'iPhone 15', price: 69900, cost: 62000, stockQty: 10, supplierId: suppliers[2].id },
    { sku: 'APP-IP15P-256', name: 'iPhone 15 Pro 256GB - Natural Titanium', category: 'MOBILE', brand: 'Apple', model: 'iPhone 15 Pro', price: 134900, cost: 121000, stockQty: 5, supplierId: suppliers[2].id },
    { sku: 'SAM-S24-256', name: 'Samsung Galaxy S24 256GB - Onyx Black', category: 'MOBILE', brand: 'Samsung', model: 'Galaxy S24', price: 74999, cost: 65000, stockQty: 8, supplierId: suppliers[0].id },
    { sku: 'SAM-A55-128', name: 'Samsung Galaxy A55 5G 128GB', category: 'MOBILE', brand: 'Samsung', model: 'Galaxy A55', price: 39999, cost: 35000, stockQty: 15, supplierId: suppliers[0].id },
    { sku: 'ONE-12R-256', name: 'OnePlus 12R 256GB - Iron Gray', category: 'MOBILE', brand: 'OnePlus', model: '12R', price: 45999, cost: 40000, stockQty: 12, supplierId: suppliers[1].id },
    { sku: 'XIA-RN13P-256', name: 'Redmi Note 13 Pro 5G 256GB', category: 'MOBILE', brand: 'Xiaomi', model: 'Redmi Note 13 Pro', price: 25999, cost: 22000, stockQty: 20, supplierId: suppliers[1].id },
    // Accessories
    { sku: 'ACC-APP-CASE', name: 'iPhone 15 Silicone Case', category: 'ACCESSORY', brand: 'Apple', model: 'iPhone 15', price: 4900, cost: 2500, stockQty: 25, supplierId: suppliers[2].id },
    { sku: 'ACC-TEMP-GLASS', name: 'Premium Tempered Glass - Universal', category: 'ACCESSORY', brand: 'Generic', price: 499, cost: 150, stockQty: 100, supplierId: suppliers[3].id },
    { sku: 'ACC-20W-CHG', name: '20W USB-C Power Adapter', category: 'ACCESSORY', brand: 'Apple', price: 1900, cost: 1200, stockQty: 30, supplierId: suppliers[2].id },
    { sku: 'ACC-CBL-USBC', name: 'Braided Type-C to Type-C Cable', category: 'ACCESSORY', brand: 'Boat', price: 399, cost: 180, stockQty: 50, supplierId: suppliers[3].id },
    { sku: 'ACC-PB-10K', name: '10000mAh Power Bank', category: 'ACCESSORY', brand: 'Mi', price: 1299, cost: 850, stockQty: 15, supplierId: suppliers[3].id },
    // Repair Parts
    { sku: 'PRT-IP12-SCR', name: 'iPhone 12 OLED Display Unit', category: 'ACCESSORY', brand: 'Apple', model: 'iPhone 12', price: 12500, cost: 8000, stockQty: 3, supplierId: suppliers[2].id },
    { sku: 'PRT-SAMA53-BAT', name: 'Samsung A53 Original Battery', category: 'ACCESSORY', brand: 'Samsung', model: 'Galaxy A53', price: 2500, cost: 1400, stockQty: 5, supplierId: suppliers[0].id },
    { sku: 'PRT-IP11-PORT', name: 'iPhone 11 Charging Port Flex', category: 'ACCESSORY', brand: 'Apple', model: 'iPhone 11', price: 1800, cost: 800, stockQty: 8, supplierId: suppliers[2].id },
  ];

  await prisma.product.createMany({
    data: productsData,
    skipDuplicates: true,
  });

  const products = await prisma.product.findMany();

  // 4. Create Sample Customers
  console.log('Creating customers...');
  const customersData: any[] = [
    { name: 'Arun Kumar', email: 'arun.k@gmail.com', phone: '9876543210', address: 'RS Puram, Coimbatore, Tamil Nadu', referralCode: 'ARUN123' },
    { name: 'Priya Rajan', email: 'priya.rajan88@yahoo.in', phone: '8765432109', address: 'Gandhipuram, Coimbatore, Tamil Nadu', referralCode: 'PRIYA123' },
    { name: 'Karthik S', email: 'karthik.s@outlook.com', phone: '7654321098', address: 'Peelamedu, Coimbatore, Tamil Nadu', referralCode: 'KARTHIK123' },
  ];

  await prisma.customer.createMany({
    data: customersData,
    skipDuplicates: true,
  });

  const customers = await prisma.customer.findMany();

  // 5. Create Sample Orders
  console.log('Creating orders...');
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2026-0001',
      customerId: customers[0].id, // Arun Kumar
      orderType: 'IN_STORE',
      status: 'COMPLETED',
      totalAmount: 70399, // Phone + Glass
      paymentMethod: 'UPI',
      paymentStatus: 'PAID',
      staffId: staff.id,
      orderItems: {
        create: [
          {
            productId: products.find(p => p.sku === 'APP-IP15-128')!.id,
            quantity: 1,
            unitPrice: 69900,
          },
          {
            productId: products.find(p => p.sku === 'ACC-TEMP-GLASS')!.id,
            quantity: 1,
            unitPrice: 499,
          }
        ]
      }
    }
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2026-0002',
      customerId: customers[1].id, // Priya Rajan
      orderType: 'ONLINE',
      status: 'PROCESSING',
      totalAmount: 1299, // Power Bank
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      orderItems: {
        create: [
          {
            productId: products.find(p => p.sku === 'ACC-PB-10K')!.id,
            quantity: 1,
            unitPrice: 1299,
          }
        ]
      }
    }
  });

  // 6. Create Sample Repair Jobs
  console.log('Creating repair jobs...');
  const repair1 = await prisma.repairJob.create({
    data: {
      ticketNumber: 'REP-2026-0001',
      customerId: customers[2].id, // Karthik S
      deviceModel: 'iPhone 12',
      imeiSerial: 'IMEI123456789012345',
      issueDescription: 'Screen cracked after dropping',
      diagnosis: 'Display unit needs replacement',
      status: 'IN_PROGRESS',
      estimatedCost: 13000,
      advancePaid: 5000,
      assignedToId: staff.id,
      repairParts: {
        create: [
          {
            productId: products.find(p => p.sku === 'PRT-IP12-SCR')!.id,
            quantity: 1,
            unitPrice: 12500,
          }
        ]
      }
    }
  });

  const repair2 = await prisma.repairJob.create({
    data: {
      ticketNumber: 'REP-2026-0002',
      customerId: customers[0].id, // Arun Kumar
      deviceModel: 'Samsung Galaxy A53',
      issueDescription: 'Battery not charging properly and draining fast',
      diagnosis: 'Battery degradation, requires new battery',
      status: 'COMPLETED',
      estimatedCost: 2800,
      finalCost: 2800,
      advancePaid: 0,
      assignedToId: staff.id,
      repairParts: {
        create: [
          {
            productId: products.find(p => p.sku === 'PRT-SAMA53-BAT')!.id,
            quantity: 1,
            unitPrice: 2500,
          }
        ]
      }
    }
  });

  const repair3 = await prisma.repairJob.create({
    data: {
      ticketNumber: 'REP-2026-0003',
      customerId: customers[1].id, // Priya Rajan
      deviceModel: 'iPhone 11',
      issueDescription: 'Charging port loose',
      status: 'RECEIVED',
      estimatedCost: 2000,
      advancePaid: 0,
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });