export type CreateBranchData = {
    name: string;
    address?: string;
    phone?: string;
    isActive?: boolean;
};
export type UpdateBranchData = {
    name?: string;
    address?: string;
    phone?: string;
    isActive?: boolean;
};
export declare const branchService: {
    getAllBranches(): Promise<({
        _count: {
            users: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        address: string | null;
        phone: string | null;
    })[]>;
    getBranchById(id: string): Promise<({
        orders: {
            id: string;
            createdAt: Date;
            orderNumber: string;
            status: import(".prisma/client").$Enums.OrderStatus;
        }[];
        users: {
            name: string;
            id: string;
            createdAt: Date;
            branchId: string | null;
            email: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.Role;
            isActive: boolean;
            managerId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        address: string | null;
        phone: string | null;
    }) | null>;
    createBranch(data: CreateBranchData): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        address: string | null;
        phone: string | null;
    }>;
    updateBranch(id: string, data: UpdateBranchData): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        address: string | null;
        phone: string | null;
    }>;
    deleteBranch(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        address: string | null;
        phone: string | null;
    }>;
};
//# sourceMappingURL=branch.service.d.ts.map