import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model CashSession
 *
 */
export type CashSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$CashSessionPayload>;
export type AggregateCashSession = {
    _count: CashSessionCountAggregateOutputType | null;
    _avg: CashSessionAvgAggregateOutputType | null;
    _sum: CashSessionSumAggregateOutputType | null;
    _min: CashSessionMinAggregateOutputType | null;
    _max: CashSessionMaxAggregateOutputType | null;
};
export type CashSessionAvgAggregateOutputType = {
    openingBalance: number | null;
    closingBalance: number | null;
};
export type CashSessionSumAggregateOutputType = {
    openingBalance: number | null;
    closingBalance: number | null;
};
export type CashSessionMinAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    sessionDate: Date | null;
    openingBalance: number | null;
    closingBalance: number | null;
    notes: string | null;
    createdAt: Date | null;
};
export type CashSessionMaxAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    sessionDate: Date | null;
    openingBalance: number | null;
    closingBalance: number | null;
    notes: string | null;
    createdAt: Date | null;
};
export type CashSessionCountAggregateOutputType = {
    id: number;
    staffId: number;
    sessionDate: number;
    openingBalance: number;
    closingBalance: number;
    notes: number;
    createdAt: number;
    _all: number;
};
export type CashSessionAvgAggregateInputType = {
    openingBalance?: true;
    closingBalance?: true;
};
export type CashSessionSumAggregateInputType = {
    openingBalance?: true;
    closingBalance?: true;
};
export type CashSessionMinAggregateInputType = {
    id?: true;
    staffId?: true;
    sessionDate?: true;
    openingBalance?: true;
    closingBalance?: true;
    notes?: true;
    createdAt?: true;
};
export type CashSessionMaxAggregateInputType = {
    id?: true;
    staffId?: true;
    sessionDate?: true;
    openingBalance?: true;
    closingBalance?: true;
    notes?: true;
    createdAt?: true;
};
export type CashSessionCountAggregateInputType = {
    id?: true;
    staffId?: true;
    sessionDate?: true;
    openingBalance?: true;
    closingBalance?: true;
    notes?: true;
    createdAt?: true;
    _all?: true;
};
export type CashSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CashSession to aggregate.
     */
    where?: Prisma.CashSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CashSessions to fetch.
     */
    orderBy?: Prisma.CashSessionOrderByWithRelationInput | Prisma.CashSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.CashSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CashSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CashSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CashSessions
    **/
    _count?: true | CashSessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: CashSessionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: CashSessionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CashSessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CashSessionMaxAggregateInputType;
};
export type GetCashSessionAggregateType<T extends CashSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateCashSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCashSession[P]> : Prisma.GetScalarType<T[P], AggregateCashSession[P]>;
};
export type CashSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CashSessionWhereInput;
    orderBy?: Prisma.CashSessionOrderByWithAggregationInput | Prisma.CashSessionOrderByWithAggregationInput[];
    by: Prisma.CashSessionScalarFieldEnum[] | Prisma.CashSessionScalarFieldEnum;
    having?: Prisma.CashSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CashSessionCountAggregateInputType | true;
    _avg?: CashSessionAvgAggregateInputType;
    _sum?: CashSessionSumAggregateInputType;
    _min?: CashSessionMinAggregateInputType;
    _max?: CashSessionMaxAggregateInputType;
};
export type CashSessionGroupByOutputType = {
    id: string;
    staffId: string;
    sessionDate: Date;
    openingBalance: number;
    closingBalance: number | null;
    notes: string | null;
    createdAt: Date;
    _count: CashSessionCountAggregateOutputType | null;
    _avg: CashSessionAvgAggregateOutputType | null;
    _sum: CashSessionSumAggregateOutputType | null;
    _min: CashSessionMinAggregateOutputType | null;
    _max: CashSessionMaxAggregateOutputType | null;
};
export type GetCashSessionGroupByPayload<T extends CashSessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CashSessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CashSessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CashSessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CashSessionGroupByOutputType[P]>;
}>>;
export type CashSessionWhereInput = {
    AND?: Prisma.CashSessionWhereInput | Prisma.CashSessionWhereInput[];
    OR?: Prisma.CashSessionWhereInput[];
    NOT?: Prisma.CashSessionWhereInput | Prisma.CashSessionWhereInput[];
    id?: Prisma.StringFilter<"CashSession"> | string;
    staffId?: Prisma.StringFilter<"CashSession"> | string;
    sessionDate?: Prisma.DateTimeFilter<"CashSession"> | Date | string;
    openingBalance?: Prisma.FloatFilter<"CashSession"> | number;
    closingBalance?: Prisma.FloatNullableFilter<"CashSession"> | number | null;
    notes?: Prisma.StringNullableFilter<"CashSession"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CashSession"> | Date | string;
    staff?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CashSessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    sessionDate?: Prisma.SortOrder;
    openingBalance?: Prisma.SortOrder;
    closingBalance?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    staff?: Prisma.UserOrderByWithRelationInput;
};
export type CashSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CashSessionWhereInput | Prisma.CashSessionWhereInput[];
    OR?: Prisma.CashSessionWhereInput[];
    NOT?: Prisma.CashSessionWhereInput | Prisma.CashSessionWhereInput[];
    staffId?: Prisma.StringFilter<"CashSession"> | string;
    sessionDate?: Prisma.DateTimeFilter<"CashSession"> | Date | string;
    openingBalance?: Prisma.FloatFilter<"CashSession"> | number;
    closingBalance?: Prisma.FloatNullableFilter<"CashSession"> | number | null;
    notes?: Prisma.StringNullableFilter<"CashSession"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CashSession"> | Date | string;
    staff?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type CashSessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    sessionDate?: Prisma.SortOrder;
    openingBalance?: Prisma.SortOrder;
    closingBalance?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CashSessionCountOrderByAggregateInput;
    _avg?: Prisma.CashSessionAvgOrderByAggregateInput;
    _max?: Prisma.CashSessionMaxOrderByAggregateInput;
    _min?: Prisma.CashSessionMinOrderByAggregateInput;
    _sum?: Prisma.CashSessionSumOrderByAggregateInput;
};
export type CashSessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CashSessionScalarWhereWithAggregatesInput | Prisma.CashSessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CashSessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CashSessionScalarWhereWithAggregatesInput | Prisma.CashSessionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CashSession"> | string;
    staffId?: Prisma.StringWithAggregatesFilter<"CashSession"> | string;
    sessionDate?: Prisma.DateTimeWithAggregatesFilter<"CashSession"> | Date | string;
    openingBalance?: Prisma.FloatWithAggregatesFilter<"CashSession"> | number;
    closingBalance?: Prisma.FloatNullableWithAggregatesFilter<"CashSession"> | number | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"CashSession"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CashSession"> | Date | string;
};
export type CashSessionCreateInput = {
    id?: string;
    sessionDate?: Date | string;
    openingBalance: number;
    closingBalance?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
    staff: Prisma.UserCreateNestedOneWithoutCashSessionsInput;
};
export type CashSessionUncheckedCreateInput = {
    id?: string;
    staffId: string;
    sessionDate?: Date | string;
    openingBalance: number;
    closingBalance?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type CashSessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    openingBalance?: Prisma.FloatFieldUpdateOperationsInput | number;
    closingBalance?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staff?: Prisma.UserUpdateOneRequiredWithoutCashSessionsNestedInput;
};
export type CashSessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    staffId?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    openingBalance?: Prisma.FloatFieldUpdateOperationsInput | number;
    closingBalance?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashSessionCreateManyInput = {
    id?: string;
    staffId: string;
    sessionDate?: Date | string;
    openingBalance: number;
    closingBalance?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type CashSessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    openingBalance?: Prisma.FloatFieldUpdateOperationsInput | number;
    closingBalance?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashSessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    staffId?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    openingBalance?: Prisma.FloatFieldUpdateOperationsInput | number;
    closingBalance?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashSessionListRelationFilter = {
    every?: Prisma.CashSessionWhereInput;
    some?: Prisma.CashSessionWhereInput;
    none?: Prisma.CashSessionWhereInput;
};
export type CashSessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CashSessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    sessionDate?: Prisma.SortOrder;
    openingBalance?: Prisma.SortOrder;
    closingBalance?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CashSessionAvgOrderByAggregateInput = {
    openingBalance?: Prisma.SortOrder;
    closingBalance?: Prisma.SortOrder;
};
export type CashSessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    sessionDate?: Prisma.SortOrder;
    openingBalance?: Prisma.SortOrder;
    closingBalance?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CashSessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    sessionDate?: Prisma.SortOrder;
    openingBalance?: Prisma.SortOrder;
    closingBalance?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CashSessionSumOrderByAggregateInput = {
    openingBalance?: Prisma.SortOrder;
    closingBalance?: Prisma.SortOrder;
};
export type CashSessionCreateNestedManyWithoutStaffInput = {
    create?: Prisma.XOR<Prisma.CashSessionCreateWithoutStaffInput, Prisma.CashSessionUncheckedCreateWithoutStaffInput> | Prisma.CashSessionCreateWithoutStaffInput[] | Prisma.CashSessionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.CashSessionCreateOrConnectWithoutStaffInput | Prisma.CashSessionCreateOrConnectWithoutStaffInput[];
    createMany?: Prisma.CashSessionCreateManyStaffInputEnvelope;
    connect?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
};
export type CashSessionUncheckedCreateNestedManyWithoutStaffInput = {
    create?: Prisma.XOR<Prisma.CashSessionCreateWithoutStaffInput, Prisma.CashSessionUncheckedCreateWithoutStaffInput> | Prisma.CashSessionCreateWithoutStaffInput[] | Prisma.CashSessionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.CashSessionCreateOrConnectWithoutStaffInput | Prisma.CashSessionCreateOrConnectWithoutStaffInput[];
    createMany?: Prisma.CashSessionCreateManyStaffInputEnvelope;
    connect?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
};
export type CashSessionUpdateManyWithoutStaffNestedInput = {
    create?: Prisma.XOR<Prisma.CashSessionCreateWithoutStaffInput, Prisma.CashSessionUncheckedCreateWithoutStaffInput> | Prisma.CashSessionCreateWithoutStaffInput[] | Prisma.CashSessionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.CashSessionCreateOrConnectWithoutStaffInput | Prisma.CashSessionCreateOrConnectWithoutStaffInput[];
    upsert?: Prisma.CashSessionUpsertWithWhereUniqueWithoutStaffInput | Prisma.CashSessionUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: Prisma.CashSessionCreateManyStaffInputEnvelope;
    set?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
    disconnect?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
    delete?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
    connect?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
    update?: Prisma.CashSessionUpdateWithWhereUniqueWithoutStaffInput | Prisma.CashSessionUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?: Prisma.CashSessionUpdateManyWithWhereWithoutStaffInput | Prisma.CashSessionUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: Prisma.CashSessionScalarWhereInput | Prisma.CashSessionScalarWhereInput[];
};
export type CashSessionUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: Prisma.XOR<Prisma.CashSessionCreateWithoutStaffInput, Prisma.CashSessionUncheckedCreateWithoutStaffInput> | Prisma.CashSessionCreateWithoutStaffInput[] | Prisma.CashSessionUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.CashSessionCreateOrConnectWithoutStaffInput | Prisma.CashSessionCreateOrConnectWithoutStaffInput[];
    upsert?: Prisma.CashSessionUpsertWithWhereUniqueWithoutStaffInput | Prisma.CashSessionUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: Prisma.CashSessionCreateManyStaffInputEnvelope;
    set?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
    disconnect?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
    delete?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
    connect?: Prisma.CashSessionWhereUniqueInput | Prisma.CashSessionWhereUniqueInput[];
    update?: Prisma.CashSessionUpdateWithWhereUniqueWithoutStaffInput | Prisma.CashSessionUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?: Prisma.CashSessionUpdateManyWithWhereWithoutStaffInput | Prisma.CashSessionUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: Prisma.CashSessionScalarWhereInput | Prisma.CashSessionScalarWhereInput[];
};
export type CashSessionCreateWithoutStaffInput = {
    id?: string;
    sessionDate?: Date | string;
    openingBalance: number;
    closingBalance?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type CashSessionUncheckedCreateWithoutStaffInput = {
    id?: string;
    sessionDate?: Date | string;
    openingBalance: number;
    closingBalance?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type CashSessionCreateOrConnectWithoutStaffInput = {
    where: Prisma.CashSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CashSessionCreateWithoutStaffInput, Prisma.CashSessionUncheckedCreateWithoutStaffInput>;
};
export type CashSessionCreateManyStaffInputEnvelope = {
    data: Prisma.CashSessionCreateManyStaffInput | Prisma.CashSessionCreateManyStaffInput[];
    skipDuplicates?: boolean;
};
export type CashSessionUpsertWithWhereUniqueWithoutStaffInput = {
    where: Prisma.CashSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CashSessionUpdateWithoutStaffInput, Prisma.CashSessionUncheckedUpdateWithoutStaffInput>;
    create: Prisma.XOR<Prisma.CashSessionCreateWithoutStaffInput, Prisma.CashSessionUncheckedCreateWithoutStaffInput>;
};
export type CashSessionUpdateWithWhereUniqueWithoutStaffInput = {
    where: Prisma.CashSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CashSessionUpdateWithoutStaffInput, Prisma.CashSessionUncheckedUpdateWithoutStaffInput>;
};
export type CashSessionUpdateManyWithWhereWithoutStaffInput = {
    where: Prisma.CashSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.CashSessionUpdateManyMutationInput, Prisma.CashSessionUncheckedUpdateManyWithoutStaffInput>;
};
export type CashSessionScalarWhereInput = {
    AND?: Prisma.CashSessionScalarWhereInput | Prisma.CashSessionScalarWhereInput[];
    OR?: Prisma.CashSessionScalarWhereInput[];
    NOT?: Prisma.CashSessionScalarWhereInput | Prisma.CashSessionScalarWhereInput[];
    id?: Prisma.StringFilter<"CashSession"> | string;
    staffId?: Prisma.StringFilter<"CashSession"> | string;
    sessionDate?: Prisma.DateTimeFilter<"CashSession"> | Date | string;
    openingBalance?: Prisma.FloatFilter<"CashSession"> | number;
    closingBalance?: Prisma.FloatNullableFilter<"CashSession"> | number | null;
    notes?: Prisma.StringNullableFilter<"CashSession"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CashSession"> | Date | string;
};
export type CashSessionCreateManyStaffInput = {
    id?: string;
    sessionDate?: Date | string;
    openingBalance: number;
    closingBalance?: number | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type CashSessionUpdateWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    openingBalance?: Prisma.FloatFieldUpdateOperationsInput | number;
    closingBalance?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashSessionUncheckedUpdateWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    openingBalance?: Prisma.FloatFieldUpdateOperationsInput | number;
    closingBalance?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashSessionUncheckedUpdateManyWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    openingBalance?: Prisma.FloatFieldUpdateOperationsInput | number;
    closingBalance?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    sessionDate?: boolean;
    openingBalance?: boolean;
    closingBalance?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cashSession"]>;
export type CashSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    sessionDate?: boolean;
    openingBalance?: boolean;
    closingBalance?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cashSession"]>;
export type CashSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    sessionDate?: boolean;
    openingBalance?: boolean;
    closingBalance?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cashSession"]>;
export type CashSessionSelectScalar = {
    id?: boolean;
    staffId?: boolean;
    sessionDate?: boolean;
    openingBalance?: boolean;
    closingBalance?: boolean;
    notes?: boolean;
    createdAt?: boolean;
};
export type CashSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "staffId" | "sessionDate" | "openingBalance" | "closingBalance" | "notes" | "createdAt", ExtArgs["result"]["cashSession"]>;
export type CashSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CashSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CashSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CashSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CashSession";
    objects: {
        staff: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        staffId: string;
        sessionDate: Date;
        openingBalance: number;
        closingBalance: number | null;
        notes: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["cashSession"]>;
    composites: {};
};
export type CashSessionGetPayload<S extends boolean | null | undefined | CashSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CashSessionPayload, S>;
export type CashSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CashSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CashSessionCountAggregateInputType | true;
};
export interface CashSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CashSession'];
        meta: {
            name: 'CashSession';
        };
    };
    /**
     * Find zero or one CashSession that matches the filter.
     * @param {CashSessionFindUniqueArgs} args - Arguments to find a CashSession
     * @example
     * // Get one CashSession
     * const cashSession = await prisma.cashSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CashSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, CashSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CashSessionClient<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one CashSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CashSessionFindUniqueOrThrowArgs} args - Arguments to find a CashSession
     * @example
     * // Get one CashSession
     * const cashSession = await prisma.cashSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CashSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CashSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CashSessionClient<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CashSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSessionFindFirstArgs} args - Arguments to find a CashSession
     * @example
     * // Get one CashSession
     * const cashSession = await prisma.cashSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CashSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, CashSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CashSessionClient<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CashSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSessionFindFirstOrThrowArgs} args - Arguments to find a CashSession
     * @example
     * // Get one CashSession
     * const cashSession = await prisma.cashSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CashSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CashSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CashSessionClient<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more CashSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CashSessions
     * const cashSessions = await prisma.cashSession.findMany()
     *
     * // Get first 10 CashSessions
     * const cashSessions = await prisma.cashSession.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const cashSessionWithIdOnly = await prisma.cashSession.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CashSessionFindManyArgs>(args?: Prisma.SelectSubset<T, CashSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a CashSession.
     * @param {CashSessionCreateArgs} args - Arguments to create a CashSession.
     * @example
     * // Create one CashSession
     * const CashSession = await prisma.cashSession.create({
     *   data: {
     *     // ... data to create a CashSession
     *   }
     * })
     *
     */
    create<T extends CashSessionCreateArgs>(args: Prisma.SelectSubset<T, CashSessionCreateArgs<ExtArgs>>): Prisma.Prisma__CashSessionClient<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many CashSessions.
     * @param {CashSessionCreateManyArgs} args - Arguments to create many CashSessions.
     * @example
     * // Create many CashSessions
     * const cashSession = await prisma.cashSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CashSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, CashSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many CashSessions and returns the data saved in the database.
     * @param {CashSessionCreateManyAndReturnArgs} args - Arguments to create many CashSessions.
     * @example
     * // Create many CashSessions
     * const cashSession = await prisma.cashSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CashSessions and only return the `id`
     * const cashSessionWithIdOnly = await prisma.cashSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CashSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CashSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a CashSession.
     * @param {CashSessionDeleteArgs} args - Arguments to delete one CashSession.
     * @example
     * // Delete one CashSession
     * const CashSession = await prisma.cashSession.delete({
     *   where: {
     *     // ... filter to delete one CashSession
     *   }
     * })
     *
     */
    delete<T extends CashSessionDeleteArgs>(args: Prisma.SelectSubset<T, CashSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__CashSessionClient<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one CashSession.
     * @param {CashSessionUpdateArgs} args - Arguments to update one CashSession.
     * @example
     * // Update one CashSession
     * const cashSession = await prisma.cashSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CashSessionUpdateArgs>(args: Prisma.SelectSubset<T, CashSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__CashSessionClient<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more CashSessions.
     * @param {CashSessionDeleteManyArgs} args - Arguments to filter CashSessions to delete.
     * @example
     * // Delete a few CashSessions
     * const { count } = await prisma.cashSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CashSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CashSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CashSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CashSessions
     * const cashSession = await prisma.cashSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CashSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, CashSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CashSessions and returns the data updated in the database.
     * @param {CashSessionUpdateManyAndReturnArgs} args - Arguments to update many CashSessions.
     * @example
     * // Update many CashSessions
     * const cashSession = await prisma.cashSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more CashSessions and only return the `id`
     * const cashSessionWithIdOnly = await prisma.cashSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends CashSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CashSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one CashSession.
     * @param {CashSessionUpsertArgs} args - Arguments to update or create a CashSession.
     * @example
     * // Update or create a CashSession
     * const cashSession = await prisma.cashSession.upsert({
     *   create: {
     *     // ... data to create a CashSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CashSession we want to update
     *   }
     * })
     */
    upsert<T extends CashSessionUpsertArgs>(args: Prisma.SelectSubset<T, CashSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__CashSessionClient<runtime.Types.Result.GetResult<Prisma.$CashSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of CashSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSessionCountArgs} args - Arguments to filter CashSessions to count.
     * @example
     * // Count the number of CashSessions
     * const count = await prisma.cashSession.count({
     *   where: {
     *     // ... the filter for the CashSessions we want to count
     *   }
     * })
    **/
    count<T extends CashSessionCountArgs>(args?: Prisma.Subset<T, CashSessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CashSessionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a CashSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CashSessionAggregateArgs>(args: Prisma.Subset<T, CashSessionAggregateArgs>): Prisma.PrismaPromise<GetCashSessionAggregateType<T>>;
    /**
     * Group by CashSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashSessionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends CashSessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CashSessionGroupByArgs['orderBy'];
    } : {
        orderBy?: CashSessionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CashSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCashSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CashSession model
     */
    readonly fields: CashSessionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for CashSession.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CashSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the CashSession model
 */
export interface CashSessionFieldRefs {
    readonly id: Prisma.FieldRef<"CashSession", 'String'>;
    readonly staffId: Prisma.FieldRef<"CashSession", 'String'>;
    readonly sessionDate: Prisma.FieldRef<"CashSession", 'DateTime'>;
    readonly openingBalance: Prisma.FieldRef<"CashSession", 'Float'>;
    readonly closingBalance: Prisma.FieldRef<"CashSession", 'Float'>;
    readonly notes: Prisma.FieldRef<"CashSession", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CashSession", 'DateTime'>;
}
/**
 * CashSession findUnique
 */
export type CashSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CashSession to fetch.
     */
    where: Prisma.CashSessionWhereUniqueInput;
};
/**
 * CashSession findUniqueOrThrow
 */
export type CashSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CashSession to fetch.
     */
    where: Prisma.CashSessionWhereUniqueInput;
};
/**
 * CashSession findFirst
 */
export type CashSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CashSession to fetch.
     */
    where?: Prisma.CashSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CashSessions to fetch.
     */
    orderBy?: Prisma.CashSessionOrderByWithRelationInput | Prisma.CashSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CashSessions.
     */
    cursor?: Prisma.CashSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CashSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CashSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CashSessions.
     */
    distinct?: Prisma.CashSessionScalarFieldEnum | Prisma.CashSessionScalarFieldEnum[];
};
/**
 * CashSession findFirstOrThrow
 */
export type CashSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CashSession to fetch.
     */
    where?: Prisma.CashSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CashSessions to fetch.
     */
    orderBy?: Prisma.CashSessionOrderByWithRelationInput | Prisma.CashSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CashSessions.
     */
    cursor?: Prisma.CashSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CashSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CashSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CashSessions.
     */
    distinct?: Prisma.CashSessionScalarFieldEnum | Prisma.CashSessionScalarFieldEnum[];
};
/**
 * CashSession findMany
 */
