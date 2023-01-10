import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const QuicklinksSlice = createSlice({
  name: "Quicklinks",
  initialState: {
    quicklinks: [
      {
        hmy: 0,
        label: "Worldle",
        url: "https://worldle.teuter.fr",
      },
    ],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getQuicklinks.fulfilled, (state, action) => {
        state.quicklinks = action.payload;
      })
      .addCase(addQuicklink.fulfilled, (state, action) => {
        state.quicklinks = action.payload;
      })
      .addCase(updateQuicklink.fulfilled, (state, action) => {
        state.quicklinks = action.payload
      })
      .addCase(deleteQuicklink.fulfilled, (state, action) => {
        state.quicklinks = action.payload
      })
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

export const getQuicklinks = createAsyncThunk(
  "Quicklinks/getQuicklinks",
  async (token) => {
    console.log(token);
    try {
      const response = await fetch(`http://127.0.0.1:5000/quicklinks`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const resdata = await response.json();
      return resdata.data !== undefined ? resulttojson(resdata.data) : []
    } catch (err) {
      console.log(err);
    }
  }
);

export const addQuicklink = createAsyncThunk(
  "Quicklinks/addQuicklink",
  async (data) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/quicklinks`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: data.token,
        },
        body: JSON.stringify({ label: data.label, url: data.url }),
      });
      const resdata = await response.json();
      return resulttojson(resdata.data);
    } catch (err) {}
  }
);

export const updateQuicklink = createAsyncThunk(
  "Quicklinks/updateQuicklink",
  async (updatedata) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/quicklinks`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "token": updatedata.token,
        },
        body: JSON.stringify({ hmy: updatedata.hmy, label: updatedata.label, url: updatedata.url }),
      });
      const resdata = await response.json();
      return resulttojson(resdata.data);
    } catch (err) {
      
    }
  }
)

export const deleteQuicklink = createAsyncThunk(
  "Quicklinks/deleteQuicklink",
  async (data) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/quicklinks`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "token": data.token,
        },
        body: JSON.stringify({ hmy: data.hmy }),
      });
      const resdata = await response.json();
      console.log(resdata)
      return resulttojson(resdata.data);
    } catch (err) {
      
    }
  }
)