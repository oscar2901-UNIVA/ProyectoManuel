import React, { useState } from 'react';
import  '../styles/Login.scss'
import { Button, Card, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
  
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
    <div className="main-login">
        <Card className="container-card-login">
            <h1 className='title-login'>Login</h1>
        <TextField
          className="input-login"
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          sx={{ borderRadius: '15px' }} 
        />
        <TextField
          className="input-login"
          label="Contraseña"
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPasswordClick}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          className="button-login"
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Iniciar sesión
        </Button>
      </Card>
    </div>
  )
}

export default Login