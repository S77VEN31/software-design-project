// Axios
import { api } from "./api";
// Types
import { FormData } from "@enumerables";
// Enviroment variables
const { VITE_API_SCHEDULE } = import.meta.env;

export const getScheduleRequest = async (id?: string) => {
  const response = await api.get(
    id ? `${VITE_API_SCHEDULE}/${id}` : VITE_API_SCHEDULE
  );
  return response.data;
};

export const getActivitiesRequest = async () => {
  const response = await api.get(`${VITE_API_SCHEDULE}/activities`);
  return response.data;
};

export const createScheduleRequest = async (schedule: FormData) => {
  const response = await api.post(VITE_API_SCHEDULE, schedule);
  console.log(response);
  return response.data;
};

export const updateScheduleRequest = async (schedule: FormData, id: string) => {
  const response = await api.put(`${VITE_API_SCHEDULE}/${id}`, schedule);
  return response.data;
};

export const deleteScheduleRequest = async (id: string) => {
  const response = await api.delete(`${VITE_API_SCHEDULE}/${id}`);
  return response.data;
};
