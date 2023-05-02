import { authApi } from "../auth/authApi";

export const brandApi = authApi.injectEndpoints({
  tagTypes: ["brands"],
  endpoints: (builder) => ({
    addBrand: builder.mutation({
      query: ({ post }) => ({
        url: `service/brands/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["brands"],
    }),
    getAllBrands: builder.query({
      query: () => `service/brands/`,
      providesTags: ["brands"],
    }),
    updateBrand: builder.mutation({
      query: ({ post }) => ({
        url: `service/brands/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["brands"],
    }),
    deleteBrand: builder.mutation({
      query: ({ post }) => ({
        url: `service/brands/delete/`,
        method: "DELETE",
        body: post,
      }),
      invalidatesTags: ["brands"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
