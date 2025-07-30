import { combineReducers } from "@reduxjs/toolkit";
import appSlice from './app';
const rootReducer = combineReducers({
	app: appSlice
});

export default rootReducer;