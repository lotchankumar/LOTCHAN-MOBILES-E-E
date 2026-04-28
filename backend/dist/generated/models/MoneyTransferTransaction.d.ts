import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model MoneyTransferTransaction
 *
 */
export type MoneyTransferTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$MoneyTransferTransactionPayload>;
export type AggregateMoneyTransferTransaction = {
    _count: MoneyTransferTransactionCountAggregateOutputType | null;
    _avg: MoneyTransferTransactionAvgAggregateOutputType | null;
    _sum: MoneyTransferTransactionSumAggregateOutputType | null;
    _min: MoneyTransferTransactionMinAggregateOutputType | null;
    _max: MoneyTransferTransactionMaxAggregateOutputType | null;
};
export type MoneyTransferTransactionAvgAggregateOutputType = {
    amount: number | null;
    commission: number | null;
};
export type MoneyTransferTransactionSumAggregateOutputType = {
    amount: number | null;
    commission: number | null;
};
export type MoneyTransferTransactionMinAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    serviceProvider: string | null;
    senderName: string | null;
    receiverName: string | null;
    amount: number | null;
    commission: number | null;
    createdAt: Date | null;
};
export type MoneyTransferTransactionMaxAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    serviceProvider: string | null;
    senderName: string | null;
    receiverName: string | null;
    amount: number | null;
    commission: number | null;
    createdAt: Date | null;
};
export type MoneyTransferTransactionCountAggregateOutputType = {
    id: number;
    staffId: number;
    serviceProvider: number;
    senderName: number;
    receiverName: number;
    amount: number;
    commission: number;
    createdAt: number;
    _all: number;
};
export type MoneyTransferTransactionAvgAggregateInputType = {
    amount?: true;
    commission?: true;
};
export type MoneyTransferTransactionSumAggregateInputType = {
    amount?: true;
    commission?: true;
};
export type MoneyTransferTransactionMinAggregateInputType = {
    id?: true;
    staffId?: true;
    serviceProvider?: true;
    senderName?: true;
    receiverName?: true;
    amount?: true;
    commission?: true;
    createdAt?: true;
};
export type MoneyTransferTransactionMaxAggregateInputType = {
    id?: true;
    staffId?: true;
    serviceProvider?: true;
    senderName?: true;
    receiverName?: true;
    amount?: true;
    commission?: true;
    createdAt?: true;
};
export type MoneyTransferTransactionCountAggregateInputType = {
    id?: true;
    staffId?: true;
    serviceProvider?: true;
    senderName?: true;
    receiverName?: true;
    amount?: true;
    commission?: true;
    createdAt?: true;
    _all?: true;
};
export type MoneyTransferTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MoneyTransferTransaction to aggregate.
     */
    where?: Prisma.MoneyTransferTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MoneyTransferTransactions to fetch.
     */
    orderBy?: Prisma.MoneyTransferTransactionOrderByWithRelationInput | Prisma.MoneyTransferTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MoneyTransferTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MoneyTransferTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MoneyTransferTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MoneyTransferTransactions
    **/
    _count?: true | MoneyTransferTransactionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MoneyTransferTransactionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MoneyTransferTransactionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MoneyTransferTransactionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MoneyTransferTransactionMaxAggregateInputType;
};
export type GetMoneyTransferTransactionAggregateType<T extends MoneyTransferTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateMoneyTransferTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMoneyTransferTransaction[P]> : Prisma.GetScalarType<T[P], AggregateMoneyTransferTransaction[P]>;
};
export type MoneyTransferTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MoneyTransferTransactionWhereInput;
    orderBy?: Prisma.MoneyTransferTransactionOrderByWithAggregationInput | Prisma.MoneyTransferTransactionOrderByWithAggregationInput[];
    by: Prisma.MoneyTransferTransactionScalarFieldEnum[] | Prisma.MoneyTransferTransactionScalarFieldEnum;
    having?: Prisma.MoneyTransferTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MoneyTransferTransactionCountAggregateInputType | true;
    _avg?: MoneyTransferTransactionAvgAggregateInputType;
    _sum?: MoneyTransferTransactionSumAggregateInputType;
    _min?: MoneyTransferTransactionMinAggregateInputType;
    _max?: MoneyTransferTransactionMaxAggregateInputType;
};
export type MoneyTransferTransactionGroupByOutputType = {
    id: string;
    staffId: string;
    serviceProvider: string;
    senderName: string;
    receiverName: string;
    amount: number;
    commission: number;
    createdAt: Date;
    _count: MoneyTransferTransactionCountAggregateOutputType | null;
    _avg: MoneyTransferTransactionAvgAggregateOutputType | null;
    _sum: MoneyTransferTransactionSumAggregateOutputType | null;
    _min: MoneyTransferTransactionMinAggregateOutputType | null;
    _max: MoneyTransferTransactionMaxAggregateOutputType | null;
};
export type GetMoneyTransferTransactionGroupByPayload<T extends MoneyTransferTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MoneyTransferTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MoneyTransferTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MoneyTransferTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MoneyTransferTransactionGroupByOutputType[P]>;
}>>;
export type MoneyTransferTransactionWhereInput = {
    AND?: Prisma.MoneyTransferTransactionWhereInput | Prisma.MoneyTransferTransactionWhereInput[];
    OR?: Prisma.MoneyTransferTransactionWhereInput[];
    NOT?: Prisma.MoneyTransferTransactionWhereInput | Prisma.MoneyTransferTransactionWhereInput[];
    id?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    staffId?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    serviceProvider?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    senderName?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    receiverName?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    amount?: Prisma.FloatFilter<"MoneyTransferTransaction"> | number;
    commission?: Prisma.FloatFilter<"MoneyTransferTransaction"> | number;
    createdAt?: Prisma.DateTimeFilter<"MoneyTransferTransaction"> | Date | string;
    staff?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type MoneyTransferTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    serviceProvider?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    receiverName?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    staff?: Prisma.UserOrderByWithRelationInput;
};
export type MoneyTransferTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MoneyTransferTransactionWhereInput | Prisma.MoneyTransferTransactionWhereInput[];
    OR?: Prisma.MoneyTransferTransactionWhereInput[];
    NOT?: Prisma.MoneyTransferTransactionWhereInput | Prisma.MoneyTransferTransactionWhereInput[];
    staffId?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    serviceProvider?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    senderName?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    receiverName?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    amount?: Prisma.FloatFilter<"MoneyTransferTransaction"> | number;
    commission?: Prisma.FloatFilter<"MoneyTransferTransaction"> | number;
    createdAt?: Prisma.DateTimeFilter<"MoneyTransferTransaction"> | Date | string;
    staff?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type MoneyTransferTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    serviceProvider?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    receiverName?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MoneyTransferTransactionCountOrderByAggregateInput;
    _avg?: Prisma.MoneyTransferTransactionAvgOrderByAggregateInput;
    _max?: Prisma.MoneyTransferTransactionMaxOrderByAggregateInput;
    _min?: Prisma.MoneyTransferTransactionMinOrderByAggregateInput;
    _sum?: Prisma.MoneyTransferTransactionSumOrderByAggregateInput;
};
export type MoneyTransferTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.MoneyTransferTransactionScalarWhereWithAggregatesInput | Prisma.MoneyTransferTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.MoneyTransferTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MoneyTransferTransactionScalarWhereWithAggregatesInput | Prisma.MoneyTransferTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MoneyTransferTransaction"> | string;
    staffId?: Prisma.StringWithAggregatesFilter<"MoneyTransferTransaction"> | string;
    serviceProvider?: Prisma.StringWithAggregatesFilter<"MoneyTransferTransaction"> | string;
    senderName?: Prisma.StringWithAggregatesFilter<"MoneyTransferTransaction"> | string;
    receiverName?: Prisma.StringWithAggregatesFilter<"MoneyTransferTransaction"> | string;
    amount?: Prisma.FloatWithAggregatesFilter<"MoneyTransferTransaction"> | number;
    commission?: Prisma.FloatWithAggregatesFilter<"MoneyTransferTransaction"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MoneyTransferTransaction"> | Date | string;
};
export type MoneyTransferTransactionCreateInput = {
    id?: string;
    serviceProvider: string;
    senderName: string;
    receiverName: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
    staff: Prisma.UserCreateNestedOneWithoutMoneyTransferTransactionsInput;
};
export type MoneyTransferTransactionUncheckedCreateInput = {
    id?: string;
    staffId: string;
    serviceProvider: string;
    senderName: string;
    receiverName: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type MoneyTransferTransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverName?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staff?: Prisma.UserUpdateOneRequiredWithoutMoneyTransferTransactionsNestedInput;
};
export type MoneyTransferTransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    staffId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverName?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MoneyTransferTransactionCreateManyInput = {
    id?: string;
    staffId: string;
    serviceProvider: string;
    senderName: string;
    receiverName: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type MoneyTransferTransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverName?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MoneyTransferTransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    staffId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverName?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MoneyTransferTransactionListRelationFilter = {
    every?: Prisma.MoneyTransferTransactionWhereInput;
    some?: Prisma.MoneyTransferTransactionWhereInput;
    none?: Prisma.MoneyTransferTransactionWhereInput;
};
export type MoneyTransferTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MoneyTransferTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    serviceProvider?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    receiverName?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MoneyTransferTransactionAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
};
export type MoneyTransferTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    serviceProvider?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    receiverName?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MoneyTransferTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    serviceProvider?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    receiverName?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MoneyTransferTransactionSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
};
export type MoneyTransferTransactionCreateNestedManyWithoutStaffInput = {
    create?: Prisma.XOR<Prisma.MoneyTransferTransactionCreateWithoutStaffInput, Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput> | Prisma.MoneyTransferTransactionCreateWithoutStaffInput[] | Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.MoneyTransferTransactionCreateOrConnectWithoutStaffInput | Prisma.MoneyTransferTransactionCreateOrConnectWithoutStaffInput[];
    createMany?: Prisma.MoneyTransferTransactionCreateManyStaffInputEnvelope;
    connect?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
};
export type MoneyTransferTransactionUncheckedCreateNestedManyWithoutStaffInput = {
    create?: Prisma.XOR<Prisma.MoneyTransferTransactionCreateWithoutStaffInput, Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput> | Prisma.MoneyTransferTransactionCreateWithoutStaffInput[] | Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.MoneyTransferTransactionCreateOrConnectWithoutStaffInput | Prisma.MoneyTransferTransactionCreateOrConnectWithoutStaffInput[];
    createMany?: Prisma.MoneyTransferTransactionCreateManyStaffInputEnvelope;
    connect?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
};
export type MoneyTransferTransactionUpdateManyWithoutStaffNestedInput = {
    create?: Prisma.XOR<Prisma.MoneyTransferTransactionCreateWithoutStaffInput, Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput> | Prisma.MoneyTransferTransactionCreateWithoutStaffInput[] | Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.MoneyTransferTransactionCreateOrConnectWithoutStaffInput | Prisma.MoneyTransferTransactionCreateOrConnectWithoutStaffInput[];
    upsert?: Prisma.MoneyTransferTransactionUpsertWithWhereUniqueWithoutStaffInput | Prisma.MoneyTransferTransactionUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: Prisma.MoneyTransferTransactionCreateManyStaffInputEnvelope;
    set?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
    disconnect?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
    delete?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
    connect?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
    update?: Prisma.MoneyTransferTransactionUpdateWithWhereUniqueWithoutStaffInput | Prisma.MoneyTransferTransactionUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?: Prisma.MoneyTransferTransactionUpdateManyWithWhereWithoutStaffInput | Prisma.MoneyTransferTransactionUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: Prisma.MoneyTransferTransactionScalarWhereInput | Prisma.MoneyTransferTransactionScalarWhereInput[];
};
export type MoneyTransferTransactionUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: Prisma.XOR<Prisma.MoneyTransferTransactionCreateWithoutStaffInput, Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput> | Prisma.MoneyTransferTransactionCreateWithoutStaffInput[] | Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.MoneyTransferTransactionCreateOrConnectWithoutStaffInput | Prisma.MoneyTransferTransactionCreateOrConnectWithoutStaffInput[];
    upsert?: Prisma.MoneyTransferTransactionUpsertWithWhereUniqueWithoutStaffInput | Prisma.MoneyTransferTransactionUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: Prisma.MoneyTransferTransactionCreateManyStaffInputEnvelope;
    set?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
    disconnect?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
    delete?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
    connect?: Prisma.MoneyTransferTransactionWhereUniqueInput | Prisma.MoneyTransferTransactionWhereUniqueInput[];
    update?: Prisma.MoneyTransferTransactionUpdateWithWhereUniqueWithoutStaffInput | Prisma.MoneyTransferTransactionUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?: Prisma.MoneyTransferTransactionUpdateManyWithWhereWithoutStaffInput | Prisma.MoneyTransferTransactionUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: Prisma.MoneyTransferTransactionScalarWhereInput | Prisma.MoneyTransferTransactionScalarWhereInput[];
};
export type MoneyTransferTransactionCreateWithoutStaffInput = {
    id?: string;
    serviceProvider: string;
    senderName: string;
    receiverName: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type MoneyTransferTransactionUncheckedCreateWithoutStaffInput = {
    id?: string;
    serviceProvider: string;
    senderName: string;
    receiverName: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type MoneyTransferTransactionCreateOrConnectWithoutStaffInput = {
    where: Prisma.MoneyTransferTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.MoneyTransferTransactionCreateWithoutStaffInput, Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput>;
};
export type MoneyTransferTransactionCreateManyStaffInputEnvelope = {
    data: Prisma.MoneyTransferTransactionCreateManyStaffInput | Prisma.MoneyTransferTransactionCreateManyStaffInput[];
    skipDuplicates?: boolean;
};
export type MoneyTransferTransactionUpsertWithWhereUniqueWithoutStaffInput = {
    where: Prisma.MoneyTransferTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.MoneyTransferTransactionUpdateWithoutStaffInput, Prisma.MoneyTransferTransactionUncheckedUpdateWithoutStaffInput>;
    create: Prisma.XOR<Prisma.MoneyTransferTransactionCreateWithoutStaffInput, Prisma.MoneyTransferTransactionUncheckedCreateWithoutStaffInput>;
};
export type MoneyTransferTransactionUpdateWithWhereUniqueWithoutStaffInput = {
    where: Prisma.MoneyTransferTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.MoneyTransferTransactionUpdateWithoutStaffInput, Prisma.MoneyTransferTransactionUncheckedUpdateWithoutStaffInput>;
};
export type MoneyTransferTransactionUpdateManyWithWhereWithoutStaffInput = {
    where: Prisma.MoneyTransferTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.MoneyTransferTransactionUpdateManyMutationInput, Prisma.MoneyTransferTransactionUncheckedUpdateManyWithoutStaffInput>;
};
export type MoneyTransferTransactionScalarWhereInput = {
    AND?: Prisma.MoneyTransferTransactionScalarWhereInput | Prisma.MoneyTransferTransactionScalarWhereInput[];
    OR?: Prisma.MoneyTransferTransactionScalarWhereInput[];
    NOT?: Prisma.MoneyTransferTransactionScalarWhereInput | Prisma.MoneyTransferTransactionScalarWhereInput[];
    id?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    staffId?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    serviceProvider?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    senderName?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    receiverName?: Prisma.StringFilter<"MoneyTransferTransaction"> | string;
    amount?: Prisma.FloatFilter<"MoneyTransferTransaction"> | number;
    commission?: Prisma.FloatFilter<"MoneyTransferTransaction"> | number;
    createdAt?: Prisma.DateTimeFilter<"MoneyTransferTransaction"> | Date | string;
};
export type MoneyTransferTransactionCreateManyStaffInput = {
    id?: string;
    serviceProvider: string;
    senderName: string;
    receiverName: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type MoneyTransferTransactionUpdateWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverName?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MoneyTransferTransactionUncheckedUpdateWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverName?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MoneyTransferTransactionUncheckedUpdateManyWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceProvider?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    receiverName?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MoneyTransferTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    serviceProvider?: boolean;
    senderName?: boolean;
    receiverName?: boolean;
    amount?: boolean;
    commission?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["moneyTransferTransaction"]>;
export type MoneyTransferTransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    serviceProvider?: boolean;
    senderName?: boolean;
    receiverName?: boolean;
    amount?: boolean;
    commission?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["moneyTransferTransaction"]>;
export type MoneyTransferTransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    serviceProvider?: boolean;
    senderName?: boolean;
    receiverName?: boolean;
    amount?: boolean;
    commission?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["moneyTransferTransaction"]>;
export type MoneyTransferTransactionSelectScalar = {
    id?: boolean;
    staffId?: boolean;
    serviceProvider?: boolean;
    senderName?: boolean;
    receiverName?: boolean;
    amount?: boolean;
    commission?: boolean;
    createdAt?: boolean;
};
export type MoneyTransferTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "staffId" | "serviceProvider" | "senderName" | "receiverName" | "amount" | "commission" | "createdAt", ExtArgs["result"]["moneyTransferTransaction"]>;
export type MoneyTransferTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MoneyTransferTransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MoneyTransferTransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $MoneyTransferTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MoneyTransferTransaction";
    objects: {
        staff: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        staffId: string;
        serviceProvider: string;
        senderName: string;
        receiverName: string;
        amount: number;
        commission: number;
        createdAt: Date;
    }, ExtArgs["result"]["moneyTransferTransaction"]>;
    composites: {};
};
export type MoneyTransferTransactionGetPayload<S extends boolean | null | undefined | MoneyTransferTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload, S>;
export type MoneyTransferTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MoneyTransferTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MoneyTransferTransactionCountAggregateInputType | true;
};
export interface MoneyTransferTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MoneyTransferTransaction'];
        meta: {
            name: 'MoneyTransferTransaction';
        };
    };
    /**
     * Find zero or one MoneyTransferTransaction that matches the filter.
     * @param {MoneyTransferTransactionFindUniqueArgs} args - Arguments to find a MoneyTransferTransaction
     * @example
     * // Get one MoneyTransferTransaction
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoneyTransferTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, MoneyTransferTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MoneyTransferTransactionClient<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MoneyTransferTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MoneyTransferTransactionFindUniqueOrThrowArgs} args - Arguments to find a MoneyTransferTransaction
     * @example
     * // Get one MoneyTransferTransaction
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoneyTransferTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MoneyTransferTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MoneyTransferTransactionClient<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MoneyTransferTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoneyTransferTransactionFindFirstArgs} args - Arguments to find a MoneyTransferTransaction
     * @example
     * // Get one MoneyTransferTransaction
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoneyTransferTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, MoneyTransferTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__MoneyTransferTransactionClient<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MoneyTransferTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoneyTransferTransactionFindFirstOrThrowArgs} args - Arguments to find a MoneyTransferTransaction
     * @example
     * // Get one MoneyTransferTransaction
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoneyTransferTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MoneyTransferTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MoneyTransferTransactionClient<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MoneyTransferTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoneyTransferTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MoneyTransferTransactions
     * const moneyTransferTransactions = await prisma.moneyTransferTransaction.findMany()
     *
     * // Get first 10 MoneyTransferTransactions
     * const moneyTransferTransactions = await prisma.moneyTransferTransaction.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const moneyTransferTransactionWithIdOnly = await prisma.moneyTransferTransaction.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MoneyTransferTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, MoneyTransferTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MoneyTransferTransaction.
     * @param {MoneyTransferTransactionCreateArgs} args - Arguments to create a MoneyTransferTransaction.
     * @example
     * // Create one MoneyTransferTransaction
     * const MoneyTransferTransaction = await prisma.moneyTransferTransaction.create({
     *   data: {
     *     // ... data to create a MoneyTransferTransaction
     *   }
     * })
     *
     */
    create<T extends MoneyTransferTransactionCreateArgs>(args: Prisma.SelectSubset<T, MoneyTransferTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__MoneyTransferTransactionClient<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MoneyTransferTransactions.
     * @param {MoneyTransferTransactionCreateManyArgs} args - Arguments to create many MoneyTransferTransactions.
     * @example
     * // Create many MoneyTransferTransactions
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MoneyTransferTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, MoneyTransferTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MoneyTransferTransactions and returns the data saved in the database.
     * @param {MoneyTransferTransactionCreateManyAndReturnArgs} args - Arguments to create many MoneyTransferTransactions.
     * @example
     * // Create many MoneyTransferTransactions
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MoneyTransferTransactions and only return the `id`
     * const moneyTransferTransactionWithIdOnly = await prisma.moneyTransferTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MoneyTransferTransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MoneyTransferTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MoneyTransferTransaction.
     * @param {MoneyTransferTransactionDeleteArgs} args - Arguments to delete one MoneyTransferTransaction.
     * @example
     * // Delete one MoneyTransferTransaction
     * const MoneyTransferTransaction = await prisma.moneyTransferTransaction.delete({
     *   where: {
     *     // ... filter to delete one MoneyTransferTransaction
     *   }
     * })
     *
     */
    delete<T extends MoneyTransferTransactionDeleteArgs>(args: Prisma.SelectSubset<T, MoneyTransferTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__MoneyTransferTransactionClient<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MoneyTransferTransaction.
     * @param {MoneyTransferTransactionUpdateArgs} args - Arguments to update one MoneyTransferTransaction.
     * @example
     * // Update one MoneyTransferTransaction
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MoneyTransferTransactionUpdateArgs>(args: Prisma.SelectSubset<T, MoneyTransferTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__MoneyTransferTransactionClient<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MoneyTransferTransactions.
     * @param {MoneyTransferTransactionDeleteManyArgs} args - Arguments to filter MoneyTransferTransactions to delete.
     * @example
     * // Delete a few MoneyTransferTransactions
     * const { count } = await prisma.moneyTransferTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MoneyTransferTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, MoneyTransferTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MoneyTransferTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoneyTransferTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MoneyTransferTransactions
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MoneyTransferTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, MoneyTransferTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MoneyTransferTransactions and returns the data updated in the database.
     * @param {MoneyTransferTransactionUpdateManyAndReturnArgs} args - Arguments to update many MoneyTransferTransactions.
     * @example
     * // Update many MoneyTransferTransactions
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MoneyTransferTransactions and only return the `id`
     * const moneyTransferTransactionWithIdOnly = await prisma.moneyTransferTransaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends MoneyTransferTransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MoneyTransferTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MoneyTransferTransaction.
     * @param {MoneyTransferTransactionUpsertArgs} args - Arguments to update or create a MoneyTransferTransaction.
     * @example
     * // Update or create a MoneyTransferTransaction
     * const moneyTransferTransaction = await prisma.moneyTransferTransaction.upsert({
     *   create: {
     *     // ... data to create a MoneyTransferTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MoneyTransferTransaction we want to update
     *   }
     * })
     */
    upsert<T extends MoneyTransferTransactionUpsertArgs>(args: Prisma.SelectSubset<T, MoneyTransferTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__MoneyTransferTransactionClient<runtime.Types.Result.GetResult<Prisma.$MoneyTransferTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MoneyTransferTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoneyTransferTransactionCountArgs} args - Arguments to filter MoneyTransferTransactions to count.
     * @example
     * // Count the number of MoneyTransferTransactions
     * const count = await prisma.moneyTransferTransaction.count({
     *   where: {
     *     // ... the filter for the MoneyTransferTransactions we want to count
     *   }
     * })
    **/
    count<T extends MoneyTransferTransactionCountArgs>(args?: Prisma.Subset<T, MoneyTransferTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MoneyTransferTransactionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MoneyTransferTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoneyTransferTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MoneyTransferTransactionAggregateArgs>(args: Prisma.Subset<T, MoneyTransferTransactionAggregateArgs>): Prisma.PrismaPromise<GetMoneyTransferTransactionAggregateType<T>>;
    /**
     * Group by MoneyTransferTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoneyTransferTransactionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MoneyTransferTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MoneyTransferTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: MoneyTransferTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MoneyTransferTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoneyTransferTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MoneyTransferTransaction model
     */
    readonly fields: MoneyTransferTransactionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MoneyTransferTransaction.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MoneyTransferTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    staff<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the MoneyTransferTransaction model
 */
export interface MoneyTransferTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"MoneyTransferTransaction", 'String'>;
    readonly staffId: Prisma.FieldRef<"MoneyTransferTransaction", 'String'>;
    readonly serviceProvider: Prisma.FieldRef<"MoneyTransferTransaction", 'String'>;
    readonly senderName: Prisma.FieldRef<"MoneyTransferTransaction", 'String'>;
    readonly receiverName: Prisma.FieldRef<"MoneyTransferTransaction", 'String'>;
    readonly amount: Prisma.FieldRef<"MoneyTransferTransaction", 'Float'>;
    readonly commission: Prisma.FieldRef<"MoneyTransferTransaction", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"MoneyTransferTransaction", 'DateTime'>;
}
/**
 * MoneyTransferTransaction findUnique
 */
export type MoneyTransferTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MoneyTransferTransaction to fetch.
     */
    where: Prisma.MoneyTransferTransactionWhereUniqueInput;
};
/**
 * MoneyTransferTransaction findUniqueOrThrow
 */
export type MoneyTransferTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MoneyTransferTransaction to fetch.
     */
    where: Prisma.MoneyTransferTransactionWhereUniqueInput;
};
/**
 * MoneyTransferTransaction findFirst
 */
export type MoneyTransferTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MoneyTransferTransaction to fetch.
     */
    where?: Prisma.MoneyTransferTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MoneyTransferTransactions to fetch.
     */
    orderBy?: Prisma.MoneyTransferTransactionOrderByWithRelationInput | Prisma.MoneyTransferTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MoneyTransferTransactions.
     */
    cursor?: Prisma.MoneyTransferTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MoneyTransferTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MoneyTransferTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MoneyTransferTransactions.
     */
    distinct?: Prisma.MoneyTransferTransactionScalarFieldEnum | Prisma.MoneyTransferTransactionScalarFieldEnum[];
};
/**
 * MoneyTransferTransaction findFirstOrThrow
 */
