// Express
import { NextFunction, Request, Response } from "express";
// Zod
import { ZodSchema } from "zod";

export const schemaValidation = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // The parse method will throw an error if validation fails
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        message: error.errors.map((error: any) => error.message),
      });
    }
  };
};
