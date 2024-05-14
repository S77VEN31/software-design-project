// Api
import { api, setAuthHeaders } from "./api";
// Authentication services
import { loginRequest, registerRequest } from "./authentication.services";
// User services
import {
  createStudentRequest,
  createTeacherRequest,
  deleteStudentRequest,
  deleteTeacherRequest,
  getStudentRequest,
  getTeacherRequest,
  updateStudentRequest,
  updateTeacherRequest,
} from "./user.services";
// Schedule services
import { createScheduleRequest, deleteScheduleRequest, getScheduleRequest, updateScheduleRequest } from "./schedule.services";
// Team services
import { getTeamRequest } from "./team.services";
// Enumerable services
import { getCampusBranchRequest } from "./enumerable.services";

export {
  api, createScheduleRequest, createStudentRequest, createTeacherRequest, deleteScheduleRequest, deleteStudentRequest,
  deleteTeacherRequest,
  getCampusBranchRequest, getScheduleRequest, getStudentRequest,
  getTeacherRequest, getTeamRequest, loginRequest,
  registerRequest,
  setAuthHeaders,
  updateScheduleRequest,
  updateStudentRequest,
  updateTeacherRequest
};

