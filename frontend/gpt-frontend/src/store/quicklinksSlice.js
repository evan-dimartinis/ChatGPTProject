import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const QuicklinksSlice = createSlice({
  name: "Quicklinks",
  initialState: {
    quicklinks: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getQuicklinks.fulfilled, (state, action) => {
        state.quicklinks = action.payload
    })
  },
});

export const getQuicklinks = createAsyncThunk(
  "Quicklinks/getQuicklinks",
  async (token) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/quicklinks`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const resdata = await response.json()
      console.log(resdata)
      return resdata
    } catch (err) {
        console.log(err)
    }
  }
);
