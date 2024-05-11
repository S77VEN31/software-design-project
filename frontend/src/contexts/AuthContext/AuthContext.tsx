// React
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// Libraries
import { useCookies } from "react-cookie";
// Api
import { setAuthHeaders } from "@api";
// Types
import { Permission } from "@enumerables";

interface AuthContextType {
  isLogin: boolean;
  login: (token: string, permissions: Permission[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLogin, setIsLogin] = useState(!!cookies.token);

  useEffect(() => {
    if (cookies.token) {
      setAuthHeaders(cookies.token);
    } else {
      setIsLogin(false);
      // Asegurarse de limpiar localStorage cuando el usuario no está logueado
      localStorage.removeItem("permissions");
    }
  }, [cookies.token]);

  const login = (token: string, newPermissions: Permission[]) => {
    // Guardar los permisos en localStorage
    localStorage.setItem("permissions", JSON.stringify(newPermissions));
    setCookie("token", token);
    setIsLogin(true);
  };

  const logout = () => {
    removeCookie("token");
    setIsLogin(false);
    // Limpiar los permisos del localStorage
    localStorage.removeItem("permissions");
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