export type MoneyTransferTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MoneyTransferTransaction to fetch.
     */
    where?: Prisma.MoneyTransferTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MoneyTransferTransactions to fetch.
     */
    orderBy?: Prisma.MoneyTransferTransactionOrderByWithRelationInput | Prisma.MoneyTransferTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MoneyTransferTransactions.
     */
    cursor?: Prisma.MoneyTransferTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MoneyTransferTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MoneyTransferTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MoneyTransferTransactions.
     */
    distinct?: Prisma.MoneyTransferTransactionScalarFieldEnum | Prisma.MoneyTransferTransactionScalarFieldEnum[];
};
/**
 * MoneyTransferTransaction findMany
 */
export type MoneyTransferTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MoneyTransferTransactions to fetch.
     */
    where?: Prisma.MoneyTransferTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MoneyTransferTransactions to fetch.
     */
    orderBy?: Prisma.MoneyTransferTransactionOrderByWithRelationInput | Prisma.MoneyTransferTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MoneyTransferTransactions.
     */
    cursor?: Prisma.MoneyTransferTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MoneyTransferTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MoneyTransferTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MoneyTransferTransactions.
     */
    distinct?: Prisma.MoneyTransferTransactionScalarFieldEnum | Prisma.MoneyTransferTransactionScalarFieldEnum[];
};
/**
 * MoneyTransferTransaction create
 */
