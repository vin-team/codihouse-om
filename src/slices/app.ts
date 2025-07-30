import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestState } from '../app/state';
const initialState: AppState = {
	isRouteChanging: false,
	description: "Description",
	title: "Page Title",
	seoImageLink: "https://example.com/image.png",
	firebaseApp: null,
	webdata:false,
	fetchState:{status:"idle"}
}
const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		startRouting(state) {
			state.isRouteChanging = true;
		},
		endRouting(state) {
			state.isRouteChanging = false;
		},
		setDiscription(state, action) {
			state.description = action.payload
		},
		setTitle(state, action) {
			state.title = action.payload
		},
		setSeoImageLink(state, action) {
			state.seoImageLink = action.payload
		},
		initFirebase(state, action) {
			state.firebaseApp = action.payload
		}
	}
});
export const { startRouting, endRouting, setDiscription, setSeoImageLink, setTitle, initFirebase } = appSlice.actions;
export default appSlice.reducer;
export interface AppState {
	isRouteChanging: boolean,
	description: string,
	seoImageLink: string,
	title: string,
	firebaseApp?: any,
	webdata:any,
	fetchState:RequestState
}