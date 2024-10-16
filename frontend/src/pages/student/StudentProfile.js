import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
    const { currentUser, response, error } = useSelector((state) => state.user);

    // Log responses for debugging
    if (response) {
        console.log(response);
    } else if (error) {
        console.log(error);
    }

    // Safely access nested user data
    const sclassName = currentUser?.sclassName || {};
    const studentSchool = currentUser?.school || {};

    return (
        <Container maxWidth="md">
            <StyledPaper elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                                {String(currentUser?.name).charAt(0) || 'S'}
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="h5" component="h2" textAlign="center">
                                {currentUser?.name || "Student Name"}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="subtitle1" component="p" textAlign="center">
                                Student Roll No: {currentUser?.rollNum || "N/A"}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="subtitle1" component="p" textAlign="center">
                                Class: {sclassName.sclassName || "N/A"}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="subtitle1" component="p" textAlign="center">
                                School: {studentSchool.schoolName || "N/A"}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </StyledPaper>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Date of Birth:</strong> {currentUser?.dob || "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Gender:</strong> {currentUser?.gender || "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Email:</strong> {currentUser?.email || "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Phone:</strong> {currentUser?.phone || "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Address:</strong> {currentUser?.address || "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Emergency Contact:</strong> {currentUser?.emergencyContact || "N/A"}
                            </Typography>
[O                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default StudentProfile;

const StyledPaper = styled(Paper)`
    padding: 20px;
    margin-bottom: 20px;
`;
