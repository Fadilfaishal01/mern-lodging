import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	version: 1,
};

const rootReducer = combineReducers({ auth: authReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);
