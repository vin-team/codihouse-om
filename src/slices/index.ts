import { combineReducers } from "@reduxjs/toolkit";
import appSlice from './app';
import authSlice from './authSlice';
import roleSlice from './roleSlice';
import userSlice from './userSlice';
import orderSlice from './orderSlice';
import branchSlice from "./branchSlice";
import customerSlice from "./customerSlice";
import searchSlice from "./searchSlice";

const rootReducer = combineReducers({
	app: appSlice,
	auth: authSlice,
	user: userSlice,
	role: roleSlice,
	order: orderSlice,
	branch: branchSlice,
	customer: customerSlice,
	search: searchSlice,
});

export default rootReducer;