import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Alert, TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserRegMutation } from "../services/authApi";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const UserReg = () => {
  const [error, setError] = useState({ status: false, msg: '', type: '' });
  const navigate = useNavigate();
  const [userReg, { isLoading }] = useUserRegMutation();

  const [captcha, setCaptcha] = useState('');
  const [enteredCaptcha, setEnteredCaptcha] = useState('');

  const emailRegex = /^\S+@(?!invalid\.com)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/;

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
    drawCaptcha(code);
  };

  const drawCaptcha = (code) => {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1.1)`;
      ctx.fillRect(x, y,1,2);
    }

    ctx.font = '37px Arial';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < code.length; i++) {
      const x = 30 + i * 30;
      const y = 50 + Math.random() * 20;
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }

    for (let i = 0; i < 10; i++) {
      const xStart = Math.random() * canvas.width;
      const yStart = Math.random() * canvas.height;
      const xEnd = Math.random() * canvas.width;
      const yEnd = Math.random() * canvas.height;
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`;
      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleErrorTimeout = (message, type) => {
    setError({ status: true, msg: message, type: type });
    setTimeout(() => {
      setError({ status: false, msg: '', type: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enteredCaptcha === captcha) {
      const data = new FormData(e.currentTarget);
      const actualData = {
        first_name: data.get('first_name'),
        last_name: data.get('last_name'),
        email: data.get('email'),
        password: data.get('password'),
        password_confirmation: data.get('password_confirmation'),
        captcha: enteredCaptcha,
      };

      if (actualData.first_name && actualData.last_name && actualData.email && actualData.password && actualData.password_confirmation && actualData.captcha) {
        if (!emailRegex.test(actualData.email)) {
          handleErrorTimeout("Please enter a valid email address", 'error');
          return;
        }
        if (!passwordRegex.test(actualData.password)) {
          handleErrorTimeout("Password must be at least 8 characters long and contain at least one special character and one alphanumeric character.", 'error');
          return;
        }
        if (actualData.password === actualData.password_confirmation) {
          const res = await userReg(actualData);
          console.log(res);

          if (res.data.status === 'success') {
            // Cookies.set('session', res.data.session, { expires: 1, path: '/' }, {withCredentials: true});
            setTimeout(() => {
              navigate('/');
              window.location.reload();
            }, 3000);
          } else {
            console.error('error during registration', error);
            handleErrorTimeout(res.data.message, 'error');
          }
        } else {
          handleErrorTimeout("Password and Confirm Password don't match!", 'error');
        }
      } else {
        handleErrorTimeout('All fields are required', 'error');
      }
    } else {
      handleErrorTimeout('Captcha code does not match', 'error');
      generateCaptcha();
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', color: 'navy' }}>Welcome!!!</h2>

      <Box component="form" noValidate sx={{ mt: 0, p: 1, maxWidth: '400px', margin: 'auto' }} id="reg-form" onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth id="first_name" name="first_name" label="First Name" />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth id="last_name" name="last_name" label="Last Name" />
          </Grid>
        </Grid>
        <TextField margin="normal" required fullWidth id="email" name="email" label="Email Address" />
        <TextField
          margin='normal' required fullWidth id='password' name='password' type={showPassword ? 'text' : 'password'} label='Password' InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handlePasswordVisibility} edge='end'>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' type='password' label='Confirm Password' />
         <TextField
          margin="normal"
          required
          fullWidth
          id="captcha"
          name="captcha"
          type="text"
          label="Captcha"
          value={enteredCaptcha}
          onChange={(e) => setEnteredCaptcha(e.target.value)}
        />
        <div className="captcha-container" style={{ textAlign: 'center', margin: '10px 0' }}>
          <canvas id="captchaCanvas" width="200" height="100" textAlign= 'center'></canvas>
        </div>
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
        <Button variant='contained' sx={{ mt: 1, px: 5, backgroundColor: 'white', color: 'navy', fontWeight: '550' }} onClick={generateCaptcha}>
            Regenerate CAPTCHA
          </Button></div>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
        {isLoading ? (
            <CircularProgress />
          ) : (
          <Button type="submit" variant="contained" sx={{ mt: 1, px: 5, backgroundColor: 'white', color: 'navy', fontWeight: '550' }}>
            Register
          </Button>
          )}
          <br /><br />
          <NavLink to='/login' style={{ color: 'blue', fontStyle: 'normal' }}>Already have an account?</NavLink>
        </Box>
        {error.status && <Alert severity={error.type} sx={{ textAlign: 'center' }}>{error.msg}</Alert>}
      </Box>
    </>
  );
};

export default UserReg;
