// Styles
import styles from "./Menu.module.css";
// Components
import { SideNavBar } from "@components";
// Libraries
import { Outlet } from "react-router-dom";
// Contexts
import { useAuth } from "@contexts";

const Menu = () => {
  const { logout } = useAuth();
  const logOut = () => {
    logout();
  };
  return (
    <main className={styles.menu}>
      <SideNavBar />
      <div className={styles.content}>
        <div className={styles.header}>
          <button onClick={logOut}>Logout</button>
        </div>
        <div className={styles.route}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default Menu;
