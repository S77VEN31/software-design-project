// Axios
import { api } from "./api";
// Types
import { FormData } from "@enumerables";
// Enviroment variables
const { VITE_API_TEAM } = import.meta.env;

interface GetTeamRequestParams {
  id?: string;
  userId?: string;
  roles?: string[];
}

export const getTeamRequest = async ({
  id,
  userId,
  roles,
}: GetTeamRequestParams) => {
  const response = await api.get(
    id
      ? `${VITE_API_TEAM}?id=${id}`
      : userId
      ? `${VITE_API_TEAM}?userId=${userId}&roles=${roles}`
      : VITE_API_TEAM
  );
  return response.data;
};

export const createTeamRequest = async (team: FormData) => {
  const response = await api.post(VITE_API_TEAM, team);
  return response.data;
};

export const updateTeamRequest = async (team: FormData, id: string) => {
  const response = await api.put(`${VITE_API_TEAM}?id=${id}`, team);
  return response.data;
};

export const deleteTeamRequest = async (id: string) => {
  const response = await api.delete(`${VITE_API_TEAM}?id=${id}`);
  return response.data;
};
