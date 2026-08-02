import { z } from "zod";

export const productSchema = z.object({
  name: z
   .string()
   .min(3, "Product name must be at least 3 characters"),

  description: z
   .string()
   .min(8, "Description is too short"),

  price: z
   .coerce.number()
   .min(100, " Product Price must be greater than 100"),

  category: z
   .string()
   .min(1, "Please select a category"),

  stock: z
   .coerce.number()
   .int()
   .min(0, "Product stock must cannot negative"),
});
