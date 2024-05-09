// Router
import { Router } from "express";
// Controllers
import { UserFactory } from "../controllers";
// Middlewares
import { addRoleToParams, schemaValidation } from "../middlewares";
// Schemas
import {
  createAdminAssistantUserSchema,
  createAdminUserSchema,
  createStudentUserSchema,
  createTeacherUserSchema,
  updateAdminAssistantUserSchema,
  updateAdminUserSchema,
  updateStudentUserSchema,
  updateTeacherUserSchema,
} from "../schemas";

const router = Router();

const { handleUserOperation } = UserFactory;

// Admin
router.post(
  "/admin",
  addRoleToParams("Admin"),
  schemaValidation(createAdminUserSchema),
  handleUserOperation
);
router.get("/admin", addRoleToParams("Admin"), handleUserOperation);
router.put(
  "/admin",
  addRoleToParams("Admin"),
  schemaValidation(updateAdminUserSchema),
  handleUserOperation
);
router.delete("/admin", addRoleToParams("Admin"), handleUserOperation);

// Admin Assistant
router.post(
  "/admin-assistant",
  addRoleToParams("AdminAssistant"),
  schemaValidation(createAdminAssistantUserSchema),
  handleUserOperation
);
router.get(
  "/admin-assistant",
  addRoleToParams("AdminAssistant"),
  handleUserOperation
);
router.put(
  "/admin-assistant",
  addRoleToParams("AdminAssistant"),
  schemaValidation(updateAdminAssistantUserSchema),
  handleUserOperation
);
router.delete(
  "/admin-assistant",
  addRoleToParams("AdminAssistant"),
  handleUserOperation
);

// Student
router.post(
  "/student",
  addRoleToParams("Student"),
  schemaValidation(createStudentUserSchema),
  handleUserOperation
);
router.get("/student", addRoleToParams("Student"), handleUserOperation);
router.put(
  "/student",
  addRoleToParams("Student"),
  schemaValidation(updateStudentUserSchema),
  handleUserOperation
);
router.delete("/student", addRoleToParams("Student"), handleUserOperation);

// Teacher
router.post(
  "/teacher",
  addRoleToParams("Teacher"),
  schemaValidation(createTeacherUserSchema),
  handleUserOperation
);
router.get("/teacher", addRoleToParams("Teacher"), handleUserOperation);
router.put(
  "/teacher",
  addRoleToParams("Teacher"),
  schemaValidation(updateTeacherUserSchema),
  handleUserOperation
);
router.delete("/teacher", addRoleToParams("Teacher"), handleUserOperation);

export default router;
