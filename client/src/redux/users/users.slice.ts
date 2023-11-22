import { createSlice } from "@reduxjs/toolkit";
import { signUpThunk, loginThunk } from "./users.thunks";
import { ICurrentUser, IUserState } from "./users.types";

const initialState = {
	currentUser: {
		auth: false,
		message: "No token found!",
	},
	loading: false,
	error: null,
} as IUserState;

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signUpThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signUpThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentUser = action.payload as ICurrentUser;
			})
			.addCase(signUpThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.currentUser = {
					auth: false,
					message: "No token found!",
				};
			})
			.addCase(loginThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentUser = action.payload as ICurrentUser;
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.currentUser = {
					auth: false,
					message: "No token found!",
				};
			});
	},
});

export default userSlice.reducer;
