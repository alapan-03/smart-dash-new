// src/Reducers/index.js
import { combineReducers } from 'redux';
import authReducer from '../Slices/authSlice';

const rootReducer = combineReducers({
  auth: authReducer, // Ensure this points to the correct reducer
});

export default rootReducer;
