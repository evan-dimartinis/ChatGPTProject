import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    username: "",
    refresh_token: "",
    isAuthenticated: false,
    userid: 0,
  },
  reducers: {
    getUserData: (state) => {},
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("test good");
    });
  },
});

export const login = createAsyncThunk("Auth/login", async (authdata) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/login`, {
      method: "POST",
      //mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authdata),
    });
    console.log(response);
    const resdata = await response.json();
    console.log(resdata);
    return resdata;
  } catch (err) {
    console.log(err);
  }
});
