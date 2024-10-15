import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    complainsList: [],
    loading: false,
    error: null,
    serverError: null,
};

const complainSlice = createSlice({
    name: 'complain',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new request
            state.serverError = null; // Reset server error on new request
        },
        getSuccess: (state, action) => {
            state.complainsList = action.payload;
            state.loading = false;
            state.error = null;
            state.serverError = null; // Reset on success
        },
        getFailed: (state, action) => {
            state.serverError = action.payload; // Use a separate state for server errors
            state.loading = false;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload; // General error state
        },
        clearComplainState: (state) => {
            state.complainsList = [];
            state.loading = false;
            state.error = null;
            state.serverError = null;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    clearComplainState,
} = complainSlice.actions;

export const complainReducer = complainSlice.reducer;
