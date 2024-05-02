// Styles
import styles from "./SideNavBar.module.css";
// Librairies
import { Link, useLocation } from "react-router-dom";
// Enumerables
import { Routes } from "@enumerables";

const SideNavBar = () => {
  // Routes
  const { appRoutes } = Routes;
  const location = useLocation();

  // if im in the current route, i will add the active class
  const isActive = (path: string) => {
    return location.pathname === path ? styles.active : "";
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.routes}>
        {appRoutes
          .filter((route) => route.inNav)
          .map((route, key) => (
            <li key={key}>
              <Link
                className={`${styles.link} ${isActive(route.path)}`}
                to={route.path}
              >
                {route.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};
export default SideNavBar;
