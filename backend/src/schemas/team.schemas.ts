// Zod
import { z } from "zod";
// Constants
const currentYear = new Date().getFullYear();

export const createTeamSchema = z.object({
  code: z
    .string({ required_error: "The team code must be provided" })
    .min(5, { message: "The team code must be at least 5 characters long" })
    .max(10, { message: "The team code must be less than 10 characters" }),
  name: z
    .string({ required_error: "The team name must be provided" })
    .min(5, { message: "The team name must be at least 5 characters long" })
    .max(60, { message: "The team name must be less than 60 characters" }),
  description: z
    .string({ required_error: "The team description must be provided" })
    .max(100, {
      message: "The team description must be less than 300 characters",
    })
    .optional(),
  students: z
    .array(z.string())
    .nonempty({ message: "The team must have at least 1 student" }),
  teachers: z
    .array(z.string())
    .nonempty({ message: "The team must have at least 1 teacher" }),
  coordinator: z
    .array(z.string())
    .nonempty({ message: "The team must have at least 1 coordinator" }),
  year: z
    .string({ required_error: "The year must be provided" })
    .min(4, { message: "The year must be at least 4 characters long" })
    .max(4, { message: "The year must be less than 4 characters" })
    .refine(
      (year) => {
        const yearNumber = parseInt(year);
        return yearNumber >= 1971 && yearNumber <= currentYear + 1;
      },
      {
        message: `The year must be a number between 1971 and the current ${currentYear} + 1`,
      }
    ),
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

export const updateTeamSchema = z.object({
  name: z
    .string({ required_error: "The team name must be provided" })
    .min(5, { message: "The team name must be at least 5 characters long" })
    .max(60, { message: "The team name must be less than 60 characters" }),
  description: z
    .string({ required_error: "The team description must be provided" })
    .max(100, {
      message: "The team description must be less than 300 characters",
    })
    .optional(),
  students: z
    .array(z.string())
    .nonempty({ message: "The team must have at least 1 student" }),
  teachers: z
    .array(z.string())
    .nonempty({ message: "The team must have at least 1 teacher" }),
  coordinator: z
    .array(z.string())
    .nonempty({ message: "The team must have at least 1 coordinator" }),
  year: z
    .string({ required_error: "The year must be provided" })
    .min(4, { message: "The year must be at least 4 characters long" })
    .max(4, { message: "The year must be less than 4 characters" })
    .refine(
      (year) => {
        const yearNumber = parseInt(year);
        return yearNumber >= 1971 && yearNumber <= currentYear + 1;
      },
      {
        message: `The year must be a number between 1971 and the current ${currentYear} + 1`,
      }
    ),
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
