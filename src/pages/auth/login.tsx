import React, { useState , useEffect} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { InputAdornment } from "@material-ui/core";
import userService from "@/services/user-service";
import { PersonOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import ModalFailed from '../user/modalFailed';
import ModalSuccess from '../user/modalSucess';

// create login page
const theme = createTheme();

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<String>('');
    const handleCloseModal = () => {
      setModalOpen(false);};

    const handleCloseModalSuccess = () => {
    setModalSuccessOpen(false);};

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
        setUsernameError(event.target.value === '');
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
        setPasswordError(event.target.value === '');
    }

    const handleLogin = (event: any) => {
        event.preventDefault();
        if(username === '' && password === '') {
            setModalOpen(true);
            setErrorMessage('Username and password are required');
            setUsernameError(true);
            setPasswordError(true);
            return;
        }
        if (username === '') {
            setModalOpen(true);
            setErrorMessage('Username is required');
            setUsernameError(true);
            return;
          }
        if(password === '') {
            setModalOpen(true);
            setErrorMessage('Password is required');
            setPasswordError(true);
            return;
        }
        const dataUser = {
            username,
            password
        }

        userService.logIn(dataUser).then((response) => {
            localStorage.setItem('token', response.data)
            setModalSuccessOpen(true);
            if (response.role === 'admin') {
                router.push('/');
            } else {
                router.push('/course/list');
            }
            setModalSuccessOpen(false);
        }).catch((error) => {
            console.log(error)
            // alert("Username or password is incorrect")
            setErrorMessage('Username or password is incorrect');
            setModalOpen(true);
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Logo Name */}
            
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    
                    <Container component="main" maxWidth="xl">
                        <Box 
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                
                            }}
                        >
                            <img src="/logo.png" alt="Logo" className="h-12 mt-5 mb-10" />
                            <Typography component="h1" variant="h4" className="mt-10" sx={{fontFamily: "Poppins", fontStyle: "bold", fontSize: "5vh"}}>
                                Sign in
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
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
                                    )
                                }}
                                value={username}
                                onChange={handleUsernameChange}
                                error={usernameError}
                                helperText={usernameError ? 'Username is required' : ''}
                                />
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
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
                                helperText={passwordError ? 'Password is required' : ''}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontFamily: "Poppins",color: "white", fontSize: "2vh", backgroundColor: "#0C21C1 !important", borderRadius: "10px",
                                    '&:hover': { backgroundColor: "#0C21C1 !important"}}
                                }
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Container component="main" maxWidth="xl" >
                        <Box
                            sx={{
                                height: "80vh",
                                width: "70vh",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'end',
                                backgroundColor: "#000842",
                                borderRadius: "10px",
                                marginTop: 10,
                            }}
                        >
                            <Container component="main" maxWidth="xs" sx={{
                                height: "100vh",
                                width: "100vh",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'start',
                                borderRadius: "10px",
                                marginBottom: 5,
                            }}>
                                <img src="/Saly-10 (1).png" alt="Logo" />
                            </Container>
                            <Typography component="h1" variant="h5"  color="white" className="ml-10 mb-5" sx={{fontFamily: "Poppins", fontStyle: "bold", fontSize: "5vh"}}>
                                Sign In to ProLearn
                            </Typography>
                            <Typography component="h1" variant="h5" textAlign={"center"} color="white" className="ml-10" sx={{fontFamily: "Poppins", fontStyle: "bold", marginBottom: "10vh"}}>
                                Learning Like a Pro Starts Here
                            </Typography>
                        </Box>
                    </Container>
                </Grid>
                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <ModalFailed open={modalOpen} onClose={handleCloseModal} error={errorMessage} />
                </Modal>
                    <Modal open={modalSuccessOpen}>
                <ModalSuccess />
                </Modal>
            </Grid>
                                
        </ThemeProvider>
    
    );
    }
