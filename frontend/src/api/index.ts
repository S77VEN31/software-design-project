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
  updateAdminAssistantRequest,
  updateAdminRequest
} from "./user.services";
// Schedule services
import {
  createActivityRequest,
  createScheduleRequest,
  deleteActivityRequest,
  deleteScheduleRequest,
  getActivityRequest,
  getScheduleRequest,
  updateActivityRequest,
  updateScheduleRequest,
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
// Comment services
import {
  addActivityCommentRequest,
  addReplyCommentRequest,
  deleteActivityCommentRequest,
  getActivityCommentsRequest,
} from "./comment.services";
// Report services
import { downloadExcel } from "./report.services";

export {
  addActivityCommentRequest, addReplyCommentRequest, api,
  createActivityRequest, createScheduleRequest,
  createStudentRequest,
  createTeacherRequest,
  createTeamRequest, deleteActivityCommentRequest, deleteActivityRequest,
  deleteScheduleRequest,
  deleteStudentRequest,
  deleteTeacherRequest,
  deleteTeamRequest, downloadExcel, getActivityCommentsRequest, getActivityRequest,
  getCampusBranchRequest,
  getCampusBranchTeachersRequest,
  getScheduleRequest,
  getStudentRequest, getTeacherRequest,
  getTeamRequest,
  loginRequest,
  registerRequest,
  setAuthHeaders,
  updateActivityRequest,
  updateScheduleRequest,
  updateStudentRequest,
  updateTeacherRequest,
  updateTeamRequest,
  updateAdminAssistantRequest,
  updateAdminRequest
};

