import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../features/api/authApi';
import authReducer from '../features/authSlice';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    authApi: authReducer
});

export default rootReducer;
