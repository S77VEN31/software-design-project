// Styles
import "./App.css";
// Enumerables
import { Routes as RoutesList } from "@enumerables";
// Libraries
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Screens
import { MenuScreen } from "@screens";
// Interfaces
interface ProtectedRouteProps {
  children: React.ReactNode;
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

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const hasPermission = true;
  const isLogin = true;

  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  if (!hasPermission) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};

function App() {
  // Routes
  const { authenticationRoutes, errorRoutes, appRoutes } = RoutesList;
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
export default App;
