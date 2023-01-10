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
      providesTags: ["accessToken", "userData"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/account/api/register/",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["accessToken", "userData"],
      invalidatesTags: ["accessToken", "userData"],
    }),
    updatePersonalInfo: builder.mutation({
      query: (addressData) => ({
        url: "/account/api/profile/update_address/",
        method: "PUT",
        body: addressData,
      }),
      providesTags: ["userData"],
      invalidatesTags: ["userData"],
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/account/api/profile/update_password/",
        method: "PUT",
        body: passwordData,
      }),
    }),
    getUseData: builder.query({
      query: () => `/account/api/profile/`,
      providesTags: ["userData"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdatePersonalInfoMutation,
  useUpdatePasswordMutation,
  useGetUseDataQuery,
} = authApiSlice;
export const { endpoints, reducerPath, reducer, middleware } = authApiSlice;