export type CashSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which CashSessions to fetch.
     */
    where?: Prisma.CashSessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CashSessions to fetch.
     */
    orderBy?: Prisma.CashSessionOrderByWithRelationInput | Prisma.CashSessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CashSessions.
     */
    cursor?: Prisma.CashSessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CashSessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CashSessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CashSessions.
     */
    distinct?: Prisma.CashSessionScalarFieldEnum | Prisma.CashSessionScalarFieldEnum[];
};
/**
 * CashSession create
 */
export type CashSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a CashSession.
     */
    data: Prisma.XOR<Prisma.CashSessionCreateInput, Prisma.CashSessionUncheckedCreateInput>;
};
/**
 * CashSession createMany
 */
export type CashSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many CashSessions.
     */
    data: Prisma.CashSessionCreateManyInput | Prisma.CashSessionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * CashSession createManyAndReturn
 */
export type CashSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashSession
     */
    select?: Prisma.CashSessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CashSession
     */
    omit?: Prisma.CashSessionOmit<ExtArgs> | null;
    /**
     * The data used to create many CashSessions.
     */
    data: Prisma.CashSessionCreateManyInput | Prisma.CashSessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CashSessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * CashSession update
 */
export type CashSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a CashSession.
     */
    data: Prisma.XOR<Prisma.CashSessionUpdateInput, Prisma.CashSessionUncheckedUpdateInput>;
    /**
     * Choose, which CashSession to update.
     */
    where: Prisma.CashSessionWhereUniqueInput;
};
/**
 * CashSession updateMany
 */
