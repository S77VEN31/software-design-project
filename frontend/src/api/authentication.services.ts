// Axios
import { api } from "./api";
// Enviroment variables
const { VITE_API_REGISTER, VITE_API_LOGIN } = import.meta.env;
// Interfaces
interface RegisterBody {
  email: string;
  password: string;
  name: string;
  userName: string;
}
interface LoginBody {
  email: string;
  password: string;
}

export const registerRequest = async (data: RegisterBody) => {
  try {
    const response = await api.post(VITE_API_REGISTER, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const loginRequest = async (data: LoginBody) => {
  try {
    const response = await api.post(VITE_API_LOGIN, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
