import { Request, Response, NextFunction } from 'express';
import { auditLogService, AuditLogFilters } from '../services/auditLog.service';
import { AuditAction } from '@prisma/client';

export const auditLogController = {
  /**
   * GET /api/admin/audit-logs
   * Paginated, filterable audit log list.
   */
  async getLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const filters: AuditLogFilters = {
        branchId: req.query.branchId as string | undefined,
        userId: req.query.userId as string | undefined,
        action: req.query.action as AuditAction | undefined,
        role: req.query.role as string | undefined,
        entity: req.query.entity as string | undefined,
        search: req.query.search as string | undefined,
        dateFrom: req.query.dateFrom as string | undefined,
        dateTo: req.query.dateTo as string | undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 0,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 30,
      };

      const result = await auditLogService.getAuditLogs(filters);
      res.json(result);
    } catch (error) {
      console.error('Audit logs fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch audit logs' });
    }
  },

  /**
   * GET /api/admin/audit-logs/stats
   * Summary statistics for dashboard cards.
   */
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await auditLogService.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Audit stats fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch audit stats' });
    }
  },

  /**
   * GET /api/admin/audit-logs/export
   * Export filtered logs as CSV file download.
   */
  async exportCSV(req: Request, res: Response, next: NextFunction) {
    try {
      const filters: AuditLogFilters = {
        branchId: req.query.branchId as string | undefined,
        action: req.query.action as AuditAction | undefined,
        role: req.query.role as string | undefined,
        dateFrom: req.query.dateFrom as string | undefined,
        dateTo: req.query.dateTo as string | undefined,
        search: req.query.search as string | undefined,
      };

      const csv = await auditLogService.exportCSV(filters);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="audit_logs_${new Date().toISOString().slice(0,10)}.csv"`);
      res.send(csv);
    } catch (error) {
      console.error('Audit CSV export error:', error);
      res.status(500).json({ error: 'Failed to export audit logs' });
    }
  },
};
