"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_service_1 = require("../services/category.service");
exports.categoryController = {
    async getAll(req, res) {
        try {
            const categories = await category_service_1.categoryService.getAll();
            res.json(categories);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    },
    async getById(req, res) {
        try {
            const category = await category_service_1.categoryService.getById(req.params.id);
            res.json(category);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch category' });
        }
    },
    async create(req, res) {
        try {
            const category = await category_service_1.categoryService.create(req.body);
            res.status(201).json(category);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create category' });
        }
    },
    async update(req, res) {
        try {
            const category = await category_service_1.categoryService.update(req.params.id, req.body);
            res.json(category);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update category' });
        }
    },
    async delete(req, res) {
        try {
            const result = await category_service_1.categoryService.delete(req.params.id);
            res.json(result);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete category' });
        }
    },
};
//# sourceMappingURL=category.controller.js.map