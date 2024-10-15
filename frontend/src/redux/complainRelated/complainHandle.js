import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './complainSlice';

export const getAllComplains = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    // Validate input parameters
    if (!id || !address) {
        dispatch(getError('Invalid parameters: id and address are required.'));
        return;
    }

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);

        // Check for a successful response
        if (result.data && result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        // Handle the error more gracefully
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        dispatch(getError(errorMessage));
    }
};
