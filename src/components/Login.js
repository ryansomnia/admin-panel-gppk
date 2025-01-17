import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Card,
  CardContent,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
require('dotenv').config()

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk tanda mata
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await fetch(`http://${process.env.URL}/cbn/v1/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login gagal');
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.data.status === '10') {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('username', data.data.username);

        Swal.fire({
          title: 'Login Berhasil!',
          text: 'Selamat datang di dashboard.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D84040',
        }).then(() => {
          navigate('/dashboard');
        });
      } else {
        Swal.fire({
          title: 'Akses Ditolak!',
          text: 'Role ini tidak memiliki akses.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D84040',
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        title: 'Login Gagal!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
        confirmButtonColor: '#D84040',
      });
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card
          sx={{
            borderRadius: 6,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Box
                component="img"
                src="/logocws.png" // Ganti dengan path gambar Anda
                alt="Logo"
                sx={{
                  width: 80,
                  height: 80,
                  marginBottom: 2,
                }}
              />
            
              <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 2, px: 2 }}
              >
                <TextField
                  variant="outlined"
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
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#D84040',
                    color: '#FFFFF',
                    fontWeight: 'bold',
                    ':hover': {
                      backgroundColor: '#BF3737',
                    },
                  }}
                >
                  Login
                </Button>
               
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: '#D84040' }}
        >
          © {new Date().getFullYear()} Your Company. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Login;
