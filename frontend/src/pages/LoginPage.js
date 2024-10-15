import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg";
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';

// StyledLink definition to remove 'StyledLink is not defined' error
const StyledLink = styled.a`
    color: #7f56da;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        rollNumber: false,
        studentName: false,
    });

    // Handle form submission
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

    // Validate inputs based on the role
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

    // Handle input changes to reset validation errors
    const handleInputChange = (event) => {
        const { name } = event.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    };

    // Use effect to handle successful login
    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            navigate(currentRole === 'Admin' ? '/Admin/dashboard' : currentRole === 'Student' ? '/Student/dashboard' : '/Teacher/dashboard');
        } else if (status === 'failed' || status === 'error') {
            setLoader(false);
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
                        <Typography variant="h7">Welcome back! Please put in your details</Typography>
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
            </Grid>
        </ThemeProvider>
    );
};

export default LoginPage;
