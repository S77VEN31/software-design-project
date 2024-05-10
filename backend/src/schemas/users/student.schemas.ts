// Zod
import { z } from "zod";

export const createStudentUserSchema = z.object({
  active: z.boolean().optional(),
  description: z
    .string()
    .min(1, { message: "Description must have at least 1 character" })
    .max(100, { message: "Description must have at most 100 characters" })
    .optional(),
  carne: z
    .string({ required_error: "Carne is required" })
    .min(10, { message: "Carne must have at least 10 characters" })
    .max(10, {
      message: "Carne must have at most 10 characters",
    }),
  userName: z
    .string({ required_error: "Username is required" })
    .min(4, { message: "Username must have at least 4 characters" })
    .max(20, { message: "Username must have at most 20 characters" }),
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@estudiantec.cr"), {
      message: "Email must end with @estudiantec.cr",
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
      z.string().refine((roles) => roles.includes("Student"), {
        message: "Role must be Student",
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
  career: z
    .array(z.string(), { required_error: "Career is required" })
    .nonempty({
      message: "You must send at least 1 career",
    }),
});

export const updateStudentUserSchema = z.object({
  active: z.boolean().optional(),
  description: z
    .string()
    .min(1, { message: "Description must have at least 1 character" })
    .max(100, { message: "Description must have at most 100 characters" })
    .optional(),
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
  career: z
    .array(z.string(), { required_error: "Career is required" })
    .nonempty({
      message: "You must send at least 1 career",
    })
    .optional(),
});
