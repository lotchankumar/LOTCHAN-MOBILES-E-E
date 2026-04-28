import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.7.0
 * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
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
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "product" | "sale" | "saleItem" | "repair" | "rechargeTransaction" | "moneyTransferTransaction" | "cashSession" | "purchase" | "purchaseItem" | "mTDeposit" | "expense";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Product: {
            payload: Prisma.$ProductPayload<ExtArgs>;
            fields: Prisma.ProductFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findMany: {
                    args: Prisma.ProductFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                create: {
                    args: Prisma.ProductCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                createMany: {
                    args: Prisma.ProductCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                delete: {
                    args: Prisma.ProductDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                update: {
                    args: Prisma.ProductUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                upsert: {
                    args: Prisma.ProductUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                aggregate: {
                    args: Prisma.ProductAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProduct>;
                };
                groupBy: {
                    args: Prisma.ProductGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductCountAggregateOutputType> | number;
                };
            };
        };
        Sale: {
            payload: Prisma.$SalePayload<ExtArgs>;
            fields: Prisma.SaleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SaleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                findFirst: {
                    args: Prisma.SaleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                findMany: {
                    args: Prisma.SaleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>[];
                };
                create: {
                    args: Prisma.SaleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                createMany: {
                    args: Prisma.SaleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SaleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>[];
                };
                delete: {
                    args: Prisma.SaleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                update: {
                    args: Prisma.SaleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                deleteMany: {
                    args: Prisma.SaleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SaleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SaleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>[];
                };
                upsert: {
                    args: Prisma.SaleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalePayload>;
                };
                aggregate: {
                    args: Prisma.SaleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSale>;
                };
                groupBy: {
                    args: Prisma.SaleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SaleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleCountAggregateOutputType> | number;
                };
            };
        };
        SaleItem: {
            payload: Prisma.$SaleItemPayload<ExtArgs>;
            fields: Prisma.SaleItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SaleItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SaleItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload>;
                };
                findFirst: {
                    args: Prisma.SaleItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SaleItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload>;
                };
                findMany: {
                    args: Prisma.SaleItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload>[];
                };
                create: {
                    args: Prisma.SaleItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload>;
                };
                createMany: {
                    args: Prisma.SaleItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SaleItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload>[];
                };
                delete: {
                    args: Prisma.SaleItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload>;
                };
                update: {
                    args: Prisma.SaleItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload>;
                };
                deleteMany: {
                    args: Prisma.SaleItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SaleItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SaleItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload>[];
                };
                upsert: {
                    args: Prisma.SaleItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SaleItemPayload>;
                };
                aggregate: {
                    args: Prisma.SaleItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSaleItem>;
                };
                groupBy: {
                    args: Prisma.SaleItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SaleItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SaleItemCountAggregateOutputType> | number;
                };
            };
        };
        Repair: {
            payload: Prisma.$RepairPayload<ExtArgs>;
            fields: Prisma.RepairFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RepairFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RepairFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload>;
                };
                findFirst: {
                    args: Prisma.RepairFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RepairFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload>;
                };
                findMany: {
                    args: Prisma.RepairFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload>[];
                };
                create: {
                    args: Prisma.RepairCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload>;
                };
                createMany: {
                    args: Prisma.RepairCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RepairCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload>[];
                };
                delete: {
                    args: Prisma.RepairDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload>;
                };
                update: {
                    args: Prisma.RepairUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload>;
                };
                deleteMany: {
                    args: Prisma.RepairDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RepairUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RepairUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload>[];
                };
                upsert: {
                    args: Prisma.RepairUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairPayload>;
                };
                aggregate: {
                    args: Prisma.RepairAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRepair>;
                };
                groupBy: {
                    args: Prisma.RepairGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RepairGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RepairCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RepairCountAggregateOutputType> | number;
                };
            };
        };
        RechargeTransaction: {
            payload: Prisma.$RechargeTransactionPayload<ExtArgs>;
            fields: Prisma.RechargeTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RechargeTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RechargeTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.RechargeTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RechargeTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload>;
                };
                findMany: {
                    args: Prisma.RechargeTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload>[];
                };
                create: {
                    args: Prisma.RechargeTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload>;
                };
                createMany: {
                    args: Prisma.RechargeTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RechargeTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload>[];
                };
                delete: {
                    args: Prisma.RechargeTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload>;
                };
                update: {
                    args: Prisma.RechargeTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.RechargeTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RechargeTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RechargeTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.RechargeTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RechargeTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.RechargeTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRechargeTransaction>;
                };
                groupBy: {
                    args: Prisma.RechargeTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RechargeTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RechargeTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RechargeTransactionCountAggregateOutputType> | number;
                };
            };
        };
        MoneyTransferTransaction: {
            payload: Prisma.$MoneyTransferTransactionPayload<ExtArgs>;
            fields: Prisma.MoneyTransferTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MoneyTransferTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MoneyTransferTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.MoneyTransferTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MoneyTransferTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload>;
                };
                findMany: {
                    args: Prisma.MoneyTransferTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload>[];
                };
                create: {
                    args: Prisma.MoneyTransferTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload>;
                };
                createMany: {
                    args: Prisma.MoneyTransferTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MoneyTransferTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload>[];
                };
                delete: {
                    args: Prisma.MoneyTransferTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload>;
                };
                update: {
                    args: Prisma.MoneyTransferTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.MoneyTransferTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MoneyTransferTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MoneyTransferTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.MoneyTransferTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MoneyTransferTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.MoneyTransferTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMoneyTransferTransaction>;
                };
                groupBy: {
                    args: Prisma.MoneyTransferTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MoneyTransferTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MoneyTransferTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MoneyTransferTransactionCountAggregateOutputType> | number;
                };
            };
        };
        CashSession: {
            payload: Prisma.$CashSessionPayload<ExtArgs>;
            fields: Prisma.CashSessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CashSessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CashSessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload>;
                };
                findFirst: {
                    args: Prisma.CashSessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CashSessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload>;
                };
                findMany: {
                    args: Prisma.CashSessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload>[];
                };
                create: {
                    args: Prisma.CashSessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload>;
                };
                createMany: {
                    args: Prisma.CashSessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CashSessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload>[];
                };
                delete: {
                    args: Prisma.CashSessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload>;
                };
                update: {
                    args: Prisma.CashSessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload>;
                };
                deleteMany: {
                    args: Prisma.CashSessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CashSessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CashSessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload>[];
                };
                upsert: {
                    args: Prisma.CashSessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CashSessionPayload>;
                };
                aggregate: {
                    args: Prisma.CashSessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCashSession>;
                };
                groupBy: {
                    args: Prisma.CashSessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CashSessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CashSessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CashSessionCountAggregateOutputType> | number;
                };
            };
        };
        Purchase: {
            payload: Prisma.$PurchasePayload<ExtArgs>;
            fields: Prisma.PurchaseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload>;
                };
                findMany: {
                    args: Prisma.PurchaseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload>[];
                };
                create: {
                    args: Prisma.PurchaseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload>;
                };
                createMany: {
                    args: Prisma.PurchaseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload>[];
                };
                delete: {
                    args: Prisma.PurchaseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload>;
                };
                update: {
                    args: Prisma.PurchaseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchasePayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchase>;
                };
                groupBy: {
                    args: Prisma.PurchaseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseCountAggregateOutputType> | number;
                };
            };
        };
        PurchaseItem: {
            payload: Prisma.$PurchaseItemPayload<ExtArgs>;
            fields: Prisma.PurchaseItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PurchaseItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PurchaseItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload>;
                };
                findFirst: {
                    args: Prisma.PurchaseItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PurchaseItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload>;
                };
                findMany: {
                    args: Prisma.PurchaseItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload>[];
                };
                create: {
                    args: Prisma.PurchaseItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload>;
                };
                createMany: {
                    args: Prisma.PurchaseItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PurchaseItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload>[];
                };
                delete: {
                    args: Prisma.PurchaseItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload>;
                };
                update: {
                    args: Prisma.PurchaseItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload>;
                };
                deleteMany: {
                    args: Prisma.PurchaseItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PurchaseItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PurchaseItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload>[];
                };
                upsert: {
                    args: Prisma.PurchaseItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PurchaseItemPayload>;
                };
                aggregate: {
                    args: Prisma.PurchaseItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePurchaseItem>;
                };
                groupBy: {
                    args: Prisma.PurchaseItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PurchaseItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PurchaseItemCountAggregateOutputType> | number;
                };
            };
        };
        MTDeposit: {
            payload: Prisma.$MTDepositPayload<ExtArgs>;
            fields: Prisma.MTDepositFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MTDepositFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MTDepositFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload>;
                };
                findFirst: {
                    args: Prisma.MTDepositFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MTDepositFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload>;
                };
                findMany: {
                    args: Prisma.MTDepositFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload>[];
                };
                create: {
                    args: Prisma.MTDepositCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload>;
                };
                createMany: {
                    args: Prisma.MTDepositCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MTDepositCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload>[];
                };
                delete: {
                    args: Prisma.MTDepositDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload>;
                };
                update: {
                    args: Prisma.MTDepositUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload>;
                };
                deleteMany: {
                    args: Prisma.MTDepositDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MTDepositUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MTDepositUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload>[];
                };
                upsert: {
                    args: Prisma.MTDepositUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MTDepositPayload>;
                };
                aggregate: {
                    args: Prisma.MTDepositAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMTDeposit>;
                };
                groupBy: {
                    args: Prisma.MTDepositGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MTDepositGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MTDepositCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MTDepositCountAggregateOutputType> | number;
                };
            };
        };
        Expense: {
            payload: Prisma.$ExpensePayload<ExtArgs>;
            fields: Prisma.ExpenseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExpenseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload>;
                };
                findFirst: {
                    args: Prisma.ExpenseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload>;
                };
                findMany: {
                    args: Prisma.ExpenseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload>[];
                };
                create: {
                    args: Prisma.ExpenseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload>;
                };
                createMany: {
                    args: Prisma.ExpenseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload>[];
                };
                delete: {
                    args: Prisma.ExpenseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload>;
                };
                update: {
                    args: Prisma.ExpenseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload>;
                };
                deleteMany: {
                    args: Prisma.ExpenseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExpenseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExpenseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload>[];
                };
                upsert: {
                    args: Prisma.ExpenseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExpensePayload>;
                };
                aggregate: {
                    args: Prisma.ExpenseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExpense>;
                };
                groupBy: {
                    args: Prisma.ExpenseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExpenseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExpenseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExpenseCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'Role'
 */
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
/**
 * Reference to a field of type 'Role[]'
 */
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Category'
 */
export type EnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category'>;
/**
 * Reference to a field of type 'Category[]'
 */
export type ListEnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'PaymentMethod'
 */
export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>;
/**
 * Reference to a field of type 'PaymentMethod[]'
 */
export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>;
/**
 * Reference to a field of type 'SaleStatus'
 */
export type EnumSaleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SaleStatus'>;
/**
 * Reference to a field of type 'SaleStatus[]'
 */
export type ListEnumSaleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SaleStatus[]'>;
/**
 * Reference to a field of type 'RepairStatus'
 */
export type EnumRepairStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepairStatus'>;
/**
 * Reference to a field of type 'RepairStatus[]'
 */
export type ListEnumRepairStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RepairStatus[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    product?: Prisma.ProductOmit;
    sale?: Prisma.SaleOmit;
    saleItem?: Prisma.SaleItemOmit;
    repair?: Prisma.RepairOmit;
    rechargeTransaction?: Prisma.RechargeTransactionOmit;
    moneyTransferTransaction?: Prisma.MoneyTransferTransactionOmit;
    cashSession?: Prisma.CashSessionOmit;
    purchase?: Prisma.PurchaseOmit;
    purchaseItem?: Prisma.PurchaseItemOmit;
    mTDeposit?: Prisma.MTDepositOmit;
    expense?: Prisma.ExpenseOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map