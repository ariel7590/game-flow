import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ISignUpPayload, ILoginPayload } from "./users.types";
import { localAPI, usersRoute } from "../routeUrls";

export const signUpThunk = createAsyncThunk<
	unknown,
	ISignUpPayload,
	{ rejectValue: SerializedError }
>("users/signup", async (user, thunkAPI) => {
	try {
		const response = await axios({
			method: "post",
			url: localAPI + usersRoute + "signup",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
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
		const response = await axios({
			method: "post",
			url: localAPI + usersRoute + "login",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
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
		const response = await axios({
			method: "get",
			url: localAPI + usersRoute + "auth",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true
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
