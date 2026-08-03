import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(8, "Description is too short"),

  price: z
    .coerce
    .number()
    .min(100, "Product price must be greater than ₹100"),

  category: z
    .string()
    .trim()
    .min(1, "Please select a category"),

  stock: z
    .coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
});