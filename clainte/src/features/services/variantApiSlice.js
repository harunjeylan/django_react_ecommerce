import { authApi } from "../auth/authApi";

export const variantApi = authApi.injectEndpoints({
  tagTypes: ["variants", "options"],
  endpoints: (builder) => ({
    getAllVariants: builder.query({
      query: () => `service/variants/`,
      providesTags: ["variants", "options"],
    }),

    addVariant: builder.mutation({
      query: ({ post }) => ({
        url: `service/variants/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["variants"],
    }),
    updateVariant: builder.mutation({
      query: ({ post }) => ({
        url: `service/variants/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["variants"],
    }),
    deleteVariant: builder.mutation({
      query: ({ post }) => ({
        url: `service/variants/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["variants"],
    }),
    deleteOption: builder.mutation({
      query: ({ post }) => ({
        url: `service/variants/options/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["variants", "options"],
    }),
  }),
});

export const {
  useGetAllVariantsQuery,
  useAddVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
  useDeleteOptionMutation,
} = variantApi;
