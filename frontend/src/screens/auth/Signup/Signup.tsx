// React
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// Styles
import styles from "./Signup.module";
// Components
import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
// Api
import { registerRequest } from "@api";

const Signup = () => {
  // States
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
  });

  // Handle Change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerRequest({
      email: registerData.email,
      password: registerData.password,
      name: `${registerData.firstName} ${registerData.lastName}`,
      userName: registerData.userName,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.wrapper}>
        <Avatar sx={styles.avatar} />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={styles.form}
        >
          <Box sx={styles.inputs}>
            <TextField
              autoComplete="given-userName"
              name="userName"
              onChange={handleChange}
              required
              fullWidth
              id="userName"
              label="User Name"
              autoFocus
            />
            <TextField
              autoComplete="given-name"
              name="firstName"
              onChange={handleChange}
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
            <TextField
              required
              fullWidth
              id="lastName"
              onChange={handleChange}
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
            <TextField
              onChange={handleChange}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              onChange={handleChange}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={styles.button}
          >
            Sign Up
          </Button>
          <Box sx={styles.links}>
            <RouterLink to="/" style={styles.routerLink}>
              <Link>Already have an account? Log in</Link>
            </RouterLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default Signup;
