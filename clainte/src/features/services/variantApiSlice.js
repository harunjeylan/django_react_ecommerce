import { authApi } from "../../app/api/authApi";

export const variantApi = authApi.injectEndpoints({
  tagTypes: ["variants", "options"],
  endpoints: (builder) => ({
    getAllVariants: builder.query({
      query: () => `api/variants/`,
      providesTags: ["variants", "options"],
    }),

    addVariant: builder.mutation({
      query: ({ post }) => ({
        url: `api/variants/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["variants"],
    }),
    updateVariant: builder.mutation({
      query: ({ post }) => ({
        url: `api/variants/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["variants"],
    }),
    deleteVariant: builder.mutation({
      query: ({ post }) => ({
        url: `api/variants/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["variants"],
    }),
    deleteOption: builder.mutation({
      query: ({ post }) => ({
        url: `api/variants/options/delete/`,
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
