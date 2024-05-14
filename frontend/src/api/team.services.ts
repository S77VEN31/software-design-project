// Axios
import { api } from "./api";
// Types
// Enviroment variables
const { VITE_API_TEAM } = import.meta.env;

export const getTeamRequest = async (id?: string) => {
  const response = await api.get(id ? `${VITE_API_TEAM}/${id}` : VITE_API_TEAM);
  return response.data;
};
