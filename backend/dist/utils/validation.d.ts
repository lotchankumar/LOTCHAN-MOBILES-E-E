import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createBranchSchema: z.ZodPipe<z.ZodObject<{
    name: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodTransform<{
    name: string;
    address?: string | undefined;
    phone?: string | undefined;
}, {
    name: string;
    address?: string | undefined;
    phone?: string | undefined;
}>>;
//# sourceMappingURL=validation.d.ts.map