import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";


export const userAuth = createApi({
  reducerPath: "userAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState()?.auth?.token;
    //   headers = { ...headers, "Content-Type": "application/json" };
    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  tagTypes: ["userAuth"],
  endpoints: (builder) => ({
    // getToken: builder.query({ query: () => "api/token" }),
    // refreshToken: builder.query({ query: () => "api/token/refrash" }),
    login: builder.mutation({
      query: ({ authPost }) => ({
        url: `api/token`,
        method: "POST",
        body: authPost,
      }),
      invalidatesTags: ["userAuth"],
    }),
    getUseDetailes: builder.query({
      query: ({ productId }) => `users/${productId}`,
    }),
  }),
});

export const { useLoginMutation, useGetUseDetailesQuery } = userAuth;
export const { endpoints, reducerPath, reducer, middleware } = userAuth;
