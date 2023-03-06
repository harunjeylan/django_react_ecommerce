import { authApi } from "../../app/api/authApi";

export const brandApi = authApi.injectEndpoints({
  tagTypes: ["brands"],
  endpoints: (builder) => ({
    addBrand: builder.mutation({
      query: ({ post }) => ({
        url: `api/brands/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["brands"],
    }),
    getAllBrands: builder.query({
      query: () => `api/brands/`,
      providesTags: ["brands"],
    }),
    updateBrand: builder.mutation({
      query: ({ post }) => ({
        url: `api/brands/update/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["brands"],
    }),
    deleteBrand: builder.mutation({
      query: ({ post }) => ({
        url: `api/brands/delete/`,
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
