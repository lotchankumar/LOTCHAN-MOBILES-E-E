import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model RechargeTransaction
 *
 */
export type RechargeTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$RechargeTransactionPayload>;
export type AggregateRechargeTransaction = {
    _count: RechargeTransactionCountAggregateOutputType | null;
    _avg: RechargeTransactionAvgAggregateOutputType | null;
    _sum: RechargeTransactionSumAggregateOutputType | null;
    _min: RechargeTransactionMinAggregateOutputType | null;
    _max: RechargeTransactionMaxAggregateOutputType | null;
};
export type RechargeTransactionAvgAggregateOutputType = {
    amount: number | null;
    commission: number | null;
};
export type RechargeTransactionSumAggregateOutputType = {
    amount: number | null;
    commission: number | null;
};
export type RechargeTransactionMinAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    operator: string | null;
    mobileNumber: string | null;
    amount: number | null;
    commission: number | null;
    createdAt: Date | null;
};
export type RechargeTransactionMaxAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    operator: string | null;
    mobileNumber: string | null;
    amount: number | null;
    commission: number | null;
    createdAt: Date | null;
};
export type RechargeTransactionCountAggregateOutputType = {
    id: number;
    staffId: number;
    operator: number;
    mobileNumber: number;
    amount: number;
    commission: number;
    createdAt: number;
    _all: number;
};
export type RechargeTransactionAvgAggregateInputType = {
    amount?: true;
    commission?: true;
};
export type RechargeTransactionSumAggregateInputType = {
    amount?: true;
    commission?: true;
};
export type RechargeTransactionMinAggregateInputType = {
    id?: true;
    staffId?: true;
    operator?: true;
    mobileNumber?: true;
    amount?: true;
    commission?: true;
    createdAt?: true;
};
export type RechargeTransactionMaxAggregateInputType = {
    id?: true;
    staffId?: true;
    operator?: true;
    mobileNumber?: true;
    amount?: true;
    commission?: true;
    createdAt?: true;
};
export type RechargeTransactionCountAggregateInputType = {
    id?: true;
    staffId?: true;
    operator?: true;
    mobileNumber?: true;
    amount?: true;
    commission?: true;
    createdAt?: true;
    _all?: true;
};
export type RechargeTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RechargeTransaction to aggregate.
     */
    where?: Prisma.RechargeTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RechargeTransactions to fetch.
     */
    orderBy?: Prisma.RechargeTransactionOrderByWithRelationInput | Prisma.RechargeTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RechargeTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RechargeTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RechargeTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RechargeTransactions
    **/
    _count?: true | RechargeTransactionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: RechargeTransactionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: RechargeTransactionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RechargeTransactionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RechargeTransactionMaxAggregateInputType;
};
export type GetRechargeTransactionAggregateType<T extends RechargeTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateRechargeTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRechargeTransaction[P]> : Prisma.GetScalarType<T[P], AggregateRechargeTransaction[P]>;
};
export type RechargeTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RechargeTransactionWhereInput;
    orderBy?: Prisma.RechargeTransactionOrderByWithAggregationInput | Prisma.RechargeTransactionOrderByWithAggregationInput[];
    by: Prisma.RechargeTransactionScalarFieldEnum[] | Prisma.RechargeTransactionScalarFieldEnum;
    having?: Prisma.RechargeTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RechargeTransactionCountAggregateInputType | true;
    _avg?: RechargeTransactionAvgAggregateInputType;
    _sum?: RechargeTransactionSumAggregateInputType;
    _min?: RechargeTransactionMinAggregateInputType;
    _max?: RechargeTransactionMaxAggregateInputType;
};
export type RechargeTransactionGroupByOutputType = {
    id: string;
    staffId: string;
    operator: string;
    mobileNumber: string;
    amount: number;
    commission: number;
    createdAt: Date;
    _count: RechargeTransactionCountAggregateOutputType | null;
    _avg: RechargeTransactionAvgAggregateOutputType | null;
    _sum: RechargeTransactionSumAggregateOutputType | null;
    _min: RechargeTransactionMinAggregateOutputType | null;
    _max: RechargeTransactionMaxAggregateOutputType | null;
};
export type GetRechargeTransactionGroupByPayload<T extends RechargeTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RechargeTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RechargeTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RechargeTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RechargeTransactionGroupByOutputType[P]>;
}>>;
export type RechargeTransactionWhereInput = {
    AND?: Prisma.RechargeTransactionWhereInput | Prisma.RechargeTransactionWhereInput[];
    OR?: Prisma.RechargeTransactionWhereInput[];
    NOT?: Prisma.RechargeTransactionWhereInput | Prisma.RechargeTransactionWhereInput[];
    id?: Prisma.StringFilter<"RechargeTransaction"> | string;
    staffId?: Prisma.StringFilter<"RechargeTransaction"> | string;
    operator?: Prisma.StringFilter<"RechargeTransaction"> | string;
    mobileNumber?: Prisma.StringFilter<"RechargeTransaction"> | string;
    amount?: Prisma.FloatFilter<"RechargeTransaction"> | number;
    commission?: Prisma.FloatFilter<"RechargeTransaction"> | number;
    createdAt?: Prisma.DateTimeFilter<"RechargeTransaction"> | Date | string;
    staff?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RechargeTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    mobileNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    staff?: Prisma.UserOrderByWithRelationInput;
};
export type RechargeTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RechargeTransactionWhereInput | Prisma.RechargeTransactionWhereInput[];
    OR?: Prisma.RechargeTransactionWhereInput[];
    NOT?: Prisma.RechargeTransactionWhereInput | Prisma.RechargeTransactionWhereInput[];
    staffId?: Prisma.StringFilter<"RechargeTransaction"> | string;
    operator?: Prisma.StringFilter<"RechargeTransaction"> | string;
    mobileNumber?: Prisma.StringFilter<"RechargeTransaction"> | string;
    amount?: Prisma.FloatFilter<"RechargeTransaction"> | number;
    commission?: Prisma.FloatFilter<"RechargeTransaction"> | number;
    createdAt?: Prisma.DateTimeFilter<"RechargeTransaction"> | Date | string;
    staff?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type RechargeTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    mobileNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RechargeTransactionCountOrderByAggregateInput;
    _avg?: Prisma.RechargeTransactionAvgOrderByAggregateInput;
    _max?: Prisma.RechargeTransactionMaxOrderByAggregateInput;
    _min?: Prisma.RechargeTransactionMinOrderByAggregateInput;
    _sum?: Prisma.RechargeTransactionSumOrderByAggregateInput;
};
export type RechargeTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.RechargeTransactionScalarWhereWithAggregatesInput | Prisma.RechargeTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.RechargeTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RechargeTransactionScalarWhereWithAggregatesInput | Prisma.RechargeTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RechargeTransaction"> | string;
    staffId?: Prisma.StringWithAggregatesFilter<"RechargeTransaction"> | string;
    operator?: Prisma.StringWithAggregatesFilter<"RechargeTransaction"> | string;
    mobileNumber?: Prisma.StringWithAggregatesFilter<"RechargeTransaction"> | string;
    amount?: Prisma.FloatWithAggregatesFilter<"RechargeTransaction"> | number;
    commission?: Prisma.FloatWithAggregatesFilter<"RechargeTransaction"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RechargeTransaction"> | Date | string;
};
export type RechargeTransactionCreateInput = {
    id?: string;
    operator: string;
    mobileNumber: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
    staff: Prisma.UserCreateNestedOneWithoutRechargeTransactionsInput;
};
export type RechargeTransactionUncheckedCreateInput = {
    id?: string;
    staffId: string;
    operator: string;
    mobileNumber: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type RechargeTransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.StringFieldUpdateOperationsInput | string;
    mobileNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staff?: Prisma.UserUpdateOneRequiredWithoutRechargeTransactionsNestedInput;
};
export type RechargeTransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    staffId?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.StringFieldUpdateOperationsInput | string;
    mobileNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RechargeTransactionCreateManyInput = {
    id?: string;
    staffId: string;
    operator: string;
    mobileNumber: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type RechargeTransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.StringFieldUpdateOperationsInput | string;
    mobileNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RechargeTransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    staffId?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.StringFieldUpdateOperationsInput | string;
    mobileNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RechargeTransactionListRelationFilter = {
    every?: Prisma.RechargeTransactionWhereInput;
    some?: Prisma.RechargeTransactionWhereInput;
    none?: Prisma.RechargeTransactionWhereInput;
};
export type RechargeTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RechargeTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    mobileNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RechargeTransactionAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
};
export type RechargeTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    mobileNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RechargeTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    operator?: Prisma.SortOrder;
    mobileNumber?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RechargeTransactionSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    commission?: Prisma.SortOrder;
};
export type RechargeTransactionCreateNestedManyWithoutStaffInput = {
    create?: Prisma.XOR<Prisma.RechargeTransactionCreateWithoutStaffInput, Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput> | Prisma.RechargeTransactionCreateWithoutStaffInput[] | Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.RechargeTransactionCreateOrConnectWithoutStaffInput | Prisma.RechargeTransactionCreateOrConnectWithoutStaffInput[];
    createMany?: Prisma.RechargeTransactionCreateManyStaffInputEnvelope;
    connect?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
};
export type RechargeTransactionUncheckedCreateNestedManyWithoutStaffInput = {
    create?: Prisma.XOR<Prisma.RechargeTransactionCreateWithoutStaffInput, Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput> | Prisma.RechargeTransactionCreateWithoutStaffInput[] | Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.RechargeTransactionCreateOrConnectWithoutStaffInput | Prisma.RechargeTransactionCreateOrConnectWithoutStaffInput[];
    createMany?: Prisma.RechargeTransactionCreateManyStaffInputEnvelope;
    connect?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
};
export type RechargeTransactionUpdateManyWithoutStaffNestedInput = {
    create?: Prisma.XOR<Prisma.RechargeTransactionCreateWithoutStaffInput, Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput> | Prisma.RechargeTransactionCreateWithoutStaffInput[] | Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.RechargeTransactionCreateOrConnectWithoutStaffInput | Prisma.RechargeTransactionCreateOrConnectWithoutStaffInput[];
    upsert?: Prisma.RechargeTransactionUpsertWithWhereUniqueWithoutStaffInput | Prisma.RechargeTransactionUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: Prisma.RechargeTransactionCreateManyStaffInputEnvelope;
    set?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
    disconnect?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
    delete?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
    connect?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
    update?: Prisma.RechargeTransactionUpdateWithWhereUniqueWithoutStaffInput | Prisma.RechargeTransactionUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?: Prisma.RechargeTransactionUpdateManyWithWhereWithoutStaffInput | Prisma.RechargeTransactionUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: Prisma.RechargeTransactionScalarWhereInput | Prisma.RechargeTransactionScalarWhereInput[];
};
export type RechargeTransactionUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: Prisma.XOR<Prisma.RechargeTransactionCreateWithoutStaffInput, Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput> | Prisma.RechargeTransactionCreateWithoutStaffInput[] | Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.RechargeTransactionCreateOrConnectWithoutStaffInput | Prisma.RechargeTransactionCreateOrConnectWithoutStaffInput[];
    upsert?: Prisma.RechargeTransactionUpsertWithWhereUniqueWithoutStaffInput | Prisma.RechargeTransactionUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: Prisma.RechargeTransactionCreateManyStaffInputEnvelope;
    set?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
    disconnect?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
    delete?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
    connect?: Prisma.RechargeTransactionWhereUniqueInput | Prisma.RechargeTransactionWhereUniqueInput[];
    update?: Prisma.RechargeTransactionUpdateWithWhereUniqueWithoutStaffInput | Prisma.RechargeTransactionUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?: Prisma.RechargeTransactionUpdateManyWithWhereWithoutStaffInput | Prisma.RechargeTransactionUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: Prisma.RechargeTransactionScalarWhereInput | Prisma.RechargeTransactionScalarWhereInput[];
};
export type RechargeTransactionCreateWithoutStaffInput = {
    id?: string;
    operator: string;
    mobileNumber: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type RechargeTransactionUncheckedCreateWithoutStaffInput = {
    id?: string;
    operator: string;
    mobileNumber: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type RechargeTransactionCreateOrConnectWithoutStaffInput = {
    where: Prisma.RechargeTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RechargeTransactionCreateWithoutStaffInput, Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput>;
};
export type RechargeTransactionCreateManyStaffInputEnvelope = {
    data: Prisma.RechargeTransactionCreateManyStaffInput | Prisma.RechargeTransactionCreateManyStaffInput[];
    skipDuplicates?: boolean;
};
export type RechargeTransactionUpsertWithWhereUniqueWithoutStaffInput = {
    where: Prisma.RechargeTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.RechargeTransactionUpdateWithoutStaffInput, Prisma.RechargeTransactionUncheckedUpdateWithoutStaffInput>;
    create: Prisma.XOR<Prisma.RechargeTransactionCreateWithoutStaffInput, Prisma.RechargeTransactionUncheckedCreateWithoutStaffInput>;
};
export type RechargeTransactionUpdateWithWhereUniqueWithoutStaffInput = {
    where: Prisma.RechargeTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.RechargeTransactionUpdateWithoutStaffInput, Prisma.RechargeTransactionUncheckedUpdateWithoutStaffInput>;
};
export type RechargeTransactionUpdateManyWithWhereWithoutStaffInput = {
    where: Prisma.RechargeTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.RechargeTransactionUpdateManyMutationInput, Prisma.RechargeTransactionUncheckedUpdateManyWithoutStaffInput>;
};
export type RechargeTransactionScalarWhereInput = {
    AND?: Prisma.RechargeTransactionScalarWhereInput | Prisma.RechargeTransactionScalarWhereInput[];
    OR?: Prisma.RechargeTransactionScalarWhereInput[];
    NOT?: Prisma.RechargeTransactionScalarWhereInput | Prisma.RechargeTransactionScalarWhereInput[];
    id?: Prisma.StringFilter<"RechargeTransaction"> | string;
    staffId?: Prisma.StringFilter<"RechargeTransaction"> | string;
    operator?: Prisma.StringFilter<"RechargeTransaction"> | string;
    mobileNumber?: Prisma.StringFilter<"RechargeTransaction"> | string;
    amount?: Prisma.FloatFilter<"RechargeTransaction"> | number;
    commission?: Prisma.FloatFilter<"RechargeTransaction"> | number;
    createdAt?: Prisma.DateTimeFilter<"RechargeTransaction"> | Date | string;
};
export type RechargeTransactionCreateManyStaffInput = {
    id?: string;
    operator: string;
    mobileNumber: string;
    amount: number;
    commission?: number;
    createdAt?: Date | string;
};
export type RechargeTransactionUpdateWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.StringFieldUpdateOperationsInput | string;
    mobileNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RechargeTransactionUncheckedUpdateWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.StringFieldUpdateOperationsInput | string;
    mobileNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RechargeTransactionUncheckedUpdateManyWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operator?: Prisma.StringFieldUpdateOperationsInput | string;
    mobileNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    commission?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RechargeTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    operator?: boolean;
    mobileNumber?: boolean;
    amount?: boolean;
    commission?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rechargeTransaction"]>;
export type RechargeTransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    operator?: boolean;
    mobileNumber?: boolean;
    amount?: boolean;
    commission?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rechargeTransaction"]>;
export type RechargeTransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    operator?: boolean;
    mobileNumber?: boolean;
    amount?: boolean;
    commission?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rechargeTransaction"]>;
export type RechargeTransactionSelectScalar = {
    id?: boolean;
    staffId?: boolean;
    operator?: boolean;
    mobileNumber?: boolean;
    amount?: boolean;
    commission?: boolean;
    createdAt?: boolean;
};
export type RechargeTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "staffId" | "operator" | "mobileNumber" | "amount" | "commission" | "createdAt", ExtArgs["result"]["rechargeTransaction"]>;
export type RechargeTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RechargeTransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RechargeTransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RechargeTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RechargeTransaction";
    objects: {
        staff: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        staffId: string;
        operator: string;
        mobileNumber: string;
        amount: number;
        commission: number;
        createdAt: Date;
    }, ExtArgs["result"]["rechargeTransaction"]>;
    composites: {};
};
export type RechargeTransactionGetPayload<S extends boolean | null | undefined | RechargeTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload, S>;
export type RechargeTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RechargeTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RechargeTransactionCountAggregateInputType | true;
};
export interface RechargeTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RechargeTransaction'];
        meta: {
            name: 'RechargeTransaction';
        };
    };
    /**
     * Find zero or one RechargeTransaction that matches the filter.
     * @param {RechargeTransactionFindUniqueArgs} args - Arguments to find a RechargeTransaction
     * @example
     * // Get one RechargeTransaction
     * const rechargeTransaction = await prisma.rechargeTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RechargeTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, RechargeTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RechargeTransactionClient<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RechargeTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RechargeTransactionFindUniqueOrThrowArgs} args - Arguments to find a RechargeTransaction
     * @example
     * // Get one RechargeTransaction
     * const rechargeTransaction = await prisma.rechargeTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RechargeTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RechargeTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RechargeTransactionClient<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RechargeTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeTransactionFindFirstArgs} args - Arguments to find a RechargeTransaction
     * @example
     * // Get one RechargeTransaction
     * const rechargeTransaction = await prisma.rechargeTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RechargeTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, RechargeTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__RechargeTransactionClient<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RechargeTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeTransactionFindFirstOrThrowArgs} args - Arguments to find a RechargeTransaction
     * @example
     * // Get one RechargeTransaction
     * const rechargeTransaction = await prisma.rechargeTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RechargeTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RechargeTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RechargeTransactionClient<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RechargeTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RechargeTransactions
     * const rechargeTransactions = await prisma.rechargeTransaction.findMany()
     *
     * // Get first 10 RechargeTransactions
     * const rechargeTransactions = await prisma.rechargeTransaction.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const rechargeTransactionWithIdOnly = await prisma.rechargeTransaction.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RechargeTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, RechargeTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RechargeTransaction.
     * @param {RechargeTransactionCreateArgs} args - Arguments to create a RechargeTransaction.
     * @example
     * // Create one RechargeTransaction
     * const RechargeTransaction = await prisma.rechargeTransaction.create({
     *   data: {
     *     // ... data to create a RechargeTransaction
     *   }
     * })
     *
     */
    create<T extends RechargeTransactionCreateArgs>(args: Prisma.SelectSubset<T, RechargeTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__RechargeTransactionClient<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RechargeTransactions.
     * @param {RechargeTransactionCreateManyArgs} args - Arguments to create many RechargeTransactions.
     * @example
     * // Create many RechargeTransactions
     * const rechargeTransaction = await prisma.rechargeTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RechargeTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, RechargeTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many RechargeTransactions and returns the data saved in the database.
     * @param {RechargeTransactionCreateManyAndReturnArgs} args - Arguments to create many RechargeTransactions.
     * @example
     * // Create many RechargeTransactions
     * const rechargeTransaction = await prisma.rechargeTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RechargeTransactions and only return the `id`
     * const rechargeTransactionWithIdOnly = await prisma.rechargeTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RechargeTransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RechargeTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a RechargeTransaction.
     * @param {RechargeTransactionDeleteArgs} args - Arguments to delete one RechargeTransaction.
     * @example
     * // Delete one RechargeTransaction
     * const RechargeTransaction = await prisma.rechargeTransaction.delete({
     *   where: {
     *     // ... filter to delete one RechargeTransaction
     *   }
     * })
     *
     */
    delete<T extends RechargeTransactionDeleteArgs>(args: Prisma.SelectSubset<T, RechargeTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__RechargeTransactionClient<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RechargeTransaction.
     * @param {RechargeTransactionUpdateArgs} args - Arguments to update one RechargeTransaction.
     * @example
     * // Update one RechargeTransaction
     * const rechargeTransaction = await prisma.rechargeTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RechargeTransactionUpdateArgs>(args: Prisma.SelectSubset<T, RechargeTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__RechargeTransactionClient<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RechargeTransactions.
     * @param {RechargeTransactionDeleteManyArgs} args - Arguments to filter RechargeTransactions to delete.
     * @example
     * // Delete a few RechargeTransactions
     * const { count } = await prisma.rechargeTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RechargeTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, RechargeTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RechargeTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RechargeTransactions
     * const rechargeTransaction = await prisma.rechargeTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RechargeTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, RechargeTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RechargeTransactions and returns the data updated in the database.
     * @param {RechargeTransactionUpdateManyAndReturnArgs} args - Arguments to update many RechargeTransactions.
     * @example
     * // Update many RechargeTransactions
     * const rechargeTransaction = await prisma.rechargeTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RechargeTransactions and only return the `id`
     * const rechargeTransactionWithIdOnly = await prisma.rechargeTransaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends RechargeTransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RechargeTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one RechargeTransaction.
     * @param {RechargeTransactionUpsertArgs} args - Arguments to update or create a RechargeTransaction.
     * @example
     * // Update or create a RechargeTransaction
     * const rechargeTransaction = await prisma.rechargeTransaction.upsert({
     *   create: {
     *     // ... data to create a RechargeTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RechargeTransaction we want to update
     *   }
     * })
     */
    upsert<T extends RechargeTransactionUpsertArgs>(args: Prisma.SelectSubset<T, RechargeTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__RechargeTransactionClient<runtime.Types.Result.GetResult<Prisma.$RechargeTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RechargeTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeTransactionCountArgs} args - Arguments to filter RechargeTransactions to count.
     * @example
     * // Count the number of RechargeTransactions
     * const count = await prisma.rechargeTransaction.count({
     *   where: {
     *     // ... the filter for the RechargeTransactions we want to count
     *   }
     * })
    **/
    count<T extends RechargeTransactionCountArgs>(args?: Prisma.Subset<T, RechargeTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RechargeTransactionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RechargeTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RechargeTransactionAggregateArgs>(args: Prisma.Subset<T, RechargeTransactionAggregateArgs>): Prisma.PrismaPromise<GetRechargeTransactionAggregateType<T>>;
    /**
     * Group by RechargeTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RechargeTransactionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RechargeTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RechargeTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: RechargeTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RechargeTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRechargeTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RechargeTransaction model
     */
    readonly fields: RechargeTransactionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RechargeTransaction.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RechargeTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the RechargeTransaction model
 */
export interface RechargeTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"RechargeTransaction", 'String'>;
    readonly staffId: Prisma.FieldRef<"RechargeTransaction", 'String'>;
    readonly operator: Prisma.FieldRef<"RechargeTransaction", 'String'>;
    readonly mobileNumber: Prisma.FieldRef<"RechargeTransaction", 'String'>;
    readonly amount: Prisma.FieldRef<"RechargeTransaction", 'Float'>;
    readonly commission: Prisma.FieldRef<"RechargeTransaction", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"RechargeTransaction", 'DateTime'>;
}
/**
 * RechargeTransaction findUnique
 */
export type RechargeTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RechargeTransaction to fetch.
     */
    where: Prisma.RechargeTransactionWhereUniqueInput;
};
/**
 * RechargeTransaction findUniqueOrThrow
 */
export type RechargeTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RechargeTransaction to fetch.
     */
    where: Prisma.RechargeTransactionWhereUniqueInput;
};
/**
 * RechargeTransaction findFirst
 */
export type RechargeTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RechargeTransaction to fetch.
     */
    where?: Prisma.RechargeTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RechargeTransactions to fetch.
     */
    orderBy?: Prisma.RechargeTransactionOrderByWithRelationInput | Prisma.RechargeTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RechargeTransactions.
     */
    cursor?: Prisma.RechargeTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RechargeTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RechargeTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RechargeTransactions.
     */
    distinct?: Prisma.RechargeTransactionScalarFieldEnum | Prisma.RechargeTransactionScalarFieldEnum[];
};
/**
 * RechargeTransaction findFirstOrThrow
 */
