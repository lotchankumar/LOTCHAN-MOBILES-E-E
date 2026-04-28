import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { AppError } from '../middleware/error.middleware';
import { cacheService } from '../services/cache.service';

export const purchaseController = {
  async createPurchase(req: Request, res: Response) {
    try {
      const { managerId, supplier, invoiceNo, items, spareItems, supplierId, paidAmount, notes } = req.body;

      if (!managerId || !supplier || !invoiceNo) {
        throw new AppError('Missing required fields', 400);
      }
      
      const hasProducts = items && Array.isArray(items) && items.length > 0;
      const hasSpares = spareItems && Array.isArray(spareItems) && spareItems.length > 0;
      
      if (!hasProducts && !hasSpares) {
        throw new AppError('At least one product item or spare part is required', 400);
      }

      const productTotalAmount = hasProducts ? items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitCost), 0) : 0;
      const spareTotalAmount = hasSpares ? spareItems.reduce((sum: number, item: any) => sum + (item.quantity * item.unitCost), 0) : 0;
      const totalAmount = productTotalAmount + spareTotalAmount;
      const paid = paidAmount || 0;

      const purchase = await prisma.$transaction(async (tx) => {
        // Pre-process items: create new products if needed
        const processedItems = [];
        if (hasProducts) {
          for (const item of items) {
            let productId = item.productId;
            if (item.isNewProduct) {
              const newProduct = await tx.product.create({
                data: {
                  sku: item.sku || `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                  name: item.name || `${item.brand} ${item.model}`,
                  brand: item.brand,
                  model: item.model,
                  category: item.category || 'MOBILE',
                  categoryId: item.categoryId || null,
                  price: item.sellingPrice || 0,
                  cost: item.unitCost || 0,
                  stockQty: 0, // will be incremented below
                  supplierId: supplierId || null,
                }
              });
              productId = newProduct.id;
            }
            processedItems.push({
              productId,
              quantity: item.quantity,
              unitCost: item.unitCost,
              sellingPrice: item.sellingPrice || 0,
              total: item.quantity * item.unitCost,
            });
          }
        }

        // Create purchase
        let createdPurchase = null;
        if (hasProducts) {
          createdPurchase = await tx.purchase.create({
            data: {
              managerId,
              supplier,
              supplierId: supplierId || null,
              invoiceNo,
              totalAmount: productTotalAmount,
              paidAmount: paid,
              items: {
                create: processedItems.map((item: any) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  unitCost: item.unitCost,
                  sellingPrice: item.sellingPrice,
                  total: item.total,
                })),
              },
            },
            include: {
              items: {
                include: {
                  product: {
                    select: { id: true, brand: true, model: true, sku: true, category: true, categoryId: true },
                  },
                },
              },
            },
          });
          
          // Update stock for each item, and also update product selling price if provided
          for (const item of processedItems) {
            const updateData: any = {
              stockQty: { increment: item.quantity },
            };
            // Also set selling price and cost on the product if provided
            if (item.sellingPrice && item.sellingPrice > 0) {
              updateData.price = item.sellingPrice;
            }
            if (item.unitCost && item.unitCost > 0) {
              updateData.cost = item.unitCost;
            }
            await tx.product.update({
              where: { id: item.productId },
              data: updateData,
            });
          }
        }
        
        let createdSparePurchase = null;
        if (hasSpares) {
          createdSparePurchase = await tx.repairSparePurchase.create({
            data: {
              managerId,
              supplier,
              invoiceNo,
              totalAmount: spareTotalAmount,
              notes: notes || null,
              items: {
                create: spareItems.map((item: any) => ({
                  spareProductId: item.spareProductId,
                  quantity: item.quantity,
                  unitCost: item.unitCost,
                  sellingPrice: item.sellingPrice || 0,
                  total: item.quantity * item.unitCost,
                })),
              },
            },
            include: {
              items: {
                include: {
                  spareProduct: {
                    select: { id: true, name: true, sku: true, brand: true, model: true },
                  },
                },
              },
            },
          });
          
          // Update stock for each spare item
          for (const item of spareItems) {
            const updateData: any = {
              stockQty: { increment: item.quantity },
            };
            if (item.sellingPrice && item.sellingPrice > 0) {
              updateData.sellingPrice = item.sellingPrice;
            }
            await tx.repairSpareProduct.update({
              where: { id: item.spareProductId },
              data: updateData,
            });
          }
        }

        // Auto-record credit for supplier if supplierId is provided
        if (supplierId) {
          const creditAmount = totalAmount - paid;
          if (creditAmount > 0) {
            // Record credit entry
            await tx.supplier.update({
              where: { id: supplierId },
              data: { creditBalance: { increment: creditAmount } },
            });
            await (tx as any).supplierPayment.create({
              data: {
                supplierId,
                amount: creditAmount,
                paymentType: 'CREDIT',
                reference: invoiceNo,
                description: `Purchase invoice ${invoiceNo}`,
                paymentDate: new Date(),
              },
            });
          }
          // If there was a paid amount, record debit entry
          if (paid > 0) {
            await (tx as any).supplierPayment.create({
              data: {
                supplierId,
                amount: paid,
                paymentType: 'DEBIT',
                reference: invoiceNo,
                description: `Payment for purchase invoice ${invoiceNo}`,
                paymentDate: new Date(),
              },
            });
          }
        }

        return { purchase: createdPurchase, sparePurchase: createdSparePurchase };
      });

      // Invalidate products cache since stock quantities or new products were added
      await cacheService.invalidatePattern('products:*');
      await cacheService.invalidatePattern('product:*');

      res.status(201).json({ success: true, data: purchase });
    } catch (error: any) {
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Invoice number already exists or SKU conflict' });
      }
      console.error('Purchase creation failed:', error);
      res.status(500).json({ error: error.message || 'Failed to create purchase' });
    }
  },

  async getPurchases(req: Request, res: Response) {
    try {
      const { category, brand, startDate, endDate } = req.query;
      const where: any = {};
      
      if (category || brand) {
        where.items = {
          some: {
            product: {
              ...(category && { category }),
              ...(brand && { brand: { contains: brand as string } })
            }
          }
        };
      }
      
      if (startDate && endDate) {
        where.createdAt = {
          gte: new Date(startDate as string + 'T00:00:00.000Z'),
          lte: new Date(endDate as string + 'T23:59:59.999Z'),
        };
      }

      const purchases = await prisma.purchase.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          manager: { select: { id: true, name: true } },
          supplierRef: { select: { id: true, name: true, creditBalance: true } },
          items: {
            include: {
              product: {
                select: { id: true, brand: true, model: true, sku: true, category: true, categoryId: true, price: true },
              },
            },
          },
        },
      });
      res.json({ success: true, data: purchases });
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
      res.status(500).json({ error: 'Failed to fetch purchases' });
    }
  },
};
