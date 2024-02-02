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
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		authFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const { authStart, authSuccess, authFailure } = authSlice.actions;

export default authSlice.reducer;
