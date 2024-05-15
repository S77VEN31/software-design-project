// Router
import { Router } from "express";
// Controllers
import { addActivity, deleteActivity, getActivities, getActivity, updateActivities } from "../controllers";
// Middlewares
import { schemaValidation, authRequired, getType } from "../middlewares";
//Schemas
import { createActivitySchema, updateActivitySchema } from "../schemas";

const router = Router();

router.get("/activity", authRequired, getType(getActivities, getActivity));
router.post(
  "/activity",
  authRequired,
  schemaValidation(createActivitySchema),
  addActivity
);
router.put(
  "/activity",
  authRequired,
  schemaValidation(updateActivitySchema),
  updateActivities
);
router.delete("/activity", authRequired, deleteActivity);

export default router;