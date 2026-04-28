import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.product`: Exposes CRUD operations for the **Product** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Products
      * const products = await prisma.product.findMany()
      * ```
      */
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sales
      * const sales = await prisma.sale.findMany()
      * ```
      */
    get sale(): Prisma.SaleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.saleItem`: Exposes CRUD operations for the **SaleItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SaleItems
      * const saleItems = await prisma.saleItem.findMany()
      * ```
      */
    get saleItem(): Prisma.SaleItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.repair`: Exposes CRUD operations for the **Repair** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Repairs
      * const repairs = await prisma.repair.findMany()
      * ```
      */
    get repair(): Prisma.RepairDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.rechargeTransaction`: Exposes CRUD operations for the **RechargeTransaction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RechargeTransactions
      * const rechargeTransactions = await prisma.rechargeTransaction.findMany()
      * ```
      */
    get rechargeTransaction(): Prisma.RechargeTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.moneyTransferTransaction`: Exposes CRUD operations for the **MoneyTransferTransaction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MoneyTransferTransactions
      * const moneyTransferTransactions = await prisma.moneyTransferTransaction.findMany()
      * ```
      */
    get moneyTransferTransaction(): Prisma.MoneyTransferTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cashSession`: Exposes CRUD operations for the **CashSession** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CashSessions
      * const cashSessions = await prisma.cashSession.findMany()
      * ```
      */
    get cashSession(): Prisma.CashSessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.purchase`: Exposes CRUD operations for the **Purchase** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Purchases
      * const purchases = await prisma.purchase.findMany()
      * ```
      */
    get purchase(): Prisma.PurchaseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.purchaseItem`: Exposes CRUD operations for the **PurchaseItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PurchaseItems
      * const purchaseItems = await prisma.purchaseItem.findMany()
      * ```
      */
    get purchaseItem(): Prisma.PurchaseItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.mTDeposit`: Exposes CRUD operations for the **MTDeposit** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MTDeposits
      * const mTDeposits = await prisma.mTDeposit.findMany()
      * ```
      */
    get mTDeposit(): Prisma.MTDepositDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Expenses
      * const expenses = await prisma.expense.findMany()
      * ```
      */
    get expense(): Prisma.ExpenseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map