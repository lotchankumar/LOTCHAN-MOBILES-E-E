"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBranchSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
// Auth validation schemas
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    name: zod_1.z.string().min(1, 'Name is required'),
    phone: zod_1.z.string().min(10, 'Phone must be at least 10 digits').optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.createBranchSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Branch name is required').max(100, 'Name too long'),
    address: zod_1.z.string().max(500, 'Address too long').optional(),
    phone: zod_1.z.string().max(20, 'Invalid phone number').optional(),
}).transform((data) => ({
    ...data,
    name: data.name.trim(),
}));
//# sourceMappingURL=validation.js.map