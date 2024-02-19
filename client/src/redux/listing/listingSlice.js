import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	dataListing: [],
	dataListingById: null,
	message: null,
	error: null,
	loading: false,
};

const listingSlice = createSlice({
	name: "listing",
	initialState,
	reducers: {
		getListingStart: (state) => {
			state.loading = true;
			state.error = null;
			state.message = null;
		},
		getListingSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.message = action.payload.message;
			state.dataListing = action.payload.data;
		},
		getListingFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.message = action.payload;
		},
		getListingFirstStart: (state) => {
			state.loading = true;
			state.error = null;
			state.message = null;
		},
		getListingFirstSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.message = action.payload.message;
			state.dataListingById = action.payload.data;
		},
		getListingFirstFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.message = action.payload;
		},
		deleteListingStart: (state) => {
			state.loading = true;
			state.error = null;
			state.message = null;
		},
		deleteListingSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.message = action.payload.message;
			state.dataListing = action.payload.data;
		},
		deleteListingFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.message = action.payload;
		},
	},
});

export const {
	getListingStart,
	getListingSuccess,
	getListingFailure,
	getListingFirstStart,
	getListingFirstSuccess,
	getListingFirstFailure,
	deleteListingStart,
	deleteListingSuccess,
	deleteListingFailure,
} = listingSlice.actions;

export default listingSlice.reducer;
