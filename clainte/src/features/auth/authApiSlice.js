import { authApi } from "../../app/api/authApi";
import store from "../../app/store";

const state = store.getState();
export const authApiSlice = authApi.injectEndpoints({
  tagTypes: ["userData", "accessToken"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/account/api/token/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["accessToken", "userData"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/account/api/register/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["accessToken", "userData"],
    }),
    updatePersonalInfo: builder.mutation({
      query: (addressData) => ({
        url: "/account/api/profile/update_address/",
        method: "PUT",
        body: addressData,
      }),
      invalidatesTags: ["userData"],
    }),
    getUseData: builder.query({
      query: () => `/account/api/profile/`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdatePersonalInfoMutation,
  useGetUseDataQuery,
} = authApiSlice;
export const { endpoints, reducerPath, reducer, middleware } = authApiSlice;
