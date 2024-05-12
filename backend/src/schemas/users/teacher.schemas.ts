// Zod
import { z } from "zod";

export const createTeacherUserSchema = z.object({
  active: z.boolean().optional(),
  description: z
    .string()
    .min(1, { message: "Description must have at least 1 character" })
    .max(100, { message: "Description must have at most 100 characters" })
    .optional(),
  idNumber: z
    .string({ required_error: "ID number is required" })
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
    .min(1, { message: "Email must have at least 1 character" })
    .max(100, { message: "Email must have at most 100 characters" })
    .refine((email) => email.endsWith("@itcr.ac.cr"), {
      message: "Email must end with @itcr.ac.cr",
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
      z
        .enum(["Teacher", "Coordinator"])
        .refine((role) => ["Teacher", "Coordinator"].includes(role), {
          message: "Role must be Teacher or Coordinator",
        })
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

export const updateTeacherUserSchema = z.object({
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
  roles: z
    .array(
      z
        .enum(["Teacher", "Coordinator"])
        .refine((role) => ["Teacher", "Coordinator"].includes(role), {
          message: "Role must be Teacher or Coordinator",
        })
    )
    .nonempty({
      message: "You must send at least 1 role",
    })
    .optional(),
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
