import { Routes as RoutesList } from "@enumerables";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
// Screens
import { MenuScreen } from "@screens";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
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
    <HashRouter>
      <Routes>
        {authenticationRoutes.map(({ ...props }, key) => (
          <Route key={key} {...props} />
        ))}
        {errorRoutes.map(({ ...props }, key) => (
          <Route key={key} {...props} />
        ))}
        <Route path="/home" element={<MenuScreen />}>
          {appRoutes.map(({ path, ...props }, key) => (
            <Route
              key={key}
              path={path}
              element={<ProtectedRoute>{props.element}</ProtectedRoute>}
            />
          ))}
        </Route>
      </Routes>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
