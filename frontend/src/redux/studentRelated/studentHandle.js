import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';

// Utility function for handling API requests
const handleResponse = (dispatch, result) => {
    if (result.data.message) {
        dispatch(getFailed(result.data.message));
        return false; // Indicates failure
    } 
    return true; // Indicates success
};

export const getAllStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Students/${id}`);
        if (handleResponse(dispatch, result)) {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        const errorMessage = error.response 
            ? error.response.data.message || error.message 
            : error.message;
        dispatch(getError(errorMessage));
    }
}

export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (handleResponse(dispatch, result)) {
            dispatch(stuffDone());
        }
    } catch (error) {
        const errorMessage = error.response 
            ? error.response.data.message || error.message 
            : error.message;
        dispatch(getError(errorMessage));
    }
}

export const removeStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`); // Use DELETE for removal
        if (handleResponse(dispatch, result)) {
            dispatch(stuffDone());
        }
    } catch (error) {
        const errorMessage = error.response 
            ? error.response.data.message || error.message 
            : error.message;
        dispatch(getError(errorMessage));
    }
}
