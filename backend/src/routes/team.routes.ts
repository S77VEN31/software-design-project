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
import { authRequired, schemaValidation } from "../middlewares";
// Schemas
import { createTeamSchema, updateTeamSchema } from "../schemas";

const router = Router();

router.get("/team", authRequired, getTeams);
router.delete("/team", authRequired, deleteTeam);
router.get("/team/:code", authRequired, getTeam);
router.post("/team", authRequired, schemaValidation(createTeamSchema), addTeam);
router.put(
  "/team/:code",
  authRequired,
  schemaValidation(updateTeamSchema),
  updateTeam
);


export default router;