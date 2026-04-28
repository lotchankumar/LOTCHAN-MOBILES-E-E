# One-Day Transaction Simulation Test

This test script simulates the exact one-day transactions provided and validates the system logic.

## Files Created

1. **`test-transactions.ts`** - Main TypeScript simulation script
2. **`test-transactions.js`** - JavaScript wrapper to run the TypeScript script
3. **`TEST_INSTRUCTIONS.md`** - This file

## Transactions Simulated

The script executes the following 13 transactions in order:

1. **Sale**: Seven Colors 45W Type-C Charger - ₹500
2. **Sale**: Flip Cover - ₹180
3. **Sale**: Basic Headphone - ₹100
4. **Sale**: Tempered Glass - ₹100
5. **Dhanhind Recharge** - ₹199 (no commission)
6. **Dhanhind Recharge** - ₹499 (no commission)
7. **Dhanhind Money Transfer** - ₹2000, commission ₹20
8. **Airtel Recharge** - ₹199, commission ₹4
9. **Airtel SIM Sale** - ₹349
10. **Cash Withdrawal (Money Transfer payout)** - ₹1500 given to customer, commission already earned
11. **Vivo Y12 Display Repair** - ₹1500, parts cost ₹800
12. **Purchase from Sundha Agency** - ₹4000 (restock chargers and flip covers)
13. **Snacks Expense** - ₹300

## Validations Performed

After executing all transactions, the script validates:

### 1. 📦 Inventory Stock Counts
- Verifies stock levels for all products after sales, purchases, and parts usage
- Compares expected vs. actual stock quantities

### 2. 💰 Cash Closing Balance
- Calculates net cash flow (inflows - outflows)
- Validates expected closing balance based on opening balance + net cash flow
- Closes the cash session with calculated balance

### 3. 📈 Profit Report
- Calculates gross profit from sales (selling price - cost price)
- Adds commissions from recharges and money transfers
- Shows category-wise profit breakdown

## How to Run

### Prerequisites
1. PostgreSQL database running on `localhost:5432` (or update DATABASE_URL in `.env`)
2. Database schema migrated (run `npm run prisma:migrate`)
3. Seed data created (run `npm run prisma:seed`)

### Steps

```bash
cd backend

# 1. Install dependencies (if not already)
npm install

# 2. Generate Prisma client
npm run prisma:generate

# 3. Run migrations (if not already done)
npm run prisma:migrate

# 4. Seed the database with initial data
npm run prisma:seed

# 5. Run the transaction simulation
node test-transactions.js
```

Or run directly with ts-node:
```bash
npx ts-node --transpile-only test-transactions.ts
```

## Expected Output

The script will output:

1. **Initial inventory** - Stock levels before transactions
2. **Transaction steps** - Each of the 13 transactions with details
3. **Validation results** - Inventory, cash balance, and profit validation
4. **Simulation summary** - Final totals and validation status

## System Logic Verification

The test verifies that:

1. **Inventory management** works correctly:
   - Stock decreases when products are sold
   - Stock increases when products are purchased
   - Parts usage in repairs reduces stock

2. **Cash flow tracking** is accurate:
   - Sales, recharges, money transfers, and repairs add cash
   - Payouts, purchases, and expenses reduce cash
   - Closing balance matches calculations

3. **Profit calculation** is correct:
   - Gross profit = selling price - cost price
   - Commissions add to profit
   - Category-wise profit breakdown

## Alternative: Postman Collection

If you prefer API testing, you can create a Postman collection with these 13 API calls:

1. `POST /api/sales` - For each sale (transactions 1-4, 9)
2. `POST /api/recharges` - For recharges (transactions 5, 6, 8)
3. `POST /api/money-transfers` - For money transfer (transaction 7)
4. `POST /api/repairs` + `PUT /api/repairs/:id/complete` - For repair (transaction 11)
5. `POST /api/purchases` - For purchase (transaction 12)
6. `POST /api/expenses` - For expense (transaction 13)
7. `PUT /api/cash-sessions/close` - To close cash session

Note: You would need valid authentication tokens and proper request bodies.

## Notes

- The script assumes seed data from `prisma/seed.ts` exists
- Cash session opening balance defaults to ₹5000 if none exists
- Display part for Vivo Y12 repair is created if it doesn't exist
- All transactions are dated for "today" (current date)
- The script handles database transactions where appropriate (e.g., repair completion with parts usage)

## Troubleshooting

If you encounter database connection errors:
1. Ensure PostgreSQL is running on `localhost:5432`
2. Check that the database `mobileshop` exists
3. Verify credentials in `.env` file match your PostgreSQL setup

If you encounter Prisma errors:
1. Run `npm run prisma:generate` to regenerate client
2. Run `npm run prisma:migrate` to apply migrations
3. Check that `prisma/schema.prisma` matches the expected schema