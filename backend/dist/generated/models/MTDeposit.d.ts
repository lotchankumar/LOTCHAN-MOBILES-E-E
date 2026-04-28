import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model MTDeposit
 *
 */
export type MTDepositModel = runtime.Types.Result.DefaultSelection<Prisma.$MTDepositPayload>;
export type AggregateMTDeposit = {
    _count: MTDepositCountAggregateOutputType | null;
    _avg: MTDepositAvgAggregateOutputType | null;
    _sum: MTDepositSumAggregateOutputType | null;
    _min: MTDepositMinAggregateOutputType | null;
    _max: MTDepositMaxAggregateOutputType | null;
};
export type MTDepositAvgAggregateOutputType = {
    amount: number | null;
};
export type MTDepositSumAggregateOutputType = {
    amount: number | null;
};
export type MTDepositMinAggregateOutputType = {
    id: string | null;
    managerId: string | null;
    provider: string | null;
    amount: number | null;
    reference: string | null;
    depositDate: Date | null;
    createdAt: Date | null;
};
export type MTDepositMaxAggregateOutputType = {
    id: string | null;
    managerId: string | null;
    provider: string | null;
    amount: number | null;
    reference: string | null;
    depositDate: Date | null;
    createdAt: Date | null;
};
export type MTDepositCountAggregateOutputType = {
    id: number;
    managerId: number;
    provider: number;
    amount: number;
    reference: number;
    depositDate: number;
    createdAt: number;
    _all: number;
};
export type MTDepositAvgAggregateInputType = {
    amount?: true;
};
export type MTDepositSumAggregateInputType = {
    amount?: true;
};
export type MTDepositMinAggregateInputType = {
    id?: true;
    managerId?: true;
    provider?: true;
    amount?: true;
    reference?: true;
    depositDate?: true;
    createdAt?: true;
};
export type MTDepositMaxAggregateInputType = {
    id?: true;
    managerId?: true;
    provider?: true;
    amount?: true;
    reference?: true;
    depositDate?: true;
    createdAt?: true;
};
export type MTDepositCountAggregateInputType = {
    id?: true;
    managerId?: true;
    provider?: true;
    amount?: true;
    reference?: true;
    depositDate?: true;
    createdAt?: true;
    _all?: true;
};
export type MTDepositAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MTDeposit to aggregate.
     */
    where?: Prisma.MTDepositWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MTDeposits to fetch.
     */
    orderBy?: Prisma.MTDepositOrderByWithRelationInput | Prisma.MTDepositOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MTDepositWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MTDeposits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MTDeposits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MTDeposits
    **/
    _count?: true | MTDepositCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MTDepositAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MTDepositSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MTDepositMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MTDepositMaxAggregateInputType;
};
export type GetMTDepositAggregateType<T extends MTDepositAggregateArgs> = {
    [P in keyof T & keyof AggregateMTDeposit]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMTDeposit[P]> : Prisma.GetScalarType<T[P], AggregateMTDeposit[P]>;
};
export type MTDepositGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MTDepositWhereInput;
    orderBy?: Prisma.MTDepositOrderByWithAggregationInput | Prisma.MTDepositOrderByWithAggregationInput[];
    by: Prisma.MTDepositScalarFieldEnum[] | Prisma.MTDepositScalarFieldEnum;
    having?: Prisma.MTDepositScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MTDepositCountAggregateInputType | true;
    _avg?: MTDepositAvgAggregateInputType;
    _sum?: MTDepositSumAggregateInputType;
    _min?: MTDepositMinAggregateInputType;
    _max?: MTDepositMaxAggregateInputType;
};
export type MTDepositGroupByOutputType = {
    id: string;
    managerId: string;
    provider: string;
    amount: number;
    reference: string | null;
    depositDate: Date;
    createdAt: Date;
    _count: MTDepositCountAggregateOutputType | null;
    _avg: MTDepositAvgAggregateOutputType | null;
    _sum: MTDepositSumAggregateOutputType | null;
    _min: MTDepositMinAggregateOutputType | null;
    _max: MTDepositMaxAggregateOutputType | null;
};
export type GetMTDepositGroupByPayload<T extends MTDepositGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MTDepositGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MTDepositGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MTDepositGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MTDepositGroupByOutputType[P]>;
}>>;
export type MTDepositWhereInput = {
    AND?: Prisma.MTDepositWhereInput | Prisma.MTDepositWhereInput[];
    OR?: Prisma.MTDepositWhereInput[];
    NOT?: Prisma.MTDepositWhereInput | Prisma.MTDepositWhereInput[];
    id?: Prisma.StringFilter<"MTDeposit"> | string;
    managerId?: Prisma.StringFilter<"MTDeposit"> | string;
    provider?: Prisma.StringFilter<"MTDeposit"> | string;
    amount?: Prisma.FloatFilter<"MTDeposit"> | number;
    reference?: Prisma.StringNullableFilter<"MTDeposit"> | string | null;
    depositDate?: Prisma.DateTimeFilter<"MTDeposit"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"MTDeposit"> | Date | string;
    manager?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type MTDepositOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    managerId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    depositDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    manager?: Prisma.UserOrderByWithRelationInput;
};
export type MTDepositWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MTDepositWhereInput | Prisma.MTDepositWhereInput[];
    OR?: Prisma.MTDepositWhereInput[];
    NOT?: Prisma.MTDepositWhereInput | Prisma.MTDepositWhereInput[];
    managerId?: Prisma.StringFilter<"MTDeposit"> | string;
    provider?: Prisma.StringFilter<"MTDeposit"> | string;
    amount?: Prisma.FloatFilter<"MTDeposit"> | number;
    reference?: Prisma.StringNullableFilter<"MTDeposit"> | string | null;
    depositDate?: Prisma.DateTimeFilter<"MTDeposit"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"MTDeposit"> | Date | string;
    manager?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type MTDepositOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    managerId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    depositDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MTDepositCountOrderByAggregateInput;
    _avg?: Prisma.MTDepositAvgOrderByAggregateInput;
    _max?: Prisma.MTDepositMaxOrderByAggregateInput;
    _min?: Prisma.MTDepositMinOrderByAggregateInput;
    _sum?: Prisma.MTDepositSumOrderByAggregateInput;
};
export type MTDepositScalarWhereWithAggregatesInput = {
    AND?: Prisma.MTDepositScalarWhereWithAggregatesInput | Prisma.MTDepositScalarWhereWithAggregatesInput[];
    OR?: Prisma.MTDepositScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MTDepositScalarWhereWithAggregatesInput | Prisma.MTDepositScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MTDeposit"> | string;
    managerId?: Prisma.StringWithAggregatesFilter<"MTDeposit"> | string;
    provider?: Prisma.StringWithAggregatesFilter<"MTDeposit"> | string;
    amount?: Prisma.FloatWithAggregatesFilter<"MTDeposit"> | number;
    reference?: Prisma.StringNullableWithAggregatesFilter<"MTDeposit"> | string | null;
    depositDate?: Prisma.DateTimeWithAggregatesFilter<"MTDeposit"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MTDeposit"> | Date | string;
};
export type MTDepositCreateInput = {
    id?: string;
    provider: string;
    amount: number;
    reference?: string | null;
    depositDate?: Date | string;
    createdAt?: Date | string;
    manager: Prisma.UserCreateNestedOneWithoutMtDepositsInput;
};
export type MTDepositUncheckedCreateInput = {
    id?: string;
    managerId: string;
    provider: string;
    amount: number;
    reference?: string | null;
    depositDate?: Date | string;
    createdAt?: Date | string;
};
export type MTDepositUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depositDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    manager?: Prisma.UserUpdateOneRequiredWithoutMtDepositsNestedInput;
};
export type MTDepositUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    managerId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depositDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MTDepositCreateManyInput = {
    id?: string;
    managerId: string;
    provider: string;
    amount: number;
    reference?: string | null;
    depositDate?: Date | string;
    createdAt?: Date | string;
};
export type MTDepositUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depositDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MTDepositUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    managerId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depositDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MTDepositListRelationFilter = {
    every?: Prisma.MTDepositWhereInput;
    some?: Prisma.MTDepositWhereInput;
    none?: Prisma.MTDepositWhereInput;
};
export type MTDepositOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MTDepositCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    managerId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    depositDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MTDepositAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type MTDepositMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    managerId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    depositDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MTDepositMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    managerId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    depositDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MTDepositSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type MTDepositCreateNestedManyWithoutManagerInput = {
    create?: Prisma.XOR<Prisma.MTDepositCreateWithoutManagerInput, Prisma.MTDepositUncheckedCreateWithoutManagerInput> | Prisma.MTDepositCreateWithoutManagerInput[] | Prisma.MTDepositUncheckedCreateWithoutManagerInput[];
    connectOrCreate?: Prisma.MTDepositCreateOrConnectWithoutManagerInput | Prisma.MTDepositCreateOrConnectWithoutManagerInput[];
    createMany?: Prisma.MTDepositCreateManyManagerInputEnvelope;
    connect?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
};
export type MTDepositUncheckedCreateNestedManyWithoutManagerInput = {
    create?: Prisma.XOR<Prisma.MTDepositCreateWithoutManagerInput, Prisma.MTDepositUncheckedCreateWithoutManagerInput> | Prisma.MTDepositCreateWithoutManagerInput[] | Prisma.MTDepositUncheckedCreateWithoutManagerInput[];
    connectOrCreate?: Prisma.MTDepositCreateOrConnectWithoutManagerInput | Prisma.MTDepositCreateOrConnectWithoutManagerInput[];
    createMany?: Prisma.MTDepositCreateManyManagerInputEnvelope;
    connect?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
};
export type MTDepositUpdateManyWithoutManagerNestedInput = {
    create?: Prisma.XOR<Prisma.MTDepositCreateWithoutManagerInput, Prisma.MTDepositUncheckedCreateWithoutManagerInput> | Prisma.MTDepositCreateWithoutManagerInput[] | Prisma.MTDepositUncheckedCreateWithoutManagerInput[];
    connectOrCreate?: Prisma.MTDepositCreateOrConnectWithoutManagerInput | Prisma.MTDepositCreateOrConnectWithoutManagerInput[];
    upsert?: Prisma.MTDepositUpsertWithWhereUniqueWithoutManagerInput | Prisma.MTDepositUpsertWithWhereUniqueWithoutManagerInput[];
    createMany?: Prisma.MTDepositCreateManyManagerInputEnvelope;
    set?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
    disconnect?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
    delete?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
    connect?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
    update?: Prisma.MTDepositUpdateWithWhereUniqueWithoutManagerInput | Prisma.MTDepositUpdateWithWhereUniqueWithoutManagerInput[];
    updateMany?: Prisma.MTDepositUpdateManyWithWhereWithoutManagerInput | Prisma.MTDepositUpdateManyWithWhereWithoutManagerInput[];
    deleteMany?: Prisma.MTDepositScalarWhereInput | Prisma.MTDepositScalarWhereInput[];
};
export type MTDepositUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: Prisma.XOR<Prisma.MTDepositCreateWithoutManagerInput, Prisma.MTDepositUncheckedCreateWithoutManagerInput> | Prisma.MTDepositCreateWithoutManagerInput[] | Prisma.MTDepositUncheckedCreateWithoutManagerInput[];
    connectOrCreate?: Prisma.MTDepositCreateOrConnectWithoutManagerInput | Prisma.MTDepositCreateOrConnectWithoutManagerInput[];
    upsert?: Prisma.MTDepositUpsertWithWhereUniqueWithoutManagerInput | Prisma.MTDepositUpsertWithWhereUniqueWithoutManagerInput[];
    createMany?: Prisma.MTDepositCreateManyManagerInputEnvelope;
    set?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
    disconnect?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
    delete?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
    connect?: Prisma.MTDepositWhereUniqueInput | Prisma.MTDepositWhereUniqueInput[];
    update?: Prisma.MTDepositUpdateWithWhereUniqueWithoutManagerInput | Prisma.MTDepositUpdateWithWhereUniqueWithoutManagerInput[];
    updateMany?: Prisma.MTDepositUpdateManyWithWhereWithoutManagerInput | Prisma.MTDepositUpdateManyWithWhereWithoutManagerInput[];
    deleteMany?: Prisma.MTDepositScalarWhereInput | Prisma.MTDepositScalarWhereInput[];
};
export type MTDepositCreateWithoutManagerInput = {
    id?: string;
    provider: string;
    amount: number;
    reference?: string | null;
    depositDate?: Date | string;
    createdAt?: Date | string;
};
export type MTDepositUncheckedCreateWithoutManagerInput = {
    id?: string;
    provider: string;
    amount: number;
    reference?: string | null;
    depositDate?: Date | string;
    createdAt?: Date | string;
};
export type MTDepositCreateOrConnectWithoutManagerInput = {
    where: Prisma.MTDepositWhereUniqueInput;
    create: Prisma.XOR<Prisma.MTDepositCreateWithoutManagerInput, Prisma.MTDepositUncheckedCreateWithoutManagerInput>;
};
export type MTDepositCreateManyManagerInputEnvelope = {
    data: Prisma.MTDepositCreateManyManagerInput | Prisma.MTDepositCreateManyManagerInput[];
    skipDuplicates?: boolean;
};
export type MTDepositUpsertWithWhereUniqueWithoutManagerInput = {
    where: Prisma.MTDepositWhereUniqueInput;
    update: Prisma.XOR<Prisma.MTDepositUpdateWithoutManagerInput, Prisma.MTDepositUncheckedUpdateWithoutManagerInput>;
    create: Prisma.XOR<Prisma.MTDepositCreateWithoutManagerInput, Prisma.MTDepositUncheckedCreateWithoutManagerInput>;
};
export type MTDepositUpdateWithWhereUniqueWithoutManagerInput = {
    where: Prisma.MTDepositWhereUniqueInput;
    data: Prisma.XOR<Prisma.MTDepositUpdateWithoutManagerInput, Prisma.MTDepositUncheckedUpdateWithoutManagerInput>;
};
export type MTDepositUpdateManyWithWhereWithoutManagerInput = {
    where: Prisma.MTDepositScalarWhereInput;
    data: Prisma.XOR<Prisma.MTDepositUpdateManyMutationInput, Prisma.MTDepositUncheckedUpdateManyWithoutManagerInput>;
};
export type MTDepositScalarWhereInput = {
    AND?: Prisma.MTDepositScalarWhereInput | Prisma.MTDepositScalarWhereInput[];
    OR?: Prisma.MTDepositScalarWhereInput[];
    NOT?: Prisma.MTDepositScalarWhereInput | Prisma.MTDepositScalarWhereInput[];
    id?: Prisma.StringFilter<"MTDeposit"> | string;
    managerId?: Prisma.StringFilter<"MTDeposit"> | string;
    provider?: Prisma.StringFilter<"MTDeposit"> | string;
    amount?: Prisma.FloatFilter<"MTDeposit"> | number;
    reference?: Prisma.StringNullableFilter<"MTDeposit"> | string | null;
    depositDate?: Prisma.DateTimeFilter<"MTDeposit"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"MTDeposit"> | Date | string;
};
export type MTDepositCreateManyManagerInput = {
    id?: string;
    provider: string;
    amount: number;
    reference?: string | null;
    depositDate?: Date | string;
    createdAt?: Date | string;
};
export type MTDepositUpdateWithoutManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depositDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MTDepositUncheckedUpdateWithoutManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depositDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MTDepositUncheckedUpdateManyWithoutManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depositDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MTDepositSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    managerId?: boolean;
    provider?: boolean;
    amount?: boolean;
    reference?: boolean;
    depositDate?: boolean;
    createdAt?: boolean;
    manager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mTDeposit"]>;
