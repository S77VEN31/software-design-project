// Zod
import { ZodString, z } from "zod";

export const createActivitySchema = z.object({
  week: z
    .string({ required_error: "The week number must be provided" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 16, {
      message: "The week number must be between 1 and 16",
    }),
  type: z
    .string({ required_error: "The activity type must be provided" })
    .refine(
      (type) =>
        [
          "Orientation",
          "Motivational",
          "Support",
          "Technical",
          "Recreational",
        ].includes(type),
      {
        message:
          "Type must be either Recreational, Motivational, Support, Technical or Recreational",
      }
    ),
  name: z
    .string({ required_error: "The activity name must be provided" })
    .min(5, { message: "The activity name must be at least 5 characters long" })
    .max(60, {
      message: "the activity name must be less than 60 characters long",
    }),
  dateTime: z
    .string({ required_error: "The activity date must be provided" })
    .datetime(),
  organizers: z
    .array<ZodString>(
      z.string().min(1, { message: "All organizers IDs must be provided" }),
      { required_error: "The organizers must be provided" }
    )
    .min(1, { message: "The activity must have at least 1 organizer" }),
  announcementDays: z
    .string({ required_error: "The week number must be provided" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: "The announcement days must be at least 1",
    }),
  reminderDays: z
    .string({ required_error: "The reminder days must be provided" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: "The reminder days must be at least 1",
    }),
  mode: z
    .string({ required_error: "The activity mode must be provided" })
    .refine((mode) => ["Online", "Presential"].includes(mode), {
      message: "The activity mode must be either Online or Presential",
    }),
  meetingLink: z
    .string({ required_error: "The meeting link must be provided" })
    .min(5, "The meeting link must be at least 5 characters"),
  poster: z
    // .instanceof(File)
    // .optional()
    .any()
    .optional(),
  status: z
    .string({ required_error: "The status must be provided" })
    .refine(
      (status) =>
        ["Planned", "Notified", "Realized", "Canceled"].includes(status),
      {
        message:
          "The status mode must be either Planned, Notified, Realized or Canceled",
      }
    ),
  evidence: z
    .string({ required_error: "The evidence must be required" })
    .min(5, "The evidence must be at least 5 characters long")
    .max(300, "The evidence must be less than 300 characters long"),
  // TBD: comments
});

export const updateActivitySchema = z.object({
  week: z
    .string({ required_error: "The week number must be provided" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 16, {
      message: "The week number must be between 1 and 16",
    }),
  type: z
    .string({ required_error: "The activity type must be provided" })
    .refine(
      (type) =>
        [
          "Orientation",
          "Motivational",
          "Support",
          "Technical",
          "Recreational",
        ].includes(type),
      {
        message:
          "Type must be either Recreational, Motivational, Support, Technical or Recreational",
      }
    ),
  dateTime: z
    .string({ required_error: "The date must be provided" })
    .datetime(),
  name: z
    .string({ required_error: "The activity name must be provided" })
    .min(5, { message: "The activity name must be at least 5 characters long" })
    .max(60, {
      message: "the activity name must be less than 60 characters long",
    }),
  organizers: z
    .array<ZodString>(
      z.string().min(1, { message: "All organizers IDs must be provided" }),
      { required_error: "The organizers must be provided" }
    )
    .min(1, { message: "The activity must have at least 1 organizer" }),
  announcementDays: z
    .string({ required_error: "The week number must be provided" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: "The announcement days must be at least 1",
    }),
  reminderDays: z
    .string({ required_error: "The reminder days must be provided" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: "The reminder days must be at least 1",
    }),
  mode: z
    .string({ required_error: "The activity mode must be provided" })
    .refine((mode) => ["Online", "Presential"].includes(mode), {
      message: "The activity mode must be either Online or Presential",
    }),
  meetingLink: z
    .string({ required_error: "The meeting link must be provided" })
    .min(5, "The meeting link must be at least 5 characters"),
  poster: z
    // .instanceof(File)
    // .optional()
    .any()
    .optional(),
  status: z
    .string({ required_error: "The status must be provided" })
    .refine(
      (status) =>
        ["Planned", "Notified", "Realized", "Canceled"].includes(status),
      {
        message:
          "The status mode must be either Planned, Notified, Realized or Canceled",
      }
    ),
  evidence: z
    .string({ required_error: "The evidence must be required" })
    .min(5, "The evidence must be at least 5 characters long")
    .max(300, "The evidence must be less than 300 characters long"),
});