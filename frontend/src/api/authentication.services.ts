// Axios
import { api } from "./api";
// Enviroment variables
const { VITE_API_REGISTER } = import.meta.env;
// Interfaces
interface RegisterBody {
  email: string;
  password: string;
  name: string;
  userName: string;
}

export const registerRequest = async (data: RegisterBody) => {
  try {
    const response = await api.post(VITE_API_REGISTER, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
