// React
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// Styles
import "./App.css";
// Components
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Enumerables
import { Permission, Routes as RoutesList } from "@enumerables";
// Libraries
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Contexts
import { AuthProvider, useAuth } from "@contexts";
// Screens
import { MenuScreen } from "@screens";
// Interfaces
interface ProtectedRouteProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#7A5CC5",
      dark: "#7A5CC5",
      light: "#E7DDFF",
    },
    background: {
      default: "#F4F6F8",
      paper: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 20,
          backgroundColor: "#E7DDFF",
          color: "#7A5CC5",
          "&:hover": {
            backgroundColor: "#7A5CC5",
            color: "#E7DDFF",
          },
        },
      },
    },
  },
});

// Routes
const { authenticationRoutes, errorRoutes, appRoutes } = RoutesList;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLogin } = useAuth();
  const location = useLocation();
  const [hasPermission, setHasPermission] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  useEffect(
    () => {
      if (permissions) {
        const currentPath = location.pathname;
        const apiSlug = appRoutes.find(
          (route) => route.path === currentPath
        )?.apiSlug;

        const isAuthorized =
          permissions.some(
            (permission: Permission) => permission.slug === apiSlug
          ) || apiSlug === "*";
        setHasPermission(isAuthorized);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  if (!hasPermission) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {authenticationRoutes.map(({ ...props }, key) => (
              <Route key={key} {...props} />
            ))}
            {errorRoutes.map(({ ...props }, key) => (
              <Route key={key} {...props} />
            ))}
            <Route path="/home" element={<MenuScreen />}>
              {appRoutes.map(({ ...props }, key) => (
                <Route
                  key={key}
                  {...props}
                  element={<ProtectedRoute>{props.element}</ProtectedRoute>}
                />
              ))}
            </Route>
          </Routes>
          <ToastContainer />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