export type CashSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update CashSessions.
     */
    data: Prisma.XOR<Prisma.CashSessionUpdateManyMutationInput, Prisma.CashSessionUncheckedUpdateManyInput>;
    /**
     * Filter which CashSessions to update
     */
    where?: Prisma.CashSessionWhereInput;
    /**
     * Limit how many CashSessions to update.
     */
    limit?: number;
};
/**
 * CashSession updateManyAndReturn
 */
export type CashSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashSession
     */
    select?: Prisma.CashSessionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CashSession
     */
    omit?: Prisma.CashSessionOmit<ExtArgs> | null;
    /**
     * The data used to update CashSessions.
     */
    data: Prisma.XOR<Prisma.CashSessionUpdateManyMutationInput, Prisma.CashSessionUncheckedUpdateManyInput>;
    /**
     * Filter which CashSessions to update
     */
    where?: Prisma.CashSessionWhereInput;
    /**
     * Limit how many CashSessions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CashSessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * CashSession upsert
 */
export type CashSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the CashSession to update in case it exists.
     */
    where: Prisma.CashSessionWhereUniqueInput;
    /**
     * In case the CashSession found by the `where` argument doesn't exist, create a new CashSession with this data.
     */
    create: Prisma.XOR<Prisma.CashSessionCreateInput, Prisma.CashSessionUncheckedCreateInput>;
    /**
     * In case the CashSession was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.CashSessionUpdateInput, Prisma.CashSessionUncheckedUpdateInput>;
};
/**
 * CashSession delete
 */
export type CashSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which CashSession to delete.
     */
    where: Prisma.CashSessionWhereUniqueInput;
};
/**
 * CashSession deleteMany
 */
export type CashSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CashSessions to delete
     */
    where?: Prisma.CashSessionWhereInput;
    /**
     * Limit how many CashSessions to delete.
     */
    limit?: number;
};
/**
 * CashSession without action
 */
export type CashSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=CashSession.d.ts.map