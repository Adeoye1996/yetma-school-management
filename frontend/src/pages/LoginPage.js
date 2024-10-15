import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg"
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);
    
    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        rollNumber: false,
        studentName: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const values = {
            email: event.target.email?.value,
            password: event.target.password.value,
            rollNumber: event.target.rollNumber?.value,
            studentName: event.target.studentName?.value,
        };

        if (validateInputs(role, values)) {
            setLoader(true);
            dispatch(loginUser(values, role));
        }
    };

    const validateInputs = (role, values) => {
        const newErrors = {};
        if (role === "Student") {
            if (!values.rollNumber) newErrors.rollNumber = true;
            if (!values.studentName) newErrors.studentName = true;
        } else {
            if (!values.email) newErrors.email = true;
        }
        if (!values.password) newErrors.password = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    };

    const guestModeHandler = () => {
        const password = "zxc";
        const fields = role === "Student" 
            ? { rollNum: "1", studentName: "Abdulazeez Abdulrazak", password } 
            : { email: role === "Admin" ? "Abdulazeezbabatunde10@gmail.com" : "Abdulazeezbabatunde20@yahoo.com", password };

        setGuestLoader(true);
        dispatch(loginUser(fields, role));
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            navigate(currentRole === 'Admin' ? '/Admin/dashboard' : currentRole === 'Student' ? '/Student/dashboard' : '/Teacher/dashboard');
        } else if (status === 'failed' || status === 'error') {
            setMessage(response || "Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                            {role} Login
                        </Typography>
                        <Typography variant="h7">Welcome back! Please putin your details</Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            {role === "Student" ? (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="rollNumber"
                                        label="Enter your Roll Number"
                                        name="rollNumber"
                                        autoComplete="off"
                                        type="number"
                                        error={errors.rollNumber}
                                        helperText={errors.rollNumber && 'Roll Number is required'}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="studentName"
                                        label="Enter your name"
                                        name="studentName"
                                        autoComplete="name"
                                        error={errors.studentName}
                                        helperText={errors.studentName && 'Name is required'}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    autoComplete="email"
                                    error={errors.email}
                                    helperText={errors.email && 'Email is required'}
                                    onChange={handleInputChange}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={errors.password}
                                helperText={errors.password && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                                <StyledLink href="#">Forgot password?</StyledLink>
                            </Grid>
                            <LightPurpleButton type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
                            </LightPurpleButton>
                            <Button fullWidth onClick={guestModeHandler} variant="outlined" sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}>
                                Login as Guest
                            </Button>
                            {role === "Admin" && (
                                <Grid container>
                                    <Grid>Don't have an account?</Grid>
                                    <Grid item sx={{ ml: 2 }}>
                                        <StyledLink to="/Adminregister">Sign up</StyledLink>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={guestLoader}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Popup open={showPopup} setOpen={setShowPopup} message={message} />
            </Grid>
        </ThemeProvider>
    );
};

export default LoginPage;
