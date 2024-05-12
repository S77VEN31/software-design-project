// Router
import { Router } from "express";
// Controllers
import { addTeam, getTeams, getTeam, updateTeam, deleteTeam } from "../controllers";
// Middlewares
import { authRequired, schemaValidation } from "../middlewares";
// Schemas
import { createTeamSchema, updateTeamSchema } from "../schemas";

const router = Router();

router.get("/team", authRequired, getTeams);
router.get("/team/:code", authRequired, getTeam);
router.post("/team", authRequired, schemaValidation(createTeamSchema), addTeam);
router.put("/team/:code", authRequired, schemaValidation(updateTeamSchema), updateTeam);
router.delete("/team/:code", authRequired, deleteTeam);

export default router;