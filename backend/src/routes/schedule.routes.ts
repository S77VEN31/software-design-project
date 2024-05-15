// Router
import { Router } from "express";
// Controllers
import { addSchedule, deleteSchedule, getSchedule, getSchedules, updateSchedule } from "../controllers";
// Middlewares
import { schemaValidation, authRequired, getType } from "../middlewares";
// Schemas
import { createScheduleSchema, updateScheduleSchema } from "../schemas";

const router = Router();

router.get("/schedule", authRequired, getType(getSchedules, getSchedule));
router.post(
  "/schedule",
  authRequired,
  schemaValidation(createScheduleSchema),
  addSchedule
);
router.put(
  "/schedule",
  authRequired,
  schemaValidation(updateScheduleSchema),
  updateSchedule
);
router.delete("/schedule", authRequired, deleteSchedule);

export default router;