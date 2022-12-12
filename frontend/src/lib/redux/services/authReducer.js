import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

export const userAuth = createApi({
  reducerPath: "userAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:8000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers = { ...headers, "Content-Type": "application/json" };
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    // getToken: builder.query({ query: () => "api/token" }),
    // refreshToken: builder.query({ query: () => "api/token/refrash" }),
    login: builder.mutation({
      query: ({ post }) => ({
        url: `api/token`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    getUseDetailes: builder.query({
      query: ({ productId }) => `users/${productId}`,
    }),
  }),
});

export const { useLoginMutation, useGetUseDetailesQuery } = userAuth;

// const initialState = {
//   token: "",
//   refiresh: "",
//   user: {},
// };
// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {

//     login: async (state, action) => {
//       state.user = [...state.user, action.payload.product];
//     },

//     logout: (state, action) => {
//       state.user = state.user.filter(
//         (product) => product.id !== action.payload.product.id
//       );
//     },
//   },
// });
