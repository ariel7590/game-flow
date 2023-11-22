import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ISignUpPayload, ILoginPayload } from "./users.types";
import { localAPI, usersRoute } from "../routeUrls";

export const signUpThunk = createAsyncThunk<
	unknown,
	ISignUpPayload,
	{ rejectValue: SerializedError }
>("users/signup", async (user: ISignUpPayload, thunkAPI) => {
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
			alert(err.response.data.error);
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});

export const loginThunk = createAsyncThunk<
	unknown,
	ILoginPayload,
	{ rejectValue: SerializedError }
>("users/login", async (user: ILoginPayload, thunkAPI) => {
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
			alert(err.response.data.error);
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});
