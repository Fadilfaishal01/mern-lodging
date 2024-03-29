import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/userSlice";
import listingReducer from "./listing/listingSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	version: 1,
};

const rootReducer = combineReducers({
	auth: authReducer,
	listing: listingReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
