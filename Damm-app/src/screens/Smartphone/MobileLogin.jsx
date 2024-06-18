import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Typography, Box, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RefillAI_Logo from '/src/assets/RefillAI_Logo.png'; // Assegura't que la ruta a la imatge és correcta
import { useNavigate } from 'react-router-dom';
import './Mobile.css'; // Importar el fitxer CSS

const theme = createTheme();

const MobileLogin = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("All fields are required.");
      return;
    }
    setError("");

    if (username === "Damm" && password === "12345") {
      setUser(username);
      navigate('/mobile-truck-details');
    } else {
      setError("Wrong username or password.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="smartphone">
        <div className="screen">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar src={RefillAI_Logo} variant="square" sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100, marginBottom: 2 }} />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {error && (
                  <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MobileLogin;
