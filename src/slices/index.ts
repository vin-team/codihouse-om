import { combineReducers } from "@reduxjs/toolkit";
import appSlice from './app';
import authSlice from './authSlice';
import roleSlice from './roleSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
	app: appSlice,
	auth: authSlice,
	user: userSlice,
	role: roleSlice
});

export default rootReducer;