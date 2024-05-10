// Zod
import { z } from "zod";

export const careerSchema = z
  .object({
    name: z
      .string({ required_error: "Career name is required" })
      .min(4, { message: "Career name must be at least 4 characters long" })
      .max(60, { message: "Career name must be less than 60 characters long" }),
    code: z
      .string({ required_error: "Career code is required" })
      .min(2, { message: "Career name must be at least 2 characters long" })
      .max(10, { message: "Career name must be less than 10 characters long" }),
  })
  .strict();