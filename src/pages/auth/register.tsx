import userService from "@/services/user-service";
import {
  createTheme,
  CssBaseline,
  InputAdornment,
  ThemeProvider,
} from "@material-ui/core";
import { PersonOutlined } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ModalFailed from "../user/modalFailed";
import ModalSuccess from "../user/modalSucess";
import Image from "next/image";

const theme = createTheme();

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState<String>("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState<String>("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState<String>("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseModalSuccess = () => {
    setModalSuccessOpen(false);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
    setUsernameError(event.target.value === "");
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value === "");
  };

  const handlePasswordConfirmChange = (event: any) => {
    setPasswordConfirm(event.target.value);
    setPasswordConfirmError(event.target.value === "");
  };

  const handleRegister = (event: any) => {
    event.preventDefault();
    if (username === "" && password === "" && passwordConfirm === "") {
      setModalOpen(true);
      setErrorMessage(
        "Username, password and password confirmation are required"
      );
      setUsernameError(true);
      setPasswordError(true);
      setPasswordConfirmError(true);
      return;
    }
    if (username === "") {
      setModalOpen(true);
      setErrorMessage("Username is required");
      setUsernameError(true);
      return;
    }
    if (password === "") {
      setModalOpen(true);
      setErrorMessage("Password is required");
      setPasswordError(true);
      return;
    }
    if (passwordConfirm === "") {
      setModalOpen(true);
      setErrorMessage("Password confirmation is required");
      setPasswordConfirmError(true);
      return;
    }
    if (passwordConfirm !== password) {
      setModalOpen(true);
      setErrorMessage("Password confirmation does not match password");
      return;
    }

    const dataUser = {
      username,
      password,
    };

    userService
      .register(dataUser)
      .then((response) => {
        setTimeout(() => {
          setModalSuccessOpen(true);
        }, 3000);
        setModalSuccessOpen(false);
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
        // alert("Error: " + error.message);
        setErrorMessage("Error: " + error.message);
        setModalOpen(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Container component="main" maxWidth="xl">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image src="/logo.png" alt="logo" className="h-12 mt-5 mb-10" />
              <Typography
                component="h1"
                variant="h4"
                className="mt-10"
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "bold",
                  fontSize: "5vh",
                }}
              >
                Register
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleRegister}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="current-username"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined />
                      </InputAdornment>
                    ),
                  }}
                  value={username}
                  onChange={handleUsernameChange}
                  error={usernameError}
                  helperText={usernameError ? "Username is required" : ""}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  name="password"
                  autoComplete="current-password"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={passwordError ? "Password is required" : ""}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="confpassword"
                  type="password"
                  label="Password Confirmation"
                  name="confpassword"
                  autoComplete="current-confirmation-password"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  error={passwordConfirmError}
                  helperText={
                    passwordConfirmError
                      ? "Password confirmation is required"
                      : ""
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontFamily: "Poppins",
                    color: "white",
                    fontSize: "2vh",
                    backgroundColor: "#0C21C1 !important",
                    borderRadius: "10px",
                    "&:hover": { backgroundColor: "#0C21C1 !important" },
                  }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Container component="main" maxWidth="xl">
            <Box
              sx={{
                height: "80vh",
                width: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "end",
                backgroundColor: "#000842",
                borderRadius: "10px",
                marginTop: 10,
              }}
            >
              <Container
                component="main"
                maxWidth="xs"
                sx={{
                  height: "100vh",
                  width: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "start",
                  borderRadius: "10px",
                  marginBottom: 5,
                }}
              >
                <Image src="/Saly-10 (1).png" alt="logo" />
              </Container>
              <Typography
                component="h1"
                variant="h5"
                color="white"
                className="ml-10 mb-5"
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "bold",
                  fontSize: "5vh",
                }}
              >
                Register to Using ProLearn
              </Typography>
              <Typography
                component="h1"
                variant="h5"
                textAlign={"center"}
                color="white"
                className="ml-10"
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "bold",
                  marginBottom: "10vh",
                }}
              >
                Learning Like a Pro Starts Here
              </Typography>
            </Box>
          </Container>
        </Grid>
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <ModalFailed
            open={modalOpen}
            onClose={handleCloseModal}
            error={errorMessage}
          />
        </Modal>
        <Modal open={modalSuccessOpen}>
          <ModalSuccess
            open={modalSuccessOpen}
            onClose={handleCloseModalSuccess}
          />
        </Modal>
      </Grid>
    </ThemeProvider>
  );
}
