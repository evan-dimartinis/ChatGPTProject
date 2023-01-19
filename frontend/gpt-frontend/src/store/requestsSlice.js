import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const RequestsSlice = createSlice({
  name: "Requests",
  initialState: {
    requests: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRequests.fulfilled, (state, action) => {
      state.requests = action.payload
    });
  },
});

const resulttojson = (resultlist) => {
  let rv = [];
  resultlist.forEach((row) => {
    rv.push({
      hmy: row[0],
      label: row[1],
      url: row[2],
    });
  });
  return rv;
};

export const getRequests = createAsyncThunk(
  "Requests/getRequests",
  async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/request", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const resdata = await response.json();
      return resdata.data !== undefined ? resulttojson(resdata.data) : [];
    } catch (err) {
      console.log(err);
    }
  }
);
