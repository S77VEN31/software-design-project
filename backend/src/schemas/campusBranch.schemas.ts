// Zod
import { z } from "zod";

export const createCampusBranchSchema = z
    .object({
        name: z
            .string({ required_error: "Campus branch name is required" })
            .min(4, { message: "Campus branch name must be at least 4 characters long" })
            .max(60, { message: "Campus branch name must be less than 60 characters long"}),
        initials: z
            .string({ required_error: "Campus branch initials is required" })
            .min(2, { message: "Campus branch initials name must be at least 2 characters long" })
            .max(5, { message: "Campus branch initials must be less than 5 characters long"}),
        code: z
            .string({ required_error: "Campus branch code is required" })
            .min(3, { message: "Campus branch code must be at least 3 characters long" })
            .max(10, { message: "Campus branch code must be less than 10 characters long"}),
        location: z
            .object({
                type: z
                    .literal("Point", { 
                        required_error: "Campus branch location type is required",
                    }),
                coordinates: z
                    .array(z
                        .number(),
                        { required_error: "Campus branch coordinates are required"}
                    )
                    .length(2, "Only latitud and longitud must be provided"),
                }),
        careers: z
            .array(z
                .string({ required_error: "Campus branch career is required" })
                .min(4, { message: "Campus branch name must be at least 4 characters long" })
                .max(60, { message: "Campus branch name must be less than 60 characters long"}),
            )
            .min(1, "Campus branch must have at least 1 career")
        })
    .strict();

export const updateCampusBranchSchema = z
    .object({
        name: z
            .string({ required_error: "Campus branch name is required" })
            .min(4, { message: "Campus branch name must be at least 4 characters long" })
            .max(60, { message: "Campus branch name must be less than 60 characters long"}),
        initials: z
            .string({ required_error: "Campus branch initials is required" })
            .min(2, { message: "Campus branch initials name must be at least 2 characters long" })
            .max(5, { message: "Campus branch initials must be less than 5 characters long"}),
        location: z
            .object({
                type: z
                    .literal("Point", { 
                        required_error: "Campus branch location type is required",
                    }),
                coordinates: z
                    .array(z
                        .number(),
                        { required_error: "Campus branch coordinates are required"}
                    )
                    .length(2, "Only latitud and longitud must be provided"),
                }),
        careers: z
            .array(z
                .string({ required_error: "Campus career is required" })
                .min(4, { message: "Campus career must be at least 4 characters long" })
                .max(60, { message: "Campus career name must be less than 60 characters long"}),
            )
            .min(1, "Campus branch must have at least 1 career")
        })
    .strict();