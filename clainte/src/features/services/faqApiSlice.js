import { authApi } from "../auth/authApi";

export const faqApi = authApi.injectEndpoints({
  tagTypes: ["faq"],
  endpoints: (builder) => ({
    addFaq: builder.mutation({
      query: ({ post }) => ({
        url: `service/faq/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["faq"],
    }),
    getAllFaq: builder.query({
      query: () => `service/faq/`,
      providesTags: ["faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ post }) => ({
        url: `service/faq/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["faq"],
    }),
    deleteFaq: builder.mutation({
      query: ({ post }) => ({
        url: `service/faq/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
