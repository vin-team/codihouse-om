import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import { persistStore } from "redux-persist";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import rootReducer from "../slices";
import { authMiddleware } from "../middleware/authMiddleware";

const persistConfig = {
	key: "codihouse",
	storage,
	whitelist: ["app"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer)
enableMapSet();
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(authMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

