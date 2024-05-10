// Router
import { Router } from "express";
// Controllers
import {
  addCareer,
  deleteCareer,
  getCareer,
  getCareers,
  updateCareer,
} from "../controllers";
// Middlewares
import { authRequired, schemaValidation } from "../middlewares";
// Schemas
import { careerSchema } from "../schemas";

const router = Router();

router.get("/", authRequired, getCareers);
router.get("/:code", authRequired, getCareer);
router.post("/", authRequired, schemaValidation(careerSchema), addCareer);
router.put(
  "/:oldCode",
  authRequired,
  schemaValidation(careerSchema),
  updateCareer
);
router.delete("/:code", authRequired, deleteCareer);

export default router;