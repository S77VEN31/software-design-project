// Router
import { Router } from "express";
// Controllers
import { addActivity } from "../controllers";
// Middlewares
import { schemaValidation, authRequired } from "../middlewares";
//Schemas
import { createActivitySchema } from "../schemas";

const router = Router();

router.post("/activity", authRequired, schemaValidation(createActivitySchema), addActivity);

export default router;