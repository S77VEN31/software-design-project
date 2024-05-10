// Api
import { api, setAuthHeaders } from "./api";
// Authentication services
import { loginRequest, registerRequest } from "./authentication.services";
// User services
import { getStudentRequest, getTeacherRequest } from "./user.services";

export {
  api,
  getStudentRequest,
  getTeacherRequest,
  loginRequest,
  registerRequest,
  setAuthHeaders,
};

