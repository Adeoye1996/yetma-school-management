import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);
  
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    let fields = {};
    
    if (user === "Admin") {
      fields = { email: "abdulazeezbabatunde10@gmail.com", password };
    } else if (user === "Student") {
      fields = { rollNum: "1", studentName: "Abdulazeez Abdulrazak", password };
    } else if (user === "Teacher") {
      fields = { email: "abdulazeezbabatunde10@gmail.com", password };
    }

    if (visitor === "guest") {
      setLoader(true);
      dispatch(loginUser(fields, user));
    } else {
      navigate(`/${user.toLowerCase()}login`);
    }
  };

  useEffect(() => {
    if (status === 'success' && currentUser) {
      navigate(`/${currentRole.toLowerCase()}/dashboard`);
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3} onClick={() => navigateHandler("Admin")}>
              <Box mb={2}>
                <AccountCircle fontSize="large" />
              </Box>
              <StyledTypography>Admin</StyledTypography>
              Login as an administrator to access the dashboard to manage app data.
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3} onClick={() => navigateHandler("Student")}>
              <Box mb={2}>
                <School fontSize="large" />
              </Box>
              <StyledTypography>Student</StyledTypography>
              Login as a student to explore course materials and assignments.
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3} onClick={() => navigateHandler("Teacher")}>
              <Box mb={2}>
                <Group fontSize="large" />
              </Box>
              <StyledTypography>Teacher</StyledTypography>
              Login as a teacher to create courses, assignments, and track student progress.
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        <Box ml={2}>Please Wait</Box>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #19118b);
  height: 100vh; /* Changed to 100vh for better layout */
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #FF6600;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;

  &:hover {
    background-color: #2196F3;
    color: white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;
