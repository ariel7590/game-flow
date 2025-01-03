import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  signUpThunk,
  loginThunk,
  authenticationThunk,
  googleLoginThunk,
  signoutThunk,
} from "./users.thunks";
import { IAuthFailed, ICurrentUser, IUserState } from "./users.types";

const initialState = {
  currentUser: {
    auth: false,
    message: "No token found!",
  } as IAuthFailed,
  loading: false,
  error: null,
} as IUserState;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<ICurrentUser>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(signUpThunk.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        currentUser: action.payload as ICurrentUser,
      }))
      .addCase(signUpThunk.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload as string,
        currentUser: {
          auth: false,
          message: action.payload as string,
        },
      }))
      .addCase(loginThunk.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(loginThunk.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        currentUser: action.payload as ICurrentUser,
      }))
      .addCase(loginThunk.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload as string,
        currentUser: {
          auth: false,
          message: action.payload as string,
        },
      }))
      .addCase(authenticationThunk.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(authenticationThunk.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        currentUser: action.payload as ICurrentUser,
      }))
      .addCase(authenticationThunk.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload as IAuthFailed,
        currentUser: {
          auth: false,
          message: action.payload,
        } as IAuthFailed,
      }))
      .addCase(signoutThunk.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(signoutThunk.fulfilled, (state) => ({
        ...state,
        loading: false,
        error: null,
        currentUser: {
          auth: false,
          message: "No token found!",
        } as IAuthFailed,
      }))
      .addCase(signoutThunk.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload as string,
      }))
      .addCase(googleLoginThunk.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(googleLoginThunk.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        currentUser: action.payload as ICurrentUser,
      }))
      .addCase(googleLoginThunk.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload as IAuthFailed,
        currentUser: {
          auth: false,
          message: action.payload,
        } as IAuthFailed,
      }));
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
