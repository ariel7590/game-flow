import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
	getRelevantCommentsThunk,
	createNewCommentThunk,
	deleteCommentThunk,
	editCommentThunk,
	rankCommentThunk,
	getCommentByIdthunk
} from "./comments.thunks";
import { ICommentsState, IComment, IGetCommentsAPI } from "./comments.types";

const initialState = {
	currentCommentsList: null,
	pages: 0,
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
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getRelevantCommentsThunk.pending, (state) => ({
				...state,
				loading: true,
			}))
			.addCase(getRelevantCommentsThunk.fulfilled, (state, action) => ({
				...state,
				loading:false,
				error:null,
				currentCommentsList:(action.payload as IGetCommentsAPI)
					.comments as IComment[],
				pages:(action.payload as IGetCommentsAPI).pages,
			}))
			.addCase(getRelevantCommentsThunk.rejected, (state, action) => ({
				...state,
				loading:false,
				error:action.payload as string,
				currentCommentsList:null,
				pages:0,
			}))
			.addCase(getCommentByIdthunk.pending ,(state)=>({
				...state,
				loading:true,
			}))
			.addCase(getCommentByIdthunk.fulfilled ,(state, action)=>({
				...state,
				loading:false,
				currentComment:action.payload as IComment,
				error:null,
			}))
			.addCase(getCommentByIdthunk.rejected ,(state, action)=>({
				...state,
				loading:false,
				error:action.payload as string,
				currentComment:null,
			}))
			.addCase(createNewCommentThunk.pending, (state) => ({
				...state,
				loading:true,
			}))
			.addCase(createNewCommentThunk.fulfilled, (state, action) => ({
				...state,
				loading: false,
				error: null,
				currentCommentsList: [
					...(state.currentCommentsList as IComment[]),
					action.payload as IComment,
				],
			}))
			.addCase(createNewCommentThunk.rejected, (state, action) => ({
				...state,
				loading:false,
				error:action.payload as string,
				currentCommentsList:null,
			}))
			.addCase(deleteCommentThunk.pending, (state) => ({
				...state,
				loading: true,
			}))
			.addCase(deleteCommentThunk.fulfilled, (state, action) => ({
				...state,
				loading:false,
				error:null,
				currentCommentsList:action.payload as IComment[],
			}))
			.addCase(deleteCommentThunk.rejected, (state, action) => ({
				...state,
				loading:false,
				error:action.payload as string,
			}))
			.addCase(editCommentThunk.pending, (state) => ({
				...state,
				loading:true,
			}))
			.addCase(editCommentThunk.fulfilled, (state, action) => ({
				...state,
				loading:false,
				error: null,
				currentComment:action.payload as IComment,
			}))
			.addCase(editCommentThunk.rejected, (state, action) => ({
				...state,
				loading:false,
				error:action.payload as string,
			}))
			.addCase(rankCommentThunk.pending, (state) => ({
				...state,
				loading:true,
			}))
			.addCase(rankCommentThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.currentComment = action.payload as IComment;
				// replace the comment with the old rank with the comment with the new rank in the comments list
				const oldComment = state.currentCommentsList?.filter(
					(comment) =>
						comment.commentId === (action.payload as IComment).commentId
				);
				state.currentCommentsList?.splice(
					state.currentCommentsList.indexOf(oldComment![0]),
					1,
					action.payload as IComment
				);
			})
			.addCase(rankCommentThunk.rejected, (state, action) => ({
				...state,
				loading: false,
				error:action.payload as string,
			}));
	},
});

export const { enterEditComment, exitEditComment } = commentsSlice.actions;
export default commentsSlice.reducer;
