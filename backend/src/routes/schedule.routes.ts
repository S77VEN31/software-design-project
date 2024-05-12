// Router
import { Router } from "express";
// Controllers
import { addSchedule, deleteSchedule, getSchedule, getSchedules, updateSchedule } from "../controllers";
// Middlewares
import { schemaValidation, authRequired } from "../middlewares";
// Schemas
import { createScheduleSchema, updateScheduleSchema } from "../schemas";

const router = Router();

router.get("/schedule", authRequired, getSchedules);
router.get("/schedule/:id", authRequired, getSchedule);
router.post("/schedule", authRequired, schemaValidation(createScheduleSchema), addSchedule);
router.put("/schedule/:id", authRequired, schemaValidation(updateScheduleSchema), updateSchedule);
router.delete("/schedule/:id", authRequired, deleteSchedule);

export default router;