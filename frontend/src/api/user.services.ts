// Axios
import { api } from "./api";
// Enviroment variables
const { VITE_API_STUDENT, VITE_API_TEACHER } = import.meta.env;

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
