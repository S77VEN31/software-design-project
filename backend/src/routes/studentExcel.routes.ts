// Router
import { Router } from "express";
// Controllers
import { getAllStudentsExcel, getStudentsExcel } from "../controllers";

const router = Router();

router.get("/excel/students", getAllStudentsExcel);
router.get("/excel/students/:id", getStudentsExcel);

export default router;