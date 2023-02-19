import React, { useState , useEffect} from "react";
// import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { InputAdornment } from "@material-ui/core";
import authService from "@/services/auth-service";
import { PersonOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

// create login page
const theme = createTheme();

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: any) => {
        event.preventDefault();
        const dataUser = {
            username,
            password
        }

        authService.logIn(dataUser).then((response) => {
            console.log(response.data)
            localStorage.setItem('token', response.data)
            router.push('/')
        }).catch((error) => {
            console.log(error)
            alert("Username or password is incorrect")
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
                            <img src="logo.png" alt="Logo" className="h-12 mt-5 mb-10" />
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
                                onChange={(e) => setUsername(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
                                <img src="Saly-10 (1).png" alt="Logo" />
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
            </Grid>
                                
        </ThemeProvider>
    
    );
    }
