// Zod
import { z } from "zod";

export const createCommentSchema = z
  .object({
    content: z
      .string({ required_error: "Comment content is required" })
      .min(1, { message: "Comment content must be at least 1 characters long" })
      .max(300, { message: "Comment content must be less than 300 characters long" }),
    author: z
      .string({ required_error: "Comment author is required" })
      .min(1, { message: "Comment author must be at least 2 characters long" })
    })
  .strict();