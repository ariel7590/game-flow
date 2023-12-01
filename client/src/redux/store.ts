import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import userReducer from "./users/users.slice";

export const store = configureStore({
	reducer: { users: userReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(logger).concat(thunkMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;