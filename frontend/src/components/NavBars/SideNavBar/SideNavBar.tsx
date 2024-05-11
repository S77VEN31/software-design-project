// Styles
import styles from "./SideNavBar.module.css";
// Librairies
import { Link, useLocation } from "react-router-dom";
// Enumerables
import { Permission, Routes } from "@enumerables";

const SideNavBar = () => {
  // Routes
  const { appRoutes } = Routes;
  const location = useLocation();
  // Get the permissions from the localStorage
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");

  // if im in the current route, i will add the active class
  const isActive = (path: string) => {
    return location.pathname === path ? styles.active : "";
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.routes}>
        {appRoutes
          // Filter the routes that are in the nav and the user has permission
          .filter(
            (route) =>
              route.inNav &&
              permissions.some(
                (permission: Permission) => permission.slug === route.apiSlug
              )
          )
          .map((route, key) => (
            <li key={key} className={styles.linkContainer}>
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
