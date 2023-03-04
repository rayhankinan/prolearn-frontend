import authService from '@/services/auth-service';
import { createTheme, CssBaseline, InputAdornment, ThemeProvider } from '@material-ui/core';
import { PersonOutlined } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const theme = createTheme();

export default function register() {
  const router = useRouter();

  const [username, setUsername] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [passwordConfirm, setPasswordConfirm] = useState<String>('');

  const handleRegister = (event: any) => {
    event.preventDefault();
    if (passwordConfirm !== password) {
      alert("Password doesnt match!");
      return;
    }

    const dataUser = {
      username,
      password
    };

    authService.register(dataUser).then((response) => {
      router.push('/auth/login');
    }).catch((error) => {
      console.log(error);
      alert("Error: " + error.message);
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Container component="main" maxWidth="xl">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img src="/logo.png" alt="logo" className="h-12 mt-5 mb-10" />
              <Typography component="h1" variant='h4' className="mt-10" sx={{fontFamily: 'Poppins', fontStyle: 'bold', fontSize: '5vh'}}>
                Register
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleRegister}>
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
                      <InputAdornment position='start'>
                        <PersonOutlined />
                      </InputAdornment>
                    ) 
                  }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
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
                      <InputAdornment position='start'>
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ) 
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
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
                      <InputAdornment position='start'>
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ) 
                  }}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)} />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontFamily: 'Poppins',
                    color: 'white',
                    fontSize: '2vh',
                    backgroundColor: '#0C21C1 !important',
                    borderRadius: '10px',
                    '&:hover': { backgroundColor: '#0C21C1 !important' }
                  }}>
                  Register
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Container component='main' maxWidth='xl'>
            <Box
              sx={{
                height: '80vh',
                width: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'end',
                backgroundColor: '#000842',
                borderRadius: '10px',
                marginTop: 10
              }}>
              <Container
                component='main'
                maxWidth='xs'
                sx={{
                  height: "100vh",
                  width: "100vh",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'start',
                  borderRadius: "10px",
                  marginBottom: 5,
                }}>
                  <img src='/Saly-10 (1).png' alt='logo' />
              </Container>
              <Typography component='h1' variant='h5' color='white' className='ml-10 mb-5' sx={{fontFamily: "Poppins", fontStyle: "bold", fontSize: "5vh"}}>
                Register to Using ProLearn
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
