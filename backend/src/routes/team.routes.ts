// Router
import { Router } from "express";
// Controllers
import {
  addTeam,
  deleteTeam,
  getTeam,
  getTeams,
  updateTeam,
} from "../controllers";
// Middlewares
import { authRequired, schemaValidation, getType } from "../middlewares";
// Schemas
import { createTeamSchema, updateTeamSchema } from "../schemas";

const router = Router();

router.get("/team", authRequired, getType(getTeams, getTeam));
router.put(
  "/team",
  authRequired,
  schemaValidation(updateTeamSchema),
  updateTeam
);
router.delete("/team", authRequired, deleteTeam);
router.post("/team", authRequired, schemaValidation(createTeamSchema), addTeam);

export default router;