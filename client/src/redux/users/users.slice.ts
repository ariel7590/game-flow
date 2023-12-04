import { createSlice } from "@reduxjs/toolkit";
import { signUpThunk, loginThunk, authenticationThunk } from "./users.thunks";
import { IAuthFailed, ICurrentUser, IUserState } from "./users.types";

const initialState = {
	currentUser: {
		auth: false,
		message: "No token found!",
	} as IAuthFailed,
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
					message: action.payload as string,
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
					message: action.payload as string,
				};
			})
			.addCase(authenticationThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(authenticationThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentUser = action.payload as ICurrentUser;
			})
			.addCase(authenticationThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as IAuthFailed;
				state.currentUser = {
					auth: false,
					message: action.payload
				} as IAuthFailed;
			});
	},
});

export default userSlice.reducer;
