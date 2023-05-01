import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import userService from "@/services/user-service";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import ModalFailed from "@/pages/user/modalFailed";
import ModalSuccess from "@/pages/user/modalSucess";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Head from "next/head";

// create login page
const theme = createTheme();

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const { setIsLoggedIn } = useContext(AuthContext);
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

  const handleLogin = (event: any) => {
    event.preventDefault();
    if (username === "" && password === "") {
      setModalOpen(true);
      setErrorMessage("Username and password are required");
      setUsernameError(true);
      setPasswordError(true);
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
    const dataUser = {
      username,
      password,
    };

    userService
      .logIn(dataUser)
      .then((response) => {
        setIsLoggedIn(true);

        localStorage.setItem("token", response.data);
        if (response.role === "admin") {
          router.push("/admin/course");
        } else {
          router.push("/course");
        }
      })
      .catch((error) => {
        setErrorMessage("Username or password is incorrect");
        setModalOpen(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Login</title>
      </Head>
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
              <Image src="/logo.png" alt="Logo" className="h-12 mt-5 mb-10" width={250} height={61} />
              <Typography
                component="h1"
                variant="h4"
                className="mt-7"
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "bold",
                  fontSize: "4vh",
                }}
              >
                Login to ProLearn
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleLogin}
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
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={passwordError ? "Password is required" : ""}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    display: "flex",
                    margin: "auto",
                    mt: 2,
                    mb: 3,
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    fontFamily: "Poppins",
                    color: "white",
                    fontSize: "2vh",
                    backgroundColor: "#0C21C1 !important",
                    borderRadius: "7.5px",
                    width: "content-fit",
                    "&:hover": { backgroundColor: "#0C21C1 !important" },
                  }}
                >
                  Login
                </Button>
              </Box>
              <div className="text-md font-medium">
                Don't have an account?{" "} 
                <a href="/auth/register" className="text-blue-700">
                  Register here
                </a>
              </div>
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
                <Image src="/Saly-10 (1).png" alt="Logo" width={1826} height={2084} priority />
              </Container>
              <Container component="main" maxWidth="xl">
                <Typography
                  component="h1"
                  variant="h5"
                  textAlign={"center"}
                  color="white"
                  className="ml-10"
                  sx={{
                    fontFamily: "Montserrat",
                    fontStyle: "bold",
                    fontSize: "4vh",
                  }}
                >
                  Meet ProLearn,
                </Typography>
                <Typography
                  component="h1"
                  variant="h5"
                  textAlign={"center"}
                  color="white"
                  className="ml-10"
                  sx={{
                    fontFamily: "Montserrat",
                    fontStyle: "bold",
                    fontSize: "2.5vh",
                    marginBottom: "10vh",
                  }}
                >
                  Learning Like a Pro Starts Here
                </Typography>
              </Container>
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
