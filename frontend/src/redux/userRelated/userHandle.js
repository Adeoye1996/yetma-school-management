import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getRequest,
    getError,
} from './userSlice';

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (handleResponse(dispatch, result, (data) => dispatch(authSuccess(data)))) {
            // Successfully logged in
            // You can redirect the user here if needed
        }
    } catch (error) {
        dispatch(authError(error.response?.data?.message || error.message));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (handleResponse(dispatch, result, (data) => dispatch(authSuccess(data)))) {
            // Successfully registered
            // You can redirect the user here if needed
        }
    } catch (error) {
        dispatch(authError(error.response?.data?.message || error.message));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
    // Clear any local state or cookies related to the user session if needed
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message));
    }
};

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry, the delete function has been disabled for now."));
};

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (handleResponse(dispatch, result, (data) => dispatch(authSuccess(data)))) {
            // Successfully updated user
            // You can redirect the user here if needed
        }
    } catch (error) {
        dispatch(getError(error.response?.data?.message || error.message));
    }
};

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (handleResponse(dispatch, result, (data) => dispatch(stuffAdded(data)))) {
            // Successfully added stuff
            // You can redirect the user or show a success message here if needed
        }
    } catch (error) {
        dispatch(authError(error.response?.data?.message || error.message));
    }
};
