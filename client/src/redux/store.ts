import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import userReducer from "./users/users.slice";
import postsReducer from "./posts/posts.slice";
import commentsReducer from "./comments/comments.slice";
import aiGuideReducer from "./ai-guide/ai-guide.slice";

export const store = configureStore({
	reducer: {
		users: userReducer,
		posts: postsReducer,
		comments: commentsReducer,
		aiGuide: aiGuideReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(logger).concat(thunkMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
