"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseController = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const error_middleware_1 = require("../middleware/error.middleware");
const cache_service_1 = require("../services/cache.service");
const auditLog_service_1 = require("../services/auditLog.service");
exports.purchaseController = {
    async createPurchase(req, res) {
        try {
            const { managerId, supplier, invoiceNo, items, spareItems, supplierId, paidAmount, notes, branchId } = req.body;
            if (!managerId || !supplier || !invoiceNo || !branchId) {
                throw new error_middleware_1.AppError('Missing required fields', 400);
            }
            const hasProducts = items && Array.isArray(items) && items.length > 0;
            const hasSpares = spareItems && Array.isArray(spareItems) && spareItems.length > 0;
            if (!hasProducts && !hasSpares) {
                throw new error_middleware_1.AppError('At least one product item or spare part is required', 400);
            }
            const productTotalAmount = hasProducts ? items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0) : 0;
            const spareTotalAmount = hasSpares ? spareItems.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0) : 0;
            const totalAmount = productTotalAmount + spareTotalAmount;
            const paid = paidAmount || 0;
            const purchase = await client_1.default.$transaction(async (tx) => {
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
                            branchId,
                            items: {
                                create: processedItems.map((item) => ({
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
                        const updateProductData = {};
                        if (item.sellingPrice && item.sellingPrice > 0)
                            updateProductData.price = item.sellingPrice;
                        if (item.unitCost && item.unitCost > 0)
                            updateProductData.cost = item.unitCost;
                        if (Object.keys(updateProductData).length > 0) {
                            await tx.product.update({
                                where: { id: item.productId },
                                data: updateProductData,
                            });
                        }
                        // Increment branch stock
                        await tx.branchStock.upsert({
                            where: { branchId_productId: { branchId, productId: item.productId } },
                            update: { stockQty: { increment: item.quantity } },
                            create: { branchId, productId: item.productId, stockQty: item.quantity }
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
                            branchId,
                            items: {
                                create: spareItems.map((item) => ({
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
                        const updateData = {
                            stockQty: { increment: item.quantity }
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
                        await tx.supplierPayment.create({
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
                        await tx.supplierPayment.create({
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
            await cache_service_1.cacheService.invalidatePattern('products:*');
            await cache_service_1.cacheService.invalidatePattern('product:*');
            // Log purchase creation
            const user = req.user;
            auditLog_service_1.auditLogService.logAction({
                userId: user?.id || managerId,
                action: 'PURCHASE_CREATED',
                entity: 'Purchase',
                entityId: purchase.purchase?.id || purchase.sparePurchase?.id || undefined,
                details: JSON.stringify({ invoiceNo, supplier, totalAmount, productItems: items?.length || 0, spareItems: spareItems?.length || 0 }),
                branchId: branchId,
                ipAddress: req.ip,
            });
            res.status(201).json({ success: true, data: purchase });
        }
        catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Invoice number already exists or SKU conflict' });
            }
            console.error('Purchase creation failed:', error);
            res.status(500).json({ error: error.message || 'Failed to create purchase' });
        }
    },
    async getPurchases(req, res) {
        try {
            const { category, brand, startDate, endDate } = req.query;
            const where = {};
            if (category || brand) {
                where.items = {
                    some: {
                        product: {
                            ...(category && { category }),
                            ...(brand && { brand: { contains: brand } })
                        }
                    }
                };
            }
            if (startDate && endDate) {
                where.createdAt = {
                    gte: new Date(startDate + 'T00:00:00.000Z'),
                    lte: new Date(endDate + 'T23:59:59.999Z'),
                };
            }
            const purchases = await client_1.default.purchase.findMany({
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
        }
        catch (error) {
            console.error('Failed to fetch purchases:', error);
            res.status(500).json({ error: 'Failed to fetch purchases' });
        }
    },
};
//# sourceMappingURL=purchase.controller.js.map