export type MTDepositSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    managerId?: boolean;
    provider?: boolean;
    amount?: boolean;
    reference?: boolean;
    depositDate?: boolean;
    createdAt?: boolean;
    manager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mTDeposit"]>;
export type MTDepositSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    managerId?: boolean;
    provider?: boolean;
    amount?: boolean;
    reference?: boolean;
    depositDate?: boolean;
    createdAt?: boolean;
    manager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mTDeposit"]>;
export type MTDepositSelectScalar = {
    id?: boolean;
    managerId?: boolean;
    provider?: boolean;
    amount?: boolean;
    reference?: boolean;
    depositDate?: boolean;
    createdAt?: boolean;
};
export type MTDepositOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "managerId" | "provider" | "amount" | "reference" | "depositDate" | "createdAt", ExtArgs["result"]["mTDeposit"]>;
export type MTDepositInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MTDepositIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MTDepositIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    manager?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $MTDepositPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MTDeposit";
    objects: {
        manager: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        managerId: string;
        provider: string;
        amount: number;
        reference: string | null;
        depositDate: Date;
        createdAt: Date;
    }, ExtArgs["result"]["mTDeposit"]>;
    composites: {};
};
export type MTDepositGetPayload<S extends boolean | null | undefined | MTDepositDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MTDepositPayload, S>;
export type MTDepositCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MTDepositFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MTDepositCountAggregateInputType | true;
};
export interface MTDepositDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MTDeposit'];
        meta: {
            name: 'MTDeposit';
        };
    };
    /**
     * Find zero or one MTDeposit that matches the filter.
     * @param {MTDepositFindUniqueArgs} args - Arguments to find a MTDeposit
     * @example
     * // Get one MTDeposit
     * const mTDeposit = await prisma.mTDeposit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MTDepositFindUniqueArgs>(args: Prisma.SelectSubset<T, MTDepositFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MTDepositClient<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MTDeposit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MTDepositFindUniqueOrThrowArgs} args - Arguments to find a MTDeposit
     * @example
     * // Get one MTDeposit
     * const mTDeposit = await prisma.mTDeposit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MTDepositFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MTDepositFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MTDepositClient<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MTDeposit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MTDepositFindFirstArgs} args - Arguments to find a MTDeposit
     * @example
     * // Get one MTDeposit
     * const mTDeposit = await prisma.mTDeposit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MTDepositFindFirstArgs>(args?: Prisma.SelectSubset<T, MTDepositFindFirstArgs<ExtArgs>>): Prisma.Prisma__MTDepositClient<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MTDeposit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MTDepositFindFirstOrThrowArgs} args - Arguments to find a MTDeposit
     * @example
     * // Get one MTDeposit
     * const mTDeposit = await prisma.mTDeposit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MTDepositFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MTDepositFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MTDepositClient<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MTDeposits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MTDepositFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MTDeposits
     * const mTDeposits = await prisma.mTDeposit.findMany()
     *
     * // Get first 10 MTDeposits
     * const mTDeposits = await prisma.mTDeposit.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const mTDepositWithIdOnly = await prisma.mTDeposit.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MTDepositFindManyArgs>(args?: Prisma.SelectSubset<T, MTDepositFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MTDeposit.
     * @param {MTDepositCreateArgs} args - Arguments to create a MTDeposit.
     * @example
     * // Create one MTDeposit
     * const MTDeposit = await prisma.mTDeposit.create({
     *   data: {
     *     // ... data to create a MTDeposit
     *   }
     * })
     *
     */
    create<T extends MTDepositCreateArgs>(args: Prisma.SelectSubset<T, MTDepositCreateArgs<ExtArgs>>): Prisma.Prisma__MTDepositClient<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MTDeposits.
     * @param {MTDepositCreateManyArgs} args - Arguments to create many MTDeposits.
     * @example
     * // Create many MTDeposits
     * const mTDeposit = await prisma.mTDeposit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MTDepositCreateManyArgs>(args?: Prisma.SelectSubset<T, MTDepositCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MTDeposits and returns the data saved in the database.
     * @param {MTDepositCreateManyAndReturnArgs} args - Arguments to create many MTDeposits.
     * @example
     * // Create many MTDeposits
     * const mTDeposit = await prisma.mTDeposit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MTDeposits and only return the `id`
     * const mTDepositWithIdOnly = await prisma.mTDeposit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MTDepositCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MTDepositCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MTDeposit.
     * @param {MTDepositDeleteArgs} args - Arguments to delete one MTDeposit.
     * @example
     * // Delete one MTDeposit
     * const MTDeposit = await prisma.mTDeposit.delete({
     *   where: {
     *     // ... filter to delete one MTDeposit
     *   }
     * })
     *
     */
    delete<T extends MTDepositDeleteArgs>(args: Prisma.SelectSubset<T, MTDepositDeleteArgs<ExtArgs>>): Prisma.Prisma__MTDepositClient<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MTDeposit.
     * @param {MTDepositUpdateArgs} args - Arguments to update one MTDeposit.
     * @example
     * // Update one MTDeposit
     * const mTDeposit = await prisma.mTDeposit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MTDepositUpdateArgs>(args: Prisma.SelectSubset<T, MTDepositUpdateArgs<ExtArgs>>): Prisma.Prisma__MTDepositClient<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MTDeposits.
     * @param {MTDepositDeleteManyArgs} args - Arguments to filter MTDeposits to delete.
     * @example
     * // Delete a few MTDeposits
     * const { count } = await prisma.mTDeposit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MTDepositDeleteManyArgs>(args?: Prisma.SelectSubset<T, MTDepositDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MTDeposits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MTDepositUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MTDeposits
     * const mTDeposit = await prisma.mTDeposit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MTDepositUpdateManyArgs>(args: Prisma.SelectSubset<T, MTDepositUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MTDeposits and returns the data updated in the database.
     * @param {MTDepositUpdateManyAndReturnArgs} args - Arguments to update many MTDeposits.
     * @example
     * // Update many MTDeposits
     * const mTDeposit = await prisma.mTDeposit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MTDeposits and only return the `id`
     * const mTDepositWithIdOnly = await prisma.mTDeposit.updateManyAndReturn({
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
    updateManyAndReturn<T extends MTDepositUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MTDepositUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MTDeposit.
     * @param {MTDepositUpsertArgs} args - Arguments to update or create a MTDeposit.
     * @example
     * // Update or create a MTDeposit
     * const mTDeposit = await prisma.mTDeposit.upsert({
     *   create: {
     *     // ... data to create a MTDeposit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MTDeposit we want to update
     *   }
     * })
     */
    upsert<T extends MTDepositUpsertArgs>(args: Prisma.SelectSubset<T, MTDepositUpsertArgs<ExtArgs>>): Prisma.Prisma__MTDepositClient<runtime.Types.Result.GetResult<Prisma.$MTDepositPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MTDeposits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MTDepositCountArgs} args - Arguments to filter MTDeposits to count.
     * @example
     * // Count the number of MTDeposits
     * const count = await prisma.mTDeposit.count({
     *   where: {
     *     // ... the filter for the MTDeposits we want to count
     *   }
     * })
    **/
    count<T extends MTDepositCountArgs>(args?: Prisma.Subset<T, MTDepositCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MTDepositCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MTDeposit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MTDepositAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MTDepositAggregateArgs>(args: Prisma.Subset<T, MTDepositAggregateArgs>): Prisma.PrismaPromise<GetMTDepositAggregateType<T>>;
    /**
     * Group by MTDeposit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MTDepositGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MTDepositGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MTDepositGroupByArgs['orderBy'];
    } : {
        orderBy?: MTDepositGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MTDepositGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMTDepositGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MTDeposit model
     */
    readonly fields: MTDepositFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MTDeposit.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MTDepositClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    manager<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the MTDeposit model
 */
export interface MTDepositFieldRefs {
    readonly id: Prisma.FieldRef<"MTDeposit", 'String'>;
    readonly managerId: Prisma.FieldRef<"MTDeposit", 'String'>;
    readonly provider: Prisma.FieldRef<"MTDeposit", 'String'>;
    readonly amount: Prisma.FieldRef<"MTDeposit", 'Float'>;
    readonly reference: Prisma.FieldRef<"MTDeposit", 'String'>;
    readonly depositDate: Prisma.FieldRef<"MTDeposit", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"MTDeposit", 'DateTime'>;
}
/**
 * MTDeposit findUnique
 */
export type MTDepositFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MTDeposit to fetch.
     */
    where: Prisma.MTDepositWhereUniqueInput;
};
/**
 * MTDeposit findUniqueOrThrow
 */
export type MTDepositFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MTDeposit to fetch.
     */
    where: Prisma.MTDepositWhereUniqueInput;
};
/**
 * MTDeposit findFirst
 */
export type MTDepositFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MTDeposit to fetch.
     */
    where?: Prisma.MTDepositWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MTDeposits to fetch.
     */
    orderBy?: Prisma.MTDepositOrderByWithRelationInput | Prisma.MTDepositOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MTDeposits.
     */
    cursor?: Prisma.MTDepositWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MTDeposits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MTDeposits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MTDeposits.
     */
    distinct?: Prisma.MTDepositScalarFieldEnum | Prisma.MTDepositScalarFieldEnum[];
};
/**
 * MTDeposit findFirstOrThrow
 */
export type MTDepositFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MTDeposit to fetch.
     */
    where?: Prisma.MTDepositWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MTDeposits to fetch.
     */
    orderBy?: Prisma.MTDepositOrderByWithRelationInput | Prisma.MTDepositOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MTDeposits.
     */
    cursor?: Prisma.MTDepositWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MTDeposits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MTDeposits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MTDeposits.
     */
    distinct?: Prisma.MTDepositScalarFieldEnum | Prisma.MTDepositScalarFieldEnum[];
};
/**
 * MTDeposit findMany
 */
export type MTDepositFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MTDeposits to fetch.
     */
    where?: Prisma.MTDepositWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MTDeposits to fetch.
     */
    orderBy?: Prisma.MTDepositOrderByWithRelationInput | Prisma.MTDepositOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MTDeposits.
     */
    cursor?: Prisma.MTDepositWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MTDeposits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MTDeposits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MTDeposits.
     */
    distinct?: Prisma.MTDepositScalarFieldEnum | Prisma.MTDepositScalarFieldEnum[];
};
/**
 * MTDeposit create
 */
