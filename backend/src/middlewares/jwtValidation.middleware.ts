// Express
import { NextFunction, Request, Response } from "express";
// Json Web Token
import jwt, { JwtPayload } from "jsonwebtoken";
// Token key
import { TOKEN_KEY } from "../settings";

// Extends the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Verify token in a async way
const verifyToken = (token: string, secret: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        reject(err);
      } else if (!decodedToken || typeof decodedToken !== "object") {
        reject(new Error("Token is valid but not the expected type"));
      } else {
        resolve(decodedToken as JwtPayload);
      }
    });
  });
};

export const authRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token; 

  if (!token) {
    res.status(401).json({ message: "Unauthorized no token" });
    return;
  }

  try {
    const decodedToken = await verifyToken(token, TOKEN_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
