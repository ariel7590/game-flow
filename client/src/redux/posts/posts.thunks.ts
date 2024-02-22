import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IPostForEditing, NewPost } from "./posts.types";
import { localAPI, postsRoute } from "../routeUrls";

export const getPeginatedPostsThunk = createAsyncThunk<
	unknown,
	number,
	{ rejectValue: SerializedError }
>("posts/getAllPosts", async (page, thunkAPI) => {
	try {
		const response = await axios({
			method: "get",
			url: localAPI + postsRoute,
			params: { page: page },
			headers: {
				"Content-Type": "application/json",
			},
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
		const formData = new FormData();
		formData.append("publisher", post.publisher);
		formData.append("publisherId", post.publisherId.toString());
		formData.append("gameName", post.gameName);
		formData.append("title", post.title);
		formData.append("body", post.body);
		if (post.media) {
			formData.append("media", post.media as File);
		}

		const response = await axios({
			method: "post",
			url: localAPI + postsRoute,
			headers: {
				"Content-Type": "multipart/form-data",
			},
			withCredentials: true,
			data: formData,
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
	// 	postId: string;
	// newTitle: string;
	// newContent: string;
	// newMedia: string[];
	// publisherId: number;
		const formData = new FormData();
		formData.append("postId", post.postId);
		formData.append("newTitle", post.newTitle);
		formData.append("newContent", post.newContent);
		formData.append("publisherId", post.publisherId.toString());
		if(post.newMedia && Array.isArray(post.newMedia) && typeof(post.newMedia[0])==="string"){
			formData.append("newMedia", post.newMedia);
		}
		const response = await axios({
			method: "put",
			url: localAPI + postsRoute,
			headers: {
				"Content-Type": "multipart/form-data",
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

export const getCurrentPost = createAsyncThunk<
	unknown,
	string,
	{ rejectValue: SerializedError }
>("posts/getCurrentPost", async (postId: string, thunkAPI) => {
	try {
		const response = await axios({
			method: "get",
			url: localAPI + postsRoute + postId,
			headers: {
				"Content-Type": "application/json",
			},
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
