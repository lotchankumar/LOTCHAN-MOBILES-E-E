import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    passwordHash: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    passwordHash: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    passwordHash: number;
    role: number;
    createdAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    passwordHash?: true;
    role?: true;
    createdAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    passwordHash?: true;
    role?: true;
    createdAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    passwordHash?: true;
    role?: true;
    createdAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: $Enums.Role;
    createdAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    salesAsStaff?: Prisma.SaleListRelationFilter;
    repairs?: Prisma.RepairListRelationFilter;
    rechargeTransactions?: Prisma.RechargeTransactionListRelationFilter;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionListRelationFilter;
    cashSessions?: Prisma.CashSessionListRelationFilter;
    purchasesAsManager?: Prisma.PurchaseListRelationFilter;
    mtDeposits?: Prisma.MTDepositListRelationFilter;
    expenses?: Prisma.ExpenseListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    salesAsStaff?: Prisma.SaleOrderByRelationAggregateInput;
    repairs?: Prisma.RepairOrderByRelationAggregateInput;
    rechargeTransactions?: Prisma.RechargeTransactionOrderByRelationAggregateInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionOrderByRelationAggregateInput;
    cashSessions?: Prisma.CashSessionOrderByRelationAggregateInput;
    purchasesAsManager?: Prisma.PurchaseOrderByRelationAggregateInput;
    mtDeposits?: Prisma.MTDepositOrderByRelationAggregateInput;
    expenses?: Prisma.ExpenseOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    name?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    salesAsStaff?: Prisma.SaleListRelationFilter;
    repairs?: Prisma.RepairListRelationFilter;
    rechargeTransactions?: Prisma.RechargeTransactionListRelationFilter;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionListRelationFilter;
    cashSessions?: Prisma.CashSessionListRelationFilter;
    purchasesAsManager?: Prisma.PurchaseListRelationFilter;
    mtDeposits?: Prisma.MTDepositListRelationFilter;
    expenses?: Prisma.ExpenseListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumRoleWithAggregatesFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutManagerInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleUncheckedCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairUncheckedCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionUncheckedCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositUncheckedCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutManagerInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUpdateManyWithoutManagerNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUncheckedUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUncheckedUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUncheckedUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUncheckedUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutManagerNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutSalesAsStaffInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSalesAsStaffInput, Prisma.UserUncheckedCreateWithoutSalesAsStaffInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSalesAsStaffInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSalesAsStaffNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSalesAsStaffInput, Prisma.UserUncheckedCreateWithoutSalesAsStaffInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSalesAsStaffInput;
    upsert?: Prisma.UserUpsertWithoutSalesAsStaffInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSalesAsStaffInput, Prisma.UserUpdateWithoutSalesAsStaffInput>, Prisma.UserUncheckedUpdateWithoutSalesAsStaffInput>;
};
export type UserCreateNestedOneWithoutRepairsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRepairsInput, Prisma.UserUncheckedCreateWithoutRepairsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRepairsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRepairsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRepairsInput, Prisma.UserUncheckedCreateWithoutRepairsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRepairsInput;
    upsert?: Prisma.UserUpsertWithoutRepairsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRepairsInput, Prisma.UserUpdateWithoutRepairsInput>, Prisma.UserUncheckedUpdateWithoutRepairsInput>;
};
export type UserCreateNestedOneWithoutRechargeTransactionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRechargeTransactionsInput, Prisma.UserUncheckedCreateWithoutRechargeTransactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRechargeTransactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRechargeTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRechargeTransactionsInput, Prisma.UserUncheckedCreateWithoutRechargeTransactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRechargeTransactionsInput;
    upsert?: Prisma.UserUpsertWithoutRechargeTransactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRechargeTransactionsInput, Prisma.UserUpdateWithoutRechargeTransactionsInput>, Prisma.UserUncheckedUpdateWithoutRechargeTransactionsInput>;
};
export type UserCreateNestedOneWithoutMoneyTransferTransactionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMoneyTransferTransactionsInput, Prisma.UserUncheckedCreateWithoutMoneyTransferTransactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMoneyTransferTransactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutMoneyTransferTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMoneyTransferTransactionsInput, Prisma.UserUncheckedCreateWithoutMoneyTransferTransactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMoneyTransferTransactionsInput;
    upsert?: Prisma.UserUpsertWithoutMoneyTransferTransactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutMoneyTransferTransactionsInput, Prisma.UserUpdateWithoutMoneyTransferTransactionsInput>, Prisma.UserUncheckedUpdateWithoutMoneyTransferTransactionsInput>;
};
export type UserCreateNestedOneWithoutCashSessionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCashSessionsInput, Prisma.UserUncheckedCreateWithoutCashSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCashSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCashSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCashSessionsInput, Prisma.UserUncheckedCreateWithoutCashSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCashSessionsInput;
    upsert?: Prisma.UserUpsertWithoutCashSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCashSessionsInput, Prisma.UserUpdateWithoutCashSessionsInput>, Prisma.UserUncheckedUpdateWithoutCashSessionsInput>;
};
export type UserCreateNestedOneWithoutPurchasesAsManagerInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPurchasesAsManagerInput, Prisma.UserUncheckedCreateWithoutPurchasesAsManagerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPurchasesAsManagerInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPurchasesAsManagerNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPurchasesAsManagerInput, Prisma.UserUncheckedCreateWithoutPurchasesAsManagerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPurchasesAsManagerInput;
    upsert?: Prisma.UserUpsertWithoutPurchasesAsManagerInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPurchasesAsManagerInput, Prisma.UserUpdateWithoutPurchasesAsManagerInput>, Prisma.UserUncheckedUpdateWithoutPurchasesAsManagerInput>;
};
export type UserCreateNestedOneWithoutMtDepositsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMtDepositsInput, Prisma.UserUncheckedCreateWithoutMtDepositsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMtDepositsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutMtDepositsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMtDepositsInput, Prisma.UserUncheckedCreateWithoutMtDepositsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMtDepositsInput;
    upsert?: Prisma.UserUpsertWithoutMtDepositsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutMtDepositsInput, Prisma.UserUpdateWithoutMtDepositsInput>, Prisma.UserUncheckedUpdateWithoutMtDepositsInput>;
};
export type UserCreateNestedOneWithoutExpensesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExpensesInput, Prisma.UserUncheckedCreateWithoutExpensesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExpensesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExpensesInput, Prisma.UserUncheckedCreateWithoutExpensesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExpensesInput;
    upsert?: Prisma.UserUpsertWithoutExpensesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutExpensesInput, Prisma.UserUpdateWithoutExpensesInput>, Prisma.UserUncheckedUpdateWithoutExpensesInput>;
};
export type UserCreateWithoutSalesAsStaffInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    repairs?: Prisma.RepairCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutManagerInput;
};
export type UserUncheckedCreateWithoutSalesAsStaffInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    repairs?: Prisma.RepairUncheckedCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionUncheckedCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositUncheckedCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutManagerInput;
};
export type UserCreateOrConnectWithoutSalesAsStaffInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSalesAsStaffInput, Prisma.UserUncheckedCreateWithoutSalesAsStaffInput>;
};
export type UserUpsertWithoutSalesAsStaffInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSalesAsStaffInput, Prisma.UserUncheckedUpdateWithoutSalesAsStaffInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSalesAsStaffInput, Prisma.UserUncheckedCreateWithoutSalesAsStaffInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSalesAsStaffInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSalesAsStaffInput, Prisma.UserUncheckedUpdateWithoutSalesAsStaffInput>;
};
export type UserUpdateWithoutSalesAsStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    repairs?: Prisma.RepairUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUpdateManyWithoutManagerNestedInput;
};
export type UserUncheckedUpdateWithoutSalesAsStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    repairs?: Prisma.RepairUncheckedUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUncheckedUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUncheckedUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutManagerNestedInput;
};
export type UserCreateWithoutRepairsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutManagerInput;
};
export type UserUncheckedCreateWithoutRepairsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleUncheckedCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionUncheckedCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositUncheckedCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutManagerInput;
};
export type UserCreateOrConnectWithoutRepairsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRepairsInput, Prisma.UserUncheckedCreateWithoutRepairsInput>;
};
export type UserUpsertWithoutRepairsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRepairsInput, Prisma.UserUncheckedUpdateWithoutRepairsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRepairsInput, Prisma.UserUncheckedCreateWithoutRepairsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRepairsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRepairsInput, Prisma.UserUncheckedUpdateWithoutRepairsInput>;
};
export type UserUpdateWithoutRepairsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUpdateManyWithoutManagerNestedInput;
};
export type UserUncheckedUpdateWithoutRepairsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUncheckedUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUncheckedUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUncheckedUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutManagerNestedInput;
};
export type UserCreateWithoutRechargeTransactionsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutManagerInput;
};
export type UserUncheckedCreateWithoutRechargeTransactionsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleUncheckedCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairUncheckedCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionUncheckedCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositUncheckedCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutManagerInput;
};
export type UserCreateOrConnectWithoutRechargeTransactionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRechargeTransactionsInput, Prisma.UserUncheckedCreateWithoutRechargeTransactionsInput>;
};
export type UserUpsertWithoutRechargeTransactionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRechargeTransactionsInput, Prisma.UserUncheckedUpdateWithoutRechargeTransactionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRechargeTransactionsInput, Prisma.UserUncheckedCreateWithoutRechargeTransactionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRechargeTransactionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRechargeTransactionsInput, Prisma.UserUncheckedUpdateWithoutRechargeTransactionsInput>;
};
export type UserUpdateWithoutRechargeTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUpdateManyWithoutManagerNestedInput;
};
export type UserUncheckedUpdateWithoutRechargeTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUncheckedUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUncheckedUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUncheckedUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUncheckedUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutManagerNestedInput;
};
export type UserCreateWithoutMoneyTransferTransactionsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutManagerInput;
};
export type UserUncheckedCreateWithoutMoneyTransferTransactionsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleUncheckedCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairUncheckedCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionUncheckedCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositUncheckedCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutManagerInput;
};
export type UserCreateOrConnectWithoutMoneyTransferTransactionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutMoneyTransferTransactionsInput, Prisma.UserUncheckedCreateWithoutMoneyTransferTransactionsInput>;
};
export type UserUpsertWithoutMoneyTransferTransactionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutMoneyTransferTransactionsInput, Prisma.UserUncheckedUpdateWithoutMoneyTransferTransactionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutMoneyTransferTransactionsInput, Prisma.UserUncheckedCreateWithoutMoneyTransferTransactionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutMoneyTransferTransactionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutMoneyTransferTransactionsInput, Prisma.UserUncheckedUpdateWithoutMoneyTransferTransactionsInput>;
};
export type UserUpdateWithoutMoneyTransferTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUpdateManyWithoutManagerNestedInput;
};
export type UserUncheckedUpdateWithoutMoneyTransferTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUncheckedUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUncheckedUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUncheckedUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUncheckedUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutManagerNestedInput;
};
export type UserCreateWithoutCashSessionsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutManagerInput;
};
export type UserUncheckedCreateWithoutCashSessionsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleUncheckedCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairUncheckedCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositUncheckedCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutManagerInput;
};
export type UserCreateOrConnectWithoutCashSessionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCashSessionsInput, Prisma.UserUncheckedCreateWithoutCashSessionsInput>;
};
export type UserUpsertWithoutCashSessionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCashSessionsInput, Prisma.UserUncheckedUpdateWithoutCashSessionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCashSessionsInput, Prisma.UserUncheckedCreateWithoutCashSessionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCashSessionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCashSessionsInput, Prisma.UserUncheckedUpdateWithoutCashSessionsInput>;
};
export type UserUpdateWithoutCashSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUpdateManyWithoutManagerNestedInput;
};
export type UserUncheckedUpdateWithoutCashSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUncheckedUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUncheckedUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUncheckedUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutManagerNestedInput;
};
export type UserCreateWithoutPurchasesAsManagerInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionCreateNestedManyWithoutStaffInput;
    mtDeposits?: Prisma.MTDepositCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutManagerInput;
};
export type UserUncheckedCreateWithoutPurchasesAsManagerInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleUncheckedCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairUncheckedCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionUncheckedCreateNestedManyWithoutStaffInput;
    mtDeposits?: Prisma.MTDepositUncheckedCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutManagerInput;
};
export type UserCreateOrConnectWithoutPurchasesAsManagerInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPurchasesAsManagerInput, Prisma.UserUncheckedCreateWithoutPurchasesAsManagerInput>;
};
export type UserUpsertWithoutPurchasesAsManagerInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPurchasesAsManagerInput, Prisma.UserUncheckedUpdateWithoutPurchasesAsManagerInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPurchasesAsManagerInput, Prisma.UserUncheckedCreateWithoutPurchasesAsManagerInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPurchasesAsManagerInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPurchasesAsManagerInput, Prisma.UserUncheckedUpdateWithoutPurchasesAsManagerInput>;
};
export type UserUpdateWithoutPurchasesAsManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUpdateManyWithoutStaffNestedInput;
    mtDeposits?: Prisma.MTDepositUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUpdateManyWithoutManagerNestedInput;
};
export type UserUncheckedUpdateWithoutPurchasesAsManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUncheckedUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUncheckedUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUncheckedUpdateManyWithoutStaffNestedInput;
    mtDeposits?: Prisma.MTDepositUncheckedUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutManagerNestedInput;
};
export type UserCreateWithoutMtDepositsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseCreateNestedManyWithoutManagerInput;
};
export type UserUncheckedCreateWithoutMtDepositsInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleUncheckedCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairUncheckedCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionUncheckedCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedCreateNestedManyWithoutManagerInput;
    expenses?: Prisma.ExpenseUncheckedCreateNestedManyWithoutManagerInput;
};
export type UserCreateOrConnectWithoutMtDepositsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutMtDepositsInput, Prisma.UserUncheckedCreateWithoutMtDepositsInput>;
};
export type UserUpsertWithoutMtDepositsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutMtDepositsInput, Prisma.UserUncheckedUpdateWithoutMtDepositsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutMtDepositsInput, Prisma.UserUncheckedCreateWithoutMtDepositsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutMtDepositsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutMtDepositsInput, Prisma.UserUncheckedUpdateWithoutMtDepositsInput>;
};
export type UserUpdateWithoutMtDepositsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUpdateManyWithoutManagerNestedInput;
};
export type UserUncheckedUpdateWithoutMtDepositsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUncheckedUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUncheckedUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUncheckedUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedUpdateManyWithoutManagerNestedInput;
    expenses?: Prisma.ExpenseUncheckedUpdateManyWithoutManagerNestedInput;
};
export type UserCreateWithoutExpensesInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositCreateNestedManyWithoutManagerInput;
};
export type UserUncheckedCreateWithoutExpensesInput = {
    id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    salesAsStaff?: Prisma.SaleUncheckedCreateNestedManyWithoutStaffInput;
    repairs?: Prisma.RepairUncheckedCreateNestedManyWithoutStaffInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedCreateNestedManyWithoutStaffInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedCreateNestedManyWithoutStaffInput;
    cashSessions?: Prisma.CashSessionUncheckedCreateNestedManyWithoutStaffInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedCreateNestedManyWithoutManagerInput;
    mtDeposits?: Prisma.MTDepositUncheckedCreateNestedManyWithoutManagerInput;
};
export type UserCreateOrConnectWithoutExpensesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutExpensesInput, Prisma.UserUncheckedCreateWithoutExpensesInput>;
};
export type UserUpsertWithoutExpensesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutExpensesInput, Prisma.UserUncheckedUpdateWithoutExpensesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutExpensesInput, Prisma.UserUncheckedCreateWithoutExpensesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutExpensesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutExpensesInput, Prisma.UserUncheckedUpdateWithoutExpensesInput>;
};
export type UserUpdateWithoutExpensesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUpdateManyWithoutManagerNestedInput;
};
export type UserUncheckedUpdateWithoutExpensesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    salesAsStaff?: Prisma.SaleUncheckedUpdateManyWithoutStaffNestedInput;
    repairs?: Prisma.RepairUncheckedUpdateManyWithoutStaffNestedInput;
    rechargeTransactions?: Prisma.RechargeTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    moneyTransferTransactions?: Prisma.MoneyTransferTransactionUncheckedUpdateManyWithoutStaffNestedInput;
    cashSessions?: Prisma.CashSessionUncheckedUpdateManyWithoutStaffNestedInput;
    purchasesAsManager?: Prisma.PurchaseUncheckedUpdateManyWithoutManagerNestedInput;
    mtDeposits?: Prisma.MTDepositUncheckedUpdateManyWithoutManagerNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    salesAsStaff: number;
    repairs: number;
    rechargeTransactions: number;
    moneyTransferTransactions: number;
    cashSessions: number;
    purchasesAsManager: number;
    mtDeposits: number;
    expenses: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    salesAsStaff?: boolean | UserCountOutputTypeCountSalesAsStaffArgs;
    repairs?: boolean | UserCountOutputTypeCountRepairsArgs;
    rechargeTransactions?: boolean | UserCountOutputTypeCountRechargeTransactionsArgs;
    moneyTransferTransactions?: boolean | UserCountOutputTypeCountMoneyTransferTransactionsArgs;
    cashSessions?: boolean | UserCountOutputTypeCountCashSessionsArgs;
    purchasesAsManager?: boolean | UserCountOutputTypeCountPurchasesAsManagerArgs;
    mtDeposits?: boolean | UserCountOutputTypeCountMtDepositsArgs;
    expenses?: boolean | UserCountOutputTypeCountExpensesArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSalesAsStaffArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SaleWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountRepairsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RepairWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountRechargeTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RechargeTransactionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountMoneyTransferTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MoneyTransferTransactionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCashSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CashSessionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPurchasesAsManagerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountMtDepositsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MTDepositWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountExpensesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExpenseWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    createdAt?: boolean;
    salesAsStaff?: boolean | Prisma.User$salesAsStaffArgs<ExtArgs>;
    repairs?: boolean | Prisma.User$repairsArgs<ExtArgs>;
    rechargeTransactions?: boolean | Prisma.User$rechargeTransactionsArgs<ExtArgs>;
    moneyTransferTransactions?: boolean | Prisma.User$moneyTransferTransactionsArgs<ExtArgs>;
    cashSessions?: boolean | Prisma.User$cashSessionsArgs<ExtArgs>;
    purchasesAsManager?: boolean | Prisma.User$purchasesAsManagerArgs<ExtArgs>;
    mtDeposits?: boolean | Prisma.User$mtDepositsArgs<ExtArgs>;
    expenses?: boolean | Prisma.User$expensesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    createdAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "role" | "createdAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    salesAsStaff?: boolean | Prisma.User$salesAsStaffArgs<ExtArgs>;
    repairs?: boolean | Prisma.User$repairsArgs<ExtArgs>;
    rechargeTransactions?: boolean | Prisma.User$rechargeTransactionsArgs<ExtArgs>;
    moneyTransferTransactions?: boolean | Prisma.User$moneyTransferTransactionsArgs<ExtArgs>;
    cashSessions?: boolean | Prisma.User$cashSessionsArgs<ExtArgs>;
    purchasesAsManager?: boolean | Prisma.User$purchasesAsManagerArgs<ExtArgs>;
    mtDeposits?: boolean | Prisma.User$mtDepositsArgs<ExtArgs>;
    expenses?: boolean | Prisma.User$expensesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        salesAsStaff: Prisma.$SalePayload<ExtArgs>[];
        repairs: Prisma.$RepairPayload<ExtArgs>[];
        rechargeTransactions: Prisma.$RechargeTransactionPayload<ExtArgs>[];
        moneyTransferTransactions: Prisma.$MoneyTransferTransactionPayload<ExtArgs>[];
        cashSessions: Prisma.$CashSessionPayload<ExtArgs>[];
        purchasesAsManager: Prisma.$PurchasePayload<ExtArgs>[];
        mtDeposits: Prisma.$MTDepositPayload<ExtArgs>[];
        expenses: Prisma.$ExpensePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        role: $Enums.Role;
        createdAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    salesAsStaff<T extends Prisma.User$salesAsStaffArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$salesAsStaffArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    repairs<T extends Prisma.User$repairsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$repairsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    rechargeTransactions<T extends Prisma.User$rechargeTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$rechargeTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    moneyTransferTransactions<T extends Prisma.User$moneyTransferTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$moneyTransferTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    cashSessions<T extends Prisma.User$cashSessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$cashSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    purchasesAsManager<T extends Prisma.User$purchasesAsManagerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$purchasesAsManagerArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    mtDeposits<T extends Prisma.User$mtDepositsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$mtDepositsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    expenses<T extends Prisma.User$expensesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'Role'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.salesAsStaff
 */
