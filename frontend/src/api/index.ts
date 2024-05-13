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
// Enumerable services
import { getCampusBranchRequest } from "./enumerable.services";
// Teams services
import { getTeamRequest, createTeamRequest, updateTeamRequest, deleteTeamRequest } from "./team.services";

export {
  api,
  createStudentRequest,
  createTeacherRequest,
  deleteStudentRequest,
  deleteTeacherRequest,
  getCampusBranchRequest,
  getStudentRequest,
  getTeacherRequest,
  loginRequest,
  registerRequest,
  setAuthHeaders,
  updateStudentRequest,
  updateTeacherRequest,
  getTeamRequest,
  createTeamRequest,
  updateTeamRequest,
  deleteTeamRequest,
};

