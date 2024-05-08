// Router
import { Router } from "express";
// Controllers
import { addCarrer, deleteCarrer, getCarrer, getCarrers, updateCarrer } from "../controllers";
// Middlewares
import { schemaValidation } from "../middlewares";
// Schemas
import { carrerSchema } from "../schemas";

const router = Router();

router.get("/carrer", getCarrers);
router.get("/carrer/:code", getCarrer);
router.post("/carrer", schemaValidation(carrerSchema), addCarrer);
router.put("/carrer/:oldCode", updateCarrer);
router.delete("/carrer/:code", deleteCarrer);
