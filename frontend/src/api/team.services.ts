// Axios
import { api } from "./api";
// Types
import { FormData } from "@enumerables";
// Enviroment variables
const { VITE_API_TEAMS } = import.meta.env;

export const getTeamRequest = async (code?: string) => {
    const response = await api.get(
        code ? `${VITE_API_TEAMS}/${code}` : VITE_API_TEAMS
    );
    return response.data;
};

export const createTeamRequest = async (team: FormData) => {
    const response = await api.post(VITE_API_TEAMS, team);
    return response.data;
};

export const updateTeamRequest = async (team: FormData, code: string) => {
    const response = await api.put(`${VITE_API_TEAMS}/${code}`, team);
    return response.data;
}

export const deleteTeamRequest = async (code: string) => {
    const response = await api.delete(`${VITE_API_TEAMS}/${code}`);
    return response.data;
};
