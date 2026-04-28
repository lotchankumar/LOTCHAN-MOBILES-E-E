import { Request, Response } from 'express';
import { categoryService } from '../services/category.service';

export const categoryController = {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAll();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const category = await categoryService.getById(req.params.id as string);
      res.json(category);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to fetch category' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json(category);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to create category' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const category = await categoryService.update(req.params.id as string, req.body);
      res.json(category);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to update category' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await categoryService.delete(req.params.id as string);
      res.json(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || 'Failed to delete category' });
    }
  },
};
