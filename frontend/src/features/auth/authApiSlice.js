import { authApi } from "../../app/api/authApi";
import store from "../../app/store";

const state = store.getState();
export const authApiSlice = authApi.injectEndpoints({
  tagTypes: ["accessToken"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/account/api/token/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/account/api/user/register/",
        method: "POST",
        body: credentials,
      }),
    }),
    getUseData: builder.query({
      query: () => `/account/api/user/profile/`,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUseDataQuery } =
  authApiSlice;
export const { endpoints, reducerPath, reducer, middleware } = authApiSlice;
