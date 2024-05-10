// React
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
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
  setIsLogin: (isLogin: boolean) => void;
  setPermissions: (permissions: Permission[]) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  permissions: [],
  setIsLogin: () => {},
  setPermissions: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [permissions, setPermissions] = useState<Permission[]>(() => {
    const storedPermissions = localStorage.getItem("permissions");
    return storedPermissions ? JSON.parse(storedPermissions) : [];
  });
  const [cookies] = useCookies(["token"]);
  const [isLogin, setIsLogin] = useState(!!cookies.token);

  useEffect(() => {
    if (cookies.token) {
      setIsLogin(true);
      setAuthHeaders(cookies.token);
    } else {
      setIsLogin(false);
      setAuthHeaders("");
    }
  }, [cookies.token]);

  useEffect(() => {
    localStorage.setItem("permissions", JSON.stringify(permissions));
  }, [permissions]);

  // Memoized value to avoid re-renders
  const value = useMemo(
    () => ({
      isLogin,
      permissions,
      setIsLogin,
      setPermissions,
    }),
    [isLogin, permissions]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
