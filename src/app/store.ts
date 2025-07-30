import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import {
	  persistStore,
	} from "redux-persist";
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from "../slices";
	
const persistConfig = {
	  key: "codihouse",
	  storage:AsyncStorage,
	  whitelist: ["app"],
};
	
const persistedReducer = persistReducer(persistConfig, rootReducer)
enableMapSet();
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
	  getDefaultMiddleware({
	  serializableCheck:false
	  }),
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

