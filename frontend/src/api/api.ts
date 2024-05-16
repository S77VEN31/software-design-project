// Axios
import axios from "axios";
// Environment variables
const {
  VITE_API_URL,
  //VITE_API_LOCAL_URL
} = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies when cross-origin
});

const setAuthHeaders = (token: string) => {
  if (token) {
    // Apply el token en el header Authorization
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete el header Authorization
    delete api.defaults.headers.common["Authorization"];
  }
};
export { api, setAuthHeaders };

