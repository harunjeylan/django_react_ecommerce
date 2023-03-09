import { authApi } from "./authApi";

export const authApiSlice = authApi.injectEndpoints({
  tagTypes: ["userData", "accessToken"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/account/token/",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["accessToken", "userData"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/account/register/",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["accessToken", "userData"],
      invalidatesTags: ["accessToken", "userData"],
    }),
    updatePersonalInfo: builder.mutation({
      query: (userData) => ({
        url: "/account/profile/update/",
        method: "PUT",
        body: userData,
      }),
      providesTags: ["userData"],
      invalidatesTags: ["userData"],
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/account/profile/password/chenge/",
        method: "PUT",
        body: passwordData,
      }),
    }),
    getUseData: builder.query({
      query: () => `/account/profile/`,
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
