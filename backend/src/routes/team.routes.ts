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
router.get("/team", authRequired, getTeam);
router.delete("/team", authRequired, deleteTeam);
router.post("/team", authRequired, schemaValidation(createTeamSchema), addTeam);
router.put(
  "/team/:code",
  authRequired,
  schemaValidation(updateTeamSchema),
  updateTeam
);


export default router;