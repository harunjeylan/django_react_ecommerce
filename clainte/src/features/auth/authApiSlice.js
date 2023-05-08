import { authApi } from './authApi'

export const authApiSlice = authApi.injectEndpoints({
  tagTypes: ['userData', 'accessToken'],
  endpoints: (builder) => ({
    getUseData: builder.query({
      query: () => `/account/profile/`,
      providesTags: ['userData'],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/account/token/',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['accessToken', 'userData'],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/account/register/',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['accessToken', 'userData'],
      invalidatesTags: ['accessToken', 'userData'],
    }),
    updatePersonalInfo: builder.mutation({
      query: ({ post }) => ({
        url: '/account/profile/update/',
        method: 'PUT',
        body: post,
      }),
      providesTags: ['userData'],
      invalidatesTags: ['userData'],
    }),
    uploadProfileImage: builder.mutation({
      query: ({ post }) => ({
        url: `account/profile/image/upload/`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['userData'],
    }),
    updatePassword: builder.mutation({
      query: ({ post }) => ({
        url: '/account/profile/password/change/',
        method: 'PUT',
        body: post,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdatePersonalInfoMutation,
  useUploadProfileImageMutation,
  useUpdatePasswordMutation,
  useGetUseDataQuery,
} = authApiSlice
export const { endpoints, reducerPath, reducer, middleware } = authApiSlice
