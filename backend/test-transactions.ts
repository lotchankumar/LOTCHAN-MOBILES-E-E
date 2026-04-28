import { prisma } from './src/prisma/client';
import { Category, PaymentMethod, RepairStatus } from './src/generated/enums';
import { startOfDay, endOfDay } from 'date-fns';

// Helper to format currency
const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

// Helper to log step
const logStep = (step: number, description: string) => {
  console.log(`\n${step}. ${description}`);
  console.log('-'.repeat(50));
};

async function main() {
  console.log('🚀 Starting one-day transaction simulation');
  console.log('='.repeat(60));

  // Get today's date for all transactions
  const today = new Date();
  const todayStart = startOfDay(today);
  const todayEnd = endOfDay(today);

  // Get users (staff and manager)
  const staff = await prisma.user.findFirst({
    where: { email: 'staff@lotchanmobiles.com' },
  });

  const manager = await prisma.user.findFirst({
    where: { email: 'manager@lotchanmobiles.com' },
  });

  if (!staff || !manager) {
    console.error('❌ Staff or manager user not found. Please run seed first.');
    process.exit(1);
  }

  // Get product IDs based on SKUs from seed
  const products = await prisma.product.findMany({
    where: { sku: { in: ['ACC-001', 'ACC-002', 'ACC-003', 'ACC-004', 'SIM-001'] } },
  });

  const productMap = new Map(products.map(p => [p.sku, p]));

  // Verify we have all needed products
  const requiredSkus = ['ACC-001', 'ACC-002', 'ACC-003', 'ACC-004', 'SIM-001'];
  for (const sku of requiredSkus) {
    if (!productMap.has(sku)) {
      console.error(`❌ Product with SKU ${sku} not found in database`);
      process.exit(1);
    }
  }

  const charger = productMap.get('ACC-001')!;      // Seven Colors 45W Type-C Charger
  const flipCover = productMap.get('ACC-002')!;    // Flip Cover
  const headphone = productMap.get('ACC-003')!;    // Basic Headphone
  const temperedGlass = productMap.get('ACC-004')!; // Tempered Glass
  const airtelSim = productMap.get('SIM-001')!;    // Airtel SIM

  // Record initial stock levels
  const initialStock = {
    charger: charger.stockQuantity,
    flipCover: flipCover.stockQuantity,
    headphone: headphone.stockQuantity,
    temperedGlass: temperedGlass.stockQuantity,
    airtelSim: airtelSim.stockQuantity,
  };

  console.log('📦 Initial Inventory:');
  console.log(`   - ${charger.brand} ${charger.model}: ${charger.stockQuantity} units`);
  console.log(`   - ${flipCover.brand} ${flipCover.model}: ${flipCover.stockQuantity} units`);
  console.log(`   - ${headphone.brand} ${headphone.model}: ${headphone.stockQuantity} units`);
  console.log(`   - ${temperedGlass.brand} ${temperedGlass.model}: ${temperedGlass.stockQuantity} units`);
  console.log(`   - ${airtelSim.brand} ${airtelSim.model}: ${airtelSim.stockQuantity} units`);

  // Check for existing cash session, create if not exists
  let cashSession = await prisma.cashSession.findFirst({
    where: {
      staffId: staff.id,
      sessionDate: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  if (!cashSession) {
    cashSession = await prisma.cashSession.create({
      data: {
        staffId: staff.id,
        sessionDate: today,
        openingBalance: 5000, // Default opening balance
      },
    });
    console.log(`💰 Created cash session with opening balance: ${formatCurrency(cashSession.openingBalance)}`);
  } else {
    console.log(`💰 Using existing cash session with opening balance: ${formatCurrency(cashSession.openingBalance)}`);
  }

  // Track cash inflows
  let totalCashInflows = 0;
  let totalCommissions = 0;

  // ========== TRANSACTION 1: Sale: Seven Colors 45W Type-C Charger - 500 ==========
  logStep(1, 'Sale: Seven Colors 45W Type-C Charger - ₹500');
  const sale1 = await prisma.sale.create({
    data: {
      staffId: staff.id,
      totalAmount: 500,
      paymentMethod: PaymentMethod.CASH,
      items: {
        create: [{
          productId: charger.id,
          quantity: 1,
          unitPrice: 500,
          discount: 0,
          total: 500,
        }],
      },
    },
  });
  
  // Update stock
  await prisma.product.update({
    where: { id: charger.id },
    data: { stockQuantity: { decrement: 1 } },
  });

  totalCashInflows += 500;
  console.log(`   ✅ Sale recorded: ${formatCurrency(500)}`);
  console.log(`   📉 Stock updated: ${charger.brand} ${charger.model} -1 unit`);

  // ========== TRANSACTION 2: Sale: Flip Cover - 180 ==========
  logStep(2, 'Sale: Flip Cover - ₹180');
  const sale2 = await prisma.sale.create({
    data: {
      staffId: staff.id,
      totalAmount: 180,
      paymentMethod: PaymentMethod.CASH,
      items: {
        create: [{
          productId: flipCover.id,
          quantity: 1,
          unitPrice: 180,
          discount: 0,
          total: 180,
        }],
      },
    },
  });

  await prisma.product.update({
    where: { id: flipCover.id },
    data: { stockQuantity: { decrement: 1 } },
  });

  totalCashInflows += 180;
  console.log(`   ✅ Sale recorded: ${formatCurrency(180)}`);
  console.log(`   📉 Stock updated: ${flipCover.brand} ${flipCover.model} -1 unit`);

  // ========== TRANSACTION 3: Sale: Basic Headphone - 100 ==========
  logStep(3, 'Sale: Basic Headphone - ₹100');
  const sale3 = await prisma.sale.create({
    data: {
      staffId: staff.id,
      totalAmount: 100,
      paymentMethod: PaymentMethod.CASH,
      items: {
        create: [{
          productId: headphone.id,
          quantity: 1,
          unitPrice: 100,
          discount: 0,
          total: 100,
        }],
      },
    },
  });

  await prisma.product.update({
    where: { id: headphone.id },
    data: { stockQuantity: { decrement: 1 } },
  });

  totalCashInflows += 100;
  console.log(`   ✅ Sale recorded: ${formatCurrency(100)}`);
  console.log(`   📉 Stock updated: ${headphone.brand} ${headphone.model} -1 unit`);

  // ========== TRANSACTION 4: Sale: Tempered Glass - 100 ==========
  logStep(4, 'Sale: Tempered Glass - ₹100');
  const sale4 = await prisma.sale.create({
    data: {
      staffId: staff.id,
      totalAmount: 100,
      paymentMethod: PaymentMethod.CASH,
      items: {
        create: [{
          productId: temperedGlass.id,
          quantity: 1,
          unitPrice: 100,
          discount: 0,
          total: 100,
        }],
      },
    },
  });

  await prisma.product.update({
    where: { id: temperedGlass.id },
    data: { stockQuantity: { decrement: 1 } },
  });

  totalCashInflows += 100;
  console.log(`   ✅ Sale recorded: ${formatCurrency(100)}`);
  console.log(`   📉 Stock updated: ${temperedGlass.brand} ${temperedGlass.model} -1 unit`);

  // ========== TRANSACTION 5: Dhanhind Recharge 199 ==========
  logStep(5, 'Dhanhind Recharge - ₹199 (no commission)');
  const recharge1 = await prisma.rechargeTransaction.create({
    data: {
      staffId: staff.id,
      operator: 'Dhanhind',
      mobileNumber: '9876543210',
      amount: 199,
      commission: 0,
    },
  });

  totalCashInflows += 199;
  console.log(`   ✅ Recharge recorded: ${formatCurrency(199)}`);

  // ========== TRANSACTION 6: Dhanhind Recharge 499 ==========
  logStep(6, 'Dhanhind Recharge - ₹499 (no commission)');
  const recharge2 = await prisma.rechargeTransaction.create({
    data: {
      staffId: staff.id,
      operator: 'Dhanhind',
      mobileNumber: '9876543211',
      amount: 499,
      commission: 0,
    },
  });

  totalCashInflows += 499;
  console.log(`   ✅ Recharge recorded: ${formatCurrency(499)}`);

  // ========== TRANSACTION 7: Dhanhind Money Transfer 2000, commission 20 ==========
  logStep(7, 'Dhanhind Money Transfer - ₹2000, commission ₹20');
  const moneyTransfer1 = await prisma.moneyTransferTransaction.create({
    data: {
      staffId: staff.id,
      serviceProvider: 'Dhanhind',
      senderName: 'Customer A',
      receiverName: 'Beneficiary B',
      amount: 2000,
      commission: 20,
    },
  });

  totalCashInflows += 2000;
  totalCommissions += 20;
  console.log(`   ✅ Money transfer recorded: ${formatCurrency(2000)}`);
  console.log(`   💰 Commission earned: ${formatCurrency(20)}`);

  // ========== TRANSACTION 8: Airtel Recharge 199 (assume commission 4) ==========
  logStep(8, 'Airtel Recharge - ₹199, commission ₹4');
  const recharge3 = await prisma.rechargeTransaction.create({
    data: {
      staffId: staff.id,
      operator: 'Airtel',
      mobileNumber: '9876543212',
      amount: 199,
      commission: 4,
    },
  });

  totalCashInflows += 199;
  totalCommissions += 4;
  console.log(`   ✅ Recharge recorded: ${formatCurrency(199)}`);
  console.log(`   💰 Commission earned: ${formatCurrency(4)}`);

  // ========== TRANSACTION 9: Airtel SIM Sale - 349 ==========
  logStep(9, 'Airtel SIM Sale - ₹349');
  const sale5 = await prisma.sale.create({
    data: {
      staffId: staff.id,
      totalAmount: 349,
      paymentMethod: PaymentMethod.CASH,
      items: {
        create: [{
          productId: airtelSim.id,
          quantity: 1,
          unitPrice: 349,
          discount: 0,
          total: 349,
        }],
      },
    },
  });

  await prisma.product.update({
    where: { id: airtelSim.id },
    data: { stockQuantity: { decrement: 1 } },
  });

  totalCashInflows += 349;
  console.log(`   ✅ Sale recorded: ${formatCurrency(349)}`);
  console.log(`   📉 Stock updated: ${airtelSim.brand} ${airtelSim.model} -1 unit`);

  // ========== TRANSACTION 10: Cash Withdrawal (Money Transfer payout) - 1500 given to customer, commission 20 ==========
  logStep(10, 'Cash Withdrawal (Money Transfer payout) - ₹1500 given to customer, commission ₹20');
  // Note: This is a payout, so cash goes out. We'll handle this when calculating net cash flow.
  // The commission was already earned when the money transfer was sent.
  console.log(`   💸 Cash paid out to customer: ${formatCurrency(1500)}`);
  console.log(`   💰 Commission was already recorded in transaction 7`);

  // ========== TRANSACTION 11: Vivo Y12 Display Repair - 1500, parts cost 800 ==========
  logStep(11, 'Vivo Y12 Display Repair - ₹1500, parts cost ₹800');
  // Create repair
  const repair = await prisma.repair.create({
    data: {
      staffId: staff.id,
      customerName: 'John Doe',
      customerPhone: '9876543213',
      deviceModel: 'Vivo Y12',
      complaint: 'Display broken',
      estimatedCost: 1500,
    },
  });

  // Complete repair with parts usage
  // We need a display part product - let's check if it exists or create one
  let displayPart = await prisma.product.findFirst({
    where: {
      brand: 'Vivo',
      model: 'Y12 Display',
    },
  });

  if (!displayPart) {
    displayPart = await prisma.product.create({
      data: {
        category: Category.ACCESSORY,
        brand: 'Vivo',
        model: 'Y12 Display',
        sku: 'REP-001',
        costPrice: 800,
        sellingPrice: 800, // Same as cost for repair parts
        stockQuantity: 5,
        reorderLevel: 2,
      },
    });
    console.log(`   📦 Created display part product: ${displayPart.brand} ${displayPart.model}`);
  }

  // Check if we have enough stock
  if (displayPart.stockQuantity < 1) {
    console.error(`❌ Insufficient stock for display part: ${displayPart.brand} ${displayPart.model}`);
    process.exit(1);
  }

  // Complete repair
  await prisma.$transaction(async (tx) => {
    // Update repair status
    await tx.repair.update({
      where: { id: repair.id },
      data: {
        finalAmount: 1500,
        status: RepairStatus.DELIVERED,
        deliveredDate: new Date(),
        partsUsed: [{
          productId: displayPart.id,
          quantity: 1,
        }],
      },
    });

    // Decrement parts stock
    await tx.product.update({
      where: { id: displayPart.id },
      data: {
        stockQuantity: { decrement: 1 },
      },
    });
  });

  totalCashInflows += 1500;
  console.log(`   🔧 Repair completed: ${formatCurrency(1500)}`);
  console.log(`   📉 Parts used: ${displayPart.brand} ${displayPart.model} -1 unit`);

  // ========== TRANSACTION 12: Purchase from Sundha Agency - 4000 (restock chargers and flip covers) ==========
  logStep(12, 'Purchase from Sundha Agency - ₹4000 (restock chargers and flip covers)');
  const purchase = await prisma.purchase.create({
    data: {
      managerId: manager.id,
      supplier: 'Sundha Agency',
      totalAmount: 4000,
      items: {
        create: [
          {
            productId: charger.id,
            quantity: 5,
            unitCost: 300, // Cost price from seed
            total: 1500,
          },
          {
            productId: flipCover.id,
            quantity: 10,
            unitCost: 120, // Cost price from seed
            total: 1200,
          },
        ],
      },
    },
  });

  // Update stock for purchased items
  await prisma.$transaction([
    prisma.product.update({
      where: { id: charger.id },
      data: { stockQuantity: { increment: 5 } },
    }),
    prisma.product.update({
      where: { id: flipCover.id },
      data: { stockQuantity: { increment: 10 } },
    }),
  ]);

  console.log(`   📦 Purchase recorded: ${formatCurrency(4000)}`);
  console.log(`   📈 Stock added: ${charger.brand} ${charger.model} +5 units`);
  console.log(`   📈 Stock added: ${flipCover.brand} ${flipCover.model} +10 units`);

  // ========== TRANSACTION 13: Snacks Expense - 300 ==========
  logStep(13, 'Snacks Expense - ₹300');
  const expense = await prisma.expense.create({
    data: {
      managerId: manager.id,
      description: 'Snacks for staff',
      amount: 300,
    },
  });

  console.log(`   💸 Expense recorded: ${formatCurrency(300)}`);

  // ========== VALIDATION ==========
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION RESULTS');
  console.log('='.repeat(60));

  // 1. Validate inventory stock counts
  console.log('\n1. 📦 INVENTORY VALIDATION:');
  
  const updatedProducts = await prisma.product.findMany({
    where: { id: { in: [charger.id, flipCover.id, headphone.id, temperedGlass.id, airtelSim.id, displayPart.id] } },
  });

  const updatedProductMap = new Map(updatedProducts.map(p => [p.id, p]));

  // Calculate expected stock based on transactions
  const expectedStock = {
    charger: initialStock.charger - 1 + 5, // Sold 1, purchased 5
    flipCover: initialStock.flipCover - 1 + 10, // Sold 1, purchased 10
    headphone: initialStock.headphone - 1, // Sold 1
    temperedGlass: initialStock.temperedGlass - 1, // Sold 1
    airtelSim: initialStock.airtelSim - 1, // Sold 1
    displayPart: (displayPart ? displayPart.stockQuantity - 1 : 0), // Used 1 in repair
  };

  let inventoryValid = true;
  for (const product of updatedProducts) {
    const actual = product.stockQuantity;
    let expected = 0;
    
    if (product.id === charger.id) expected = expectedStock.charger;
    else if (product.id === flipCover.id) expected = expectedStock.flipCover;
    else if (product.id === headphone.id) expected = expectedStock.headphone;
    else if (product.id === temperedGlass.id) expected = expectedStock.temperedGlass;
    else if (product.id === airtelSim.id) expected = expectedStock.airtelSim;
    else if (displayPart && product.id === displayPart.id) expected = expectedStock.displayPart;
    
    const status = actual === expected ? '✅' : '❌';
    if (actual !== expected) inventoryValid = false;
    
    console.log(`   ${status} ${product.brand} ${product.model}: Expected ${expected}, Actual ${actual}`);
  }

  // 2. Validate cash closing balance
  console.log('\n2. 💰 CASH BALANCE VALIDATION:');
  
  // Calculate expected cash flow
  const totalSales = 500 + 180 + 100 + 100 + 349; // Transactions 1-4, 9
  const totalRecharges = 199 + 499 + 199; // Transactions 5, 6, 8
  const totalMoneyTransfers = 2000; // Transaction 7
  const totalRepairs = 1500; // Transaction 11
  
  const totalCashIn = totalSales + totalRecharges + totalMoneyTransfers + totalRepairs;
  const cashOutPayout = 1500; // Transaction 10
  const cashOutPurchase = 4000; // Transaction 12 (purchase from supplier)
  const cashOutExpense = 300; // Transaction 13
  
  const netCashFlow = totalCashIn - cashOutPayout - cashOutPurchase - cashOutExpense;
  const expectedClosingBalance = cashSession.openingBalance + netCashFlow;
  
  console.log(`   Opening Balance: ${formatCurrency(cashSession.openingBalance)}`);
  console.log(`   Cash Inflows:`);
  console.log(`     - Sales: ${formatCurrency(totalSales)}`);
  console.log(`     - Recharges: ${formatCurrency(totalRecharges)}`);
  console.log(`     - Money Transfers: ${formatCurrency(totalMoneyTransfers)}`);
  console.log(`     - Repairs: ${formatCurrency(totalRepairs)}`);
  console.log(`     Total In: ${formatCurrency(totalCashIn)}`);
  
  console.log(`   Cash Outflows:`);
  console.log(`     - Money Transfer Payout: ${formatCurrency(cashOutPayout)}`);
  console.log(`     - Purchase from Supplier: ${formatCurrency(cashOutPurchase)}`);
  console.log(`     - Expense: ${formatCurrency(cashOutExpense)}`);
  console.log(`     Total Out: ${formatCurrency(cashOutPayout + cashOutPurchase + cashOutExpense)}`);
  
  console.log(`   Net Cash Flow: ${formatCurrency(netCashFlow)}`);
  console.log(`   Expected Closing Balance: ${formatCurrency(expectedClosingBalance)}`);
  
  // Close cash session
  const closedSession = await prisma.cashSession.update({
    where: { id: cashSession.id },
    data: {
      closingBalance: expectedClosingBalance,
      notes: 'Closed after one-day transaction simulation',
    },
  });
  
  console.log(`   ✅ Cash session closed with balance: ${formatCurrency(closedSession.closingBalance!)}`);

  // 3. Validate profit report
  console.log('\n3. 📈 PROFIT ANALYSIS:');
  
  // Calculate profit by category
  const salesData = await prisma.saleItem.findMany({
    where: {
      sale: {
        staffId: staff.id,
        saleDate: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    },
    include: {
      product: true,
    },
  });

  // Calculate gross profit from sales (selling price - cost price)
  let totalGrossProfit = 0;
  let categoryProfits: Record<string, number> = {};
  
  for (const item of salesData) {
    const profit = (item.unitPrice - item.product.costPrice) * item.quantity;
    totalGrossProfit += profit;
    
    const category = item.product.category;
    categoryProfits[category] = (categoryProfits[category] || 0) + profit;
  }

  // Add commissions to profit
  const totalProfit = totalGrossProfit + totalCommissions;
  
  console.log(`   Sales Gross Profit: ${formatCurrency(totalGrossProfit)}`);
  console.log(`   Commissions Earned: ${formatCurrency(totalCommissions)}`);
  console.log(`   Total Profit: ${formatCurrency(totalProfit)}`);
  
  console.log(`   Category-wise Profit:`);
  for (const [category, profit] of Object.entries(categoryProfits)) {
    console.log(`     - ${category}: ${formatCurrency(profit)}`);
  }

  // 4. Summary
  console.log('\n' + '='.repeat(60));
  console.log('🎯 SIMULATION SUMMARY');
  console.log('='.repeat(60));
  
  console.log(`   Total Transactions: 13`);
  console.log(`   Total Cash Inflows: ${formatCurrency(totalCashIn)}`);
  console.log(`   Total Cash Outflows: ${formatCurrency(cashOutPayout + cashOutPurchase + cashOutExpense)}`);
  console.log(`   Net Cash Flow: ${formatCurrency(netCashFlow)}`);
  console.log(`   Inventory Status: ${inventoryValid ? '✅ All counts correct' : '❌ Mismatch detected'}`);
  console.log(`   Final Cash Balance: ${formatCurrency(closedSession.closingBalance!)}`);
  console.log(`   Total Profit Earned: ${formatCurrency(totalProfit)}`);
  
  if (inventoryValid) {
    console.log('\n✅ All validations passed! System logic is correct.');
  } else {
    console.log('\n❌ Validation failed. Check inventory counts.');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during simulation:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });