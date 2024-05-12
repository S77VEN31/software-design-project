import { Permission } from "@enumerables";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";

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
  // Utilizar useCookies para manejar cookies
  const [, setCookie, removeCookie] = useCookies(["token"]);
  const [isLogin, setIsLogin] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCookie("token", token, {
        expires: new Date(Date.now() + 7 * 864e5), // expires in 7 days
        path: "/",
        secure: true,
        sameSite: "lax",
      });
      setIsLogin(true);
    } else {
      console.log("Token not found in localStorage");
      setIsLogin(false);
      localStorage.removeItem("permissions");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token: string, newPermissions: Permission[]) => {
    // Guardar los permisos en localStorage
    localStorage.setItem("permissions", JSON.stringify(newPermissions));
    localStorage.setItem("token", token); // Guardar el token en localStorage para persistencia
    setCookie("token", token, {
      expires: new Date(Date.now() + 7 * 864e5), // expires in 7 days
      path: "/",
      secure: true,
      sameSite: "lax",
    });
    setIsLogin(true);
  };

  const logout = () => {
    removeCookie("token");
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
