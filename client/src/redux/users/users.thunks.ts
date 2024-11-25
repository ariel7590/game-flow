import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ISignUpPayload, ILoginPayload } from "./users.types";
import { usersRoute } from "../../config/routeUrls";
import axiosInstance from "../../config/axios.config";

export const signUpThunk = createAsyncThunk<
	unknown,
	ISignUpPayload,
	{ rejectValue: SerializedError }
>("users/signup", async (user, thunkAPI) => {
	try {
		const response = await axiosInstance({
			method: "post",
			url: usersRoute + "signup",
			data: JSON.stringify(user),
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			alert(err.response.data.message);
			return thunkAPI.rejectWithValue(err.response.data.message);
		} else {
			throw err;
		}
	}
});

export const loginThunk = createAsyncThunk<
	unknown,
	ILoginPayload,
	{ rejectValue: SerializedError }
>("users/login", async (user, thunkAPI) => {
	try {
		const response = await axiosInstance({
			method: "post",
			url: usersRoute + "login",
			data: JSON.stringify(user),
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			alert(err.response.data.message);
			return thunkAPI.rejectWithValue(err.response.data.message);
		} else {
			throw err;
		}
	}
});

export const authenticationThunk = createAsyncThunk<
	unknown,
	unknown,
	{ rejectValue: SerializedError }
>("users/authenticate", async (_, thunkAPI) => {
	try {
		const response = await axiosInstance({
			method: "get",
			url: usersRoute + "auth",
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.message);
		} else {
			throw err;
		}
	}
});

export const googleLoginThunk = createAsyncThunk<
	unknown,
	unknown,
	{ rejectValue: SerializedError }
>("users/googleLogin", async (_, thunkAPI) => {
	try {
		const response = await axiosInstance({
			method: "get",
			url: usersRoute + "auth/google/",
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.message);
		} else {
			throw err;
		}
	}
});

export const signoutThunk = createAsyncThunk<
	unknown,
	unknown,
	{ rejectValue: SerializedError }
>("users/signout", async (_, thunkAPI) => {
	try {
		const response = await axiosInstance({
			method: "get",
			url: usersRoute + "signout",
		});

		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
		if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.message);
		} else {
			throw err;
		}
	}
});
