// React
import { ReactNode } from "react";
// Styles
import "./App.css";
// Components
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Enumerables
import { Routes as RoutesList } from "@enumerables";
// Libraries
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
  const { isLogin, permissions } = useAuth();
  const location = useLocation();

  const currentRoute = appRoutes.find(
    (route) => route.path === location.pathname
  )?.apiSlug;

  const isPermitted =
    isLogin &&
    (currentRoute === "*" ||
      permissions.some((permission) => permission.slug === currentRoute));

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  if (!isPermitted) {
    return <Navigate to="/forbidden" />;
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
