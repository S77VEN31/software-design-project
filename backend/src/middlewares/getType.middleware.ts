// Express
import { Request, Response, NextFunction } from "express";
// Types
type Controller = (req: Request, res: Response, next: NextFunction) => void;

export const getType = (get: Controller, getById: Controller) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.query.id === "string") {
      getById(req, res, next);
    } else {
      get(req, res, next);
    }
  };
};
