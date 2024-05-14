// Router
import { Router } from "express";
// Controllers
import {
  addCampusBranch,
  deleteCampusBranches,
  getCampusBranch,
  getCampusBranchTeachers,
  getCampusBranches,
  updateCampusBranches,
} from "../controllers";
// Middlewares
import { authRequired, schemaValidation } from "../middlewares";
// Schemas
import { createCampusBranchSchema, updateCampusBranchSchema } from "../schemas";

const router = Router();

// Get teachers from a campus branch
router.get("/campus-branch/teachers", authRequired, getCampusBranchTeachers);
router.get("/campus-branch", authRequired, getCampusBranches);
router.get("/campus-branch/:code", authRequired, getCampusBranch);
router.post(
  "/campus-branch",
  authRequired,
  schemaValidation(createCampusBranchSchema),
  addCampusBranch
);
router.put(
  "/campus-branch/:code",
  authRequired,
  schemaValidation(updateCampusBranchSchema),
  updateCampusBranches
);
router.delete("/campus-branch/:code", authRequired, deleteCampusBranches);



export default router;