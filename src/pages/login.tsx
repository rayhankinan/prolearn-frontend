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
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { InputAdornment } from "@material-ui/core";
import http from "@/http-common";
import authService from "@/services/auth-service";

// create login page
const theme = createTheme();

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        authService.logIn(formData)
          .then(data => {
            setLoading(false);
            console.log(data.username);
          })
          .catch(error => {
            setLoading(false);
            setError(error.message);
          });
      };

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
                            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                    ),
                                }}
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
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