export type User$salesAsStaffArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: Prisma.SaleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sale
     */
    omit?: Prisma.SaleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SaleInclude<ExtArgs> | null;
    where?: Prisma.SaleWhereInput;
    orderBy?: Prisma.SaleOrderByWithRelationInput | Prisma.SaleOrderByWithRelationInput[];
    cursor?: Prisma.SaleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SaleScalarFieldEnum | Prisma.SaleScalarFieldEnum[];
};
/**
 * User.repairs
 */
export type User$repairsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: Prisma.RepairSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Repair
     */
    omit?: Prisma.RepairOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RepairInclude<ExtArgs> | null;
    where?: Prisma.RepairWhereInput;
    orderBy?: Prisma.RepairOrderByWithRelationInput | Prisma.RepairOrderByWithRelationInput[];
    cursor?: Prisma.RepairWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RepairScalarFieldEnum | Prisma.RepairScalarFieldEnum[];
};
/**
 * User.rechargeTransactions
 */
export type User$rechargeTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RechargeTransaction
     */
    select?: Prisma.RechargeTransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RechargeTransaction
     */
    omit?: Prisma.RechargeTransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RechargeTransactionInclude<ExtArgs> | null;
    where?: Prisma.RechargeTransactionWhereInput;
    orderBy?: Prisma.RechargeTransactionOrderByWithRelationInput | Prisma.RechargeTransactionOrderByWithRelationInput[];
    cursor?: Prisma.RechargeTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RechargeTransactionScalarFieldEnum | Prisma.RechargeTransactionScalarFieldEnum[];
};
/**
 * User.moneyTransferTransactions
 */
