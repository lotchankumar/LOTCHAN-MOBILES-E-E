import { Request, Response } from 'express';
import { inventoryService } from '../services/inventory.service';
import { cacheService } from '../services/cache.service';

export const productController = {
  async getAllProducts(req: Request, res: Response) {
    try {
      const filters = {
        category: req.query.category as string,
        supplierId: req.query.supplierId as string,
        search: req.query.search as string,
        lowStock: req.query.lowStock === 'true'
      };
      const products = await cacheService.getOrSet(
        `products:${JSON.stringify(filters)}`,
        () => inventoryService.getProducts(filters),
        60
      );
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const product = await cacheService.getOrSet(
        `product:${id}`,
        () => inventoryService.getProductById(id),
        120
      );
      res.json(product);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message || 'Failed to fetch product' });
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const product = await inventoryService.createProduct(req.body);
      cacheService.invalidatePattern('products:*');
      cacheService.invalidatePattern('product:*');
      res.status(201).json(product);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message || 'Failed to create product' });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const product = await inventoryService.updateProduct(id, req.body);
      cacheService.invalidatePattern('products:*');
      cacheService.invalidatePattern('product:*');
      res.json(product);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message || 'Failed to update product' });
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await inventoryService.deleteProduct(id);
      cacheService.invalidatePattern('products:*');
      cacheService.invalidatePattern('product:*');
      res.status(204).send();
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message || 'Failed to delete product' });
    }
  }
};

