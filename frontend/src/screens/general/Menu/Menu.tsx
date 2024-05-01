// Styles
import styles from "./Menu.module.css";
// Components
import { SideNavBar } from "@components";
// Libraries
import { Outlet } from "react-router-dom";

const Menu = () => {
  return (
    <main className={styles.menu}>
      <SideNavBar />
      <div className={styles.content}>
        <div>TopBar</div>
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default Menu;