export type MoneyTransferTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a MoneyTransferTransaction.
     */
    data: Prisma.XOR<Prisma.MoneyTransferTransactionCreateInput, Prisma.MoneyTransferTransactionUncheckedCreateInput>;
};
/**
 * MoneyTransferTransaction createMany
 */
export type MoneyTransferTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MoneyTransferTransactions.
     */
    data: Prisma.MoneyTransferTransactionCreateManyInput | Prisma.MoneyTransferTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MoneyTransferTransaction createManyAndReturn
 */
export type MoneyTransferTransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoneyTransferTransaction
     */
    select?: Prisma.MoneyTransferTransactionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MoneyTransferTransaction
     */
    omit?: Prisma.MoneyTransferTransactionOmit<ExtArgs> | null;
    /**
     * The data used to create many MoneyTransferTransactions.
     */
    data: Prisma.MoneyTransferTransactionCreateManyInput | Prisma.MoneyTransferTransactionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MoneyTransferTransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MoneyTransferTransaction update
 */
export type MoneyTransferTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a MoneyTransferTransaction.
     */
    data: Prisma.XOR<Prisma.MoneyTransferTransactionUpdateInput, Prisma.MoneyTransferTransactionUncheckedUpdateInput>;
    /**
     * Choose, which MoneyTransferTransaction to update.
     */
    where: Prisma.MoneyTransferTransactionWhereUniqueInput;
};
/**
 * MoneyTransferTransaction updateMany
 */
