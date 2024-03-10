import { createSlice } from "@reduxjs/toolkit";
import { IAIAnswer } from "./ai-guide.types";
import { getGeneratedAnswer } from "./ai-guide.thunks";

const initialState = {
	error: null,
	loading: false,
	answer: null,
} as IAIAnswer;

const aiGuideSlice = createSlice({
	name: "ai-guide",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getGeneratedAnswer.pending, (state) => {
				state.loading = true;
			})
			.addCase(getGeneratedAnswer.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.answer = action.payload as string;
			})
			.addCase(getGeneratedAnswer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.answer = null;
			});
	},
});

export default aiGuideSlice.reducer;
