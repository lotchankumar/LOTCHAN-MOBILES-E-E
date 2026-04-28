"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = require("./error.middleware");
const client_1 = __importDefault(require("../prisma/client"));
const authenticate = async (req, res, next) => {
    // Allow explicitly public paths to bypass if needed, but best practice is to not mount middleware on them
    // We check if headers are not present
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return next(new error_middleware_1.AppError('No token provided', 401));
    }
    try {
        const token = authHeader.replace('Bearer ', '');
        // Using as any to allow parsing role
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // For non-customer users, fetch branchId from database
        let branchId;
        if (decoded.role !== 'CUSTOMER') {
            try {
                const user = await client_1.default.user.findUnique({
                    where: { id: decoded.id },
                    select: { branchId: true }
                });
                branchId = user?.branchId || undefined;
            }
            catch (dbError) {
                console.error('Failed to fetch user branch info:', dbError);
            }
        }
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            branchId
        };
        next();
    }
    catch {
        next(new error_middleware_1.AppError('Invalid or expired token', 401));
    }
};
exports.authenticate = authenticate;
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        try {
            console.log(`[AUTH] Checking role. Required: ${allowedRoles}, User: ${req.user?.role}`);
            if (!req.user) {
                throw new error_middleware_1.AppError('Not authenticated', 401);
            }
            if (!allowedRoles.includes(req.user.role)) {
                console.log(`[AUTH] Forbidden! User role ${req.user.role} not in ${allowedRoles}`);
                throw new error_middleware_1.AppError('Insufficient permissions', 403);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.middleware.js.map