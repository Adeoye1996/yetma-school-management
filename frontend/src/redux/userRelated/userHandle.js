import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed, // Ensure this is used if needed
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed, // Ensure this is imported
    getError,
} from './userSlice';

// Define handleResponse if it's not defined elsewhere
const handleResponse = (dispatch, result, successCallback, failureMessage) => {
    if (result.data.message) {
        dispatch(authFailed(result.data.message)); // Ensure you use authFailed if needed
        return false; // Indicates failure
    } 
    successCallback(result.data);
    return true; // Indicates success
};

// Your existing async action creators remain unchanged
