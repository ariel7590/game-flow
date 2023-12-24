import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ICurrentPost, IPostForEditing, NewPost } from "./posts.types";
import { localAPI, postsRoute } from "../routeUrls";

export const getAllPostsThunk = createAsyncThunk<
	unknown,
	ICurrentPost[],
	{ rejectValue: SerializedError }
>("posts/getAllPosts", async (_, thunkAPI) => {
	try {
		const response = await axios({
			method: "get",
			url: localAPI + postsRoute,
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			alert(err.response.data.error);
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});

export const createPostThunk = createAsyncThunk<
	unknown,
	NewPost,
	{ rejectValue: SerializedError }
>("posts/createPost", async (post, thunkAPI) => {
	try {
		const response = await axios({
			method: "post",
			url: localAPI + postsRoute,
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
			data: JSON.stringify(post),
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			alert(err.response.data.error);
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});

export const deletePostThunk = createAsyncThunk<
	unknown,
	string,
	{ rejectValue: SerializedError }
>("posts/deletePost", async (postId: string, thunkAPI) => {
	try {
		const response = await axios({
			method: "delete",
			url: localAPI + postsRoute + postId,
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			alert(err.response.data.error);
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});

export const editPostThunk = createAsyncThunk<
	unknown,
	IPostForEditing,
	{ rejectValue: SerializedError }
>("posts/editPost", async (post, thunkAPI) => {
	try {
		const response = await axios({
			method: "put",
			url: localAPI + postsRoute,
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
			data: post,
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			alert(err.response.data.error);
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});
