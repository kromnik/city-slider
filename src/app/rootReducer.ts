import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import citiesReducer from '../features/cities/citiesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cities: citiesReducer,
});

export default rootReducer;