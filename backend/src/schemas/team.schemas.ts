// Zod
import { z } from "zod";

export const createTeamSchema = z
    .object({
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
            .min(5, { message: "The team description must be at least 5 characters long" })
            .max(300, { message: "The team description must be less than 300 characters" }),
        students: z.array(
                z
                    .string()
                    .min(1, { message: "The students IDs must be provided"})
            )
            .optional(),
        teachers: z.array(
                z
                    .string()
                    .min(1, { message: "All teachers IDs must be provided"}),
                { required_error: "The teachers must be provided" }
            )
            .min(1, { message: "The team must have at least 1 teacher"}),
        coordinator: z
            .string({ required_error: "The coordinator must be provided"})    
            .min(1, { message: "The coordinator can't be an empty string"})
    })
    .strict();

export const updateTeamSchema = z
    .object({
        name: z
            .string({ required_error: "The team name must be provided" })
            .min(5, { message: "The team name must be at least 5 characters long" })
            .max(60, { message: "The team name must be less than 60 characters" }),
        description: z
            .string({ required_error: "The team description must be provided" })
            .min(5, { message: "The team description must be at least 5 characters long" })
            .max(300, { message: "The team description must be less than 300 characters" }),
        students: z.array(
                z
                    .string()
                    .min(1, { message: "The students IDs must be provided"}),
                { required_error: "The students must be provided" }
            ),
        teachers: z.array(
                z
                    .string()
                    .min(1, { message: "All teachers IDs must be provided"}),
                { required_error: "The teachers must be provided" }
            )
            .min(1, { message: "The team must have at least 1 teacher"}),
        coordinator: z
            .string({ required_error: "The coordinator must be provided"})    
            .min(1, { message: "The coordinator can't be an empty string"})
    })
    .strict();