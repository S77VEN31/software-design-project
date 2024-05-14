// Zod
import { z } from "zod";

export const createScheduleSchema = z.object({
  name: z
    .string({ required_error: "Schedule name is required" })
    .min(4, { message: "Schedule name must be at least 4 characters long" })
    .max(60, { message: "Schedule name must be less than 60 characters long" }),
  description: z
    .string()
    .max(300, { message: "Career name must be less than 100 characters long" })
    .optional(),
  startDate: z
    .string({ required_error: "The schedule start date is required" })
    .datetime(),
  endDate: z
    .string({ required_error: "The schedule end date is required" })
    .datetime(),
  status: z
    .string({ required_error: "The status must be provided" })
    .refine((status) => ["active", "inactive"].includes(status), {
      message: "Status must be either active or inactive",
    }),
  teams: z.array(z.string().min(1), {
    required_error: "The schedule team is required",
  }),
  activities: z
    .array(z.string(), {
      required_error: "The schedule activities are required",
    })
    .optional(),
});

export const updateScheduleSchema = z.object({
  name: z
    .string({ required_error: "Schedule name is required" })
    .min(4, { message: "Schedule name must be at least 4 characters long" })
    .max(60, {
      message: "Schedule name must be less than 60 characters long",
    })
    .optional(),
  description: z
    .string()
    .max(100, {
      message: "Career name must be less than 100 characters long",
    })
    .optional(),
  startDate: z
    .string({ required_error: "The schedule start date is required" })
    .datetime()
    .optional(),
  endDate: z
    .string({ required_error: "The schedule end date is required" })
    .datetime()
    .optional(),
  status: z
    .string({ required_error: "The status must be provided" })
    .refine((status) => ["active", "inactive"].includes(status), {
      message: "Status must be either active or inactive",
    })
    .optional(),
  teams: z
    .array(z.string().min(1), {
      required_error: "The schedule team is required",
    })
    .optional(),
  activities: z
    .array(z.string(), {
      required_error: "The schedule activities are required",
    })
    .optional(),
  comments: z
    .array(z.string().min(1, { message: "All comments' IDs are required" }), {
      required_error: "The schedule comments are required",
    })
    .optional(),
});