export type User$moneyTransferTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoneyTransferTransaction
     */
    select?: Prisma.MoneyTransferTransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MoneyTransferTransaction
     */
    omit?: Prisma.MoneyTransferTransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MoneyTransferTransactionInclude<ExtArgs> | null;
    where?: Prisma.MoneyTransferTransactionWhereInput;
    orderBy?: Prisma.MoneyTransferTransactionOrderByWithRelationInput | Prisma.MoneyTransferTransactionOrderByWithRelationInput[];
    cursor?: Prisma.MoneyTransferTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MoneyTransferTransactionScalarFieldEnum | Prisma.MoneyTransferTransactionScalarFieldEnum[];
};
/**
 * User.cashSessions
 */
export type User$cashSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashSession
     */
    select?: Prisma.CashSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CashSession
     */
    omit?: Prisma.CashSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CashSessionInclude<ExtArgs> | null;
    where?: Prisma.CashSessionWhereInput;
    orderBy?: Prisma.CashSessionOrderByWithRelationInput | Prisma.CashSessionOrderByWithRelationInput[];
    cursor?: Prisma.CashSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CashSessionScalarFieldEnum | Prisma.CashSessionScalarFieldEnum[];
};
/**
 * User.purchasesAsManager
 */
export type User$purchasesAsManagerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: Prisma.PurchaseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Purchase
     */
    omit?: Prisma.PurchaseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PurchaseInclude<ExtArgs> | null;
    where?: Prisma.PurchaseWhereInput;
    orderBy?: Prisma.PurchaseOrderByWithRelationInput | Prisma.PurchaseOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseScalarFieldEnum | Prisma.PurchaseScalarFieldEnum[];
};
/**
 * User.mtDeposits
 */
export type User$mtDepositsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MTDeposit
     */
    select?: Prisma.MTDepositSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MTDeposit
     */
    omit?: Prisma.MTDepositOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MTDepositInclude<ExtArgs> | null;
    where?: Prisma.MTDepositWhereInput;
    orderBy?: Prisma.MTDepositOrderByWithRelationInput | Prisma.MTDepositOrderByWithRelationInput[];
    cursor?: Prisma.MTDepositWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MTDepositScalarFieldEnum | Prisma.MTDepositScalarFieldEnum[];
};
/**
 * User.expenses
 */
export type User$expensesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: Prisma.ExpenseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Expense
     */
    omit?: Prisma.ExpenseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExpenseInclude<ExtArgs> | null;
    where?: Prisma.ExpenseWhereInput;
    orderBy?: Prisma.ExpenseOrderByWithRelationInput | Prisma.ExpenseOrderByWithRelationInput[];
    cursor?: Prisma.ExpenseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExpenseScalarFieldEnum | Prisma.ExpenseScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
//# sourceMappingURL=User.d.ts.map