import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character')
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const transactionBodySchema = z.object({
  category: z.string(),
  value: z.number(),
  description: z.string().max(150).optional(),
  date: z.string().datetime().optional(),
});

export const transactionUpdateBodySchema = z.object({
  id: z.string(),
  category: z.string().optional(),
  value: z.number().optional(),
  description: z.string().max(150).optional(),
  date: z.string().datetime().optional(),
});

enum ExpenseCategory {
  GROCERIES = "GROCERIES",
  PERSONAL_CARE = "PERSONAL_CARE",
  SHOPPING = "SHOPPING",
  HOME = "HOME",
  ENTERTAINMENT = "ENTERTAINMENT",
  TRANSPORTATION = "TRANSPORTATION",
  UTILITIES = "UTILITIES",
  HEALTHCARE = "HEALTHCARE",
  EDUCATION = "EDUCATION",
  OTHER = "OTHER",
}

export const categorySchema = z.nativeEnum(ExpenseCategory);