export type RechargeTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RechargeTransaction to fetch.
     */
    where?: Prisma.RechargeTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RechargeTransactions to fetch.
     */
    orderBy?: Prisma.RechargeTransactionOrderByWithRelationInput | Prisma.RechargeTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RechargeTransactions.
     */
    cursor?: Prisma.RechargeTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RechargeTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RechargeTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RechargeTransactions.
     */
    distinct?: Prisma.RechargeTransactionScalarFieldEnum | Prisma.RechargeTransactionScalarFieldEnum[];
};
/**
 * RechargeTransaction findMany
 */
export type RechargeTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RechargeTransactions to fetch.
     */
    where?: Prisma.RechargeTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RechargeTransactions to fetch.
     */
    orderBy?: Prisma.RechargeTransactionOrderByWithRelationInput | Prisma.RechargeTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RechargeTransactions.
     */
    cursor?: Prisma.RechargeTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RechargeTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RechargeTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RechargeTransactions.
     */
    distinct?: Prisma.RechargeTransactionScalarFieldEnum | Prisma.RechargeTransactionScalarFieldEnum[];
};
/**
 * RechargeTransaction create
 */
export type RechargeTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a RechargeTransaction.
     */
    data: Prisma.XOR<Prisma.RechargeTransactionCreateInput, Prisma.RechargeTransactionUncheckedCreateInput>;
};
/**
 * RechargeTransaction createMany
 */
