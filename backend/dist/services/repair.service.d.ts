import { RepairStatus } from '@prisma/client';
export declare const repairService: {
    createRepairJob(data: {
        customerId: string;
        deviceModel: string;
        imeiSerial?: string;
        issueDescription: string;
        estimatedCost?: number;
        advancePaid?: number;
        assignedToId?: string;
        branchId: string;
    }): Promise<{
        customer: {
            name: string;
            id: string;
            createdAt: Date;
            email: string;
            passwordHash: string | null;
            address: string | null;
            phone: string;
            walletBalance: number;
            referralCode: string;
            referredById: string | null;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        branchId: string;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.RepairStatus;
        ticketNumber: string;
        customerId: string;
        deviceModel: string;
        imeiSerial: string | null;
        issueDescription: string;
        diagnosis: string | null;
        location: string | null;
        scheduledDate: Date | null;
        estimatedCost: number | null;
        finalCost: number | null;
        advancePaid: number;
        completedAt: Date | null;
        repairCategoryId: string | null;
        assignedToId: string | null;
    }>;
    usePartsInRepair(repairJobId: string, parts: Array<{
        productId: string;
        quantity: number;
    }>): Promise<void>;
    updateRepairStatus(jobId: string, newStatus: RepairStatus): Promise<{
        customer: {
            name: string;
            id: string;
            createdAt: Date;
            email: string;
            passwordHash: string | null;
            address: string | null;
            phone: string;
            walletBalance: number;
            referralCode: string;
            referredById: string | null;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        branchId: string;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.RepairStatus;
        ticketNumber: string;
        customerId: string;
        deviceModel: string;
        imeiSerial: string | null;
        issueDescription: string;
        diagnosis: string | null;
        location: string | null;
        scheduledDate: Date | null;
        estimatedCost: number | null;
        finalCost: number | null;
        advancePaid: number;
        completedAt: Date | null;
        repairCategoryId: string | null;
        assignedToId: string | null;
    }>;
};
//# sourceMappingURL=repair.service.d.ts.map