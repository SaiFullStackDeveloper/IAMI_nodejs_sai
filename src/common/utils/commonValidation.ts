import { z } from "zod";

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
  // ... other common validations
};

export const pageValidation = z.string().optional().refine((val) => {
  if (val === undefined) return true;
  const num = parseInt(val, 10);
  return !isNaN(num) && num >= 1;
}, { message: 'Page must be a string representing a number that is at least 1' })