export type RechargeTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RechargeTransactions.
     */
    data: Prisma.RechargeTransactionCreateManyInput | Prisma.RechargeTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RechargeTransaction createManyAndReturn
 */
export type RechargeTransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RechargeTransaction
     */
    select?: Prisma.RechargeTransactionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RechargeTransaction
     */
    omit?: Prisma.RechargeTransactionOmit<ExtArgs> | null;
    /**
     * The data used to create many RechargeTransactions.
     */
    data: Prisma.RechargeTransactionCreateManyInput | Prisma.RechargeTransactionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RechargeTransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * RechargeTransaction update
 */
export type RechargeTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a RechargeTransaction.
     */
    data: Prisma.XOR<Prisma.RechargeTransactionUpdateInput, Prisma.RechargeTransactionUncheckedUpdateInput>;
    /**
     * Choose, which RechargeTransaction to update.
     */
    where: Prisma.RechargeTransactionWhereUniqueInput;
};
/**
 * RechargeTransaction updateMany
 */
export type RechargeTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RechargeTransactions.
     */
    data: Prisma.XOR<Prisma.RechargeTransactionUpdateManyMutationInput, Prisma.RechargeTransactionUncheckedUpdateManyInput>;
    /**
     * Filter which RechargeTransactions to update
     */
    where?: Prisma.RechargeTransactionWhereInput;
    /**
     * Limit how many RechargeTransactions to update.
     */
    limit?: number;
};
/**
 * RechargeTransaction updateManyAndReturn
 */
