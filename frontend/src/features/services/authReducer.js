import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

export const userAuth = createApi({
  reducerPath: "userAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
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
