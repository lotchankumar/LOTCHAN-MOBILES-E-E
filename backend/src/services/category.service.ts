import prisma from '../prisma/client';
import { AppError } from '../middleware/error.middleware';

export interface CreateCategoryData {
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  displayOrder?: number;
}

export interface UpdateCategoryData {
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  displayOrder?: number;
}

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const categoryService = {
  async getAll() {
    return prisma.productCategory.findMany({
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { products: true } } },
    });
  },

  async getById(id: string) {
    const c = await prisma.productCategory.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
    if (!c) throw new AppError('Category not found', 404);
    return c;
  },

  async create(data: CreateCategoryData) {
    if (!data.name?.trim()) throw new AppError('Name is required', 400);

    const slug = (data.slug?.trim() || slugify(data.name));
    if (!slug) throw new AppError('Invalid slug', 400);

    const existingSlug = await prisma.productCategory.findUnique({ where: { slug } });
    if (existingSlug) throw new AppError('Slug already exists', 409);

    const existingName = await prisma.productCategory.findUnique({ where: { name: data.name.trim() } });
    if (existingName) throw new AppError('Category name already exists', 409);

    return prisma.productCategory.create({
      data: {
        name: data.name.trim(),
        slug,
        description: data.description ?? null,
        icon: data.icon ?? null,
        displayOrder: data.displayOrder ?? 0,
      },
    });
  },

  async update(id: string, data: UpdateCategoryData) {
    const existing = await prisma.productCategory.findUnique({ where: { id } });
    if (!existing) throw new AppError('Category not found', 404);

    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await prisma.productCategory.findUnique({ where: { slug: data.slug } });
      if (slugExists) throw new AppError('Slug already exists', 409);
    }
    if (data.name && data.name !== existing.name) {
      const nameExists = await prisma.productCategory.findUnique({ where: { name: data.name } });
      if (nameExists) throw new AppError('Category name already exists', 409);
    }

    return prisma.productCategory.update({
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

  async delete(id: string) {
    const c = await prisma.productCategory.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
    if (!c) throw new AppError('Category not found', 404);
    if (c._count.products > 0) {
      throw new AppError('Cannot delete category with associated products', 400);
    }
    await prisma.productCategory.delete({ where: { id } });
    return { success: true };
  },
};
