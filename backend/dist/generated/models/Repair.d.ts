import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Repair
 *
 */
export type RepairModel = runtime.Types.Result.DefaultSelection<Prisma.$RepairPayload>;
export type AggregateRepair = {
    _count: RepairCountAggregateOutputType | null;
    _avg: RepairAvgAggregateOutputType | null;
    _sum: RepairSumAggregateOutputType | null;
    _min: RepairMinAggregateOutputType | null;
    _max: RepairMaxAggregateOutputType | null;
};
export type RepairAvgAggregateOutputType = {
    estimatedCost: number | null;
    finalAmount: number | null;
};
export type RepairSumAggregateOutputType = {
    estimatedCost: number | null;
    finalAmount: number | null;
};
export type RepairMinAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    customerName: string | null;
    customerPhone: string | null;
    deviceModel: string | null;
    complaint: string | null;
    estimatedCost: number | null;
    finalAmount: number | null;
    status: $Enums.RepairStatus | null;
    receivedDate: Date | null;
    deliveredDate: Date | null;
    createdAt: Date | null;
};
export type RepairMaxAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    customerName: string | null;
    customerPhone: string | null;
    deviceModel: string | null;
    complaint: string | null;
    estimatedCost: number | null;
    finalAmount: number | null;
    status: $Enums.RepairStatus | null;
    receivedDate: Date | null;
    deliveredDate: Date | null;
    createdAt: Date | null;
};
export type RepairCountAggregateOutputType = {
    id: number;
    staffId: number;
    customerName: number;
    customerPhone: number;
    deviceModel: number;
    complaint: number;
    estimatedCost: number;
    finalAmount: number;
    status: number;
    receivedDate: number;
    deliveredDate: number;
    partsUsed: number;
    createdAt: number;
    _all: number;
};
export type RepairAvgAggregateInputType = {
    estimatedCost?: true;
    finalAmount?: true;
};
export type RepairSumAggregateInputType = {
    estimatedCost?: true;
    finalAmount?: true;
};
export type RepairMinAggregateInputType = {
    id?: true;
    staffId?: true;
    customerName?: true;
    customerPhone?: true;
    deviceModel?: true;
    complaint?: true;
    estimatedCost?: true;
    finalAmount?: true;
    status?: true;
    receivedDate?: true;
    deliveredDate?: true;
    createdAt?: true;
};
export type RepairMaxAggregateInputType = {
    id?: true;
    staffId?: true;
    customerName?: true;
    customerPhone?: true;
    deviceModel?: true;
    complaint?: true;
    estimatedCost?: true;
    finalAmount?: true;
    status?: true;
    receivedDate?: true;
    deliveredDate?: true;
    createdAt?: true;
};
export type RepairCountAggregateInputType = {
    id?: true;
    staffId?: true;
    customerName?: true;
    customerPhone?: true;
    deviceModel?: true;
    complaint?: true;
    estimatedCost?: true;
    finalAmount?: true;
    status?: true;
    receivedDate?: true;
    deliveredDate?: true;
    partsUsed?: true;
    createdAt?: true;
    _all?: true;
};
export type RepairAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Repair to aggregate.
     */
    where?: Prisma.RepairWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Repairs to fetch.
     */
    orderBy?: Prisma.RepairOrderByWithRelationInput | Prisma.RepairOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RepairWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Repairs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Repairs
    **/
    _count?: true | RepairCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: RepairAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: RepairSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RepairMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RepairMaxAggregateInputType;
};
export type GetRepairAggregateType<T extends RepairAggregateArgs> = {
    [P in keyof T & keyof AggregateRepair]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRepair[P]> : Prisma.GetScalarType<T[P], AggregateRepair[P]>;
};
export type RepairGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RepairWhereInput;
    orderBy?: Prisma.RepairOrderByWithAggregationInput | Prisma.RepairOrderByWithAggregationInput[];
    by: Prisma.RepairScalarFieldEnum[] | Prisma.RepairScalarFieldEnum;
    having?: Prisma.RepairScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RepairCountAggregateInputType | true;
    _avg?: RepairAvgAggregateInputType;
    _sum?: RepairSumAggregateInputType;
    _min?: RepairMinAggregateInputType;
    _max?: RepairMaxAggregateInputType;
};
export type RepairGroupByOutputType = {
    id: string;
    staffId: string;
    customerName: string;
    customerPhone: string;
    deviceModel: string;
    complaint: string;
    estimatedCost: number | null;
    finalAmount: number | null;
    status: $Enums.RepairStatus;
    receivedDate: Date;
    deliveredDate: Date | null;
    partsUsed: runtime.JsonValue | null;
    createdAt: Date;
    _count: RepairCountAggregateOutputType | null;
    _avg: RepairAvgAggregateOutputType | null;
    _sum: RepairSumAggregateOutputType | null;
    _min: RepairMinAggregateOutputType | null;
    _max: RepairMaxAggregateOutputType | null;
};
export type GetRepairGroupByPayload<T extends RepairGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RepairGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RepairGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RepairGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RepairGroupByOutputType[P]>;
}>>;
export type RepairWhereInput = {
    AND?: Prisma.RepairWhereInput | Prisma.RepairWhereInput[];
    OR?: Prisma.RepairWhereInput[];
    NOT?: Prisma.RepairWhereInput | Prisma.RepairWhereInput[];
    id?: Prisma.StringFilter<"Repair"> | string;
    staffId?: Prisma.StringFilter<"Repair"> | string;
    customerName?: Prisma.StringFilter<"Repair"> | string;
    customerPhone?: Prisma.StringFilter<"Repair"> | string;
    deviceModel?: Prisma.StringFilter<"Repair"> | string;
    complaint?: Prisma.StringFilter<"Repair"> | string;
    estimatedCost?: Prisma.FloatNullableFilter<"Repair"> | number | null;
    finalAmount?: Prisma.FloatNullableFilter<"Repair"> | number | null;
    status?: Prisma.EnumRepairStatusFilter<"Repair"> | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFilter<"Repair"> | Date | string;
    deliveredDate?: Prisma.DateTimeNullableFilter<"Repair"> | Date | string | null;
    partsUsed?: Prisma.JsonNullableFilter<"Repair">;
    createdAt?: Prisma.DateTimeFilter<"Repair"> | Date | string;
    staff?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RepairOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerPhone?: Prisma.SortOrder;
    deviceModel?: Prisma.SortOrder;
    complaint?: Prisma.SortOrder;
    estimatedCost?: Prisma.SortOrderInput | Prisma.SortOrder;
    finalAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    receivedDate?: Prisma.SortOrder;
    deliveredDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    partsUsed?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    staff?: Prisma.UserOrderByWithRelationInput;
};
export type RepairWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RepairWhereInput | Prisma.RepairWhereInput[];
    OR?: Prisma.RepairWhereInput[];
    NOT?: Prisma.RepairWhereInput | Prisma.RepairWhereInput[];
    staffId?: Prisma.StringFilter<"Repair"> | string;
    customerName?: Prisma.StringFilter<"Repair"> | string;
    customerPhone?: Prisma.StringFilter<"Repair"> | string;
    deviceModel?: Prisma.StringFilter<"Repair"> | string;
    complaint?: Prisma.StringFilter<"Repair"> | string;
    estimatedCost?: Prisma.FloatNullableFilter<"Repair"> | number | null;
    finalAmount?: Prisma.FloatNullableFilter<"Repair"> | number | null;
    status?: Prisma.EnumRepairStatusFilter<"Repair"> | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFilter<"Repair"> | Date | string;
    deliveredDate?: Prisma.DateTimeNullableFilter<"Repair"> | Date | string | null;
    partsUsed?: Prisma.JsonNullableFilter<"Repair">;
    createdAt?: Prisma.DateTimeFilter<"Repair"> | Date | string;
    staff?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type RepairOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerPhone?: Prisma.SortOrder;
    deviceModel?: Prisma.SortOrder;
    complaint?: Prisma.SortOrder;
    estimatedCost?: Prisma.SortOrderInput | Prisma.SortOrder;
    finalAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    receivedDate?: Prisma.SortOrder;
    deliveredDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    partsUsed?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RepairCountOrderByAggregateInput;
    _avg?: Prisma.RepairAvgOrderByAggregateInput;
    _max?: Prisma.RepairMaxOrderByAggregateInput;
    _min?: Prisma.RepairMinOrderByAggregateInput;
    _sum?: Prisma.RepairSumOrderByAggregateInput;
};
export type RepairScalarWhereWithAggregatesInput = {
    AND?: Prisma.RepairScalarWhereWithAggregatesInput | Prisma.RepairScalarWhereWithAggregatesInput[];
    OR?: Prisma.RepairScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RepairScalarWhereWithAggregatesInput | Prisma.RepairScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Repair"> | string;
    staffId?: Prisma.StringWithAggregatesFilter<"Repair"> | string;
    customerName?: Prisma.StringWithAggregatesFilter<"Repair"> | string;
    customerPhone?: Prisma.StringWithAggregatesFilter<"Repair"> | string;
    deviceModel?: Prisma.StringWithAggregatesFilter<"Repair"> | string;
    complaint?: Prisma.StringWithAggregatesFilter<"Repair"> | string;
    estimatedCost?: Prisma.FloatNullableWithAggregatesFilter<"Repair"> | number | null;
    finalAmount?: Prisma.FloatNullableWithAggregatesFilter<"Repair"> | number | null;
    status?: Prisma.EnumRepairStatusWithAggregatesFilter<"Repair"> | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeWithAggregatesFilter<"Repair"> | Date | string;
    deliveredDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Repair"> | Date | string | null;
    partsUsed?: Prisma.JsonNullableWithAggregatesFilter<"Repair">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Repair"> | Date | string;
};
export type RepairCreateInput = {
    id?: string;
    customerName: string;
    customerPhone: string;
    deviceModel: string;
    complaint: string;
    estimatedCost?: number | null;
    finalAmount?: number | null;
    status?: $Enums.RepairStatus;
    receivedDate?: Date | string;
    deliveredDate?: Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    staff: Prisma.UserCreateNestedOneWithoutRepairsInput;
};
export type RepairUncheckedCreateInput = {
    id?: string;
    staffId: string;
    customerName: string;
    customerPhone: string;
    deviceModel: string;
    complaint: string;
    estimatedCost?: number | null;
    finalAmount?: number | null;
    status?: $Enums.RepairStatus;
    receivedDate?: Date | string;
    deliveredDate?: Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type RepairUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceModel?: Prisma.StringFieldUpdateOperationsInput | string;
    complaint?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedCost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    finalAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    staff?: Prisma.UserUpdateOneRequiredWithoutRepairsNestedInput;
};
export type RepairUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    staffId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceModel?: Prisma.StringFieldUpdateOperationsInput | string;
    complaint?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedCost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    finalAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairCreateManyInput = {
    id?: string;
    staffId: string;
    customerName: string;
    customerPhone: string;
    deviceModel: string;
    complaint: string;
    estimatedCost?: number | null;
    finalAmount?: number | null;
    status?: $Enums.RepairStatus;
    receivedDate?: Date | string;
    deliveredDate?: Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type RepairUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceModel?: Prisma.StringFieldUpdateOperationsInput | string;
    complaint?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedCost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    finalAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    staffId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceModel?: Prisma.StringFieldUpdateOperationsInput | string;
    complaint?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedCost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    finalAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairListRelationFilter = {
    every?: Prisma.RepairWhereInput;
    some?: Prisma.RepairWhereInput;
    none?: Prisma.RepairWhereInput;
};
export type RepairOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RepairCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerPhone?: Prisma.SortOrder;
    deviceModel?: Prisma.SortOrder;
    complaint?: Prisma.SortOrder;
    estimatedCost?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    receivedDate?: Prisma.SortOrder;
    deliveredDate?: Prisma.SortOrder;
    partsUsed?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RepairAvgOrderByAggregateInput = {
    estimatedCost?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
};
export type RepairMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerPhone?: Prisma.SortOrder;
    deviceModel?: Prisma.SortOrder;
    complaint?: Prisma.SortOrder;
    estimatedCost?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    receivedDate?: Prisma.SortOrder;
    deliveredDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RepairMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    staffId?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerPhone?: Prisma.SortOrder;
    deviceModel?: Prisma.SortOrder;
    complaint?: Prisma.SortOrder;
    estimatedCost?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    receivedDate?: Prisma.SortOrder;
    deliveredDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RepairSumOrderByAggregateInput = {
    estimatedCost?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
};
export type RepairCreateNestedManyWithoutStaffInput = {
    create?: Prisma.XOR<Prisma.RepairCreateWithoutStaffInput, Prisma.RepairUncheckedCreateWithoutStaffInput> | Prisma.RepairCreateWithoutStaffInput[] | Prisma.RepairUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.RepairCreateOrConnectWithoutStaffInput | Prisma.RepairCreateOrConnectWithoutStaffInput[];
    createMany?: Prisma.RepairCreateManyStaffInputEnvelope;
    connect?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
};
export type RepairUncheckedCreateNestedManyWithoutStaffInput = {
    create?: Prisma.XOR<Prisma.RepairCreateWithoutStaffInput, Prisma.RepairUncheckedCreateWithoutStaffInput> | Prisma.RepairCreateWithoutStaffInput[] | Prisma.RepairUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.RepairCreateOrConnectWithoutStaffInput | Prisma.RepairCreateOrConnectWithoutStaffInput[];
    createMany?: Prisma.RepairCreateManyStaffInputEnvelope;
    connect?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
};
export type RepairUpdateManyWithoutStaffNestedInput = {
    create?: Prisma.XOR<Prisma.RepairCreateWithoutStaffInput, Prisma.RepairUncheckedCreateWithoutStaffInput> | Prisma.RepairCreateWithoutStaffInput[] | Prisma.RepairUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.RepairCreateOrConnectWithoutStaffInput | Prisma.RepairCreateOrConnectWithoutStaffInput[];
    upsert?: Prisma.RepairUpsertWithWhereUniqueWithoutStaffInput | Prisma.RepairUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: Prisma.RepairCreateManyStaffInputEnvelope;
    set?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
    disconnect?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
    delete?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
    connect?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
    update?: Prisma.RepairUpdateWithWhereUniqueWithoutStaffInput | Prisma.RepairUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?: Prisma.RepairUpdateManyWithWhereWithoutStaffInput | Prisma.RepairUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: Prisma.RepairScalarWhereInput | Prisma.RepairScalarWhereInput[];
};
export type RepairUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: Prisma.XOR<Prisma.RepairCreateWithoutStaffInput, Prisma.RepairUncheckedCreateWithoutStaffInput> | Prisma.RepairCreateWithoutStaffInput[] | Prisma.RepairUncheckedCreateWithoutStaffInput[];
    connectOrCreate?: Prisma.RepairCreateOrConnectWithoutStaffInput | Prisma.RepairCreateOrConnectWithoutStaffInput[];
    upsert?: Prisma.RepairUpsertWithWhereUniqueWithoutStaffInput | Prisma.RepairUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: Prisma.RepairCreateManyStaffInputEnvelope;
    set?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
    disconnect?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
    delete?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
    connect?: Prisma.RepairWhereUniqueInput | Prisma.RepairWhereUniqueInput[];
    update?: Prisma.RepairUpdateWithWhereUniqueWithoutStaffInput | Prisma.RepairUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?: Prisma.RepairUpdateManyWithWhereWithoutStaffInput | Prisma.RepairUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: Prisma.RepairScalarWhereInput | Prisma.RepairScalarWhereInput[];
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumRepairStatusFieldUpdateOperationsInput = {
    set?: $Enums.RepairStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type RepairCreateWithoutStaffInput = {
    id?: string;
    customerName: string;
    customerPhone: string;
    deviceModel: string;
    complaint: string;
    estimatedCost?: number | null;
    finalAmount?: number | null;
    status?: $Enums.RepairStatus;
    receivedDate?: Date | string;
    deliveredDate?: Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type RepairUncheckedCreateWithoutStaffInput = {
    id?: string;
    customerName: string;
    customerPhone: string;
    deviceModel: string;
    complaint: string;
    estimatedCost?: number | null;
    finalAmount?: number | null;
    status?: $Enums.RepairStatus;
    receivedDate?: Date | string;
    deliveredDate?: Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type RepairCreateOrConnectWithoutStaffInput = {
    where: Prisma.RepairWhereUniqueInput;
    create: Prisma.XOR<Prisma.RepairCreateWithoutStaffInput, Prisma.RepairUncheckedCreateWithoutStaffInput>;
};
export type RepairCreateManyStaffInputEnvelope = {
    data: Prisma.RepairCreateManyStaffInput | Prisma.RepairCreateManyStaffInput[];
    skipDuplicates?: boolean;
};
export type RepairUpsertWithWhereUniqueWithoutStaffInput = {
    where: Prisma.RepairWhereUniqueInput;
    update: Prisma.XOR<Prisma.RepairUpdateWithoutStaffInput, Prisma.RepairUncheckedUpdateWithoutStaffInput>;
    create: Prisma.XOR<Prisma.RepairCreateWithoutStaffInput, Prisma.RepairUncheckedCreateWithoutStaffInput>;
};
export type RepairUpdateWithWhereUniqueWithoutStaffInput = {
    where: Prisma.RepairWhereUniqueInput;
    data: Prisma.XOR<Prisma.RepairUpdateWithoutStaffInput, Prisma.RepairUncheckedUpdateWithoutStaffInput>;
};
export type RepairUpdateManyWithWhereWithoutStaffInput = {
    where: Prisma.RepairScalarWhereInput;
    data: Prisma.XOR<Prisma.RepairUpdateManyMutationInput, Prisma.RepairUncheckedUpdateManyWithoutStaffInput>;
};
export type RepairScalarWhereInput = {
    AND?: Prisma.RepairScalarWhereInput | Prisma.RepairScalarWhereInput[];
    OR?: Prisma.RepairScalarWhereInput[];
    NOT?: Prisma.RepairScalarWhereInput | Prisma.RepairScalarWhereInput[];
    id?: Prisma.StringFilter<"Repair"> | string;
    staffId?: Prisma.StringFilter<"Repair"> | string;
    customerName?: Prisma.StringFilter<"Repair"> | string;
    customerPhone?: Prisma.StringFilter<"Repair"> | string;
    deviceModel?: Prisma.StringFilter<"Repair"> | string;
    complaint?: Prisma.StringFilter<"Repair"> | string;
    estimatedCost?: Prisma.FloatNullableFilter<"Repair"> | number | null;
    finalAmount?: Prisma.FloatNullableFilter<"Repair"> | number | null;
    status?: Prisma.EnumRepairStatusFilter<"Repair"> | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFilter<"Repair"> | Date | string;
    deliveredDate?: Prisma.DateTimeNullableFilter<"Repair"> | Date | string | null;
    partsUsed?: Prisma.JsonNullableFilter<"Repair">;
    createdAt?: Prisma.DateTimeFilter<"Repair"> | Date | string;
};
export type RepairCreateManyStaffInput = {
    id?: string;
    customerName: string;
    customerPhone: string;
    deviceModel: string;
    complaint: string;
    estimatedCost?: number | null;
    finalAmount?: number | null;
    status?: $Enums.RepairStatus;
    receivedDate?: Date | string;
    deliveredDate?: Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type RepairUpdateWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceModel?: Prisma.StringFieldUpdateOperationsInput | string;
    complaint?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedCost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    finalAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairUncheckedUpdateWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceModel?: Prisma.StringFieldUpdateOperationsInput | string;
    complaint?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedCost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    finalAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairUncheckedUpdateManyWithoutStaffInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceModel?: Prisma.StringFieldUpdateOperationsInput | string;
    complaint?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedCost?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    finalAmount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    status?: Prisma.EnumRepairStatusFieldUpdateOperationsInput | $Enums.RepairStatus;
    receivedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    customerName?: boolean;
    customerPhone?: boolean;
    deviceModel?: boolean;
    complaint?: boolean;
    estimatedCost?: boolean;
    finalAmount?: boolean;
    status?: boolean;
    receivedDate?: boolean;
    deliveredDate?: boolean;
    partsUsed?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["repair"]>;
export type RepairSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    customerName?: boolean;
    customerPhone?: boolean;
    deviceModel?: boolean;
    complaint?: boolean;
    estimatedCost?: boolean;
    finalAmount?: boolean;
    status?: boolean;
    receivedDate?: boolean;
    deliveredDate?: boolean;
    partsUsed?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["repair"]>;
export type RepairSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    staffId?: boolean;
    customerName?: boolean;
    customerPhone?: boolean;
    deviceModel?: boolean;
    complaint?: boolean;
    estimatedCost?: boolean;
    finalAmount?: boolean;
    status?: boolean;
    receivedDate?: boolean;
    deliveredDate?: boolean;
    partsUsed?: boolean;
    createdAt?: boolean;
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["repair"]>;
export type RepairSelectScalar = {
    id?: boolean;
    staffId?: boolean;
    customerName?: boolean;
    customerPhone?: boolean;
    deviceModel?: boolean;
    complaint?: boolean;
    estimatedCost?: boolean;
    finalAmount?: boolean;
    status?: boolean;
    receivedDate?: boolean;
    deliveredDate?: boolean;
    partsUsed?: boolean;
    createdAt?: boolean;
};
export type RepairOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "staffId" | "customerName" | "customerPhone" | "deviceModel" | "complaint" | "estimatedCost" | "finalAmount" | "status" | "receivedDate" | "deliveredDate" | "partsUsed" | "createdAt", ExtArgs["result"]["repair"]>;
export type RepairInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RepairIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RepairIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    staff?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RepairPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Repair";
    objects: {
        staff: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        staffId: string;
        customerName: string;
        customerPhone: string;
        deviceModel: string;
        complaint: string;
        estimatedCost: number | null;
        finalAmount: number | null;
        status: $Enums.RepairStatus;
        receivedDate: Date;
        deliveredDate: Date | null;
        partsUsed: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["repair"]>;
    composites: {};
};
export type RepairGetPayload<S extends boolean | null | undefined | RepairDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RepairPayload, S>;
export type RepairCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RepairFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RepairCountAggregateInputType | true;
};
export interface RepairDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Repair'];
        meta: {
            name: 'Repair';
        };
    };
    /**
     * Find zero or one Repair that matches the filter.
     * @param {RepairFindUniqueArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepairFindUniqueArgs>(args: Prisma.SelectSubset<T, RepairFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RepairClient<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Repair that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepairFindUniqueOrThrowArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepairFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RepairFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RepairClient<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Repair that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairFindFirstArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepairFindFirstArgs>(args?: Prisma.SelectSubset<T, RepairFindFirstArgs<ExtArgs>>): Prisma.Prisma__RepairClient<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Repair that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairFindFirstOrThrowArgs} args - Arguments to find a Repair
     * @example
     * // Get one Repair
     * const repair = await prisma.repair.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepairFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RepairFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RepairClient<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Repairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Repairs
     * const repairs = await prisma.repair.findMany()
     *
     * // Get first 10 Repairs
     * const repairs = await prisma.repair.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const repairWithIdOnly = await prisma.repair.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RepairFindManyArgs>(args?: Prisma.SelectSubset<T, RepairFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Repair.
     * @param {RepairCreateArgs} args - Arguments to create a Repair.
     * @example
     * // Create one Repair
     * const Repair = await prisma.repair.create({
     *   data: {
     *     // ... data to create a Repair
     *   }
     * })
     *
     */
    create<T extends RepairCreateArgs>(args: Prisma.SelectSubset<T, RepairCreateArgs<ExtArgs>>): Prisma.Prisma__RepairClient<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Repairs.
     * @param {RepairCreateManyArgs} args - Arguments to create many Repairs.
     * @example
     * // Create many Repairs
     * const repair = await prisma.repair.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RepairCreateManyArgs>(args?: Prisma.SelectSubset<T, RepairCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Repairs and returns the data saved in the database.
     * @param {RepairCreateManyAndReturnArgs} args - Arguments to create many Repairs.
     * @example
     * // Create many Repairs
     * const repair = await prisma.repair.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Repairs and only return the `id`
     * const repairWithIdOnly = await prisma.repair.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RepairCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RepairCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Repair.
     * @param {RepairDeleteArgs} args - Arguments to delete one Repair.
     * @example
     * // Delete one Repair
     * const Repair = await prisma.repair.delete({
     *   where: {
     *     // ... filter to delete one Repair
     *   }
     * })
     *
     */
    delete<T extends RepairDeleteArgs>(args: Prisma.SelectSubset<T, RepairDeleteArgs<ExtArgs>>): Prisma.Prisma__RepairClient<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Repair.
     * @param {RepairUpdateArgs} args - Arguments to update one Repair.
     * @example
     * // Update one Repair
     * const repair = await prisma.repair.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RepairUpdateArgs>(args: Prisma.SelectSubset<T, RepairUpdateArgs<ExtArgs>>): Prisma.Prisma__RepairClient<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Repairs.
     * @param {RepairDeleteManyArgs} args - Arguments to filter Repairs to delete.
     * @example
     * // Delete a few Repairs
     * const { count } = await prisma.repair.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RepairDeleteManyArgs>(args?: Prisma.SelectSubset<T, RepairDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Repairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Repairs
     * const repair = await prisma.repair.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RepairUpdateManyArgs>(args: Prisma.SelectSubset<T, RepairUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Repairs and returns the data updated in the database.
     * @param {RepairUpdateManyAndReturnArgs} args - Arguments to update many Repairs.
     * @example
     * // Update many Repairs
     * const repair = await prisma.repair.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Repairs and only return the `id`
     * const repairWithIdOnly = await prisma.repair.updateManyAndReturn({
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
    updateManyAndReturn<T extends RepairUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RepairUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Repair.
     * @param {RepairUpsertArgs} args - Arguments to update or create a Repair.
     * @example
     * // Update or create a Repair
     * const repair = await prisma.repair.upsert({
     *   create: {
     *     // ... data to create a Repair
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Repair we want to update
     *   }
     * })
     */
    upsert<T extends RepairUpsertArgs>(args: Prisma.SelectSubset<T, RepairUpsertArgs<ExtArgs>>): Prisma.Prisma__RepairClient<runtime.Types.Result.GetResult<Prisma.$RepairPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Repairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairCountArgs} args - Arguments to filter Repairs to count.
     * @example
     * // Count the number of Repairs
     * const count = await prisma.repair.count({
     *   where: {
     *     // ... the filter for the Repairs we want to count
     *   }
     * })
    **/
    count<T extends RepairCountArgs>(args?: Prisma.Subset<T, RepairCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RepairCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Repair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RepairAggregateArgs>(args: Prisma.Subset<T, RepairAggregateArgs>): Prisma.PrismaPromise<GetRepairAggregateType<T>>;
    /**
     * Group by Repair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RepairGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RepairGroupByArgs['orderBy'];
    } : {
        orderBy?: RepairGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RepairGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Repair model
     */
    readonly fields: RepairFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Repair.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RepairClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the Repair model
 */
export interface RepairFieldRefs {
    readonly id: Prisma.FieldRef<"Repair", 'String'>;
    readonly staffId: Prisma.FieldRef<"Repair", 'String'>;
    readonly customerName: Prisma.FieldRef<"Repair", 'String'>;
    readonly customerPhone: Prisma.FieldRef<"Repair", 'String'>;
    readonly deviceModel: Prisma.FieldRef<"Repair", 'String'>;
    readonly complaint: Prisma.FieldRef<"Repair", 'String'>;
    readonly estimatedCost: Prisma.FieldRef<"Repair", 'Float'>;
    readonly finalAmount: Prisma.FieldRef<"Repair", 'Float'>;
    readonly status: Prisma.FieldRef<"Repair", 'RepairStatus'>;
    readonly receivedDate: Prisma.FieldRef<"Repair", 'DateTime'>;
    readonly deliveredDate: Prisma.FieldRef<"Repair", 'DateTime'>;
    readonly partsUsed: Prisma.FieldRef<"Repair", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"Repair", 'DateTime'>;
}
/**
 * Repair findUnique
 */
export type RepairFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Repair to fetch.
     */
    where: Prisma.RepairWhereUniqueInput;
};
/**
 * Repair findUniqueOrThrow
 */
export type RepairFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Repair to fetch.
     */
    where: Prisma.RepairWhereUniqueInput;
};
/**
 * Repair findFirst
 */
export type RepairFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Repair to fetch.
     */
    where?: Prisma.RepairWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Repairs to fetch.
     */
    orderBy?: Prisma.RepairOrderByWithRelationInput | Prisma.RepairOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Repairs.
     */
    cursor?: Prisma.RepairWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Repairs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Repairs.
     */
    distinct?: Prisma.RepairScalarFieldEnum | Prisma.RepairScalarFieldEnum[];
};
/**
 * Repair findFirstOrThrow
 */
export type RepairFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Repair to fetch.
     */
    where?: Prisma.RepairWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Repairs to fetch.
     */
    orderBy?: Prisma.RepairOrderByWithRelationInput | Prisma.RepairOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Repairs.
     */
    cursor?: Prisma.RepairWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Repairs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Repairs.
     */
    distinct?: Prisma.RepairScalarFieldEnum | Prisma.RepairScalarFieldEnum[];
};
/**
 * Repair findMany
 */
export type RepairFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Repairs to fetch.
     */
    where?: Prisma.RepairWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Repairs to fetch.
     */
    orderBy?: Prisma.RepairOrderByWithRelationInput | Prisma.RepairOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Repairs.
     */
    cursor?: Prisma.RepairWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Repairs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Repairs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Repairs.
     */
    distinct?: Prisma.RepairScalarFieldEnum | Prisma.RepairScalarFieldEnum[];
};
/**
 * Repair create
 */
export type RepairCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Repair.
     */
    data: Prisma.XOR<Prisma.RepairCreateInput, Prisma.RepairUncheckedCreateInput>;
};
/**
 * Repair createMany
 */
export type RepairCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Repairs.
     */
    data: Prisma.RepairCreateManyInput | Prisma.RepairCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Repair createManyAndReturn
 */
export type RepairCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: Prisma.RepairSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Repair
     */
    omit?: Prisma.RepairOmit<ExtArgs> | null;
    /**
     * The data used to create many Repairs.
     */
    data: Prisma.RepairCreateManyInput | Prisma.RepairCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RepairIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Repair update
 */
export type RepairUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Repair.
     */
    data: Prisma.XOR<Prisma.RepairUpdateInput, Prisma.RepairUncheckedUpdateInput>;
    /**
     * Choose, which Repair to update.
     */
    where: Prisma.RepairWhereUniqueInput;
};
/**
 * Repair updateMany
 */
export type RepairUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Repairs.
     */
    data: Prisma.XOR<Prisma.RepairUpdateManyMutationInput, Prisma.RepairUncheckedUpdateManyInput>;
    /**
     * Filter which Repairs to update
     */
    where?: Prisma.RepairWhereInput;
    /**
     * Limit how many Repairs to update.
     */
    limit?: number;
};
/**
 * Repair updateManyAndReturn
 */
