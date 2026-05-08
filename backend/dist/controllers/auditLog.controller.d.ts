import { Request, Response, NextFunction } from 'express';
export declare const auditLogController: {
    /**
     * GET /api/admin/audit-logs
     * Paginated, filterable audit log list.
     */
    getLogs(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/admin/audit-logs/stats
     * Summary statistics for dashboard cards.
     */
    getStats(req: Request, res: Response, next: NextFunction): Promise<void>;
    /**
     * GET /api/admin/audit-logs/export
     * Export filtered logs as CSV file download.
     */
    exportCSV(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=auditLog.controller.d.ts.map