export type MTDepositCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a MTDeposit.
     */
    data: Prisma.XOR<Prisma.MTDepositCreateInput, Prisma.MTDepositUncheckedCreateInput>;
};
/**
 * MTDeposit createMany
 */
export type MTDepositCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MTDeposits.
     */
    data: Prisma.MTDepositCreateManyInput | Prisma.MTDepositCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MTDeposit createManyAndReturn
 */
export type MTDepositCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MTDeposit
     */
    select?: Prisma.MTDepositSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MTDeposit
     */
    omit?: Prisma.MTDepositOmit<ExtArgs> | null;
    /**
     * The data used to create many MTDeposits.
     */
    data: Prisma.MTDepositCreateManyInput | Prisma.MTDepositCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MTDepositIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MTDeposit update
 */
export type MTDepositUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a MTDeposit.
     */
    data: Prisma.XOR<Prisma.MTDepositUpdateInput, Prisma.MTDepositUncheckedUpdateInput>;
    /**
     * Choose, which MTDeposit to update.
     */
    where: Prisma.MTDepositWhereUniqueInput;
};
/**
 * MTDeposit updateMany
 */
export type MTDepositUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MTDeposits.
     */
    data: Prisma.XOR<Prisma.MTDepositUpdateManyMutationInput, Prisma.MTDepositUncheckedUpdateManyInput>;
    /**
     * Filter which MTDeposits to update
     */
    where?: Prisma.MTDepositWhereInput;
    /**
     * Limit how many MTDeposits to update.
     */
    limit?: number;
};
/**
 * MTDeposit updateManyAndReturn
 */
