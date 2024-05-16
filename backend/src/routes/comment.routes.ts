// Router
import { Router } from "express";
// Controllers
import {
  addActivityComment,
  addReplyComment,
  deleteActivityComment,
  getActivityComments,
} from "../controllers";
// Middlewares
import { authRequired, schemaValidation } from "../middlewares";
// Schemas
import { createCommentSchema } from "../schemas";

const router = Router();

router.get("/comments/activity", authRequired, getActivityComments);
router.post(
  "/comments/activity",
  authRequired,
  schemaValidation(createCommentSchema),
  addActivityComment
);
router.delete("/comments/activity", authRequired, deleteActivityComment);
router.post(
  "/comments/reply",
  authRequired,
  schemaValidation(createCommentSchema),
  addReplyComment
);

export default router;