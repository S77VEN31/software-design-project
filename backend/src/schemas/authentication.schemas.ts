// Zod
import { z } from "zod";

export const registerSchema = z
  .object({
    userName: z
      .string({ required_error: "Username is required" })
      .min(4, { message: "Username must be at least 4 characters long" })
      .max(50, { message: "Username must be less than 50 characters long" }),
    email: z
      .string({ required_error: "Email is required" })
      .refine((email) => email.endsWith("@estudiantec.cr"), {
        message: "Email must end with @estudiantec.cr",
      }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(50, { message: "Password must be less than 50 characters long" }),
    isOrganization: z.boolean(),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }),
  })
  .strict();
