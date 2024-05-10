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
  permissions: Permission[];
  login: (token: string, permissions: Permission[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  permissions: [],
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLogin, setIsLogin] = useState(!!cookies.token);

  useEffect(() => {
    if (cookies.token) {
      setAuthHeaders(cookies.token);
      const storedPermissions = localStorage.getItem("permissions");
      if (storedPermissions) {
        try {
          const parsedPermissions = JSON.parse(storedPermissions);
          setPermissions(parsedPermissions);
        } catch (e) {
          console.error("Failed to parse permissions:", e);
        }
      }
    } else {
      localStorage.removeItem("permissions");
      setPermissions([]);
      setIsLogin(false);
    }
  }, [cookies.token]);

  const login = (token: string, permissions: Permission[]) => {
    setCookie("token", token);
    setPermissions(permissions);
    localStorage.setItem("permissions", JSON.stringify(permissions));
    setIsLogin(true);
  };

  const logout = () => {
    removeCookie("token");
    setIsLogin(false);
    setPermissions([]);
  };
  return (
    <AuthContext.Provider value={{ isLogin, permissions, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
