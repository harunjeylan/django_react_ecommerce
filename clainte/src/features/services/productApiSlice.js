import { authApi } from "../../app/api/authApi";

export const productApi = authApi.injectEndpoints({
  tagTypes: ["userData", "accessToken"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "api/products/",
      providesTags: ["products"],
    }),

    addProduct: builder.mutation({
      query: ({ post }) => ({
        url: `api/products/add/`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useGetAllProductsQuery, useAddProductMutation } = productApi;
