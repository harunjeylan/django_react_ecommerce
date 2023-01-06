import { authApi } from "../../app/api/authApi";
import store from "../../app/store";

const state = store.getState();
export const authApiSlice = authApi.injectEndpoints({
  tagTypes: ["accessToken"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/token/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/user/register/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
export const { endpoints, reducerPath, reducer, middleware } = authApiSlice;
