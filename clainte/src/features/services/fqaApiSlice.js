import { authApi } from "../auth/authApi";

export const fqaApi = authApi.injectEndpoints({
  tagTypes: ["fqa"],
  endpoints: (builder) => ({
    addFqa: builder.mutation({
      query: ({ post }) => ({
        url: `service/fqa/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["fqa"],
    }),
    getAllFqa: builder.query({
      query: () => `service/fqa/`,
      providesTags: ["fqa"],
    }),
    updateFqa: builder.mutation({
      query: ({ post }) => ({
        url: `service/fqa/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["fqa"],
    }),
    deleteFqa: builder.mutation({
      query: ({ post }) => ({
        url: `service/fqa/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["fqa"],
    }),
  }),
});

export const {
  useGetAllFqaQuery,
  useAddFqaMutation,
  useUpdateFqaMutation,
  useDeleteFqaMutation,
} = fqaApi;
