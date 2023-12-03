import { createSlice } from "@reduxjs/toolkit";
import { createPostThunk, deletePostThunk } from "./posts.thunks";
import { IPostState, ICurrentPost } from "./posts.types";

const initialState = {
	currentPost: null,
	loading: false,
	error: null,
} as IPostState;

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createPostThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(createPostThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentPost = action.payload as ICurrentPost;
			})
			.addCase(createPostThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.currentPost = null;
			})
			.addCase(deletePostThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(deletePostThunk.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
				state.currentPost=null;
			})
			.addCase(deletePostThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default postSlice.reducer;