export type MoneyTransferTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MoneyTransferTransactions.
     */
    data: Prisma.XOR<Prisma.MoneyTransferTransactionUpdateManyMutationInput, Prisma.MoneyTransferTransactionUncheckedUpdateManyInput>;
    /**
     * Filter which MoneyTransferTransactions to update
     */
    where?: Prisma.MoneyTransferTransactionWhereInput;
    /**
     * Limit how many MoneyTransferTransactions to update.
     */
    limit?: number;
};
/**
 * MoneyTransferTransaction updateManyAndReturn
 */
export type MoneyTransferTransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoneyTransferTransaction
     */
    select?: Prisma.MoneyTransferTransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MoneyTransferTransaction
     */
    omit?: Prisma.MoneyTransferTransactionOmit<ExtArgs> | null;
    /**
     * The data used to update MoneyTransferTransactions.
     */
    data: Prisma.XOR<Prisma.MoneyTransferTransactionUpdateManyMutationInput, Prisma.MoneyTransferTransactionUncheckedUpdateManyInput>;
    /**
     * Filter which MoneyTransferTransactions to update
     */
    where?: Prisma.MoneyTransferTransactionWhereInput;
    /**
     * Limit how many MoneyTransferTransactions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MoneyTransferTransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MoneyTransferTransaction upsert
 */
