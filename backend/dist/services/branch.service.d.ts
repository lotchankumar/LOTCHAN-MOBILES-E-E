export type CreateBranchData = {
    name: string;
    address?: string;
    phone?: string;
};
export type UpdateBranchData = {
    name?: string;
    address?: string;
    phone?: string;
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
        phone: string | null;
        address: string | null;
    })[]>;
    getBranchById(id: string): Promise<({
        orders: never;
        users: {
            name: string;
            id: string;
            email: string;
            passwordHash: string;
            role: import("@prisma/client").$Enums.Role;
            isActive: boolean;
            branchId: string | null;
            managerId: string | null;
            createdAt: Date;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        phone: string | null;
        address: string | null;
    }) | null>;
    createBranch(data: CreateBranchData): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        phone: string | null;
        address: string | null;
    }>;
    updateBranch(id: string, data: UpdateBranchData): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        phone: string | null;
        address: string | null;
    }>;
    deleteBranch(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        phone: string | null;
        address: string | null;
    }>;
};
//# sourceMappingURL=branch.service.d.ts.map