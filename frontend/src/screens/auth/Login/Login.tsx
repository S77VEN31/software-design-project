// React
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Styles
import styles from "./Login.module.tsx";
// Components
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// Api
import { loginRequest } from "@api";
// Contexts
import { useAuth } from "@contexts";

const Login = () => {
  // States
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // Navigation
  const navigation = useNavigate();
  // Contexts
  const { login } = useAuth();

  // Handle Change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginRequest(loginData)
      .then((response) => {
        const { permissions, token } = response;
        login(token, permissions);
        navigation("/home/students");
      })
      .catch((error) => {
        // TODO: Handle error
        console.error(error);
      });
  };

  return (
    <Grid container sx={styles.paperContainer}>
      <Grid item xs={false} sm={4} md={7} sx={styles.imageContainer} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
        <Box sx={styles.paper}>
          <Avatar sx={styles.avatar} />
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
            <TextField
              sx={styles.inputs}
              required
              id="email"
              onChange={handleChange}
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              sx={styles.inputs}
              required
              name="password"
              onChange={handleChange}
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box sx={styles.buttons}>
              <FormControlLabel
                control={<Checkbox value="remember" sx={styles.checkbox} />}
                label="Recuerdame"
              />
              <Button
                type="submit"
                variant="contained"
                sx={styles.submitButton}
              >
                Iniciar Sesión
              </Button>
            </Box>
            <Box sx={styles.buttons}>
              <Link to="/register">
                Olvidaste tu contraseña? Recuperala aquí
              </Link>
              <Link to="/register">No tienes cuenta? Registrate aquí</Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
