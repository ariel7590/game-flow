import { createSlice } from "@reduxjs/toolkit";
import {
	getAllPostsThunk,
	createPostThunk,
	deletePostThunk,
} from "./posts.thunks";
import { IPostState, ICurrentPost } from "./posts.types";

const initialState = {
	currentPostList: null,
	loading: false,
	error: null,
} as IPostState;

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPostsThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllPostsThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentPostList = action.payload as ICurrentPost[];
			})
			.addCase(getAllPostsThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.currentPostList = null;
			})
			.addCase(createPostThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(createPostThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentPostList = [
					action.payload as ICurrentPost,
					...(state.currentPostList as ICurrentPost[]),
				];
			})
			.addCase(createPostThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.currentPostList = null;
			})
			.addCase(deletePostThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(deletePostThunk.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
				state.currentPostList = null;
			})
			.addCase(deletePostThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default postSlice.reducer;
