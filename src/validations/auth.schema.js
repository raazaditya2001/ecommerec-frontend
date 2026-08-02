import { z } from "zod";

export const registrationSchema = z.object({
  name: z
   .string()
   .min(3, "Name must be at least 3 characters"),

  email: z.email("Invalid email"),

  password: z
   .string()
   .min(8, "password must be at least 8 characters"),
});
