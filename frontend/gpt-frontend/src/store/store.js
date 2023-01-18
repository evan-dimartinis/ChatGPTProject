import { configureStore } from "@reduxjs/toolkit";
import Auth from "../screens/auth";
import { AuthSlice } from "./authSlice";
import { QuicklinksSlice } from "./quicklinksSlice";
import { RequestsSlice } from "./requestsSlice";

const store = configureStore({
  reducer: {
    Auth: AuthSlice.reducer,
    Quicklinks: QuicklinksSlice.reducer,
    Requests: RequestsSlice.reducer
  },
});

export default store;