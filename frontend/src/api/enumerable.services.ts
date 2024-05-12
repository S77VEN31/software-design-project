// Api
import { api } from "@api";
// Enviroment variables
const { VITE_API_CAMPUS_BRANCH } = import.meta.env;

export const getCampusBranchRequest = async (id?: string) => {
  const response = await api.get(
    id ? `${VITE_API_CAMPUS_BRANCH}?id=${id}` : VITE_API_CAMPUS_BRANCH
  );
  return response.data;
};
