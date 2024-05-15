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
import {
  createScheduleRequest,
  deleteScheduleRequest,
  getScheduleRequest,
  updateScheduleRequest,
  getActivityRequest,
  updateActivityRequest,
  createActivityRequest,
  deleteActivityRequest,
} from "./schedule.services";
// Enumerable services
import {
  getCampusBranchRequest,
  getCampusBranchTeachersRequest,
} from "./enumerable.services";
// Teams services
import {
  createTeamRequest,
  deleteTeamRequest,
  getTeamRequest,
  updateTeamRequest,
} from "./team.services";

export {
  api,
  getActivityRequest,
  createScheduleRequest,
  createActivityRequest,
  deleteActivityRequest,
  updateActivityRequest,
  createStudentRequest,
  createTeacherRequest,
  createTeamRequest,
  deleteScheduleRequest,
  deleteStudentRequest,
  deleteTeacherRequest,
  deleteTeamRequest,
  getCampusBranchRequest,
  getCampusBranchTeachersRequest,
  getScheduleRequest,
  getStudentRequest,
  getTeacherRequest,
  getTeamRequest,
  loginRequest,
  registerRequest,
  setAuthHeaders,
  updateScheduleRequest,
  updateStudentRequest,
  updateTeacherRequest,
  updateTeamRequest,
};

