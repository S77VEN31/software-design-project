// Express
import { Request, Response, NextFunction } from "express";
// Zod
import { ZodSchema } from "zod";

export const schemaValidation = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // The parse method will throw an error if validation fails
      schema.parse(req.body);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ message: "Invalid request", error: "Invalid request body" });
    }
  };
};
