import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	getPeginatedPostsThunk,
	createPostThunk,
	deletePostThunk,
	editPostThunk,
	getCurrentPost
} from "./posts.thunks";
import { IPostState, ICurrentPost } from "./posts.types";
import { editCommentThunk } from "../comments/comments.thunks";

const initialState = {
	currentPostList: null,
	currentPost: null,
	loading: false,
	error: null,
} as IPostState;

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		enterPost: (state, action: PayloadAction<ICurrentPost>) => {
			state.currentPost = action.payload;
		},
		exitPost: (state) => {
			state.currentPost = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPeginatedPostsThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPeginatedPostsThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentPostList = action.payload as ICurrentPost[];
			})
			.addCase(getPeginatedPostsThunk.rejected, (state, action) => {
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
				if (state.currentPostList) {
					state.currentPostList = [
						action.payload as ICurrentPost,
						...(state.currentPostList as ICurrentPost[]),
					];
				}
				state.currentPost = action.payload as ICurrentPost;
			})
			.addCase(createPostThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.currentPostList = null;
				state.currentPost = null;
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
			})
			.addCase(editCommentThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(editPostThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentPostList = null;
				state.currentPost=action.payload as ICurrentPost;
			})
			.addCase(editPostThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// in case I refresh the post page (it can't get the currentPost state after a refresh)
			.addCase(getCurrentPost.pending,(state)=>{
				state.loading=true;
			})
			.addCase(getCurrentPost.fulfilled,(state, action)=>{
				state.loading=false;
				state.currentPost=action.payload as ICurrentPost;
				state.error=null;
			})
			.addCase(getCurrentPost.rejected,(state, action)=>{
				state.loading=false;
				state.currentPost=null;
				state.error=action.payload as string;
			})
	},
});

export const { enterPost, exitPost } = postSlice.actions;

export default postSlice.reducer;
