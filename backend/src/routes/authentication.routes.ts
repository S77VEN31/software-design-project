// Router
import { Router } from "express";
// Controllers
import { login, logout, register } from "../controllers";
// Middlewares
import { schemaValidation } from "../middlewares";
// Schemas
import { loginSchema, registerSchema } from "../schemas";

const router = Router();

router.post("/register", schemaValidation(registerSchema), register);
router.post("/login", schemaValidation(loginSchema), login);
router.post("/logout", logout);

export default router;
