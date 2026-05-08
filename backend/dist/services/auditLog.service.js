"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
exports.auditLogService = {
    /**
     * Fire-and-forget audit log creation.
     * Call this without awaiting to keep main flows non-blocking.
     */
    async logAction(data) {
        try {
            await client_1.default.auditLog.create({
                data: {
                    userId: data.userId || null,
                    action: data.action,
                    entity: data.entity,
                    entityId: data.entityId || null,
                    details: data.details || null,
                    branchId: data.branchId || null,
                    ipAddress: data.ipAddress || null,
                },
            });
        }
        catch (error) {
            console.error('[AUDIT] Failed to create audit log:', error);
            // Never throw — audit failures must not break main flows
        }
    },
    /**
     * Query audit logs with filters, pagination, and user/branch joins.
     */
    async getAuditLogs(filters) {
        const page = filters.page || 0;
        const limit = filters.limit || 30;
        const skip = page * limit;
        const where = {};
        if (filters.branchId) {
            where.branchId = filters.branchId;
        }
        if (filters.userId) {
            where.userId = filters.userId;
        }
        if (filters.action) {
            where.action = filters.action;
        }
        if (filters.entity) {
            where.entity = { contains: filters.entity, mode: 'insensitive' };
        }
        if (filters.role) {
            where.user = { role: filters.role };
        }
        if (filters.search) {
            where.OR = [
                { details: { contains: filters.search, mode: 'insensitive' } },
                { entity: { contains: filters.search, mode: 'insensitive' } },
                { entityId: { contains: filters.search, mode: 'insensitive' } },
                { user: { name: { contains: filters.search, mode: 'insensitive' } } },
            ];
        }
        if (filters.dateFrom || filters.dateTo) {
            where.createdAt = {};
            if (filters.dateFrom) {
                where.createdAt.gte = new Date(filters.dateFrom);
            }
            if (filters.dateTo) {
                where.createdAt.lte = new Date(filters.dateTo + 'T23:59:59.999Z');
            }
        }
        const [logs, total] = await Promise.all([
            client_1.default.auditLog.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    user: { select: { id: true, name: true, role: true, email: true } },
                    branch: { select: { id: true, name: true } },
                },
            }),
            client_1.default.auditLog.count({ where }),
        ]);
        return {
            data: logs,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    },
    /**
     * Get summary stats for the admin dashboard.
     */
    async getStats() {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const [totalToday, failedLogins, byAction, byBranch] = await Promise.all([
            // Total logs today
            client_1.default.auditLog.count({
                where: { createdAt: { gte: todayStart } },
            }),
            // Failed login attempts today
            client_1.default.auditLog.count({
                where: {
                    action: 'LOGIN_FAILED',
                    createdAt: { gte: todayStart },
                },
            }),
            // Group by action (top 10)
            client_1.default.auditLog.groupBy({
                by: ['action'],
                _count: { id: true },
                where: { createdAt: { gte: todayStart } },
                orderBy: { _count: { id: 'desc' } },
                take: 10,
            }),
            // Group by branch (today)
            client_1.default.auditLog.groupBy({
                by: ['branchId'],
                _count: { id: true },
                where: {
                    createdAt: { gte: todayStart },
                    branchId: { not: null },
                },
                orderBy: { _count: { id: 'desc' } },
            }),
        ]);
        // Get branch names for the branch stats
        const branchIds = byBranch.map((b) => b.branchId).filter(Boolean);
        const branches = branchIds.length > 0
            ? await client_1.default.branch.findMany({
                where: { id: { in: branchIds } },
                select: { id: true, name: true },
            })
            : [];
        const branchMap = new Map(branches.map((b) => [b.id, b.name]));
        return {
            totalToday,
            failedLogins,
            byAction: byAction.map((a) => ({
                action: a.action,
                count: a._count.id,
            })),
            byBranch: byBranch.map((b) => ({
                branchId: b.branchId,
                branchName: branchMap.get(b.branchId) || 'Unknown',
                count: b._count.id,
            })),
        };
    },
    /**
     * Export audit logs as CSV string.
     */
    async exportCSV(filters) {
        // Get all logs matching filters (no pagination limit for export)
        const exportFilters = { ...filters, page: 0, limit: 10000 };
        const result = await this.getAuditLogs(exportFilters);
        const headers = ['Timestamp', 'User', 'Role', 'Action', 'Entity', 'Entity ID', 'Branch', 'Details', 'IP Address'];
        const rows = result.data.map((log) => [
            log.createdAt.toISOString(),
            log.user?.name || 'System',
            log.user?.role || '-',
            log.action,
            log.entity,
            log.entityId || '-',
            log.branch?.name || '-',
            (log.details || '-').replace(/"/g, '""'),
            log.ipAddress || '-',
        ]);
        const csvLines = [
            headers.join(','),
            ...rows.map((r) => r.map((v) => `"${v}"`).join(',')),
        ];
        return csvLines.join('\n');
    },
};
//# sourceMappingURL=auditLog.service.js.map