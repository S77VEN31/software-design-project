// React
import { useEffect, useState } from "react";
// Styles
import styles from "./Avatar.module.css";
// Components
import { Button } from "@mui/material";
// Interfaces
interface AvatarProps {
  seed: string;
  changeAvatar: () => void;
}

const Avatar = ({ seed, changeAvatar }: AvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setAvatarUrl(`https://api.dicebear.com/8.x/pixel-art/svg?seed=${seed}`);
  }, [seed]);

  return (
    <div className={styles.container}>
      <div className={styles.profileImage}>
        {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : <p>Loading...</p>}
      </div>
      <Button variant="contained" color="primary" onClick={changeAvatar}>
        Change Avatar
      </Button>
    </div>
  );
};
export default Avatar;
