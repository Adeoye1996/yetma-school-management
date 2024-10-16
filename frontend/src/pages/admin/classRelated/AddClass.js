import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    const { status, currentUser, response, tempDetails } = userState;

    const adminID = currentUser._id;
    const address = "Sclass";

    // Handler for form submission
    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff({ sclassName, adminID }, address));
    };

    // Effect to handle side effects of status changes
    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            handleError(response);
        } else if (status === 'error') {
            handleError("Network Error");
        }
    }, [status, navigate, dispatch, tempDetails, response]);

    // Function to handle errors
    const handleError = (errorMsg) => {
        setMessage(errorMsg);
        setShowPopup(true);
        setLoader(false);
    };

    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack sx={{ alignItems: 'center', mb: 3 }}>
                        <img src={Classroom} alt="classroom" style={{ width: '80%' }} />
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                label="Create a class"
                                variant="outlined"
                                value={sclassName}
                                onChange={(event) => setSclassName(event.target.value)}
                                required
                                inputProps={{ minLength: 1 }} // Add minimum length validation
                            />
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Create"}
                            </BlueButton>
                            <Button variant="outlined" onClick={() => navigate(-1)}>
                                Go Back
                            </Button>
                        </Stack>
                    </form>
                </StyledBox>
            </StyledContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddClass;

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;
