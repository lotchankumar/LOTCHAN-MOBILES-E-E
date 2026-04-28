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
export declare const categoryService: {
    getAll(): Promise<({
        _count: {
            products: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        icon: string | null;
        displayOrder: number;
    })[]>;
    getById(id: string): Promise<{
        _count: {
            products: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        icon: string | null;
        displayOrder: number;
    }>;
    create(data: CreateCategoryData): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        icon: string | null;
        displayOrder: number;
    }>;
    update(id: string, data: UpdateCategoryData): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        icon: string | null;
        displayOrder: number;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map