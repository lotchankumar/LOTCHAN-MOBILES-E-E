import { AuditAction } from '@prisma/client';
export interface LogActionData {
    userId?: string;
    action: AuditAction;
    entity: string;
    entityId?: string;
    details?: string;
    branchId?: string;
    ipAddress?: string;
}
export interface AuditLogFilters {
    branchId?: string;
    userId?: string;
    action?: AuditAction;
    role?: string;
    entity?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}
export declare const auditLogService: {
    /**
     * Fire-and-forget audit log creation.
     * Call this without awaiting to keep main flows non-blocking.
     */
    logAction(data: LogActionData): Promise<void>;
    /**
     * Query audit logs with filters, pagination, and user/branch joins.
     */
    getAuditLogs(filters: AuditLogFilters): Promise<{
        data: ({
            user: {
                name: string;
                id: string;
                email: string;
                role: import(".prisma/client").$Enums.Role;
            } | null;
            branch: {
                name: string;
                id: string;
            } | null;
        } & {
            id: string;
            action: import(".prisma/client").$Enums.AuditAction;
            entity: string;
            entityId: string | null;
            details: string | null;
            ipAddress: string | null;
            createdAt: Date;
            userId: string | null;
            branchId: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    /**
     * Get summary stats for the admin dashboard.
     */
    getStats(): Promise<{
        totalToday: number;
        failedLogins: number;
        byAction: {
            action: import(".prisma/client").$Enums.AuditAction;
            count: number;
        }[];
        byBranch: {
            branchId: string | null;
            branchName: string;
            count: number;
        }[];
    }>;
    /**
     * Export audit logs as CSV string.
     */
    exportCSV(filters: AuditLogFilters): Promise<string>;
};
//# sourceMappingURL=auditLog.service.d.ts.map