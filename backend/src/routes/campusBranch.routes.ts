// Router
import { Router } from "express";
// Controllers
import { addCampusBranch, deleteCampusBranches, getCampusBranch, getCampusBranches, updateCampusBranches } from "../controllers";
// Middlewares
import { schemaValidation, authRequired } from "../middlewares";
// Schemas
import { createCampusBranchSchema, updateCampusBranchSchema } from "../schemas";

const router = Router();

router.get("/campus-branch", authRequired, getCampusBranches);
router.get("/campus-branch/:code", authRequired, getCampusBranch);
router.post("/campus-branch", authRequired, schemaValidation(createCampusBranchSchema), addCampusBranch);
router.put("/campus-branch/:code", authRequired, schemaValidation(updateCampusBranchSchema), updateCampusBranches);
router.delete("/campus-branch/:code", authRequired, deleteCampusBranches);

export default router;