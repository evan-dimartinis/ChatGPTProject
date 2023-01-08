import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    session_token: "",
    isAuthenticated: false,
    loginerror: "",
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.session_token = action.payload;
        state.isAuthenticated = true;
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
      const response = await fetch(`http://127.0.0.1:5000/autologin`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          "token": token,
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
      console.log(
        "IN LOGIN ACTION"
      )
      const response = await fetch(`http://127.0.0.1:5000/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        body: JSON.stringify(authdata),
      });
      const status = await response.status;
      const resdata = await response.json();
      console.log("response from login: ", resdata)
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

//CREATE EVENT TO DISPATCH THAT CAN BE DISPATCHED FROM ANY SLICE
//THIS EVENT WILL INDICATE THE TOKEN BEING SENT IS NOT VALID AND THAT THE USER SHOULD BE MARKED NOT AUTHENTICATED
//THIS WILL TRIGGER THE REROUTE TO AUTH FROM THE DASHBOARD, WHICH IS CONSTANTLY CHECKING ISAUTHENTICATED