export type MTDepositUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MTDeposit
     */
    select?: Prisma.MTDepositSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MTDeposit
     */
    omit?: Prisma.MTDepositOmit<ExtArgs> | null;
    /**
     * The data used to update MTDeposits.
     */
    data: Prisma.XOR<Prisma.MTDepositUpdateManyMutationInput, Prisma.MTDepositUncheckedUpdateManyInput>;
    /**
     * Filter which MTDeposits to update
     */
    where?: Prisma.MTDepositWhereInput;
    /**
     * Limit how many MTDeposits to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MTDepositIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MTDeposit upsert
 */
export type MTDepositUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the MTDeposit to update in case it exists.
     */
    where: Prisma.MTDepositWhereUniqueInput;
    /**
     * In case the MTDeposit found by the `where` argument doesn't exist, create a new MTDeposit with this data.
     */
    create: Prisma.XOR<Prisma.MTDepositCreateInput, Prisma.MTDepositUncheckedCreateInput>;
    /**
     * In case the MTDeposit was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MTDepositUpdateInput, Prisma.MTDepositUncheckedUpdateInput>;
};
/**
 * MTDeposit delete
 */
export type MTDepositDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which MTDeposit to delete.
     */
    where: Prisma.MTDepositWhereUniqueInput;
};
/**
 * MTDeposit deleteMany
 */
export type MTDepositDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MTDeposits to delete
     */
    where?: Prisma.MTDepositWhereInput;
    /**
     * Limit how many MTDeposits to delete.
     */
    limit?: number;
};
/**
 * MTDeposit without action
 */
export type MTDepositDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=MTDeposit.d.ts.map