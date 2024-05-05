// React
import { FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  // Navigation
  const navigation = useNavigate();

  // Handle Submit
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    navigation("/home");
  };

  return (
    <Grid container sx={styles.paperContainer}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{ backgroundColor: "primary.main" }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
        <Box sx={styles.paper}>
          <Avatar sx={styles.avatar} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
            <TextField
              sx={styles.inputs}
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              sx={styles.inputs}
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box sx={styles.buttons}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                sx={styles.submitButton}
              >
                Log In
              </Button>
            </Box>
            <Box sx={styles.buttons}>
              <RouterLink to="/register" style={styles.routerLink}>
                <Link>Forgot password?</Link>
              </RouterLink>
              <RouterLink to="/register" style={styles.routerLink}>
                <Link>{"Don't have an account? Sign Up"}</Link>
              </RouterLink>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
