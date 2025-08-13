import { combineReducers } from "@reduxjs/toolkit";
import appSlice from './app';
import authSlice from './authSlice';
import userSlice from './userSlice';
import orderSlice from './orderSlice';
import branchSlice from "./branchSlice";
import customerSlice from "./customerSlice";
import searchSlice from "./searchSlice";
import fileSlice from "./fileSlice";
import importDataSlice from "./importDataSlice";
import importMetaSlice from "./importMetaSlice";

const rootReducer = combineReducers({
	app: appSlice,
	auth: authSlice,
	user: userSlice,
	order: orderSlice,
	branch: branchSlice,
	customer: customerSlice,
	search: searchSlice,
	file: fileSlice,
	importData: importDataSlice,
	importMeta: importMetaSlice,
});

export default rootReducer;