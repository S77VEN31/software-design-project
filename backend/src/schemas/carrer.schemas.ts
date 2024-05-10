// Zod
import { z } from "zod";

export const carrerSchema = z
    .object({
        name: z
            .string({ required_error: "Carrer name is required" })
            .min(4, { message: "Carrer name must be at least 4 characters long" })
            .max(60, { message: "Carrer name must be less than 60 characters long"}),
        code: z
            .string({ required_error: "Carrer code is required" })
            .min(2, { message: "Carrer code must be at least 2 characters long" })
            .max(10, { message: "Carrer code must be less than 10 characters long"}),
        })
    .strict();