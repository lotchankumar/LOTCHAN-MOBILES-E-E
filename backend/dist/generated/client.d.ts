import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Product
 *
 */
export type Product = Prisma.ProductModel;
/**
 * Model Sale
 *
 */
export type Sale = Prisma.SaleModel;
/**
 * Model SaleItem
 *
 */
export type SaleItem = Prisma.SaleItemModel;
/**
 * Model Repair
 *
 */
export type Repair = Prisma.RepairModel;
/**
 * Model RechargeTransaction
 *
 */
export type RechargeTransaction = Prisma.RechargeTransactionModel;
/**
 * Model MoneyTransferTransaction
 *
 */
export type MoneyTransferTransaction = Prisma.MoneyTransferTransactionModel;
/**
 * Model CashSession
 *
 */
export type CashSession = Prisma.CashSessionModel;
/**
 * Model Purchase
 *
 */
export type Purchase = Prisma.PurchaseModel;
/**
 * Model PurchaseItem
 *
 */
export type PurchaseItem = Prisma.PurchaseItemModel;
/**
 * Model MTDeposit
 *
 */
export type MTDeposit = Prisma.MTDepositModel;
/**
 * Model Expense
 *
 */
export type Expense = Prisma.ExpenseModel;
//# sourceMappingURL=client.d.ts.map