// Axios
import { api } from "./api";
// Types
import { FormData } from "@enumerables";
// Enviroment variables
const { VITE_API_SCHEDULE, VITE_API_ACTIVITY } = import.meta.env;

interface GetScheduleRequestParams {
  id?: string;
  userId?: string;
  roles?: string[];
}

export const getScheduleRequest = async ({
  id,
  userId,
  roles,
}: GetScheduleRequestParams) => {
  const response = await api.get(
    id
      ? `${VITE_API_SCHEDULE}?id=${id}`
      : userId
      ? `${VITE_API_SCHEDULE}?userId=${userId}&roles=${roles}`
      : VITE_API_SCHEDULE
  );
  return response.data;
};

export const getActivityRequest = async (id?: string) => {
  const response = await api.get(
    id ? `${VITE_API_ACTIVITY}?id=${id}` : VITE_API_ACTIVITY
  );
  return response.data;
};

export const createScheduleRequest = async (schedule: FormData) => {
  const response = await api.post(VITE_API_SCHEDULE, schedule);
  return response.data;
};

export const createActivityRequest = async (activity: FormData) => {
  const response = await api.post(VITE_API_ACTIVITY, activity);
  return response.data;
};

export const updateScheduleRequest = async (schedule: FormData, id: string) => {
  const response = await api.put(`${VITE_API_SCHEDULE}?id=${id}`, schedule);
  return response.data;
};

export const updateActivityRequest = async (activity: FormData, id: string) => {
  const response = await api.put(`${VITE_API_ACTIVITY}?id=${id}`, activity);
  return response.data;
};

export const deleteScheduleRequest = async (id: string) => {
  const response = await api.delete(`${VITE_API_SCHEDULE}?id=${id}`);
  return response.data;
};

export const deleteActivityRequest = async (id: string) => {
  const response = await api.delete(`${VITE_API_ACTIVITY}?id=${id}`);
  return response.data;
};
