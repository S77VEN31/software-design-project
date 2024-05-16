// Axios
import { api } from "./api";
// Types
import { FormData } from "@enumerables";
// Enviroment variables
const { VITE_API_STUDENT, VITE_API_TEACHER, VITE_API_REPORTS } = import.meta.env;

export const getStudentRequest = async (id?: string) => {
  const response = await api.get(
    id ? `${VITE_API_STUDENT}?id=${id}` : VITE_API_STUDENT
  );
  return response.data;
};

export const getTeacherRequest = async (id?: string) => {
  const response = await api.get(
    id ? `${VITE_API_TEACHER}?id=${id}` : VITE_API_TEACHER
  );
  return response.data;
};

export const createStudentRequest = async (student: FormData) => {
  const response = await api.post(VITE_API_STUDENT, student);
  return response.data;
}

export const createTeacherRequest = async (teacher: FormData) => {
  const response = await api.post(VITE_API_TEACHER, teacher);
  return response.data;
}

export const updateStudentRequest = async (student: FormData, id: string) => {
  const response = await api.put(`${VITE_API_STUDENT}?id=${id}`, student);
  return response.data;
}

export const updateTeacherRequest = async (teacher: FormData, id: string) => {
  const response = await api.put(`${VITE_API_TEACHER}?id=${id}`, teacher);
  return response.data;
}

export const deleteStudentRequest = async (id: string) => {
  const response = await api.delete(`${VITE_API_STUDENT}?id=${id}`);
  return response.data;
}

export const deleteTeacherRequest = async (id: string) => {
  const response = await api.delete(`${VITE_API_TEACHER}?id=${id}`);
  return response.data;
}

export const getStudentReportRequest = async (id: string="") => {
  const response = await api.get(`${VITE_API_REPORTS}/${id}`);
  return response.data;
};