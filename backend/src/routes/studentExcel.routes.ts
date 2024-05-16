// Router
import { Router } from "express";
// Controllers
import { getStudentsExcel } from "../controllers";

const router = Router();

router.get("/excel/students", getStudentsExcel);

export default router;