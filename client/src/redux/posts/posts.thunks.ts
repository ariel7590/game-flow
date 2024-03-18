import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IPostForEditing, NewPost } from "./posts.types";
import { postsRoute } from "../../config/routeUrls";
import axiosInstance from "../../config/axios.config";

export const getPeginatedPostsThunk = createAsyncThunk<
	unknown,
	number,
	{ rejectValue: SerializedError }
>("posts/getAllPosts", async (page, thunkAPI) => {
	try {
		const response = await axiosInstance({
			method: "get",
			url: postsRoute,
			params: { page: page },
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

		const response = await axiosInstance({
			method: "post",
			url: postsRoute,
			headers: {
				"Content-Type": "multipart/form-data",
			},
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
		const response = await axiosInstance({
			method: "delete",
			url: postsRoute + postId,
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
		const formData = new FormData();
		formData.append("postId", post.postId);
		formData.append("newGameName", post.newGameName);
		formData.append("newTitle", post.newTitle);
		formData.append("newContent", post.newContent);
		formData.append("publisherId", post.publisherId.toString());
		if(post?.newMedia && Array.isArray(post.newMedia) && typeof(post.newMedia?.[0]) === "string"){
			formData.append("newMedia", JSON.stringify(post.newMedia));
		}
		if (post?.newMedia && !(Array.isArray(post.newMedia))) {
			formData.append("newMedia", post.newMedia as File);
		}
		const response = await axiosInstance({
			method: "put",
			url: postsRoute,
			headers: {
				"Content-Type": "multipart/form-data",
			},
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

export const getCurrentPost = createAsyncThunk<
	unknown,
	string,
	{ rejectValue: SerializedError }
>("posts/getCurrentPost", async (postId: string, thunkAPI) => {
	try {
		const response = await axiosInstance({
			method: "get",
			url: postsRoute + postId,
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
