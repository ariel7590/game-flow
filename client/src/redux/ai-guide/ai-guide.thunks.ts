import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
	
} from "./ai-guide.types";
import { localAPI, aiGuideRoute } from "../routeUrls";

export const getGeneratedAnswer = createAsyncThunk<
	unknown,
	string,
	{ rejectValue: SerializedError }
>("ai-guide/getGeneratedAnswer", async (prompt, thunkAPI) => {
	try {
		const response = await axios({
			method: "post",
			url: localAPI + aiGuideRoute,
			headers: {
				"Content-Type": "application/json",
			},
			data:{
                prompt
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