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
// Enumerable services
import { getCampusBranchRequest } from "./enumerable.services";
// Teams services
import { getTeamRequest, createTeamRequest, updateTeamRequest, deleteTeamRequest } from "./team.services";

export {
  api, createScheduleRequest, createStudentRequest, createTeacherRequest, deleteScheduleRequest, deleteStudentRequest,
  deleteTeacherRequest,
  getCampusBranchRequest, getScheduleRequest, getStudentRequest,
  getTeacherRequest, loginRequest,
  registerRequest,
  setAuthHeaders,
  updateScheduleRequest,
  updateStudentRequest,
  updateTeacherRequest,
  getTeamRequest,
  createTeamRequest,
  updateTeamRequest,
  deleteTeamRequest,
};

