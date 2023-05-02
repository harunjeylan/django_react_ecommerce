import { authApi } from "../auth/authApi";

export const subscriberApi = authApi.injectEndpoints({
  tagTypes: ["subscriber"],
  endpoints: (builder) => ({
    addSerializer: builder.mutation({
      query: ({ post }) => ({
        url: `service/subscriber/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["subscriber"],
    }),
    getAllSerializers: builder.query({
      query: () => `service/subscriber/`,
      providesTags: ["subscriber"],
    }),
    updateSerializer: builder.mutation({
      query: ({ post }) => ({
        url: `service/subscriber/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["subscriber"],
    }),
    deleteSerializer: builder.mutation({
      query: ({ post }) => ({
        url: `service/subscriber/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["subscriber"],
    }),
  }),
});

export const {
  useGetAllSerializersQuery,
  useAddSerializerMutation,
  useUpdateSerializerMutation,
  useDeleteSerializerMutation,
} = subscriberApi;
