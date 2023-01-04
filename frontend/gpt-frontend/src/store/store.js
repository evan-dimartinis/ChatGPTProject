import { configureStore } from "@reduxjs/toolkit";
import Auth from "../screens/auth";
import { AuthSlice } from "./authSlice";

const store = configureStore({
  reducer: {
    Auth: AuthSlice.reducer
  },
});

export default store;