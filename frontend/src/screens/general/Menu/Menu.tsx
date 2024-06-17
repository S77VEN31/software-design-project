// React
import { MouseEvent, useState } from "react";
// Libraries
import { useNavigate } from "react-router-dom";
// Styles
import styles from "./Menu.module.css";
// Components
import { SideNavBar } from "@components";
import { Avatar, MenuItem, Menu as SelectableMenu } from "@mui/material";
// Libraries
import { Outlet } from "react-router-dom";
// Contexts
import { useAuth } from "@contexts";

const Menu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  // Get user id and roles
  const userId = localStorage.getItem("id") || "";
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const logOut = () => {
    logout();
  };
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <main className={styles.menu}>
      <SideNavBar />
      <div className={styles.content}>
        <div className={styles.header}>
          <Avatar
            sx={{ bgcolor: "primary.main", cursor: "pointer" }}
            onClick={handleClick}
          >
            U
          </Avatar>
          <SelectableMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleClose();
                if (roles.length > 0) {
                  navigate(`/home/self/${roles[0].toLowerCase()}/${userId}`);
                }
                console.log(userId);
              }}
            >
              Ver perfil
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                logOut();
              }}
            >
              Cerrar sesión
            </MenuItem>
          </SelectableMenu>
        </div>
        <div className={styles.route}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default Menu;
