import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice';

const rootReducer = combineReducers({
  auth: authReducer, // Add other reducers here
});

export default rootReducer;
