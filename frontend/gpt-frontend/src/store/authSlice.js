import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    session_token: "",
    isAuthenticated: false,
    loginerror: "",
  },
  reducers: {
    getUserData: (state) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.session_token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginerror = action.payload;
      })
      .addCase(autologin.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload
      })
  },
});

export const autologin = createAsyncThunk(
  "Auth/autologin",
  async (token, { rejectWithValue }) => {
    try {
      console.log(token)
      const response = await fetch(`http://127.0.0.1:5000/autologin`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
      })
      const isValidUser = await response.json()
      return isValidUser.valid
    } catch (err) {
      
    }
  }
)

export const login = createAsyncThunk(
  "Auth/login",
  async (authdata, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authdata),
      });
      const status = await response.status;
      const resdata = await response.json();
      if (status == 200) {
        return resdata;
      } else if (status == 202) {
        return rejectWithValue(resdata.data);
      } else if (status == 500) {
        return rejectWithValue("Server error. Please try again later");
      }
    } catch (err) {
      console.log(err);
    }
  }
);
