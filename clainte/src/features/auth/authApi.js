import { setCredentials, logOut } from "../../features/auth/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SERVER_HOST = "http://127.0.0.1:8000/";

export const refreshAccessToken = async (store) => {
  let response = await fetch(SERVER_HOST + "account/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      refresh: store.getState().auth?.refresh,
    }),
  });
  let data = await response.json();

  if (response.status === 200) {
    store.dispatch(setCredentials(data));
  } else if (response.status === 401) {
    store.dispatch(logOut());
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_HOST,
  prepareHeaders: (headers, { getState, extra }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    refreshAccessToken(api);
    console.log("refreshing tooken ...");
    return await baseQuery(args, api, extraOptions);
  } else {
    return result;
  }
};

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
