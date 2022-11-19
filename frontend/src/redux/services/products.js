import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({ query: () => "products/" }),
    getProductsDetailes: builder.query({
      query: ({ itemId }) => `products/${itemId}`,
    }),
    getProductsByCategory: builder.query({
      query: ({ category }) => `products/category/${category}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsDetailesQuery,
  useGetProductsByCategoryQuery,
} = productApi;
