import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	error: null,
	loading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		authSuccess: (state, action) => {
			state.currentUser = action.payload.currentUser;
			state.loading = false;
			state.error = null;
		},
		authFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		signOutStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		signOutSuccess: (state) => {
			state.loading = false;
			state.error = null;
			state.currentUser = null;
		},
		signOutFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		updateUserStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		updateUserSuccess: (state, action) => {
			state.currentUser = action.payload.currentUser;
			state.loading = false;
			state.error = null;
		},
		updateUserFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		deleteUserStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		deleteUserSuccess: (state) => {
			state.loading = false;
			state.error = null;
			state.currentUser = null;
		},
		deleteUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	authStart,
	authSuccess,
	authFailure,
	signOutStart,
	signOutSuccess,
	signOutFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
