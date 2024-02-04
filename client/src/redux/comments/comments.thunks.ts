import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ICommentForEditing, ICommentInput, ICommentsPage } from "./comments.types";
import { localAPI, commentsRoute } from "../routeUrls";


export const getRelevantCommentsThunk = createAsyncThunk<
	unknown,
	ICommentsPage,
	{ rejectValue: SerializedError }
>("comments/getRelevantComments", async (commentData, thunkAPI) => {
	try {
		const response = await axios({
			method: "get",
			url: localAPI + commentsRoute + commentData.postId,
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				page: commentData.page
			}
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});

export const createNewCommentThunk = createAsyncThunk<
	unknown,
	ICommentInput,
	{ rejectValue: SerializedError }
>("comments/createNewComment", async (comment, thunkAPI) => {
	try {
		const response = await axios({
			method: "post",
			url: localAPI + commentsRoute,
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
			data: JSON.stringify(comment),
		});
		return thunkAPI.fulfillWithValue(response.data);

	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});

export const deleteCommentThunk = createAsyncThunk<
	unknown,
	string,
	{ rejectValue: SerializedError }
>("comments/deleteComment", async (commentId, thunkAPI) => {
	try {
		const response = await axios({
			method: "delete",
			url: localAPI + commentsRoute + commentId,
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		return thunkAPI.fulfillWithValue(response.data);

	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});

export const editCommentThunk = createAsyncThunk<
	unknown,
	ICommentForEditing,
	{ rejectValue: SerializedError }
>("comments/editComment", async (editableComment, thunkAPI) => {
	try {
		const response = await axios({
			method: "put",
			url: localAPI + commentsRoute,
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
            data: JSON.stringify(editableComment)
		});
		return thunkAPI.fulfillWithValue(response.data);

	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});