export type MoneyTransferTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the MoneyTransferTransaction to update in case it exists.
     */
    where: Prisma.MoneyTransferTransactionWhereUniqueInput;
    /**
     * In case the MoneyTransferTransaction found by the `where` argument doesn't exist, create a new MoneyTransferTransaction with this data.
     */
    create: Prisma.XOR<Prisma.MoneyTransferTransactionCreateInput, Prisma.MoneyTransferTransactionUncheckedCreateInput>;
    /**
     * In case the MoneyTransferTransaction was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MoneyTransferTransactionUpdateInput, Prisma.MoneyTransferTransactionUncheckedUpdateInput>;
};
/**
 * MoneyTransferTransaction delete
 */
export type MoneyTransferTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which MoneyTransferTransaction to delete.
     */
    where: Prisma.MoneyTransferTransactionWhereUniqueInput;
};
/**
 * MoneyTransferTransaction deleteMany
 */
export type MoneyTransferTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MoneyTransferTransactions to delete
     */
    where?: Prisma.MoneyTransferTransactionWhereInput;
    /**
     * Limit how many MoneyTransferTransactions to delete.
     */
    limit?: number;
};
/**
 * MoneyTransferTransaction without action
 */
export type MoneyTransferTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=MoneyTransferTransaction.d.ts.map