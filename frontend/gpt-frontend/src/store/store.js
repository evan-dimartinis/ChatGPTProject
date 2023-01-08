import { configureStore } from "@reduxjs/toolkit";
import Auth from "../screens/auth";
import { AuthSlice } from "./authSlice";
import { QuicklinksSlice } from "./quicklinksSlice";

const store = configureStore({
  reducer: {
    Auth: AuthSlice.reducer,
    Quicklinks: QuicklinksSlice.reducer
  },
});

export default store;