export type RepairUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repair
     */
    select?: Prisma.RepairSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Repair
     */
    omit?: Prisma.RepairOmit<ExtArgs> | null;
    /**
     * The data used to update Repairs.
     */
    data: Prisma.XOR<Prisma.RepairUpdateManyMutationInput, Prisma.RepairUncheckedUpdateManyInput>;
    /**
     * Filter which Repairs to update
     */
    where?: Prisma.RepairWhereInput;
    /**
     * Limit how many Repairs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RepairIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Repair upsert
 */
export type RepairUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Repair to update in case it exists.
     */
    where: Prisma.RepairWhereUniqueInput;
    /**
     * In case the Repair found by the `where` argument doesn't exist, create a new Repair with this data.
     */
    create: Prisma.XOR<Prisma.RepairCreateInput, Prisma.RepairUncheckedCreateInput>;
    /**
     * In case the Repair was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RepairUpdateInput, Prisma.RepairUncheckedUpdateInput>;
};
/**
 * Repair delete
 */
export type RepairDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Repair to delete.
     */
    where: Prisma.RepairWhereUniqueInput;
};
/**
 * Repair deleteMany
 */
export type RepairDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Repairs to delete
     */
    where?: Prisma.RepairWhereInput;
    /**
     * Limit how many Repairs to delete.
     */
    limit?: number;
};
/**
 * Repair without action
 */
export type RepairDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=Repair.d.ts.map