import type { User } from '@prisma/client';
export type CreateManagerData = {
    name: string;
    email: string;
    branchId: string;
    password?: string;
};
export type UpdateManagerData = {
    name?: string;
    email?: string;
    branchId?: string;
    isActive?: boolean;
};
export type CreateStaffData = {
    name: string;
    email: string;
    branchId?: string;
    managerId?: string;
    password?: string;
    role?: 'STAFF' | 'TECHNICIAN';
};
export type UpdateStaffData = {
    name?: string;
    email?: string;
    branchId?: string;
    isActive?: boolean;
    role?: 'STAFF' | 'TECHNICIAN';
};
export declare const baseManagerService: {
    getAllManagers(): Promise<({
        branch: {
            name: string;
            id: string;
            createdAt: Date;
            phone: string | null;
            address: string | null;
        } | null;
    } & {
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        branchId: string | null;
        managerId: string | null;
        createdAt: Date;
    })[]>;
    createManager(data: CreateManagerData): Promise<User>;
    updateManager(id: string, data: UpdateManagerData): Promise<{
        branch: {
            name: string;
            id: string;
            createdAt: Date;
            phone: string | null;
            address: string | null;
        } | null;
    } & {
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        branchId: string | null;
        managerId: string | null;
        createdAt: Date;
    }>;
    resetPassword(id: string): Promise<{
        success: true;
    }>;
    getAllBranches(): Promise<any[]>;
    getManagerById(id: string): Promise<User | null>;
};
export declare const staffService: {
    getAllStaff(): Promise<({
        branch: {
            name: string;
            id: string;
            createdAt: Date;
            phone: string | null;
            address: string | null;
        } | null;
        manager: {
            name: string;
            id: string;
            email: string;
        } | null;
    } & {
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        branchId: string | null;
        managerId: string | null;
        createdAt: Date;
    })[]>;
    createStaff(data: CreateStaffData): Promise<User>;
    updateStaff(id: string, data: UpdateStaffData): Promise<{
        branch: {
            name: string;
            id: string;
            createdAt: Date;
            phone: string | null;
            address: string | null;
        } | null;
    } & {
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        branchId: string | null;
        managerId: string | null;
        createdAt: Date;
    }>;
    resetStaffPassword(id: string): Promise<{
        success: true;
    }>;
    getStaffById(id: string): Promise<User | null>;
};
export declare const organizationService: {
    getOrganizationHierarchy(): Promise<{
        branches: ({
            users: ({
                managedStaff: ({
                    branch: {
                        name: string;
                        id: string;
                        createdAt: Date;
                        phone: string | null;
                        address: string | null;
                    } | null;
                } & {
                    name: string;
                    id: string;
                    email: string;
                    passwordHash: string;
                    role: import(".prisma/client").$Enums.Role;
                    isActive: boolean;
                    branchId: string | null;
                    managerId: string | null;
                    createdAt: Date;
                })[];
            } & {
                name: string;
                id: string;
                email: string;
                passwordHash: string;
                role: import(".prisma/client").$Enums.Role;
                isActive: boolean;
                branchId: string | null;
                managerId: string | null;
                createdAt: Date;
            })[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            phone: string | null;
            address: string | null;
        })[];
        unassignedStaff: ({
            branch: {
                name: string;
                id: string;
                createdAt: Date;
                phone: string | null;
                address: string | null;
            } | null;
        } & {
            name: string;
            id: string;
            email: string;
            passwordHash: string;
            role: import(".prisma/client").$Enums.Role;
            isActive: boolean;
            branchId: string | null;
            managerId: string | null;
            createdAt: Date;
        })[];
    }>;
};
export interface ProfitData {
    categoryProfit: {
        MOBILE: number;
        ACCESSORY: number;
        SIM_CARD: number;
        REPAIRS: number;
    };
    totalProfit: number;
    dateRange: {
        startDate: string;
        endDate: string;
    };
}
export interface CashflowResponse {
    date: string;
    openingBalance: number;
    cashInflows: {
        sales: number;
        total: number;
    };
    cashOutflows: {
        purchases: number;
        expenses: number;
        total: number;
    };
    expectedClosingBalance: number;
    actualClosingBalance: number;
    variance: number;
    cashSessions: Array<{
        id: string;
        staffId: string;
        openingBalance: number;
        closingBalance: number | null;
        notes: string | null;
    }>;
}
declare const managerService: {
    getProfit(branchId: string | undefined | null, startDate: string, endDate: string): Promise<ProfitData>;
    getDailyCashflow(branchId: string, date: string): Promise<CashflowResponse>;
    getDashboardStats(branchId: string | undefined | null): Promise<{
        salesMtd: number;
        profitMtd: number;
        liabilities: number;
        stockValuation: {
            totalValue: any;
            totalUnits: any;
            byCategory: {
                categoryId: string | null;
                name: string;
                value: number;
                units: number;
            }[];
        } | {
            totalValue: any;
            totalUnits: any;
            byCategory?: undefined;
        };
        lowStock: {
            id: any;
            name: any;
            stockQty: any;
            minStock: any;
        }[];
        supplierOrders: {
            id: string;
            supplierName: string;
            status: import(".prisma/client").$Enums.POStatus;
        }[];
        users: {
            id: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            branchName: string;
            initials: string;
        }[];
        technicianPerformance: {
            name: string;
            value: number;
        }[];
    }>;
    getAllManagers(): Promise<({
        branch: {
            name: string;
            id: string;
            createdAt: Date;
            phone: string | null;
            address: string | null;
        } | null;
    } & {
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        branchId: string | null;
        managerId: string | null;
        createdAt: Date;
    })[]>;
    createManager(data: CreateManagerData): Promise<User>;
    updateManager(id: string, data: UpdateManagerData): Promise<{
        branch: {
            name: string;
            id: string;
            createdAt: Date;
            phone: string | null;
            address: string | null;
        } | null;
    } & {
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        branchId: string | null;
        managerId: string | null;
        createdAt: Date;
    }>;
    resetPassword(id: string): Promise<{
        success: true;
    }>;
    getAllBranches(): Promise<any[]>;
    getManagerById(id: string): Promise<User | null>;
};
export { managerService };
//# sourceMappingURL=manager.service.d.ts.map