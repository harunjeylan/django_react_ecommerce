import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//https://varkala-react-2.vercel.app/
//https://prium.github.io/phoenix/v1.6.0/
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({ query: () => "products/" }),
    getProductsDetailes: builder.query({
      query: ({ productId }) => `products/${productId}`,
    }),
    getAllCategory: builder.query({
      query: () => `products/categories`,
    }),
    getProductsByCategory: builder.query({
      query: ({ category }) =>
        category === "all" ? "products/" : `products/category/${category}`,
    }),
    getLimitAndSkipProducts: builder.query({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),

    addProduct: builder.mutation({
      query: ({ post }) => ({
        url: `products/add`,
        method: "POST",
        body: post,
      }),
    }),
  }),
});





export const {
  useGetAllProductsQuery,
  useGetProductsDetailesQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoryQuery,
  useGetLimitAndSkipProductsQuery,

  useAddProductMutation,
} = productApi;
