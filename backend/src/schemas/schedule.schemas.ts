// Zod
import { z } from "zod";

export const createScheduleSchema = z
  .object({
    name: z
      .string({ required_error: "Schedule name is required" })
      .min(4, { message: "Schedule name must be at least 4 characters long" })
      .max(60, { message: "Schedule name must be less than 60 characters long" }),
    description: z
      .string()
      .min(4, { message: "Schedule description must be at least 4 characters long" })
      .max(300, { message: "Career name must be less than 300 characters long" })
      .optional(),
    startDate: z    
      .string({ required_error: "The schedule start date is required"})
      .datetime(),
    endDate: z
      .string({ required_error: "The schedule end date is required"})
      .datetime(),
    status: z
      .string({ required_error: "The status must be provided"})
      .refine(
        (status) =>
          [
            "active",
            "inactive",
          ].includes(status),
        {
          message:
            "Status must be either active or inactive",
        }
      ),
    team: z
      .string({ required_error: "The schedule team is required"})
      .min(1, { message: "The team ID must be provided" }),
    activities: z
      .array(
        z
            .string()
            .min(1, { message: "All activities IDs are required"}),
        { required_error: "The schedule activities are required" }
      ),
  })
  .strict();

  export const updateScheduleSchema = z
  .object({
    name: z
      .string({ required_error: "Schedule name is required" })
      .min(4, { message: "Schedule name must be at least 4 characters long" })
      .max(60, { message: "Schedule name must be less than 60 characters long" }),
    description: z
      .string()
      .min(4, { message: "Schedule description must be at least 4 characters long" })
      .max(300, { message: "Career name must be less than 300 characters long" }),
    startDate: z    
      .string({ required_error: "The schedule start date is required"})
      .datetime(),
    endDate: z
      .string({ required_error: "The schedule end date is required"})
      .datetime(),
    status: z
      .string({ required_error: "The status must be provided"})
      .refine(
        (status) =>
          [
            "active",
            "inactive",
          ].includes(status),
        {
          message:
            "Status must be either active or inactive",
        }
      ),
    team: z
      .string({ required_error: "The schedule team is required"})
      .min(1, { message: "The team ID must be provided" }),
    activities: z
      .array(
        z
            .string()
            .min(1, { message: "All activities' IDs are required"}),
        { required_error: "The schedule activities are required" }
      ),
    comments: z
      .array(
        z
            .string()
            .min(1, { message: "All comments' IDs are required"}),
        { required_error: "The schedule comments are required" }
      )
  })
  .strict();