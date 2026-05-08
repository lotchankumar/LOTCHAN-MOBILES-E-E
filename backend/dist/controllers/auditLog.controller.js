"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogController = void 0;
const auditLog_service_1 = require("../services/auditLog.service");
exports.auditLogController = {
    /**
     * GET /api/admin/audit-logs
     * Paginated, filterable audit log list.
     */
    async getLogs(req, res, next) {
        try {
            const filters = {
                branchId: req.query.branchId,
                userId: req.query.userId,
                action: req.query.action,
                role: req.query.role,
                entity: req.query.entity,
                search: req.query.search,
                dateFrom: req.query.dateFrom,
                dateTo: req.query.dateTo,
                page: req.query.page ? parseInt(req.query.page) : 0,
                limit: req.query.limit ? parseInt(req.query.limit) : 30,
            };
            const result = await auditLog_service_1.auditLogService.getAuditLogs(filters);
            res.json(result);
        }
        catch (error) {
            console.error('Audit logs fetch error:', error);
            res.status(500).json({ error: 'Failed to fetch audit logs' });
        }
    },
    /**
     * GET /api/admin/audit-logs/stats
     * Summary statistics for dashboard cards.
     */
    async getStats(req, res, next) {
        try {
            const stats = await auditLog_service_1.auditLogService.getStats();
            res.json(stats);
        }
        catch (error) {
            console.error('Audit stats fetch error:', error);
            res.status(500).json({ error: 'Failed to fetch audit stats' });
        }
    },
    /**
     * GET /api/admin/audit-logs/export
     * Export filtered logs as CSV file download.
     */
    async exportCSV(req, res, next) {
        try {
            const filters = {
                branchId: req.query.branchId,
                action: req.query.action,
                role: req.query.role,
                dateFrom: req.query.dateFrom,
                dateTo: req.query.dateTo,
                search: req.query.search,
            };
            const csv = await auditLog_service_1.auditLogService.exportCSV(filters);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="audit_logs_${new Date().toISOString().slice(0, 10)}.csv"`);
            res.send(csv);
        }
        catch (error) {
            console.error('Audit CSV export error:', error);
            res.status(500).json({ error: 'Failed to export audit logs' });
        }
    },
};
//# sourceMappingURL=auditLog.controller.js.map