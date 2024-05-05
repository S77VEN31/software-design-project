// Axios
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",

  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = (token: string) => {
  if (token) {
    // Apply el token en el header Authorization
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete el header Authorization
    delete api.defaults.headers.common["Authorization"];
  }
};

const isTokenSet = () => {
  return api.defaults.headers.common["Authorization"];
};

export { api, isTokenSet, setAuthToken };
