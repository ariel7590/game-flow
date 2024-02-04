import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
	getRelevantCommentsThunk,
	createNewCommentThunk,
	deleteCommentThunk,
	editCommentThunk,
	rankCommentThunk,
} from "./comments.thunks";
import { ICommentsState, IComment } from "./comments.types";

const initialState = {
	currentCommentsList: null,
	currentComment: null,
	loading: false,
	error: null,
} as ICommentsState;

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		enterEditComment: (state, action: PayloadAction<IComment>) => {
			state.currentComment = action.payload;
		},
		exitEditComment: (state) => {
			state.currentComment = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getRelevantCommentsThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(getRelevantCommentsThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentCommentsList = action.payload as IComment[];
			})
			.addCase(getRelevantCommentsThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.currentCommentsList = null;
			})
			.addCase(createNewCommentThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(createNewCommentThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentCommentsList = [
					...(state.currentCommentsList as IComment[]),
					action.payload as IComment,
				];
			})
			.addCase(createNewCommentThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.currentCommentsList = null;
			})
			.addCase(deleteCommentThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteCommentThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentCommentsList =
					action.payload as IComment[]
			})
			.addCase(deleteCommentThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(editCommentThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(editCommentThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentComment =
					action.payload as IComment;
			})
			.addCase(editCommentThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(rankCommentThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(rankCommentThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				console.log(action.payload);
				state.currentComment =
					action.payload as IComment;
			})
			.addCase(rankCommentThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { enterEditComment, exitEditComment } = commentsSlice.actions;
export default commentsSlice.reducer;
