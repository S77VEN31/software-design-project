// Router
import { Router } from "express";
// Controllers
import { addCarrer, deleteCarrer, getCarrer, getCarrers, updateCarrer } from "../controllers";
// Middlewares
import { schemaValidation, authRequired } from "../middlewares";
// Schemas
import { carrerSchema } from "../schemas";

const router = Router();

router.get("/", authRequired, getCarrers);
router.get("/:code", authRequired, getCarrer);
router.post("/", authRequired, schemaValidation(carrerSchema), addCarrer);
router.put("/:oldCode", authRequired, updateCarrer);
router.delete("/:code", authRequired, deleteCarrer);

export default router;