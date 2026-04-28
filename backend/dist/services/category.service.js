"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const error_middleware_1 = require("../middleware/error.middleware");
const slugify = (str) => str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
exports.categoryService = {
    async getAll() {
        return client_1.default.productCategory.findMany({
            orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
            include: { _count: { select: { products: true } } },
        });
    },
    async getById(id) {
        const c = await client_1.default.productCategory.findUnique({
            where: { id },
            include: { _count: { select: { products: true } } },
        });
        if (!c)
            throw new error_middleware_1.AppError('Category not found', 404);
        return c;
    },
    async create(data) {
        if (!data.name?.trim())
            throw new error_middleware_1.AppError('Name is required', 400);
        const slug = (data.slug?.trim() || slugify(data.name));
        if (!slug)
            throw new error_middleware_1.AppError('Invalid slug', 400);
        const existingSlug = await client_1.default.productCategory.findUnique({ where: { slug } });
        if (existingSlug)
            throw new error_middleware_1.AppError('Slug already exists', 409);
        const existingName = await client_1.default.productCategory.findUnique({ where: { name: data.name.trim() } });
        if (existingName)
            throw new error_middleware_1.AppError('Category name already exists', 409);
        return client_1.default.productCategory.create({
            data: {
                name: data.name.trim(),
                slug,
                description: data.description ?? null,
                icon: data.icon ?? null,
                displayOrder: data.displayOrder ?? 0,
            },
        });
    },
    async update(id, data) {
        const existing = await client_1.default.productCategory.findUnique({ where: { id } });
        if (!existing)
            throw new error_middleware_1.AppError('Category not found', 404);
        if (data.slug && data.slug !== existing.slug) {
            const slugExists = await client_1.default.productCategory.findUnique({ where: { slug: data.slug } });
            if (slugExists)
                throw new error_middleware_1.AppError('Slug already exists', 409);
        }
        if (data.name && data.name !== existing.name) {
            const nameExists = await client_1.default.productCategory.findUnique({ where: { name: data.name } });
            if (nameExists)
                throw new error_middleware_1.AppError('Category name already exists', 409);
        }
        return client_1.default.productCategory.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name.trim() }),
                ...(data.slug && { slug: data.slug.trim() }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.icon !== undefined && { icon: data.icon }),
                ...(data.displayOrder !== undefined && { displayOrder: data.displayOrder }),
            },
        });
    },
    async delete(id) {
        const c = await client_1.default.productCategory.findUnique({
            where: { id },
            include: { _count: { select: { products: true } } },
        });
        if (!c)
            throw new error_middleware_1.AppError('Category not found', 404);
        if (c._count.products > 0) {
            throw new error_middleware_1.AppError('Cannot delete category with associated products', 400);
        }
        await client_1.default.productCategory.delete({ where: { id } });
        return { success: true };
    },
};
//# sourceMappingURL=category.service.js.map