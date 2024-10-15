import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';

// Middleware for debugging
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('Dispatching action:', action);
    const result = next(action);
    console.log('Next state:', store.getState());
    return result;
};

// Configure the store
const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(loggerMiddleware),
    devTools: process.env.NODE_ENV !== 'production', // Enable DevTools in development
});

export default store;
