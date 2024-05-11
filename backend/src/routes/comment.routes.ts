// Router
import { Router } from "express";
// Controllers
import {
  addActivityComment,
  addScheduleComment,
  addReplyComment,
  deleteActivityComment,
  deleteScheduleComment,
  getActivityComments,
  getScheduleComments
} from "../controllers";
// Middlewares
import { authRequired, schemaValidation } from "../middlewares";
// Schemas
import { createCommentSchema } from "../schemas";

const router = Router();

router.get("/comments/activity/:activity", authRequired, getActivityComments);
router.post("/comments/activity/:activity", authRequired, schemaValidation(createCommentSchema), addActivityComment);
router.delete("/comments/activity/:activity/:comment", authRequired, deleteActivityComment);
router.get("/comments/schedule/:schedule", authRequired, getScheduleComments);
router.post("/comments/schedule/:schedule", authRequired, schemaValidation(createCommentSchema), addScheduleComment);
router.delete("/comments/schedule/:schedule/:comment", authRequired, deleteScheduleComment);
router.post("/comments/reply/:comment", authRequired, schemaValidation(createCommentSchema), addReplyComment);

export default router;