import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    username: "",
    refresh_token: "",
    isAuthenticated: false,
    userid: 0
  },
  reducers: {
    getUserData: (state) => {
    },
  }
});