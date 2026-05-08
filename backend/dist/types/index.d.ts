export declare enum UserRole {
    STAFF = "STAFF",
    MANAGER = "MANAGER",
    ADMIN = "ADMIN",
    TECHNICIAN = "TECHNICIAN"
}
export interface User {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
}
export interface AuthResponse {
    user: {
        id: string;
        email: string;
        role: UserRole;
        firstName?: string;
        lastName?: string;
    };
    token: string;
}
export interface JwtPayload {
    userId: string;
    email: string;
    role: UserRole;
    branchId?: string;
    iat?: number;
    exp?: number;
}
export interface Branch {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
    _count?: {
        users: number;
        orders: number;
    };
}
//# sourceMappingURL=index.d.ts.map