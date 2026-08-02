import { z } from "zod";

export const registrationSchema = z.object({
 name : z
    .string()
    .min(3, "Name must be at least # characters")
    .max(30, "Name cannot excced 50 characters"),

    email : z
    .email("Invalid email address"),
    

    password : z
    .string()
    .min(8, "Password must be at least * characters")
    .regex(/[A-Z]/,"Must conatin one uppercase letter")
    .regex(/[a-z]/,"Must conatin one lowercase letter")
    .regex(/[0-9]/,"Must conatin one number")
    .regex(/[^A-Za-z0-9]/,"Must conatin one special character"),
});


