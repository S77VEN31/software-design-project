// Router
import { Router } from "express";
// Controllers
import { addCarrer, deleteCarrer, getCarrer, getCarrers, updateCarrer } from "../controllers";
// Middlewares
import { schemaValidation } from "../middlewares";
// Schemas
import { carrerSchema } from "../schemas";

const router = Router();

router.get("/", getCarrers);
router.get("/:code", getCarrer);
router.post("/", schemaValidation(carrerSchema), addCarrer);
router.put("/:oldCode", updateCarrer);
router.delete("/:code", deleteCarrer);

export default router;