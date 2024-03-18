import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../config/axios.config";
import { aiGuideRoute } from "../../config/routeUrls";

export const getGeneratedAnswer = createAsyncThunk<
	unknown,
	string,
	{ rejectValue: SerializedError }
>("ai-guide/getGeneratedAnswer", async (prompt, thunkAPI) => {
	try {
		const response = await axiosInstance({
			method: "post",
			url: aiGuideRoute,
			data: {
				prompt,
			},
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
