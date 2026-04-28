import { z } from 'zod';

// Auth validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createBranchSchema = z.object({
  name: z.string().min(1, 'Branch name is required').max(100, 'Name too long'),
  address: z.string().max(500, 'Address too long').optional(),
  phone: z.string().max(20, 'Invalid phone number').optional(),
}).transform((data) => ({
  ...data,
  name: data.name.trim(),
}));