export type RechargeTransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RechargeTransaction
     */
    select?: Prisma.RechargeTransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RechargeTransaction
     */
    omit?: Prisma.RechargeTransactionOmit<ExtArgs> | null;
    /**
     * The data used to update RechargeTransactions.
     */
    data: Prisma.XOR<Prisma.RechargeTransactionUpdateManyMutationInput, Prisma.RechargeTransactionUncheckedUpdateManyInput>;
    /**
     * Filter which RechargeTransactions to update
     */
    where?: Prisma.RechargeTransactionWhereInput;
    /**
     * Limit how many RechargeTransactions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RechargeTransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * RechargeTransaction upsert
 */
export type RechargeTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the RechargeTransaction to update in case it exists.
     */
    where: Prisma.RechargeTransactionWhereUniqueInput;
    /**
     * In case the RechargeTransaction found by the `where` argument doesn't exist, create a new RechargeTransaction with this data.
     */
    create: Prisma.XOR<Prisma.RechargeTransactionCreateInput, Prisma.RechargeTransactionUncheckedCreateInput>;
    /**
     * In case the RechargeTransaction was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RechargeTransactionUpdateInput, Prisma.RechargeTransactionUncheckedUpdateInput>;
};
/**
 * RechargeTransaction delete
 */
export type RechargeTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which RechargeTransaction to delete.
     */
    where: Prisma.RechargeTransactionWhereUniqueInput;
};
/**
 * RechargeTransaction deleteMany
 */
export type RechargeTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RechargeTransactions to delete
     */
    where?: Prisma.RechargeTransactionWhereInput;
    /**
     * Limit how many RechargeTransactions to delete.
     */
    limit?: number;
};
/**
 * RechargeTransaction without action
 */
export type RechargeTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=RechargeTransaction.d.ts.map