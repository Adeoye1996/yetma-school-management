import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

// Utility function for handling API responses
const handleResponse = (dispatch, result, successCallback, failureMessage) => {
    if (result.data.message) {
        dispatch(authFailed(result.data.message));
        return false; // Indicates failure
    } 
    successCallback(result.data);
    return true; // Indicates success
};

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (handleResponse(dispatch, result, (data) => dispatch(authSuccess(data)), result.data.message)) {
            // Successfully logged in
        }
    } catch (error) {
        const errorMessage = error.response 
            ? error.response.data.message || error.message 
            : error.message;
        dispatch(authError(errorMessage));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (handleResponse(dispatch, result, (data) => dispatch(authSuccess(data)), result.data.message)) {
            // Successfully registered
        }
    } catch (error) {
        const errorMessage = error.response 
            ? error.response.data.message || error.message 
            : error.message;
        dispatch(authError(errorMessage));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        const errorMessage = error.response 
            ? error.response.data.message || error.message 
            : error.message;
        dispatch(getError(errorMessage));
    }
};

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disabled for now."));
}

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (handleResponse(dispatch, result, (data) => dispatch(authSuccess(data)), result.data.message)) {
            // Successfully updated user
        }
    } catch (error) {
        const errorMessage = error.response 
            ? error.response.data.message || error.message 
            : error.message;
        dispatch(getError(errorMessage));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (handleResponse(dispatch, result, (data) => dispatch(stuffAdded(data)), result.data.message)) {
            // Successfully added stuff
        }
    } catch (error) {
        const errorMessage = error.response 
            ? error.response.data.message || error.message 
            : error.message;
        dispatch(authError(errorMessage));
    }
};
