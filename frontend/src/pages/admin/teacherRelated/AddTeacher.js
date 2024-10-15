import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Typography } from '@mui/material';

const AddTeacher = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subjectID = params.id;

    const { status, response, error } = useSelector(state => state.user);
    const { subjectDetails, loading: subjectLoading } = useSelector((state) => state.sclass);

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
    }, [dispatch, subjectID]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);

    const role = "Teacher";
    const school = subjectDetails?.school;
    const teachSubject = subjectDetails?._id;
    const teachSclass = subjectDetails?.sclassName?._id;

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        const fields = { name, email, password, role, school, teachSubject, teachSclass };
        dispatch(registerUser(fields, role));
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate("/Admin/teachers");
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <div>
            <div className="register">
                <form className="registerForm" onSubmit={submitHandler}>
                    <Typography variant="h5">Add Teacher</Typography>
                    <br />
                    <label>Subject: {subjectLoading ? "Loading..." : subjectDetails?.subName}</label>
                    <br />
                    <label>Class: {subjectLoading ? "Loading..." : subjectDetails?.sclassName?.sclassName}</label>
                    <br />
                    <label htmlFor="teacher-name">Name</label>
                    <input 
                        id="teacher-name"
                        className="registerInput" 
                        type="text" 
                        placeholder="Enter teacher's name..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name" 
                        required 
                    />
                    <br />
                    <label htmlFor="teacher-email">Email</label>
                    <input 
                        id="teacher-email"
                        className="registerInput" 
                        type="email" 
                        placeholder="Enter teacher's email..."
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email" 
                        required 
                    />
                    <br />
                    <label htmlFor="teacher-password">Password</label>
                    <input 
                        id="teacher-password"
                        className="registerInput" 
                        type="password" 
                        placeholder="Enter teacher's password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password" 
                        required 
                    />
                    <br />
                    <button className="registerButton" type="submit" disabled={loader}>
                        {loader ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default AddTeacher;
