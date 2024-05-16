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

export {
  addActivityCommentRequest,
  addReplyCommentRequest, api,
  createActivityRequest, createScheduleRequest,
  createStudentRequest,
  createTeacherRequest,
  createTeamRequest, deleteActivityCommentRequest, deleteActivityRequest,
  deleteScheduleRequest,
  deleteStudentRequest,
  deleteTeacherRequest,
  deleteTeamRequest, getActivityCommentsRequest, getActivityRequest,
  getCampusBranchRequest,
  getCampusBranchTeachersRequest,
  getScheduleRequest,
  getStudentRequest,
  getTeacherRequest,
  getTeamRequest,
  loginRequest,
  registerRequest,
  setAuthHeaders,
  updateActivityRequest,
  updateScheduleRequest,
  updateStudentRequest,
  updateTeacherRequest,
  updateTeamRequest
};

