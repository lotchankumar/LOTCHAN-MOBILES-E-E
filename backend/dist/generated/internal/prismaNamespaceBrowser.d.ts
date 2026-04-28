import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Product: "Product";
    readonly Sale: "Sale";
    readonly SaleItem: "SaleItem";
    readonly Repair: "Repair";
    readonly RechargeTransaction: "RechargeTransaction";
    readonly MoneyTransferTransaction: "MoneyTransferTransaction";
    readonly CashSession: "CashSession";
    readonly Purchase: "Purchase";
    readonly PurchaseItem: "PurchaseItem";
    readonly MTDeposit: "MTDeposit";
    readonly Expense: "Expense";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly category: "category";
    readonly brand: "brand";
    readonly model: "model";
    readonly sku: "sku";
    readonly costPrice: "costPrice";
    readonly sellingPrice: "sellingPrice";
    readonly stockQuantity: "stockQuantity";
    readonly reorderLevel: "reorderLevel";
    readonly createdAt: "createdAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const SaleScalarFieldEnum: {
    readonly id: "id";
    readonly staffId: "staffId";
    readonly saleDate: "saleDate";
    readonly totalAmount: "totalAmount";
    readonly paymentMethod: "paymentMethod";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum];
export declare const SaleItemScalarFieldEnum: {
    readonly id: "id";
    readonly saleId: "saleId";
    readonly productId: "productId";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly discount: "discount";
    readonly total: "total";
};
export type SaleItemScalarFieldEnum = (typeof SaleItemScalarFieldEnum)[keyof typeof SaleItemScalarFieldEnum];
export declare const RepairScalarFieldEnum: {
    readonly id: "id";
    readonly staffId: "staffId";
    readonly customerName: "customerName";
    readonly customerPhone: "customerPhone";
    readonly deviceModel: "deviceModel";
    readonly complaint: "complaint";
    readonly estimatedCost: "estimatedCost";
    readonly finalAmount: "finalAmount";
    readonly status: "status";
    readonly receivedDate: "receivedDate";
    readonly deliveredDate: "deliveredDate";
    readonly partsUsed: "partsUsed";
    readonly createdAt: "createdAt";
};
export type RepairScalarFieldEnum = (typeof RepairScalarFieldEnum)[keyof typeof RepairScalarFieldEnum];
export declare const RechargeTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly staffId: "staffId";
    readonly operator: "operator";
    readonly mobileNumber: "mobileNumber";
    readonly amount: "amount";
    readonly commission: "commission";
    readonly createdAt: "createdAt";
};
export type RechargeTransactionScalarFieldEnum = (typeof RechargeTransactionScalarFieldEnum)[keyof typeof RechargeTransactionScalarFieldEnum];
export declare const MoneyTransferTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly staffId: "staffId";
    readonly serviceProvider: "serviceProvider";
    readonly senderName: "senderName";
    readonly receiverName: "receiverName";
    readonly amount: "amount";
    readonly commission: "commission";
    readonly createdAt: "createdAt";
};
export type MoneyTransferTransactionScalarFieldEnum = (typeof MoneyTransferTransactionScalarFieldEnum)[keyof typeof MoneyTransferTransactionScalarFieldEnum];
export declare const CashSessionScalarFieldEnum: {
    readonly id: "id";
    readonly staffId: "staffId";
    readonly sessionDate: "sessionDate";
    readonly openingBalance: "openingBalance";
    readonly closingBalance: "closingBalance";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type CashSessionScalarFieldEnum = (typeof CashSessionScalarFieldEnum)[keyof typeof CashSessionScalarFieldEnum];
export declare const PurchaseScalarFieldEnum: {
    readonly id: "id";
    readonly managerId: "managerId";
    readonly supplier: "supplier";
    readonly invoiceNo: "invoiceNo";
    readonly purchaseDate: "purchaseDate";
    readonly totalAmount: "totalAmount";
    readonly createdAt: "createdAt";
};
export type PurchaseScalarFieldEnum = (typeof PurchaseScalarFieldEnum)[keyof typeof PurchaseScalarFieldEnum];
export declare const PurchaseItemScalarFieldEnum: {
    readonly id: "id";
    readonly purchaseId: "purchaseId";
    readonly productId: "productId";
    readonly quantity: "quantity";
    readonly unitCost: "unitCost";
    readonly total: "total";
};
export type PurchaseItemScalarFieldEnum = (typeof PurchaseItemScalarFieldEnum)[keyof typeof PurchaseItemScalarFieldEnum];
export declare const MTDepositScalarFieldEnum: {
    readonly id: "id";
    readonly managerId: "managerId";
    readonly provider: "provider";
    readonly amount: "amount";
    readonly reference: "reference";
    readonly depositDate: "depositDate";
    readonly createdAt: "createdAt";
};
export type MTDepositScalarFieldEnum = (typeof MTDepositScalarFieldEnum)[keyof typeof MTDepositScalarFieldEnum];
export declare const ExpenseScalarFieldEnum: {
    readonly id: "id";
    readonly managerId: "managerId";
    readonly description: "description";
    readonly amount: "amount";
    readonly expenseDate: "expenseDate";
    readonly createdAt: "createdAt";
};
export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map