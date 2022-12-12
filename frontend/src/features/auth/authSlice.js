import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
const initialState = {
  token: null,
  refresh: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload;
      state.token = access;
      state.refresh = refresh;
      state.user = jwt_decode(access);
      console.log(action.payload);
    },
    logOut: (state, action) => {
      state.token = null;
      state.refresh = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = jwt_decode(action.payload);
    },
  },
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToke = (state) => state.auth.token;
export const selectCurrentRefresh = (state) => state.auth.refresh;
