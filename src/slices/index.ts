import { combineReducers } from "@reduxjs/toolkit";
import appSlice from './app';
import authSlice from './authSlice';

const rootReducer = combineReducers({
	app: appSlice,
	auth: authSlice
});

export default rootReducer;