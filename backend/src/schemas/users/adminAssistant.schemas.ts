// Zod
import { z } from "zod";

export const createAdminAssistantUserSchema = z.object({
  active: z.boolean().optional(),
  idNumber: z
    .string({ required_error: "ID Number is required" })
    .min(9, { message: "ID number must have at least 9 characters" })
    .max(9, {
      message: "ID number must have at most 9 characters",
    }),
  userName: z
    .string({ required_error: "Username is required" })
    .min(4, { message: "Username must have at least 4 characters" })
    .max(20, { message: "Username must have at most 20 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .refine((email) => email.endsWith("@aaitcr.ac.cr"), {
      message: "Email must end with @aaitcr.ac.cr",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must have at least 8 characters" })
    .max(100, { message: "Password must have at most 100 characters" }),
  profilePicture: z.string().optional(),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must have at least 1 character" })
    .max(100, { message: "Name must have at most 100 characters" }),
  phones: z.array(z.string()).optional(),
  roles: z
    .array(
      z.string().refine((roles) => roles.includes("AdminAssistant"), {
        message: "Role must be AdminAssistant",
      }),
      { required_error: "Role is required" }
    )
    .nonempty({
      message: "You must send at least 1 role",
    }),
  campusBranch: z
    .array(z.string(), { required_error: "Campus branch is required" })
    .nonempty({
      message: "You must send at least 1 campus branch",
    }),
});

export const updateAdminAssistantUserSchema = z.object({
  active: z.boolean().optional(),
  profilePicture: z.string().optional(),
  name: z
    .string()
    .min(4, { message: "Name must have at least 4 characters" })
    .max(100, { message: "Name must have at most 100 characters" })
    .optional(),
  phones: z.array(z.string()).optional(),
  campusBranch: z
    .array(z.string(), { required_error: "Campus branch is required" })
    .nonempty({
      message: "You must send at least 1 campus branch",
    })
    .optional(),
});
